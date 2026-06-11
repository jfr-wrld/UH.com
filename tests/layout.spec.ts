import { test, expect } from '@playwright/test';

test.describe('Global Layout & Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('erp_auth', 'true'));
    await page.goto('/');
  });

  test('Sidebar should toggle between expanded and collapsed', async ({ page }) => {
    // Wait for the app to load
    await expect(page.locator('.app-shell')).toBeVisible();
    
    const sidebar = page.locator('.sidebar');
    const toggleBtn = page.locator('.menu-toggle-btn');
    
    // Check initial state (depends on viewport, usually expanded on desktop)
    await expect(sidebar).toBeVisible();
    
    // Toggle sidebar
    await toggleBtn.click();
    
    // Verify collapsed state class
    await expect(sidebar).toHaveClass(/sidebar-collapsed/);
    
    // Toggle again
    await toggleBtn.click();
    
    // Verify expanded state
    await expect(sidebar).not.toHaveClass(/sidebar-collapsed/);
  });

  test('TopBar Global Search should find and navigate to items', async ({ page }) => {
    const searchInput = page.locator('input.search-input').first();
    
    // Focus and type
    await searchInput.click();
    await searchInput.fill('Settings');
    
    // Dropdown should appear
    const searchResults = page.locator('.search-results');
    await expect(searchResults).toBeVisible();
    
    // Click the result
    const resultItem = searchResults.locator('button', { hasText: 'Settings' }).first();
    await resultItem.click();
    
    // Verify URL hash changed to #settings or #fin-settings
    await expect(page).toHaveURL(/settings/);
  });

  test('Collapsed sidebar parent menu click navigates to first child', async ({ page }) => {
    // Ensure sidebar is collapsed
    const toggleBtn = page.locator('.menu-toggle-btn');
    await toggleBtn.click(); // Collapse
    
    // Find a parent menu item, e.g. Travel Agency (which has children)
    // When collapsed, the text is hidden but it is placed in the title attribute.
    const taMenu = page.locator('.sidebar-item[title="Travel Agency"]');
    // Click it
    await taMenu.click();
    
    // The first child of Travel Agency is 'ta-applications', so it should navigate there
    await expect(page).toHaveURL(/#ta-applications/);
  });

  test('Package Management page should load without white screen', async ({ page }) => {
    await page.goto('/#package-list');
    
    // Expect the Page Header to display 'Package Management'
    await expect(page.locator('.text-page-title')).toHaveText('Package Management');
    
    // Expect the Table to be visible
    await expect(page.locator('.data-table')).toBeVisible();
    await expect(page.locator('text=VIP Hajj Package')).toBeVisible();
  });
});
