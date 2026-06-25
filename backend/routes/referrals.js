const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

// Get dashboard metrics
router.get('/dashboard', async (req, res) => {
  try {
    // Return dummy data combined with db counts
    const totalCampaigns = await prisma.referralCampaign.count();
    
    res.json({
      totalReferrals: 1250,
      bookingsAttributed: 342,
      pendingReviews: 12,
      totalCampaigns,
      amountPaid: 45000,
      amountReversed: 1200
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get pending attributions
router.get('/attributions/pending', async (req, res) => {
  try {
    const attributions = await prisma.referralAttribution.findMany({
      where: { conversionStatus: 'REGISTERED' },
      include: {
        code: true
      }
    });
    res.json(attributions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
