const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

// Get all feature flags
router.get('/features', async (req, res) => {
  try {
    const flags = await prisma.featureFlag.findMany();
    // Convert to a dictionary for easier frontend access
    const flagDict = {};
    flags.forEach(f => {
      flagDict[f.moduleName] = f.isEnabled;
    });
    res.json(flagDict);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle a feature flag
router.post('/features/:moduleName/toggle', async (req, res) => {
  try {
    const { moduleName } = req.params;
    const flag = await prisma.featureFlag.findUnique({ where: { moduleName } });
    if (!flag) return res.status(404).json({ error: 'Flag not found' });

    const updated = await prisma.featureFlag.update({
      where: { moduleName },
      data: { isEnabled: !flag.isEnabled }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
