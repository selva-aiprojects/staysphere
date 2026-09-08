import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { prisma } from '@staysphere/database';
import {
  CreateServiceRequestInput,
  UpdateServiceRequestStatusInput,
} from '@staysphere/validation-schemas';

@Injectable()
export class MyStayService {
  async getInStayDetails(guestId: string, bookingId: string) {
    const booking = await prisma.stayBooking.findUnique({
      where: { id: bookingId },
      include: {
        property: {
          include: {
            amenities: {
              include: {
                amenity: true,
              },
            },
          },
        },
        roomType: true,
        serviceRequests: {
          orderBy: { requestedAt: 'desc' },
        },
        transitBookings: true,
        tickets: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.guestId !== guestId) {
      throw new ForbiddenException('You are not authorized to access this stay record');
    }

    return booking;
  }

  async createServiceRequest(guestId: string, input: CreateServiceRequestInput) {
    const booking = await prisma.stayBooking.findUnique({
      where: { id: input.stayBookingId },
    });

    if (!booking || booking.guestId !== guestId) {
      throw new ForbiddenException('Invalid booking session');
    }

    // Default SLA target by category
    const slaMap: Record<string, number> = {
      HOUSEKEEPING: 20,
      ROOM_DINING: 35,
      MAINTENANCE: 25,
      SPA_WELLNESS: 60,
      BELL_DESK: 15,
      FRONT_DESK: 10,
    };

    const slaTargetMinutes = slaMap[input.category] || 20;

    const request = await prisma.serviceRequest.create({
      data: {
        stayBookingId: input.stayBookingId,
        propertyId: booking.propertyId,
        guestId,
        roomNumber: input.roomNumber,
        category: input.category,
        title: input.title,
        details: input.details,
        quantity: input.quantity,
        status: 'PENDING',
        slaTargetMinutes,
      },
    });

    return request;
  }

  async updateServiceRequestStatus(requestId: string, input: UpdateServiceRequestStatusInput) {
    const request = await prisma.serviceRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException('Service request not found');
    }

    const data: any = {
      status: input.status,
    };

    if (input.status === 'ACKNOWLEDGED' && !request.acknowledgedAt) {
      data.acknowledgedAt = new Date();
    }

    if (input.status === 'COMPLETED' && !request.completedAt) {
      data.completedAt = new Date();
    }

    if (input.assignedStaffId) {
      data.assignedStaffId = input.assignedStaffId;
    }

    return prisma.serviceRequest.update({
      where: { id: requestId },
      data,
    });
  }
}
