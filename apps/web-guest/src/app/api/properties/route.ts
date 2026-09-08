import { NextResponse } from 'next/server';
import { prisma } from '@staysphere/database';

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      where: { isActive: true },
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
          include: {
            user: {
              select: {
                fullName: true,
                email: true,
                phone: true,
              },
            },
          },
        },
      },
      orderBy: { trustScore: 'desc' },
    });

    return NextResponse.json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    console.error('Error fetching live properties from database:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch properties from database',
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
