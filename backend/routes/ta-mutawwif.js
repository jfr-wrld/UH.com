const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. Get eligible mutawwif list
router.get('/', async (req, res) => {
  try {
    const mutawwifs = await prisma.mutawwifProfiles.findMany({
      where: {
        verificationStatus: 'approved',
        availabilityStatus: 'available'
      },
      include: {
        MutawwifLanguages_MutawwifProfiles_mutawwifId: true,
        MutawwifSpecializations_MutawwifProfiles_mutawwifId: true,
        MutawwifAssignments_MutawwifProfiles_mutawwifId: {
          where: {
            assignmentStatus: { in: ['active', 'pending', 'confirmed'] }
          },
          include: {
            groupTrip: true
          }
        }
      }
    });

    const formatted = mutawwifs.map(m => {
      // Check for conflicts (if any current assignment overlaps with now/future)
      const hasConflict = m.MutawwifAssignments_MutawwifProfiles_mutawwifId.length > 0;
      
      return {
        id: m.id,
        name: m.displayName || m.fullName,
        title: m.title,
        jobType: m.jobType || 'freelance',
        country: 'Malaysia', // Derived from nationalityCode but simplified
        languages: m.MutawwifLanguages_MutawwifProfiles_mutawwifId.map(l => l.languageCode),
        specializations: m.MutawwifSpecializations_MutawwifProfiles_mutawwifId.map(s => s.specializationKey),
        rating: 4.8, // Mocked rating
        reviewCount: 24, // Mocked
        availability: hasConflict ? 'conflict' : 'available',
        currentAssignments: m.MutawwifAssignments_MutawwifProfiles_mutawwifId
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch mutawwifs' });
  }
});

// 2. Assign Mutawwif to Trip
router.post('/assign', async (req, res) => {
  try {
    const { mutawwifId, groupTripId, assignmentRole, startsAt, endsAt, notes } = req.body;
    
    // Validate required fields
    if (!mutawwifId || !groupTripId || !assignmentRole) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get agency (mocked to first for now)
    const agency = await prisma.travelAgencies.findFirst();

    // Check existing overlapping assignment (Conflict check)
    // For Phase 1, we just enforce block on exact same group trip
    const existing = await prisma.mutawwifAssignments.findFirst({
      where: {
        mutawwifId,
        groupTripId
      }
    });

    if (existing) {
      return res.status(400).json({ error: 'Mutawwif is already assigned to this trip.' });
    }

    // Get mutawwif details for snapshot
    const mutawwif = await prisma.mutawwifProfiles.findUnique({
      where: { id: mutawwifId }
    });

    const assignment = await prisma.mutawwifAssignments.create({
      data: {
        groupTripId,
        mutawwifId,
        agencyId: agency.id,
        assignmentRole,
        assignmentStatus: 'confirmed',
        startsAt: startsAt ? new Date(startsAt) : new Date(),
        endsAt: endsAt ? new Date(endsAt) : new Date(new Date().getTime() + 14*24*60*60*1000),
        assignmentSnapshot: JSON.stringify({
          fullName: mutawwif.fullName,
          jobType: mutawwif.jobType || 'freelance',
          phone: mutawwif.phone
        })
      }
    });

    res.json({ message: 'Assigned successfully', assignment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create assignment' });
  }
});

// 3. Remove/Cancel Assignment
router.delete('/assign/:assignmentId', async (req, res) => {
  try {
    const { assignmentId } = req.params;
    
    await prisma.mutawwifAssignments.delete({
      where: { id: assignmentId }
    });

    res.json({ message: 'Assignment removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove assignment' });
  }
});

module.exports = router;
