# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: components.spec.ts >> Component & Design System Consistency >> Filter select dropdown should allow unselecting a single filter
- Location: tests/components.spec.ts:36:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.custom-select-container').first().locator('.custom-select-trigger')

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Component & Design System Consistency', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.goto('/');
  6   |     await page.evaluate(() => localStorage.setItem('erp_auth', 'true'));
  7   |     await page.reload();
  8   |     await page.goto('/#dashboard');
  9   |   });
  10  | 
  11  |   test('Buttons should have standard design system classes', async ({ page }) => {
  12  |     // Grab all buttons on the page
  13  |     const buttons = page.locator('button');
  14  |     const count = await buttons.count();
  15  |     
  16  |     // We expect some standard buttons to exist
  17  |     expect(count).toBeGreaterThan(0);
  18  |     
  19  |     // Every button should have the base .btn class
  20  |     for (let i = 0; i < count; i++) {
  21  |       const classList = await buttons.nth(i).getAttribute('class') || '';
  22  |       expect(classList).toContain('btn');
  23  |     }
  24  |   });
  25  | 
  26  |   test('TopBar should have the correct height and styling', async ({ page }) => {
  27  |     const topbar = page.locator('.topbar');
  28  |     
  29  |     const height = await topbar.evaluate((el) => {
  30  |       return window.getComputedStyle(el).height;
  31  |     });
  32  |     
  33  |     expect(height).toBe('60px'); // As per --topbar-height
  34  |   });
  35  | 
  36  |   test('Filter select dropdown should allow unselecting a single filter', async ({ page }) => {
  37  |     // Navigate to booking list
  38  |     await page.goto('/#booking-list');
  39  |     
  40  |     // Find the Status filter dropdown (first Select trigger)
  41  |     const statusSelect = page.locator('.custom-select-container').first();
  42  |     const trigger = statusSelect.locator('.custom-select-trigger');
  43  |     
  44  |     // Click to open dropdown
> 45  |     await trigger.click();
      |                   ^ Error: locator.click: Test timeout of 30000ms exceeded.
  46  |     
  47  |     // Find and click the 'Confirmed' option
  48  |     const optionConfirmed = statusSelect.locator('.custom-select-option', { hasText: 'Confirmed' });
  49  |     await optionConfirmed.click();
  50  |     
  51  |     // Verify filter is applied: URL should contain 'status=confirmed'
  52  |     await expect(page).toHaveURL(/status=confirmed/);
  53  |     
  54  |     // Verify clear button is now visible inside the trigger
  55  |     const clearBtn = statusSelect.locator('.custom-select-clear');
  56  |     await expect(clearBtn).toBeVisible();
  57  |     
  58  |     // Click the clear button to reset the filter
  59  |     await clearBtn.click();
  60  |     
  61  |     // Verify URL does not contain 'status=confirmed' anymore
  62  |     await expect(page).not.toHaveURL(/status=confirmed/);
  63  |     
  64  |     // Verify dropdown trigger text resets back to 'Booking Status' (the placeholder)
  65  |     await expect(statusSelect.locator('.trigger-content')).toHaveText('Booking Status');
  66  |   });
  67  | 
  68  |   test('Advanced Filters panel should toggle visibility and update badge count', async ({ page }) => {
  69  |     // Navigate to package-list
  70  |     await page.goto('/#package-list');
  71  |     
  72  |     // Toggle button should be visible
  73  |     const toggleBtn = page.locator('.more-filters-btn');
  74  |     await expect(toggleBtn).toBeVisible();
  75  |     await expect(toggleBtn).toHaveText(/More Filters/);
  76  |     
  77  |     // Advanced panel should not be visible initially
  78  |     const advancedPanel = page.locator('.advanced-filters-panel');
  79  |     await expect(advancedPanel).not.toBeVisible();
  80  |     
  81  |     // Click toggle to show panel
  82  |     await toggleBtn.click();
  83  |     await expect(advancedPanel).toBeVisible();
  84  |     await expect(toggleBtn).toHaveText(/Hide Filters/);
  85  |     
  86  |     // Select an option from an advanced filter (first one inside the panel, which is Status in PackageList)
  87  |     const statusSelect = advancedPanel.locator('.custom-select-container').first();
  88  |     await statusSelect.locator('.custom-select-trigger').click();
  89  |     await statusSelect.locator('.custom-select-option', { hasText: 'Published' }).click();
  90  |     
  91  |     // Verify badge count is visible and shows '1'
  92  |     const badge = toggleBtn.locator('.secondary-active-badge');
  93  |     await expect(badge).toBeVisible();
  94  |     await expect(badge).toHaveText('1');
  95  |     
  96  |     // Click toggle to hide panel
  97  |     await toggleBtn.click();
  98  |     await expect(advancedPanel).not.toBeVisible();
  99  |     
  100 |     // Badge count should still be visible even when panel is hidden
  101 |     await expect(badge).toBeVisible();
  102 |     await expect(badge).toHaveText('1');
  103 |   });
  104 | });
  105 | 
```