const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/ta-portal/TABookingDetails.tsx',
  'src/pages/ta-portal/finance/TAInvoiceDetails.tsx',
  'src/pages/ta-portal/support/TAReportDetails.tsx',
  'src/pages/ta-portal/TAPackageDetails.tsx',
  'src/pages/ta-portal/testimonial/TATestimonialDetails.tsx',
  'src/pages/ta-portal/trips/TAGroupTripDetails.tsx'
];

files.forEach(f => {
  const filePath = path.join('/Users/user/Documents/UH', f);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('import { PageHeader }') && content.includes('onBack={')) {
      content = content.replace(/<PageHeader/g, '<HeroHeader');
      content = content.replace(/<\/PageHeader>/g, '</HeroHeader>');
      // Add HeroHeader import
      content = content.replace(/import { PageHeader } from '[^']+';\n/, "import { PageHeader } from '../../../components/layout/PageHeader';\nimport { HeroHeader } from '../../../components/layout/HeroHeader';\n");
      fs.writeFileSync(filePath, content);
      console.log('Reverted', f);
    }
  }
});
