const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', exception => {
    errors.push(`Uncaught exception: "${exception}"`);
  });

  await page.goto('http://localhost:5173/#articles');
  
  // Wait a bit to let React render and potentially crash
  await page.waitForTimeout(2000);
  
  console.log('--- ERRORS START ---');
  errors.forEach(e => console.log(e));
  console.log('--- ERRORS END ---');
  
  await browser.close();
})();
