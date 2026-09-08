import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { prisma } from '@staysphere/database';
import { SearchHotelsQuery, CreateStayBookingInput } from '@staysphere/validation-schemas';

@Injectable()
export class StayService {
  async searchProperties(query: SearchHotelsQuery) {
    const whereClause: any = {
      isActive: true,
      isVerified: true,
    };

    if (query.city) {
      whereClause.city = { contains: query.city, mode: 'insensitive' };
    }

    if (query.category) {
      whereClause.category = query.category;
    }

    const properties = await prisma.property.findMany({
      where: whereClause,
      include: {
        roomTypes: {
          include: {
            ratePlans: true,
          },
        },
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
      take: query.limit,
      skip: (query.page - 1) * query.limit,
      orderBy: { trustScore: 'desc' },
    });

    const total = await prisma.property.count({ where: whereClause });

    return {
      data: properties,
      meta: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }

  async getPropertyBySlug(slug: string) {
    const property = await prisma.property.findUnique({
      where: { slug },
      include: {
        roomTypes: {
          include: {
            ratePlans: true,
          },
        },
        amenities: {
          include: {
            amenity: true,
          },
        },
        partner: {
          select: {
            tradeName: true,
            trustScore: true,
            isVerified: true,
          },
        },
      },
    });

    if (!property) {
      throw new NotFoundException(`Property with slug '${slug}' not found`);
    }

    return property;
  }

  async createBooking(guestId: string, input: CreateStayBookingInput) {
    const property = await prisma.property.findUnique({
      where: { id: input.propertyId },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    const roomType = await prisma.roomType.findUnique({
      where: { id: input.roomTypeId },
    });

    if (!roomType) {
      throw new NotFoundException('Room type not found');
    }

    const ratePlan = await prisma.ratePlan.findUnique({
      where: { id: input.ratePlanId },
    });

    if (!ratePlan) {
      throw new NotFoundException('Rate plan not found');
    }

    // Calculate nights
    const checkIn = new Date(input.checkInDate);
    const checkOut = new Date(input.checkOutDate);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    const baseAmount = Number(ratePlan.baseNightlyRate) * nights;
    const taxAmount = baseAmount * 0.18; // 18% GST standard
    const platformFee = 0; // included in base
    const totalAmount = baseAmount + taxAmount;

    const bookingRef = `STAY-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const booking = await prisma.$transaction(async (tx) => {
      const createdBooking = await tx.stayBooking.create({
        data: {
          bookingReference: bookingRef,
          guestId,
          propertyId: input.propertyId,
          roomTypeId: input.roomTypeId,
          ratePlanId: input.ratePlanId,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          totalNights: nights,
          guestCount: input.guestCount,
          status: 'CONFIRMED',
          baseAmount,
          taxAmount,
          platformFeeAmount: platformFee,
          totalAmount,
          currency: ratePlan.currency,
          specialRequests: input.specialRequests,
        },
      });

      // Double-entry accounting ledger allocation
      const commissionRate = 0.15; // 15% StaySphere take rate
      const platformFeeEarned = baseAmount * commissionRate;
      const hotelNetDue = baseAmount - platformFeeEarned + taxAmount;

      const txRecord = await tx.financialTransaction.create({
        data: {
          referenceType: 'STAY_BOOKING',
          referenceId: createdBooking.id,
          totalAmount,
          currency: ratePlan.currency,
          status: 'SETTLED',
        },
      });

      await tx.ledgerEntry.createMany({
        data: [
          {
            transactionId: txRecord.id,
            accountId: 'GATEWAY_ESCROW_PRIMARY',
            accountType: 'GATEWAY_ESCROW',
            entryType: 'DEBIT',
            amount: totalAmount,
            currency: ratePlan.currency,
            description: `Guest payment received for booking ${bookingRef}`,
          },
          {
            transactionId: txRecord.id,
            accountId: property.partnerId,
            accountType: 'HOTEL_LIABILITY',
            entryType: 'CREDIT',
            amount: hotelNetDue,
            currency: ratePlan.currency,
            description: `Hotel net payout escrow for booking ${bookingRef}`,
          },
          {
            transactionId: txRecord.id,
            accountId: 'STAYSPHERE_REVENUE_STAY',
            accountType: 'PLATFORM_REVENUE_STAY',
            entryType: 'CREDIT',
            amount: platformFeeEarned,
            currency: ratePlan.currency,
            description: `StaySphere 15% commission on booking ${bookingRef}`,
          },
        ],
      });

      return createdBooking;
    });

    return booking;
  }
}
