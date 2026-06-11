import { test, expect } from '@playwright/test';

test.describe('Visual & Overflow Checks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('erp_auth', 'true'));
    await page.reload();
    await page.goto('/#ta-list');
    await page.waitForSelector('.main-content');
  });

  test('Page content should not overflow horizontally', async ({ page }) => {
    // Check if there is a horizontal scrollbar on the root element
    const isOverflowing = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(isOverflowing).toBe(false);
  });

  test('Main content area should be visible and properly padded', async ({ page }) => {
    const mainContent = page.locator('.main-content');
    
    const padding = await mainContent.evaluate((el) => {
      return window.getComputedStyle(el).padding;
    });
    
    // Check it's not 0px
    expect(padding).not.toBe('0px');
  });
});
