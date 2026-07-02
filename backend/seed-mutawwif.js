const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Mutawwif data...');

  // 1. Ensure we have an agency
  const agency = await prisma.travelAgencies.findFirst({
    where: { status: 'active' }
  });

  if (!agency) {
    console.error('No active travel agency found. Please run seed-docs.js first to create base data.');
    return;
  }

  // 2. Ensure we have group trips
  const groupTrips = await prisma.groupTrips.findMany({
    take: 3
  });

  if (groupTrips.length === 0) {
    console.error('No group trips found. Please run seed-docs.js first.');
    return;
  }

  // 3. Create AppUsers for Mutawwifs
  const mutawwifUsersData = [
    { name: 'Ustaz Ahmad Tarmizi', email: 'ahmad.tarmizi@example.com', phone: '+60112345678' },
    { name: 'Ustaz Zainuddin', email: 'zainuddin@example.com', phone: '+60123456789' },
    { name: 'Ustazah Siti Hajar', email: 'siti.hajar@example.com', phone: '+60134567890' },
    { name: 'Ustaz Faiz', email: 'faiz@example.com', phone: '+60145678901' },
    { name: 'Ustaz Amirul', email: 'amirul@example.com', phone: '+60156789012' } // This one will have a conflict
  ];

  const mutawwifProfiles = [];

  for (let i = 0; i < mutawwifUsersData.length; i++) {
    const data = mutawwifUsersData[i];
    
    // Check if user exists
    let user = await prisma.appUsers.findFirst({
      where: { email: data.email }
    });

    if (!user) {
      user = await prisma.appUsers.create({
        data: {
          displayName: data.name,
          email: data.email,
          phone: data.phone,
          accountStatus: 'active'
        }
      });
    }

    // Check if MutawwifProfile exists
    let profile = await prisma.mutawwifProfiles.findFirst({
      where: { userId: user.id }
    });

    if (!profile) {
      profile = await prisma.mutawwifProfiles.create({
        data: {
          userId: user.id,
          fullName: data.name,
          displayName: data.name.replace('Ustaz ', '').replace('Ustazah ', ''),
          title: data.name.includes('Ustazah') ? 'Ustazah' : 'Ustaz',
          phone: data.phone,
          email: data.email,
          nationalityCode: 'MY',
          verificationStatus: 'approved',
          profileCompletionStatus: 'complete',
          assignmentReadinessStatus: 'ready',
          availabilityStatus: 'available',
          publicVisibilityStatus: 'public'
        }
      });

      // Add Specializations
      const specs = i % 2 === 0 ? ['umrah', 'ziyarah'] : ['umrah', 'hajj'];
      for (const spec of specs) {
        await prisma.mutawwifSpecializations.create({
          data: {
            mutawwifId: profile.id,
            specializationKey: spec
          }
        });
      }

      // Add Languages
      await prisma.mutawwifLanguages.create({
        data: {
          mutawwifId: profile.id,
          languageCode: 'ms',
          proficiency: 'native'
        }
      });
      if (i % 2 === 0) {
        await prisma.mutawwifLanguages.create({
          data: {
            mutawwifId: profile.id,
            languageCode: 'ar',
            proficiency: 'fluent'
          }
        });
      }
    }
    mutawwifProfiles.push(profile);
  }

  // 4. Create dummy assignments for past history
  // Let's assign Ustaz Ahmad Tarmizi to the first trip
  const existingAssignment1 = await prisma.mutawwifAssignments.findFirst({
    where: {
      groupTripId: groupTrips[0].id,
      mutawwifId: mutawwifProfiles[0].id
    }
  });

  if (!existingAssignment1) {
    await prisma.mutawwifAssignments.create({
      data: {
        groupTripId: groupTrips[0].id,
        mutawwifId: mutawwifProfiles[0].id,
        agencyId: agency.id,
        assignmentRole: 'lead_mutawwif',
        assignmentStatus: 'active',
        startsAt: new Date(),
        endsAt: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000), // +14 days
        assignmentSnapshot: JSON.stringify({
          fullName: mutawwifProfiles[0].fullName,
          jobType: 'freelance',
          phone: mutawwifProfiles[0].phone
        })
      }
    });
  }

  // Assign Ustaz Amirul (index 4) to the second trip, so he has a conflict if assigned again on same dates
  const existingAssignment2 = await prisma.mutawwifAssignments.findFirst({
    where: {
      groupTripId: groupTrips[1].id,
      mutawwifId: mutawwifProfiles[4].id
    }
  });

  if (!existingAssignment2) {
    await prisma.mutawwifAssignments.create({
      data: {
        groupTripId: groupTrips[1].id,
        mutawwifId: mutawwifProfiles[4].id,
        agencyId: agency.id,
        assignmentRole: 'assistant_mutawwif',
        assignmentStatus: 'active',
        startsAt: new Date(),
        endsAt: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000), // +14 days
        assignmentSnapshot: JSON.stringify({
          fullName: mutawwifProfiles[4].fullName,
          jobType: 'full-time',
          phone: mutawwifProfiles[4].phone
        })
      }
    });
  }

  console.log('Mutawwif data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
