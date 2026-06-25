const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Feature Flags
  await prisma.featureFlag.upsert({
    where: { moduleName: 'REFERRAL_MODULE' },
    update: {},
    create: {
      moduleName: 'REFERRAL_MODULE',
      isEnabled: true,
      description: 'Enable or disable referral campaigns and dashboard globally',
    },
  });

  await prisma.featureFlag.upsert({
    where: { moduleName: 'E_WALLET' },
    update: {},
    create: {
      moduleName: 'E_WALLET',
      isEnabled: true,
      description: 'Allow Mutawwif to hold wallet balances',
    },
  });

  await prisma.featureFlag.upsert({
    where: { moduleName: 'AUTO_VISA' },
    update: {},
    create: {
      moduleName: 'AUTO_VISA',
      isEnabled: false,
      description: 'Direct API integration with Saudi MOFA',
    },
  });

  // Settings
  await prisma.platformSetting.upsert({
    where: { settingKey: 'DEFAULT_PLATFORM_COMMISSION' },
    update: {},
    create: {
      settingGroup: 'FINANCE',
      settingKey: 'DEFAULT_PLATFORM_COMMISSION',
      settingValue: '5.0',
      dataType: 'DECIMAL',
      description: 'Default platform commission percentage',
    },
  });

  // Billing Mock Data
  const existingInvoices = await prisma.invoice.count();
  if (existingInvoices === 0) {
    console.log('Seeding Invoices & Payments...');

    // 1. Paid Invoice
    const invoice1 = await prisma.invoice.create({
      data: {
        invoiceNumber: 'INV-2026-001',
        travelAgencyId: 'agency-123',
        subtotal: 10000,
        taxAmount: 500,
        discountAmount: 0,
        totalAmount: 10500,
        amountPaid: 10500,
        status: 'PAID',
        dueDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      }
    });

    await prisma.paymentRecord.create({
      data: {
        invoiceId: invoice1.id,
        paymentMethod: 'ONLINE_GATEWAY',
        amount: 10500,
        referenceNumber: 'PAY-12345',
        status: 'VERIFIED',
        verifiedBy: 'system',
        verifiedAt: new Date(),
        commissions: {
          create: {
            baseAmount: 10000,
            commissionRate: 5.0,
            commissionAmount: 500,
            status: 'EARNED'
          }
        }
      }
    });

    // 2. Overdue Invoice
    await prisma.invoice.create({
      data: {
        invoiceNumber: 'INV-2026-002',
        travelAgencyId: 'agency-456',
        subtotal: 25000,
        taxAmount: 1250,
        discountAmount: 0,
        totalAmount: 26250,
        amountPaid: 0,
        status: 'OVERDUE',
        dueDate: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days overdue
      }
    });

    // 3. Draft/Sent Invoice with Pending Payment
    const invoice3 = await prisma.invoice.create({
      data: {
        invoiceNumber: 'INV-2026-003',
        travelAgencyId: 'agency-789',
        subtotal: 15000,
        taxAmount: 750,
        discountAmount: 0,
        totalAmount: 15750,
        amountPaid: 0,
        status: 'SENT',
        dueDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000), // Due in 14 days
      }
    });

    await prisma.paymentRecord.create({
      data: {
        invoiceId: invoice3.id,
        paymentMethod: 'BANK_TRANSFER',
        amount: 15750,
        referenceNumber: 'REF-TRANSFER-999',
        status: 'PENDING',
      }
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
