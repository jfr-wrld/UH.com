const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Documents and Services...');

  // 1. Create a Travel Agency
  const agency = await prisma.travelAgencies.create({
    data: {
      legalName: 'Al-Hijrah Travel Agency',
      publicDisplayName: 'Al-Hijrah Travel',
      registrationNumber: 'KPK/LN 1234',
    }
  });

  // 2. Create Group Trips
  const trip1 = await prisma.groupTrips.create({
    data: {
      title: 'Premium Umrah Safwa',
      agencyId: agency.id,
      tripCode: 'TRP-2026-001',
      startsOn: new Date('2026-10-15'),
      endsOn: new Date('2026-10-25'),
    }
  });
  
  const trip2 = await prisma.groupTrips.create({
    data: {
      title: 'Economy Umrah Syawal',
      agencyId: agency.id,
      tripCode: 'TRP-2026-002',
      startsOn: new Date('2026-11-01'),
      endsOn: new Date('2026-11-12'),
    }
  });

  // 3. Create Pilgrims
  const pilgrim1 = await prisma.pilgrimProfiles.create({
    data: {
      fullName: 'Ahmad bin Abdullah',
      displayName: 'Ahmad Zaki',
    }
  });

  const pilgrim2 = await prisma.pilgrimProfiles.create({
    data: {
      fullName: 'Fatimah binti Ali',
      displayName: 'Fatimah Ali',
    }
  });

  const pilgrim3 = await prisma.pilgrimProfiles.create({
    data: {
      fullName: 'Siti Aminah',
      displayName: 'Siti Aminah',
    }
  });

  // 4. Create Document Types
  const icType = await prisma.documentTypes.create({
    data: { code: 'IC', label: 'Identity Card', isSensitive: true }
  });
  const passportType = await prisma.documentTypes.create({
    data: { code: 'PASSPORT', label: 'Passport', isSensitive: true }
  });
  const visaType = await prisma.documentTypes.create({
    data: { code: 'VISA', label: 'Umrah Visa', isSensitive: false }
  });
  const photoType = await prisma.documentTypes.create({
    data: { code: 'PHOTO', label: 'Profile Photo', isSensitive: false }
  });
  const vaxType = await prisma.documentTypes.create({
    data: { code: 'VACCINE', label: 'Vaccination Certificate', isSensitive: true }
  });

  // 5. Create Service Types
  const visaService = await prisma.serviceTypes.create({
    data: { code: 'VISA_PROC', label: 'Visa Processing' }
  });
  const flightService = await prisma.serviceTypes.create({
    data: { code: 'FLIGHT', label: 'Flight Eticket' }
  });
  const roomService = await prisma.serviceTypes.create({
    data: { code: 'ROOM', label: 'Room Allocation' }
  });
  const transportService = await prisma.serviceTypes.create({
    data: { code: 'TRANSPORT', label: 'Transport & Bus' }
  });
  const kitService = await prisma.serviceTypes.create({
    data: { code: 'UMRAH_KIT', label: 'Umrah Kit' }
  });

  // 6. Create Documents for Pilgrim 1 (Ahmad)
  await prisma.pilgrimDocuments.create({
    data: { pilgrimId: pilgrim1.id, documentTypeId: icType.id, status: 'verified', agencyId: agency.id }
  });
  await prisma.pilgrimDocuments.create({
    data: { pilgrimId: pilgrim1.id, documentTypeId: passportType.id, status: 'missing', expiryDate: new Date('2026-09-15'), agencyId: agency.id }
  });
  await prisma.pilgrimDocuments.create({
    data: { pilgrimId: pilgrim1.id, documentTypeId: visaType.id, status: 'missing', agencyId: agency.id }
  });
  await prisma.pilgrimDocuments.create({
    data: { pilgrimId: pilgrim1.id, documentTypeId: photoType.id, status: 'verified', agencyId: agency.id }
  });
  await prisma.pilgrimDocuments.create({
    data: { pilgrimId: pilgrim1.id, documentTypeId: vaxType.id, status: 'processing', agencyId: agency.id }
  });

  // 7. Create Documents for Pilgrim 2 (Fatimah)
  await prisma.pilgrimDocuments.create({
    data: { pilgrimId: pilgrim2.id, documentTypeId: icType.id, status: 'verified', agencyId: agency.id }
  });
  await prisma.pilgrimDocuments.create({
    data: { pilgrimId: pilgrim2.id, documentTypeId: passportType.id, status: 'verified', expiryDate: new Date('2028-05-10'), agencyId: agency.id }
  });
  await prisma.pilgrimDocuments.create({
    data: { pilgrimId: pilgrim2.id, documentTypeId: visaType.id, status: 'missing', agencyId: agency.id }
  });
  await prisma.pilgrimDocuments.create({
    data: { pilgrimId: pilgrim2.id, documentTypeId: photoType.id, status: 'verified', agencyId: agency.id }
  });
  await prisma.pilgrimDocuments.create({
    data: { pilgrimId: pilgrim2.id, documentTypeId: vaxType.id, status: 'verified', agencyId: agency.id }
  });

  // 8. Create Documents for Pilgrim 3 (Siti)
  await prisma.pilgrimDocuments.create({
    data: { pilgrimId: pilgrim3.id, documentTypeId: icType.id, status: 'missing', agencyId: agency.id }
  });
  await prisma.pilgrimDocuments.create({
    data: { pilgrimId: pilgrim3.id, documentTypeId: passportType.id, status: 'missing', agencyId: agency.id }
  });
  await prisma.pilgrimDocuments.create({
    data: { pilgrimId: pilgrim3.id, documentTypeId: visaType.id, status: 'missing', agencyId: agency.id }
  });

  // 9. Attach Pilgrims to Trips via TripMembers
  const tm1 = await prisma.tripMembers.create({
    data: { groupTripId: trip1.id, pilgrimId: pilgrim1.id, memberStatus: 'active' }
  });
  const tm2 = await prisma.tripMembers.create({
    data: { groupTripId: trip1.id, pilgrimId: pilgrim2.id, memberStatus: 'active' }
  });
  const tm3 = await prisma.tripMembers.create({
    data: { groupTripId: trip2.id, pilgrimId: pilgrim3.id, memberStatus: 'active' }
  });

  // Document & Service Requirements must exist before ReadinessItems
  const reqVisa = await prisma.serviceRequirements.create({ data: { agencyId: agency.id, serviceTypeId: visaService.id, requiredFor: 'all', isRequired: true } });
  const reqFlight = await prisma.serviceRequirements.create({ data: { agencyId: agency.id, serviceTypeId: flightService.id, requiredFor: 'all', isRequired: true } });
  const reqRoom = await prisma.serviceRequirements.create({ data: { agencyId: agency.id, serviceTypeId: roomService.id, requiredFor: 'all', isRequired: true } });
  const reqTransport = await prisma.serviceRequirements.create({ data: { agencyId: agency.id, serviceTypeId: transportService.id, requiredFor: 'all', isRequired: true } });
  const reqKit = await prisma.serviceRequirements.create({ data: { agencyId: agency.id, serviceTypeId: kitService.id, requiredFor: 'all', isRequired: true } });

  // 10. Readiness Items for Services (Ahmad)
  await prisma.readinessItems.create({ data: { tripMemberId: tm1.id, groupTripId: trip1.id, requirementType: 'service', serviceRequirementId: reqVisa.id, status: 'blocked', safeSummary: 'Missing Passport', blocksReadiness: true } });
  await prisma.readinessItems.create({ data: { tripMemberId: tm1.id, groupTripId: trip1.id, requirementType: 'service', serviceRequirementId: reqFlight.id, status: 'processing', safeSummary: 'Awaiting Saudi Airlines', blocksReadiness: true } });
  await prisma.readinessItems.create({ data: { tripMemberId: tm1.id, groupTripId: trip1.id, requirementType: 'service', serviceRequirementId: reqRoom.id, status: 'verified', safeSummary: 'Room 402 (Quad)', blocksReadiness: true } });
  await prisma.readinessItems.create({ data: { tripMemberId: tm1.id, groupTripId: trip1.id, requirementType: 'service', serviceRequirementId: reqTransport.id, status: 'processing', safeSummary: 'Bus assignment pending', blocksReadiness: true } });
  await prisma.readinessItems.create({ data: { tripMemberId: tm1.id, groupTripId: trip1.id, requirementType: 'service', serviceRequirementId: reqKit.id, status: 'verified', safeSummary: 'Collected 10 Nov', blocksReadiness: false } });

  // Readiness Items for Services (Fatimah)
  await prisma.readinessItems.create({ data: { tripMemberId: tm2.id, groupTripId: trip1.id, requirementType: 'service', serviceRequirementId: reqVisa.id, status: 'blocked', safeSummary: 'Missing Passport', blocksReadiness: true } });
  await prisma.readinessItems.create({ data: { tripMemberId: tm2.id, groupTripId: trip1.id, requirementType: 'service', serviceRequirementId: reqFlight.id, status: 'processing', safeSummary: 'Awaiting Saudi Airlines', blocksReadiness: true } });
  await prisma.readinessItems.create({ data: { tripMemberId: tm2.id, groupTripId: trip1.id, requirementType: 'service', serviceRequirementId: reqRoom.id, status: 'verified', safeSummary: 'Room 402 (Quad)', blocksReadiness: true } });
  await prisma.readinessItems.create({ data: { tripMemberId: tm2.id, groupTripId: trip1.id, requirementType: 'service', serviceRequirementId: reqTransport.id, status: 'processing', safeSummary: 'Bus assignment pending', blocksReadiness: true } });
  await prisma.readinessItems.create({ data: { tripMemberId: tm2.id, groupTripId: trip1.id, requirementType: 'service', serviceRequirementId: reqKit.id, status: 'verified', safeSummary: 'Collected 10 Nov', blocksReadiness: false } });

  // Readiness Items for Services (Siti)
  await prisma.readinessItems.create({ data: { tripMemberId: tm3.id, groupTripId: trip2.id, requirementType: 'service', serviceRequirementId: reqVisa.id, status: 'missing', blocksReadiness: true } });
  await prisma.readinessItems.create({ data: { tripMemberId: tm3.id, groupTripId: trip2.id, requirementType: 'service', serviceRequirementId: reqFlight.id, status: 'missing', blocksReadiness: true } });
  await prisma.readinessItems.create({ data: { tripMemberId: tm3.id, groupTripId: trip2.id, requirementType: 'service', serviceRequirementId: reqRoom.id, status: 'missing', blocksReadiness: true } });

  console.log('Seeding Documents and Services Complete!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
