import { test, expect } from '@playwright/test';

test.describe('Form & Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('erp_auth', 'true'));
    await page.reload();
    await page.goto('/#settings');
    await page.waitForSelector('.page-container');
  });

  test('Settings form container should have a max width constraint of 800px', async ({ page }) => {
    // Check if the form wrapper has max width constraint
    const formWrapper = page.locator('.page-container').locator('div', { hasText: 'Platform Information' }).locator('div[style*="max-width: 800px"]').first();
    
    // Evaluate computed style
    const maxWidth = await formWrapper.evaluate((el) => {
      return window.getComputedStyle(el).maxWidth;
    });
    
    expect(maxWidth).toBe('800px');
  });

  test('Page container should be fluid (100%)', async ({ page }) => {
    const pageContainer = page.locator('.page-container');
    
    const width = await pageContainer.evaluate((el) => {
      return window.getComputedStyle(el).width;
    });
    
    // Since viewport width is 1440, and the sidebar is 280, the content should be around 1160px
    // Not testing exact px because it varies, but checking that it is wide.
    expect(parseInt(width)).toBeGreaterThan(1000);
  });
});
