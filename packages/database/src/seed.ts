import { prisma } from './client.js';

async function main() {
  console.log('🌱 Starting StaySphere Database Seed...');

  // 1. Create Core Platform Users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@staysphere.io' },
    update: {},
    create: {
      email: 'admin@staysphere.io',
      passwordHash: '$2b$10$ep/0kEw0z40vK.V1R1W02.yMeqg8h9yR1bY3lP7fW9z4m1Vq4m0i6', // password123
      fullName: 'StaySphere Super Admin',
      role: 'SUPER_ADMIN',
      isActive: true,
      isVerified: true,
    },
  });

  const opsUser = await prisma.user.upsert({
    where: { email: 'ops@staysphere.io' },
    update: {},
    create: {
      email: 'ops@staysphere.io',
      passwordHash: '$2b$10$ep/0kEw0z40vK.V1R1W02.yMeqg8h9yR1bY3lP7fW9z4m1Vq4m0i6',
      fullName: 'Resolution Lead Agent',
      role: 'RESOLUTION_AGENT',
      isActive: true,
      isVerified: true,
    },
  });

  const guestUser = await prisma.user.upsert({
    where: { email: 'rahul.sharma@example.com' },
    update: {},
    create: {
      email: 'rahul.sharma@example.com',
      passwordHash: '$2b$10$ep/0kEw0z40vK.V1R1W02.yMeqg8h9yR1bY3lP7fW9z4m1Vq4m0i6',
      fullName: 'Rahul Sharma',
      phone: '+919876543210',
      role: 'GUEST',
      isActive: true,
      isVerified: true,
    },
  });

  const hotelManagerUser = await prisma.user.upsert({
    where: { email: 'manager@goabeachresort.com' },
    update: {},
    create: {
      email: 'manager@goabeachresort.com',
      passwordHash: '$2b$10$ep/0kEw0z40vK.V1R1W02.yMeqg8h9yR1bY3lP7fW9z4m1Vq4m0i6',
      fullName: 'Ananya Deshmukh',
      role: 'HOTEL_MANAGER',
      isActive: true,
      isVerified: true,
    },
  });

  const travelPartnerUser = await prisma.user.upsert({
    where: { email: 'dispatch@goacabs.com' },
    update: {},
    create: {
      email: 'dispatch@goacabs.com',
      passwordHash: '$2b$10$ep/0kEw0z40vK.V1R1W02.yMeqg8h9yR1bY3lP7fW9z4m1Vq4m0i6',
      fullName: 'Goa Premium Mobility Desk',
      role: 'TRAVEL_PARTNER',
      isActive: true,
      isVerified: true,
    },
  });

  const driverUser = await prisma.user.upsert({
    where: { email: 'ramesh.driver@goacabs.com' },
    update: {},
    create: {
      email: 'ramesh.driver@goacabs.com',
      passwordHash: '$2b$10$ep/0kEw0z40vK.V1R1W02.yMeqg8h9yR1bY3lP7fW9z4m1Vq4m0i6',
      fullName: 'Ramesh Fernandes',
      phone: '+919822123456',
      role: 'DRIVER',
      isActive: true,
      isVerified: true,
    },
  });

  // 2. Create Partner Profiles
  const hotelPartner = await prisma.partnerProfile.upsert({
    where: { userId: hotelManagerUser.id },
    update: {},
    create: {
      userId: hotelManagerUser.id,
      businessName: 'Coastal Hospitality Pvt Ltd',
      tradeName: 'Azure Palms Beach Resort & Spa',
      partnerType: 'HOTEL_OPERATOR',
      taxRegistrationNumber: '29ABCDE1234F1Z5',
      businessLicenseNumber: 'HOTEL-GA-2024-884',
      bankAccountNumber: '987654321098',
      bankIfscOrSwift: 'HDFC0001234',
      commissionRatePct: 15.0,
      trustScore: 98.5,
      isVerified: true,
      isActive: true,
    },
  });

  const travelPartner = await prisma.partnerProfile.upsert({
    where: { userId: travelPartnerUser.id },
    update: {},
    create: {
      userId: travelPartnerUser.id,
      businessName: 'Goa Coastal Transport Logistics LLP',
      tradeName: 'Goa Premium Cabs',
      partnerType: 'TRAVEL_OPERATOR',
      taxRegistrationNumber: '29XYZAB5678G2Z1',
      businessLicenseNumber: 'TRANS-GA-2023-112',
      bankAccountNumber: '123456789012',
      bankIfscOrSwift: 'ICIC0000456',
      commissionRatePct: 15.0,
      trustScore: 99.0,
      isVerified: true,
      isActive: true,
    },
  });

  // 3. Create Sample Amenities
  const amenities = [
    { name: 'Infinity Swimming Pool', category: 'WELLNESS', iconName: 'waves' },
    { name: 'Complimentary High-Speed Wi-Fi', category: 'GENERAL', iconName: 'wifi' },
    { name: 'Multi-Cuisine Beachside Restaurant', category: 'DINING', iconName: 'utensils' },
    { name: 'Ayurvedic Wellness Spa', category: 'WELLNESS', iconName: 'sparkles' },
    { name: '24/7 Dedicated Concierge & Travel Desk', category: 'GENERAL', iconName: 'shield-check' },
  ];

  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { name: amenity.name },
      update: {},
      create: amenity,
    });
  }

  // 4. Create Flagship Hotel Property
  const property = await prisma.property.upsert({
    where: { slug: 'azure-palms-beach-resort-candolim' },
    update: {},
    create: {
      partnerId: hotelPartner.id,
      name: 'Azure Palms Beach Resort & Spa',
      slug: 'azure-palms-beach-resort-candolim',
      category: 'RESORT',
      description:
        'Nestled along the pristine Candolim coastline, Azure Palms offers ultra-luxury oceanfront villas, curated wellness retreats, and seamless transit coordination via StaySphere.',
      starRating: 5,
      trustScore: 98.75,
      addressLine1: 'Aguada-Siolim Road, Candolim Beach',
      city: 'Goa',
      state: 'Goa',
      country: 'India',
      postalCode: '403515',
      latitude: 15.5188,
      longitude: 73.7634,
      featuredImages: [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      ],
      checkInTime: '14:00',
      checkOutTime: '11:00',
      isVerified: true,
      isActive: true,
    },
  });

  // 5. Create Room Types and Rate Plans
  const deluxeSeaView = await prisma.roomType.create({
    data: {
      propertyId: property.id,
      name: 'Deluxe Ocean View King Suite',
      description: 'Spacious 450 sq ft suite featuring a private sea-facing balcony and marble bath.',
      baseCapacity: 2,
      maxCapacity: 3,
      bedConfiguration: '1 King Bed',
      roomSizeSqFt: 450,
      images: [
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
      ],
      totalInventory: 12,
    },
  });

  await prisma.ratePlan.create({
    data: {
      roomTypeId: deluxeSeaView.id,
      name: 'Best Available Rate with Breakfast',
      isBreakfastIncluded: true,
      isFreeCancellation: true,
      cancellationCutoffHours: 24,
      baseNightlyRate: 10000.0,
      currency: 'INR',
    },
  });

  // 6. Create Travel Fleet & Driver
  const vehicle = await prisma.vehicle.upsert({
    where: { licensePlate: 'GA-03-A-7890' },
    update: {},
    create: {
      travelPartnerId: travelPartner.id,
      vehicleClass: 'SEDAN',
      make: 'Toyota',
      model: 'Innova Crysta / Camry Hybrid',
      year: 2024,
      licensePlate: 'GA-03-A-7890',
      registrationNumber: 'GA-COMM-2024-00918',
      passengerCapacity: 4,
      luggageCapacity: 3,
      isInsured: true,
      isVerified: true,
    },
  });

  await prisma.driver.upsert({
    where: { userId: driverUser.id },
    update: {},
    create: {
      userId: driverUser.id,
      travelPartnerId: travelPartner.id,
      assignedVehicleId: vehicle.id,
      commercialLicenseNumber: 'DL-GA-2018-99281',
      licenseExpiryDate: new Date('2029-12-31'),
      currentLatitude: 15.5180,
      currentLongitude: 73.7620,
      isAvailable: true,
      trustRating: 4.95,
      totalTripsCompleted: 428,
    },
  });

  console.log('✅ StaySphere Database seeded successfully with core demo data.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
