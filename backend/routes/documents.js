const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/documents
// Returns Pilgrim Documents grouped by TripMember/Pilgrim to match the frontend table shape
router.get('/', async (req, res) => {
  try {
    const tripMembers = await prisma.tripMembers.findMany({
      include: {
        pilgrim: {
          include: {
            PilgrimDocuments_PilgrimProfiles_pilgrimId: {
              include: {
                documentType: true
              }
            }
          }
        },
        groupTrip: true
      }
    });

    // Transform data to match TADocumentList structure
    const results = tripMembers.map(tm => {
      const documents = tm.pilgrim.PilgrimDocuments_PilgrimProfiles_pilgrimId || [];
      
      const getDocByCode = (code) => {
        return documents.find(d => d.documentType.code === code) || null;
      };

      const icDoc = getDocByCode('IC');
      const passportDoc = getDocByCode('PASSPORT');
      const visaDoc = getDocByCode('VISA');
      const photoDoc = getDocByCode('PHOTO');
      const vaccineDoc = getDocByCode('VACCINE');

      // Calculate simple readiness %
      const requiredDocs = [icDoc, passportDoc, visaDoc, photoDoc, vaccineDoc];
      const verifiedDocs = requiredDocs.filter(d => d && d.status === 'verified').length;
      const readiness = requiredDocs.length > 0 ? Math.round((verifiedDocs / requiredDocs.length) * 100) : 0;

      const formatDoc = (doc) => {
        if (!doc) return { status: 'Missing', action: 'Upload Required' };
        
        let status = 'Missing';
        let action = 'Upload Required';
        let expiry = doc.expiryDate ? doc.expiryDate.toISOString().split('T')[0] : undefined;

        if (doc.status === 'verified') {
          status = 'Verified';
          action = null;
        } else if (doc.status === 'processing') {
          status = 'Pending Review';
          action = 'Review';
        } else if (doc.status === 'missing') {
          // If it has expiry, it might be 'Expiring Soon' mock logic
          if (expiry) {
            status = 'Expiring Soon';
            action = 'Warning';
          }
        }

        return { status, action, expiry };
      };

      return {
        id: tm.id,
        name: tm.pilgrim.displayName || tm.pilgrim.fullName,
        bookingRef: tm.groupTrip.tripCode, // Simplification
        groupTrip: tm.groupTrip.title,
        documents: {
          ic: formatDoc(icDoc),
          passport: formatDoc(passportDoc),
          visa: formatDoc(visaDoc),
          photo: formatDoc(photoDoc),
          vaccination: formatDoc(vaccineDoc)
        },
        readiness
      };
    });

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

module.exports = router;
