const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/ta/finance/summary
router.get('/summary', async (req, res) => {
  try {
    const invoices = await prisma.invoices.findMany();
    
    let totalInvoiced = 0;
    let totalCollected = 0;
    let totalOutstanding = 0;
    let totalOverdue = 0;
    
    const now = new Date();
    
    invoices.forEach(inv => {
      totalInvoiced += inv.totalAmount;
      totalCollected += inv.paidAmount;
      totalOutstanding += inv.outstandingAmount;
      
      if (inv.dueDate && new Date(inv.dueDate) < now && inv.outstandingAmount > 0) {
        totalOverdue += inv.outstandingAmount;
      }
    });
    
    res.json({
      revenue: totalCollected,
      invoiced: totalInvoiced,
      collected: totalCollected,
      outstanding: totalOutstanding,
      overdue: totalOverdue
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/ta/finance/invoices
router.get('/invoices', async (req, res) => {
  try {
    const invoices = await prisma.invoices.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(invoices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/ta/finance/invoices/:id
router.get('/invoices/:id', async (req, res) => {
  try {
    const invoice = await prisma.invoices.findUnique({
      where: { id: req.params.id },
      include: {
        InvoiceItems_Invoices_invoiceId: true,
        Payments_Invoices_invoiceId: true,
        Refunds_Invoices_invoiceId: true
      }
    });
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/ta/finance/payments
router.get('/payments', async (req, res) => {
  try {
    const payments = await prisma.payments.findMany({
      include: {
        invoice: true
      },
      orderBy: { paidAt: 'desc' }
    });
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/ta/finance/refunds
router.get('/refunds', async (req, res) => {
  try {
    const refunds = await prisma.refunds.findMany({
      include: {
        invoice: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(refunds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
