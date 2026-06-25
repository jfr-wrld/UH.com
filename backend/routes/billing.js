const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

// Get Finance Overview metrics
router.get('/overview', async (req, res) => {
  try {
    const paidInvoices = await prisma.invoice.aggregate({
      _sum: { amountPaid: true },
      where: { status: 'PAID' }
    });
    
    const overdueInvoices = await prisma.invoice.aggregate({
      _sum: { totalAmount: true },
      where: { status: 'OVERDUE' }
    });
    
    const pendingPaymentsCount = await prisma.paymentRecord.count({
      where: { status: 'PENDING' }
    });
    
    const totalCommissions = await prisma.platformCommission.aggregate({
      _sum: { commissionAmount: true },
      where: { status: 'EARNED' }
    });

    res.json({
      totalRevenue: paidInvoices._sum.amountPaid || 0,
      overdueAmount: overdueInvoices._sum.totalAmount || 0,
      pendingVerifications: pendingPaymentsCount,
      earnedCommission: totalCommissions._sum.commissionAmount || 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all Invoices
router.get('/invoices', async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        payments: true
      },
      orderBy: { issuedDate: 'desc' }
    });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all Payment Records
router.get('/payments', async (req, res) => {
  try {
    const payments = await prisma.paymentRecord.findMany({
      include: {
        invoice: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify a Payment
router.post('/payments/:id/verify', async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await prisma.paymentRecord.findUnique({ where: { id }, include: { invoice: true } });
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    if (payment.status === 'VERIFIED') return res.status(400).json({ error: 'Already verified' });

    // Transaction: Verify payment, update invoice amountPaid, calculate commission
    const result = await prisma.$transaction(async (tx) => {
      // 1. Mark payment as verified
      const updatedPayment = await tx.paymentRecord.update({
        where: { id },
        data: {
          status: 'VERIFIED',
          verifiedAt: new Date(),
          verifiedBy: 'system', // Hardcoded for demo
        }
      });

      // 2. Update Invoice
      const newAmountPaid = payment.invoice.amountPaid + payment.amount;
      const invoiceStatus = newAmountPaid >= payment.invoice.totalAmount ? 'PAID' : 'PARTIAL';
      await tx.invoice.update({
        where: { id: payment.invoiceId },
        data: {
          amountPaid: newAmountPaid,
          status: invoiceStatus
        }
      });

      // 3. Generate Platform Commission
      // Fetch default commission rate from settings
      const setting = await tx.platformSetting.findUnique({
        where: { settingKey: 'DEFAULT_PLATFORM_COMMISSION' }
      });
      const commissionRate = setting ? parseFloat(setting.settingValue) : 5.0;
      const commissionAmount = payment.amount * (commissionRate / 100);

      await tx.platformCommission.create({
        data: {
          paymentId: payment.id,
          baseAmount: payment.amount,
          commissionRate: commissionRate,
          commissionAmount: commissionAmount,
          status: 'EARNED'
        }
      });

      return updatedPayment;
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
