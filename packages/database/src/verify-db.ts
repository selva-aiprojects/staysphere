import { prisma } from './client.js';

async function verify() {
  console.log('🔍 Connecting to Aiven PostgreSQL and querying StaySphere tables...');
  
  const userCount = await prisma.user.count();
  const partnerCount = await prisma.partnerProfile.count();
  const propertyCount = await prisma.property.count();
  const roomTypeCount = await prisma.roomType.count();
  const ratePlanCount = await prisma.ratePlan.count();
  const amenityCount = await prisma.amenity.count();

  console.log('\n================================================================');
  console.log('✅ AIVEN POSTGRESQL "staysphere" DATABASE VERIFICATION SUCCESS');
  console.log('================================================================');
  console.log(`📡 Host: pg-jioclinic-aiservices-selva.f.aivencloud.com:19168`);
  console.log(`🗄️ Database: staysphere`);
  console.log(`🔒 SSL Mode: require`);
  console.log(`👥 Total Users: ${userCount}`);
  console.log(`🤝 Partner Profiles: ${partnerCount}`);
  console.log(`🏨 Properties: ${propertyCount}`);
  console.log(`🛏️ Room Types: ${roomTypeCount}`);
  console.log(`🏷️ Rate Plans: ${ratePlanCount}`);
  console.log(`✨ Amenities: ${amenityCount}`);

  const properties = await prisma.property.findMany({
    select: {
      name: true,
      city: true,
      category: true,
      starRating: true,
      trustScore: true,
      isVerified: true,
    },
  });
  console.log('\n🏨 Live Properties in Aiven:');
  console.table(properties);

  const users = await prisma.user.findMany({
    select: {
      fullName: true,
      email: true,
      role: true,
      isActive: true,
    },
  });
  console.log('\n👤 Live Seeded Users in Aiven:');
  console.table(users);

  await prisma.$disconnect();
}

verify().catch((err) => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
