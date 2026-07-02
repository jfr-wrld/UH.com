const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/services
// Returns Readiness Items (Services) grouped by TripMember
router.get('/', async (req, res) => {
  try {
    const tripMembers = await prisma.tripMembers.findMany({
      include: {
        pilgrim: true,
        groupTrip: true,
        ReadinessItems_TripMembers_tripMemberId: {
          where: { requirementType: 'service' },
          include: {
            serviceRequirement: {
              include: {
                serviceType: true
              }
            }
          }
        }
      }
    });

    const results = tripMembers.map(tm => {
      const items = tm.ReadinessItems_TripMembers_tripMemberId || [];
      
      const getServiceByCode = (code) => {
        return items.find(i => i.serviceRequirement && i.serviceRequirement.serviceType.code === code) || null;
      };

      const visaProc = getServiceByCode('VISA_PROC');
      const flight = getServiceByCode('FLIGHT');
      const room = getServiceByCode('ROOM');
      const transport = getServiceByCode('TRANSPORT');
      const kit = getServiceByCode('UMRAH_KIT');

      // Calculate readiness %
      const requiredServices = [visaProc, flight, room, transport, kit];
      const verifiedServices = requiredServices.filter(s => s && s.status === 'verified').length;
      const readiness = requiredServices.length > 0 ? Math.round((verifiedServices / requiredServices.length) * 100) : 0;

      const formatService = (item) => {
        if (!item) return { status: 'Not Started', note: '' };
        
        let status = 'Not Started';
        let note = item.safeSummary || '';

        if (item.status === 'verified') {
          status = 'Completed';
        } else if (item.status === 'processing') {
          status = 'In Progress';
          if (note.includes('Awaiting')) status = 'Pending Confirmation';
        } else if (item.status === 'blocked') {
          status = 'Blocked';
        } else if (item.status === 'missing') {
          status = 'Not Started';
        }

        return { status, note };
      };

      return {
        id: tm.id,
        name: tm.pilgrim.displayName || tm.pilgrim.fullName,
        bookingRef: tm.groupTrip.tripCode, // Simplification
        groupTrip: tm.groupTrip.title,
        services: {
          visaProcessing: formatService(visaProc),
          flightEticket: formatService(flight),
          roomAllocation: formatService(room),
          transport: formatService(transport),
          umrahKit: formatService(kit)
        },
        readiness
      };
    });

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

module.exports = router;
