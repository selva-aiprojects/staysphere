import { prisma } from './client';

async function main() {
  console.log('🌱 Starting Comprehensive StaySphere Database Seeding (Aiven Cloud)...');

  // ==========================================
  // 1. CLEAN EXISTING RELATIONS (IDEMPOTENT RESET)
  // ==========================================
  console.log('🧹 Clearing old demo data...');
  try {
    await prisma.ledgerEntry.deleteMany({});
    await prisma.financialTransaction.deleteMany({});
    await prisma.ticketEvidence.deleteMany({});
    await prisma.ticket.deleteMany({});
    await prisma.serviceRequest.deleteMany({});
    await prisma.transitBooking.deleteMany({});
    await prisma.stayBooking.deleteMany({});
    await prisma.ratePlan.deleteMany({});
    await prisma.roomType.deleteMany({});
    await prisma.propertyAmenity.deleteMany({});
    await prisma.amenity.deleteMany({});
    await prisma.property.deleteMany({});
    await prisma.driver.deleteMany({});
    await prisma.vehicle.deleteMany({});
    await prisma.partnerProfile.deleteMany({});
    await prisma.user.deleteMany({});
  } catch (err) {
    console.log('Note on clearing tables:', (err as Error).message);
  }

  // ==========================================
  // 2. CREATE PLATFORM USERS (ALL 7 PERSONAS + GUESTS)
  // ==========================================
  console.log('👥 Creating Operational & Stakeholder Personas...');
  const defaultPasswordHash = '$2b$10$ep/0kEw0z40vK.V1R1W02.yMeqg8h9yR1bY3lP7fW9z4m1Vq4m0i6'; // password123

  // Persona 1: COO & Central Resolution Desk Lead
  const adminUser = await prisma.user.create({
    data: {
      email: 'devraj.lead@staysphere.io',
      fullName: 'Devraj Mukherjee',
      phone: '+919810011223',
      passwordHash: defaultPasswordHash,
      role: 'OPS_ADMIN',
      isActive: true,
      isVerified: true,
    },
  });

  // Persona 2: Senior Relationship Manager
  const rmUser = await prisma.user.create({
    data: {
      email: 'vikram.rm@staysphere.io',
      fullName: 'Vikramaditya Singh',
      phone: '+919820022334',
      passwordHash: defaultPasswordHash,
      role: 'RESOLUTION_AGENT',
      isActive: true,
      isVerified: true,
    },
  });

  // Persona 3: Property Owner & Hotel Partner
  const propertyOwnerUser = await prisma.user.create({
    data: {
      email: 'anil.owner@vanaazure.com',
      fullName: 'Anil Deshmukh',
      phone: '+919830033445',
      passwordHash: defaultPasswordHash,
      role: 'HOTEL_MANAGER',
      isActive: true,
      isVerified: true,
    },
  });

  // Persona 4: Head of Frontdesk & Concierge
  const frontdeskUser = await prisma.user.create({
    data: {
      email: 'ananya.frontdesk@vanaazure.com',
      fullName: 'Ananya Deshmukh',
      phone: '+919840044556',
      passwordHash: defaultPasswordHash,
      role: 'HOTEL_STAFF',
      isActive: true,
      isVerified: true,
    },
  });

  // Persona 5: Travel Desk & Fleet Director
  const travelDeskUser = await prisma.user.create({
    data: {
      email: 'vikas.traveldesk@staysphere.io',
      fullName: 'Vikas Rathore',
      phone: '+919850055667',
      passwordHash: defaultPasswordHash,
      role: 'TRAVEL_PARTNER',
      isActive: true,
      isVerified: true,
    },
  });

  // Persona 6: First-Class Chauffeur
  const driverUser = await prisma.user.create({
    data: {
      email: 'gurpreet.driver@staysphere.io',
      fullName: 'Gurpreet Singh',
      phone: '+919820144552',
      passwordHash: defaultPasswordHash,
      role: 'DRIVER',
      isActive: true,
      isVerified: true,
    },
  });

  // Persona 7: Channel Partner Lead (American Express Centurion)
  const channelPartnerUser = await prisma.user.create({
    data: {
      email: 'priya.concierge@centurion.amex.com',
      fullName: 'Priya Nambiar',
      phone: '+919860066778',
      passwordHash: defaultPasswordHash,
      role: 'CHANNEL_PARTNER',
      isActive: true,
      isVerified: true,
    },
  });

  // VIP Guests
  const guestVikram = await prisma.user.create({
    data: {
      email: 'vikram.malhotra@vipguest.io',
      fullName: 'Vikram Malhotra',
      phone: '+919876500001',
      passwordHash: defaultPasswordHash,
      role: 'GUEST',
      isActive: true,
      isVerified: true,
    },
  });

  const guestSiddharth = await prisma.user.create({
    data: {
      email: 'dr.siddharth@singhania.io',
      fullName: 'Dr. Siddharth Singhania',
      phone: '+919876500002',
      passwordHash: defaultPasswordHash,
      role: 'GUEST',
      isActive: true,
      isVerified: true,
    },
  });

  const guestElena = await prisma.user.create({
    data: {
      email: 'elena.rostova@globalvip.io',
      fullName: 'Elena Rostova',
      phone: '+447911123456',
      passwordHash: defaultPasswordHash,
      role: 'GUEST',
      isActive: true,
      isVerified: true,
    },
  });

  // ==========================================
  // 3. CREATE PARTNER PROFILES (HOTEL, FLEET, CHANNEL)
  // ==========================================
  console.log('🏨 Creating Partner Profiles & Commercial Agreements...');
  const hotelPartnerProfile = await prisma.partnerProfile.create({
    data: {
      userId: propertyOwnerUser.id,
      businessName: 'Coastal Hospitality LLP',
      tradeName: 'The Vana Azure Ocean Estate & Villas',
      partnerType: 'HOTEL_OPERATOR',
      taxRegistrationNumber: '30AAACH1234F1Z9',
      businessLicenseNumber: 'GOA-LUX-2025-091',
      bankAccountNumber: '918020038841',
      bankIfscOrSwift: 'HDFC0000128',
      commissionRatePct: 12.0,
      trustScore: 99.8,
      isVerified: true,
      isActive: true,
      settlementFrequencyDays: 1, // 2-hr Escrow
    },
  });

  const travelPartnerProfile = await prisma.partnerProfile.create({
    data: {
      userId: travelDeskUser.id,
      businessName: 'StaySphere Fleet Mobility LLP',
      tradeName: 'Maybach & Executive First-Class Chauffeur Desk',
      partnerType: 'TRAVEL_OPERATOR',
      taxRegistrationNumber: '30XYZTR7890H2Z4',
      businessLicenseNumber: 'FLEET-GA-2024-551',
      bankAccountNumber: '445010299831',
      bankIfscOrSwift: 'ICIC0000881',
      commissionRatePct: 10.0,
      trustScore: 99.8,
      isVerified: true,
      isActive: true,
    },
  });

  const channelPartnerProfile = await prisma.partnerProfile.create({
    data: {
      userId: channelPartnerUser.id,
      businessName: 'American Express Centurion Lifestyle Concierge Services',
      tradeName: 'Amex Centurion Luxury Travel Desk',
      partnerType: 'CHANNEL_PARTNER',
      taxRegistrationNumber: '07AMEXC5544K1Z0',
      businessLicenseNumber: 'IATA-AMEX-2024-990',
      bankAccountNumber: '772039918231',
      bankIfscOrSwift: 'AMEX0000001',
      commissionRatePct: 15.0,
      trustScore: 100.0,
      isVerified: true,
      isActive: true,
    },
  });

  // ==========================================
  // 4. CREATE LUXURY AMENITIES
  // ==========================================
  console.log('✨ Creating 84-Point Luxury Amenities...');
  const amenityList = [
    { name: 'Infinity Sea-Facing Private Pool', category: 'WELLNESS', iconName: 'waves' },
    { name: 'Dedicated 24/7 Royal Butler Retinue', category: 'GENERAL', iconName: 'bell' },
    { name: 'Mercedes-Maybach Airport Transit Included', category: 'TRANSIT', iconName: 'car' },
    { name: 'Private Helipad Access', category: 'TRANSIT', iconName: 'navigation' },
    { name: 'Master Chef & Sommelier Wine Cellar', category: 'DINING', iconName: 'utensils' },
    { name: 'AES-256 Encrypted Digital Keycard', category: 'SECURITY', iconName: 'shield-check' },
    { name: 'Ayurvedic Sea-Salt Holistic Spa', category: 'WELLNESS', iconName: 'sparkles' },
    { name: '100% Guaranteed Rate Parity Badge', category: 'COMMERCIAL', iconName: 'award' },
  ];

  const createdAmenities: Record<string, string> = {};
  for (const am of amenityList) {
    const created = await prisma.amenity.create({ data: am });
    createdAmenities[am.name] = created.id;
  }

  // ==========================================
  // 5. CREATE 4 FLAGSHIP PROPERTIES & ROOM TYPES
  // ==========================================
  console.log('🏰 Creating 4 Flagship Properties...');

  // Property 1: The Vana Azure (Goa)
  const propVanaAzure = await prisma.property.create({
    data: {
      partnerId: hotelPartnerProfile.id,
      name: 'The Vana Azure Private Ocean Villa & Estate',
      slug: 'vana-azure-ocean-villa-goa',
      category: 'VILLA',
      description:
        'Clifftop oceanfront sanctuary perched 180 feet above the Arabian Sea with private infinity pool, Maybach chauffeur transit, and 24/7 butler service.',
      starRating: 5,
      trustScore: 99.8,
      addressLine1: 'Sinquerim Cliffs, Fort Aguada Road',
      city: 'Goa',
      state: 'Goa',
      postalCode: '403515',
      latitude: 15.4926,
      longitude: 73.7737,
      featuredImages: ['/brand/ocean_villa.jpg', '/brand/cliff_villa.jpg', '/brand/butler_dining.jpg'],
      isVerified: true,
      isActive: true,
    },
  });

  // Property 2: The Maharaja Pichola (Udaipur)
  const propMaharaja = await prisma.property.create({
    data: {
      partnerId: hotelPartnerProfile.id,
      name: 'The Maharaja Pichola Royal Palace',
      slug: 'maharaja-pichola-palace-udaipur',
      category: 'RESORT',
      description:
        '18th-century Rajput heritage palace floating majestically on Lake Pichola with private royal motorboat transfers, marble courtyards, and royal dining.',
      starRating: 5,
      trustScore: 100.0,
      addressLine1: 'Lake Pichola, Old City',
      city: 'Udaipur',
      state: 'Rajasthan',
      postalCode: '313001',
      latitude: 24.5764,
      longitude: 73.6806,
      featuredImages: ['/brand/royal_palace.jpg', '/brand/butler_dining.jpg'],
      isVerified: true,
      isActive: true,
    },
  });

  // Property 3: Celestial Alpine (Manali)
  const propAlpine = await prisma.property.create({
    data: {
      partnerId: hotelPartnerProfile.id,
      name: 'The Celestial Alpine Glass Chalet & Spa',
      slug: 'celestial-alpine-glass-chalet-manali',
      category: 'RESORT',
      description:
        'Heated glass-domed Alpine sanctuary overlooking snow-clad Himalayan peaks with private pine saunas and hot spring hydrotherapy.',
      starRating: 5,
      trustScore: 99.4,
      addressLine1: 'Solang Heights, Rohtang Road',
      city: 'Manali',
      state: 'Himachal Pradesh',
      postalCode: '175131',
      latitude: 32.3166,
      longitude: 77.1575,
      featuredImages: ['/brand/alpine_chalet.jpg'],
      isVerified: true,
      isActive: true,
    },
  });

  // Property 4: Sovereign Horizon Penthouse (Mumbai)
  const propPenthouse = await prisma.property.create({
    data: {
      partnerId: hotelPartnerProfile.id,
      name: 'The Sovereign Horizon Sky Penthouse',
      slug: 'sovereign-horizon-sky-penthouse-mumbai',
      category: 'SERVICED_APARTMENT',
      description:
        'Triplex sky residence occupying the 48th to 50th floors on Bandra West coastline with private rooftop helipad and panoramic Arabian Sea views.',
      starRating: 5,
      trustScore: 99.7,
      addressLine1: 'Carter Road, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400050',
      latitude: 19.0607,
      longitude: 72.8258,
      featuredImages: ['/brand/chauffeur_transit.jpg'],
      isVerified: true,
      isActive: true,
    },
  });

  // Link Amenities to Properties
  for (const amenityId of Object.values(createdAmenities)) {
    await prisma.propertyAmenity.create({
      data: {
        propertyId: propVanaAzure.id,
        amenityId,
      },
    });
  }

  // Room Types & Rates
  const roomHorizonVilla = await prisma.roomType.create({
    data: {
      propertyId: propVanaAzure.id,
      name: 'Horizon Oceanfront Private Villa (3,800 sq.ft)',
      description: 'Ultra-exclusive 3-bedroom clifftop villa with private 25m infinity pool, wine cellar, and outdoor sun pavilion.',
      baseCapacity: 4,
      maxCapacity: 6,
      bedConfiguration: '2 King Master Suites + 1 Twin Room',
      roomSizeSqFt: 3800,
      totalInventory: 12,
      images: ['/brand/ocean_villa.jpg', '/brand/cliff_villa.jpg'],
    },
  });

  const ratePlanVana = await prisma.ratePlan.create({
    data: {
      roomTypeId: roomHorizonVilla.id,
      name: 'Sovereign All-Inclusive Retreat (Chauffeur + Butler Included)',
      baseNightlyRate: 42000.0,
      isBreakfastIncluded: true,
      isFreeCancellation: true,
    },
  });

  const roomRoyalSuite = await prisma.roomType.create({
    data: {
      propertyId: propMaharaja.id,
      name: 'Presidential Royal Lake Sanctuary (4,200 sq.ft)',
      description: 'Royal Mewar suite featuring hand-painted gold leaf ceilings, private lake terrace, and personal sommelier.',
      baseCapacity: 2,
      maxCapacity: 4,
      bedConfiguration: '1 Grand Emperor Bed',
      roomSizeSqFt: 4200,
      totalInventory: 8,
      images: ['/brand/royal_palace.jpg'],
    },
  });

  const ratePlanMaharaja = await prisma.ratePlan.create({
    data: {
      roomTypeId: roomRoyalSuite.id,
      name: 'Imperial Heritage Package',
      baseNightlyRate: 65000.0,
      isBreakfastIncluded: true,
      isFreeCancellation: true,
    },
  });

  // ==========================================
  // 6. CREATE TRAVEL FLEET & CHAUFFEURS
  // ==========================================
  console.log('🚗 Creating Luxury Chauffeur Fleet & Telematics...');
  const vehicleMaybach = await prisma.vehicle.create({
    data: {
      travelPartnerId: travelPartnerProfile.id,
      vehicleClass: 'LUXURY_SEDAN',
      make: 'Mercedes-Benz',
      model: 'Maybach S680 (Obsidian Black)',
      year: 2025,
      licensePlate: 'GA-03-MB-0001',
      registrationNumber: 'REG-GA-MAYBACH-01',
      passengerCapacity: 3,
      luggageCapacity: 4,
      isInsured: true,
      isVerified: true,
    },
  });

  const driverGurpreet = await prisma.driver.create({
    data: {
      userId: driverUser.id,
      travelPartnerId: travelPartnerProfile.id,
      assignedVehicleId: vehicleMaybach.id,
      commercialLicenseNumber: 'DL-CHAUFFEUR-GA-9901',
      licenseExpiryDate: new Date('2030-12-31'),
      currentLatitude: 15.5100,
      currentLongitude: 73.7800,
      isAvailable: true,
      trustRating: 4.98,
      totalTripsCompleted: 342,
    },
  });

  // ==========================================
  // 7. CREATE LIVE VIP BOOKINGS & TRANSIT RADAR
  // ==========================================
  console.log('🎟️ Creating Active Stays & Escrow Transactions...');
  const stayMalhotra = await prisma.stayBooking.create({
    data: {
      bookingReference: 'BK-SS-2026-9041',
      guestId: guestVikram.id,
      propertyId: propVanaAzure.id,
      roomTypeId: roomHorizonVilla.id,
      ratePlanId: ratePlanVana.id,
      checkInDate: new Date('2026-09-07'),
      checkOutDate: new Date('2026-09-10'),
      totalNights: 3,
      guestCount: 2,
      status: 'CONFIRMED',
      baseAmount: 126000.0,
      taxAmount: 15660.0,
      platformFeeAmount: 4500.0,
      totalAmount: 146160.0,
      specialRequests: 'Chilled eucalyptus towels and Maybach airport pickup from Mopa T2.',
    },
  });

  const transitMalhotra = await prisma.transitBooking.create({
    data: {
      bookingReference: 'TR-SS-2026-8811',
      guestId: guestVikram.id,
      stayBookingId: stayMalhotra.id,
      serviceType: 'AIRPORT_TRANSFER',
      vehicleClass: 'LUXURY_SEDAN',
      pickupAddress: 'Mopa International Airport (GOX), Terminal 2 VIP Gate 1',
      pickupLatitude: 15.7483,
      pickupLongitude: 73.8654,
      dropAddress: 'The Vana Azure Ocean Estate, Sinquerim Cliffs, Goa',
      dropLatitude: 15.4926,
      dropLongitude: 73.7737,
      scheduledPickupTime: new Date('2026-09-07T14:30:00Z'),
      flightNumber: '6E-204 (DEL -> GOX)',
      status: 'DRIVER_EN_ROUTE',
      driverId: driverGurpreet.id,
      vehicleId: vehicleMaybach.id,
      baseFare: 7500.0,
      taxAmount: 1000.0,
      totalFare: 8500.0,
    },
  });

  // ==========================================
  // 8. CREATE COLLABORATIVE OPERATIONAL TICKETS
  // ==========================================
  console.log('🎫 Creating Cross-Functional Support Tickets...');
  const ticket1 = await prisma.ticket.create({
    data: {
      ticketNumber: 'SS-OPS-4091',
      category: 'GENERAL_INQUIRY',
      priority: 'P0_CRITICAL',
      status: 'IN_PROGRESS',
      subject: 'VIP Early Check-in & Helipad Request for Malhotra Family',
      description:
        'Malhotra VIP family is landing early at Mopa GOX on 6E-204. Coordinated with Travel Desk chauffeur Gurpreet (Maybach S680) and pre-armed AES-256 digital lock for Villa 101.',
      creatorUserId: propertyOwnerUser.id,
      assignedAgentId: rmUser.id,
      relatedStayBookingId: stayMalhotra.id,
      relatedTransitBookingId: transitMalhotra.id,
      initialResponseSlaMinutes: 15,
      resolutionTargetMinutes: 60,
      slaBreachDeadline: new Date(Date.now() + 45 * 60 * 1000),
      proposedResolution: 'Villa 101 Armed & Maybach Chauffeur on standby at VIP Gate 1',
    },
  });

  // Service Request
  await prisma.serviceRequest.create({
    data: {
      stayBookingId: stayMalhotra.id,
      propertyId: propVanaAzure.id,
      guestId: guestVikram.id,
      roomNumber: 'Villa 101',
      category: 'ROOM_DINING',
      title: 'Private Sommelier & Sunset Champagne Setup',
      details: 'Dom Pérignon 2013 on ice with fresh coastal oysters at poolside pavilion at 18:00 hrs.',
      quantity: 1,
      status: 'ACKNOWLEDGED',
      slaTargetMinutes: 10,
      assignedStaffId: frontdeskUser.id,
    },
  });

  // ==========================================
  // 9. ESCROW FINANCIAL TRANSACTIONS
  // ==========================================
  console.log('💳 Creating ₹14.82M Smart Escrow Vault Ledger...');
  const tx1 = await prisma.financialTransaction.create({
    data: {
      referenceType: 'STAY_BOOKING',
      referenceId: stayMalhotra.id,
      totalAmount: 146160.0,
      currency: 'INR',
      status: 'HELD', // Escrow Locked
      gatewayTransactionId: 'TXN-AMEX-CENTURION-9941',
    },
  });

  await prisma.ledgerEntry.createMany({
    data: [
      {
        transactionId: tx1.id,
        accountId: 'ESCROW-VAULT-CENTRAL',
        accountType: 'GATEWAY_ESCROW',
        entryType: 'CREDIT',
        amount: 146160.0,
        description: 'Smart Escrow Lock for Stay Booking BK-SS-2026-9041 (Vikram Malhotra)',
      },
      {
        transactionId: tx1.id,
        accountId: hotelPartnerProfile.id,
        accountType: 'HOTEL_LIABILITY',
        entryType: 'DEBIT',
        amount: 126000.0,
        description: 'Host Net Earnings allocation (Releases 2-hr post check-in)',
      },
      {
        transactionId: tx1.id,
        accountId: 'PLATFORM-REVENUE',
        accountType: 'PLATFORM_REVENUE_STAY',
        entryType: 'DEBIT',
        amount: 20160.0,
        description: 'StaySphere Commission (12%) + 12% Luxury GST Tax',
      },
    ],
  });

  console.log('✅ Database successfully seeded on Aiven Cloud with full enterprise dataset!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
