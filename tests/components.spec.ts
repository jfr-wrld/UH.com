import { test, expect } from '@playwright/test';

test.describe('Component & Design System Consistency', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('erp_auth', 'true'));
    await page.reload();
    await page.goto('/#dashboard');
  });

  test('Buttons should have standard design system classes', async ({ page }) => {
    // Grab all buttons on the page
    const buttons = page.locator('button');
    const count = await buttons.count();
    
    // We expect some standard buttons to exist
    expect(count).toBeGreaterThan(0);
    
    // Every button should have the base .btn class
    for (let i = 0; i < count; i++) {
      const classList = await buttons.nth(i).getAttribute('class') || '';
      expect(classList).toContain('btn');
    }
  });

  test('TopBar should have the correct height and styling', async ({ page }) => {
    const topbar = page.locator('.topbar');
    
    const height = await topbar.evaluate((el) => {
      return window.getComputedStyle(el).height;
    });
    
    expect(height).toBe('60px'); // As per --topbar-height
  });

  test('Filter select dropdown should allow unselecting a single filter', async ({ page }) => {
    // Navigate to booking list
    await page.goto('/#booking-list');
    
    // Find the Status filter dropdown (first Select trigger)
    const statusSelect = page.locator('.custom-select-container').first();
    const trigger = statusSelect.locator('.custom-select-trigger');
    
    // Click to open dropdown
    await trigger.click();
    
    // Find and click the 'Confirmed' option
    const optionConfirmed = statusSelect.locator('.custom-select-option', { hasText: 'Confirmed' });
    await optionConfirmed.click();
    
    // Verify filter is applied: URL should contain 'status=confirmed'
    await expect(page).toHaveURL(/status=confirmed/);
    
    // Verify clear button is now visible inside the trigger
    const clearBtn = statusSelect.locator('.custom-select-clear');
    await expect(clearBtn).toBeVisible();
    
    // Click the clear button to reset the filter
    await clearBtn.click();
    
    // Verify URL does not contain 'status=confirmed' anymore
    await expect(page).not.toHaveURL(/status=confirmed/);
    
    // Verify dropdown trigger text resets back to 'Booking Status' (the placeholder)
    await expect(statusSelect.locator('.trigger-content')).toHaveText('Booking Status');
  });

  test('Advanced Filters panel should toggle visibility and update badge count', async ({ page }) => {
    // Navigate to package-list
    await page.goto('/#package-list');
    
    // Toggle button should be visible
    const toggleBtn = page.locator('.more-filters-btn');
    await expect(toggleBtn).toBeVisible();
    await expect(toggleBtn).toHaveText(/More Filters/);
    
    // Advanced panel should not be visible initially
    const advancedPanel = page.locator('.advanced-filters-panel');
    await expect(advancedPanel).not.toBeVisible();
    
    // Click toggle to show panel
    await toggleBtn.click();
    await expect(advancedPanel).toBeVisible();
    await expect(toggleBtn).toHaveText(/Hide Filters/);
    
    // Select an option from an advanced filter (first one inside the panel, which is Status in PackageList)
    const statusSelect = advancedPanel.locator('.custom-select-container').first();
    await statusSelect.locator('.custom-select-trigger').click();
    await statusSelect.locator('.custom-select-option', { hasText: 'Published' }).click();
    
    // Verify badge count is visible and shows '1'
    const badge = toggleBtn.locator('.secondary-active-badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('1');
    
    // Click toggle to hide panel
    await toggleBtn.click();
    await expect(advancedPanel).not.toBeVisible();
    
    // Badge count should still be visible even when panel is hidden
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('1');
  });
});
