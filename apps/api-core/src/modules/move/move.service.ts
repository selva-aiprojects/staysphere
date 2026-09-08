import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@staysphere/database';
import {
  RequestTransitQuote,
  CreateTransitBookingInput,
  UpdateDriverLocationInput,
} from '@staysphere/validation-schemas';

@Injectable()
export class MoveService {
  async calculateQuote(input: RequestTransitQuote) {
    // Distance estimation via Haversine
    const R = 6371; // km
    const dLat = ((input.dropLatitude - input.pickupLatitude) * Math.PI) / 180;
    const dLon = ((input.dropLongitude - input.pickupLongitude) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((input.pickupLatitude * Math.PI) / 180) *
        Math.cos((input.dropLatitude * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = Math.max(5, Math.round(R * c * 1.3)); // 1.3 road winding factor

    // Base fare calculation
    let ratePerKm = 22; // INR per km
    let basePickupCharge = 200;

    if (input.vehicleClass === 'SUV') {
      ratePerKm = 32;
      basePickupCharge = 350;
    } else if (input.vehicleClass === 'LUXURY_SEDAN') {
      ratePerKm = 65;
      basePickupCharge = 800;
    }

    const baseFare = basePickupCharge + distanceKm * ratePerKm;
    const taxAmount = baseFare * 0.05; // 5% GST on commercial transport
    const totalFare = baseFare + taxAmount;
    const estimatedDurationMins = Math.round(distanceKm * 2.2);

    return {
      serviceType: input.serviceType,
      vehicleClass: input.vehicleClass,
      distanceKm,
      estimatedDurationMins,
      baseFare,
      taxAmount,
      totalFare,
      currency: 'INR',
      guarantees: [
        'Zero Surge Pricing Guaranteed',
        'Punctual Driver or ₹500 Transit Credit',
        'Commercial Permit & GPS Verified Fleet',
      ],
    };
  }

  async createTransitBooking(guestId: string, input: CreateTransitBookingInput) {
    const quote = await this.calculateQuote(input);
    const bookingRef = `MOVE-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const booking = await prisma.transitBooking.create({
      data: {
        bookingReference: bookingRef,
        guestId,
        stayBookingId: input.stayBookingId,
        serviceType: input.serviceType,
        vehicleClass: input.vehicleClass,
        pickupAddress: input.pickupAddress,
        pickupLatitude: input.pickupLatitude,
        pickupLongitude: input.pickupLongitude,
        dropAddress: input.dropAddress,
        dropLatitude: input.dropLatitude,
        dropLongitude: input.dropLongitude,
        scheduledPickupTime: new Date(input.scheduledPickupTime),
        flightNumber: input.flightNumber,
        status: 'REQUESTED',
        baseFare: quote.baseFare,
        taxAmount: quote.taxAmount,
        totalFare: quote.totalFare,
        currency: 'INR',
      },
    });

    return booking;
  }

  async updateDriverLocation(input: UpdateDriverLocationInput) {
    const driver = await prisma.driver.update({
      where: { id: input.driverId },
      data: {
        currentLatitude: input.latitude,
        currentLongitude: input.longitude,
      },
    });

    return {
      driverId: driver.id,
      latitude: Number(driver.currentLatitude),
      longitude: Number(driver.currentLongitude),
      updatedAt: driver.updatedAt,
    };
  }
}
