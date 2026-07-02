const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');
const uuidv4 = () => crypto.randomUUID();

async function main() {
  console.log('Seeding TA Finance data...');

  // 1. Get or create an agency
  let agency = await prisma.travelAgencies.findFirst();
  if (!agency) {
    agency = await prisma.travelAgencies.create({
      data: {
        id: uuidv4(),
        agencyName: 'Al-Hijrah Travel',
        licenseNumber: 'KPK/LN 1234',
        status: 'verified',
        subscriptionStatus: 'active'
      }
    });
  }

  // Clear existing finance data for clean seed
  await prisma.payments.deleteMany({});
  await prisma.refunds.deleteMany({});
  await prisma.invoiceItems.deleteMany({});
  await prisma.invoices.deleteMany({});

  // Seed Invoices
  const invoicesData = [
    {
      id: uuidv4(),
      agencyId: agency.id,
      invoiceNumber: 'INV-2026-001',
      invoiceType: 'booking_invoice',
      dueDate: new Date('2026-06-15'),
      totalAmount: 8500.00,
      paidAmount: 8500.00,
      outstandingAmount: 0.00,
      status: 'paid'
    },
    {
      id: uuidv4(),
      agencyId: agency.id,
      invoiceNumber: 'INV-2026-002',
      invoiceType: 'booking_invoice',
      dueDate: new Date('2026-06-20'),
      totalAmount: 12000.00,
      paidAmount: 6000.00,
      outstandingAmount: 6000.00,
      status: 'partial'
    },
    {
      id: uuidv4(),
      agencyId: agency.id,
      invoiceNumber: 'INV-2026-003',
      invoiceType: 'booking_invoice',
      dueDate: new Date('2026-06-25'),
      totalAmount: 9000.00,
      paidAmount: 0,
      outstandingAmount: 9000.00,
      status: 'sent'
    },
    {
      id: uuidv4(),
      agencyId: agency.id,
      invoiceNumber: 'INV-2026-004',
      invoiceType: 'manual_invoice',
      dueDate: new Date('2026-06-05'),
      totalAmount: 2500.00,
      paidAmount: 0,
      outstandingAmount: 2500.00,
      status: 'overdue'
    }
  ];

  for (const inv of invoicesData) {
    await prisma.invoices.create({ data: inv });
    
    // Create an item for each
    await prisma.invoiceItems.create({
      data: {
        id: uuidv4(),
        invoiceId: inv.id,
        description: 'Package Booking',
        quantity: 1,
        unitAmount: inv.totalAmount,
        totalAmount: inv.totalAmount
      }
    });
  }

  // Seed Payments
  await prisma.payments.create({
    data: {
      id: uuidv4(),
      invoiceId: invoicesData[0].id,
      agencyId: agency.id,
      amount: 8500.00,
      paymentMethod: 'bank_transfer',
      paymentReference: 'TRX-998877',
      status: 'verified',
      paidAt: new Date('2026-06-02')
    }
  });

  await prisma.payments.create({
    data: {
      id: uuidv4(),
      invoiceId: invoicesData[1].id,
      agencyId: agency.id,
      amount: 6000.00,
      paymentMethod: 'fpx',
      paymentReference: 'FPX-112233',
      status: 'verified',
      paidAt: new Date('2026-06-06')
    }
  });

  // Seed Refunds
  await prisma.refunds.create({
    data: {
      id: uuidv4(),
      invoiceId: invoicesData[0].id,
      agencyId: agency.id,
      amount: 500.00,
      reason: 'Overpayment adjustment',
      status: 'completed',
      createdAt: new Date('2026-06-15')
    }
  });

  console.log('TA Finance data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
