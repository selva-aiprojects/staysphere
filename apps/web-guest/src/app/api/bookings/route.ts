import { NextResponse } from 'next/server';
import { prisma } from '@staysphere/database';

export async function GET() {
  try {
    const bookings = await prisma.stayBooking.findMany({
      include: {
        guest: {
          select: {
            fullName: true,
            email: true,
            phone: true,
          },
        },
        property: {
          select: {
            name: true,
            city: true,
            state: true,
            featuredImages: true,
          },
        },
        roomType: true,
        transitBookings: {
          include: {
            driver: {
              include: {
                user: {
                  select: {
                    fullName: true,
                    phone: true,
                  },
                },
              },
            },
            vehicle: true,
          },
        },
        serviceRequests: true,
        tickets: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('Error fetching bookings from database:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch bookings',
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
