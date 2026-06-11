# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> Global Layout & Navigation >> Package Management page should load without white screen
- Location: tests/layout.spec.ts:67:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=VIP Hajj Package')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=VIP Hajj Package')

```

```yaml
- complementary:
  - img "UmrahHaji"
  - navigation:
    - link "Dashboard":
      - /url: "#dashboard"
    - text: Network & Users
    - link "Travel Agency":
      - /url: "#travel-agency"
    - link "Jamaah List":
      - /url: "#jamaah-list"
    - link "Mutawwif List":
      - /url: "#mutawwif-list"
    - text: Operations
    - link "Itinerary":
      - /url: "#itinerary-list"
    - link "Package Management":
      - /url: "#package-list"
    - link "Booking":
      - /url: "#booking-list"
    - link "Group Trip":
      - /url: "#group-trip-list"
    - link "Flight":
      - /url: "#flight-list"
    - link "Hotel":
      - /url: "#hotel-list"
    - link "Season Management":
      - /url: "#season-list"
    - text: Finance
    - link "Finance Management":
      - /url: "#finance"
    - link "Billing & Payment":
      - /url: "#billing-list"
    - text: Content & Support
    - link "Articles":
      - /url: "#articles"
    - link "Announcement":
      - /url: "#announcement"
    - link "Testimonials":
      - /url: "#testimonial"
    - link "Reports":
      - /url: "#issue-reports"
    - text: System
    - link "User Management":
      - /url: "#user-management"
    - link "Settings":
      - /url: "#settings"
- banner:
  - button "Toggle menu"
  - textbox "Search booking ID, agency, jamaah..."
  - text: ⌘K
  - button "3"
  - button "AU Admin"
- main:
  - navigation: Home Packages
  - heading "Package Management" [level=1]
  - button "Export"
  - button "Create Package"
  - heading "Total Packages" [level=3]
  - text: "124"
  - heading "Published" [level=3]
  - text: "89"
  - heading "Draft / Pending" [level=3]
  - text: "15"
  - heading "Archived" [level=3]
  - text: "20"
  - textbox "Search packages by name, code, agency, hotel..."
  - text: Category Type
  - button "More Filters"
  - table:
    - rowgroup:
      - row "Select all rows Package Agency & Type Logistics Pricing & Comm Next Schedule Status & Date Action":
        - columnheader "Select all rows":
          - checkbox "Select all rows"
        - columnheader "Package"
        - columnheader "Agency & Type":
          - text: Agency & Type
          - img
        - columnheader "Logistics"
        - columnheader "Pricing & Comm"
        - columnheader "Next Schedule"
        - columnheader "Status & Date":
          - text: Status & Date
          - img
        - columnheader "Action"
    - rowgroup:
      - 'row "Select row VIP Gold Umrah 2026 (v9) PKG-UMR-26-009 Best Seller Global Travel Agency Hajj • VIP Olayan Ajyad Malaysia Airlines (MH) RM 16800 Comm: RM 1200 19 Dec 2026 Published 10 Jun 2026"':
        - cell "Select row":
          - checkbox "Select row"
        - cell "VIP Gold Umrah 2026 (v9) PKG-UMR-26-009 Best Seller"
        - cell "Global Travel Agency Hajj • VIP"
        - cell "Olayan Ajyad Malaysia Airlines (MH)"
        - 'cell "RM 16800 Comm: RM 1200"'
        - cell "19 Dec 2026"
        - cell "Published 10 Jun 2026"
        - cell:
          - button
      - 'row "Select row Standard Safar Package (v8) PKG-UMR-26-008 Zamzam Travels Umrah • Premium Swissotel Makkah Saudi Airlines (SV) RM 15600 Comm: RM 1100 18 Dec 2026 Draft 9 Jun 2026"':
        - cell "Select row":
          - checkbox "Select row"
        - cell "Standard Safar Package (v8) PKG-UMR-26-008"
        - cell "Zamzam Travels Umrah • Premium"
        - cell "Swissotel Makkah Saudi Airlines (SV)"
        - 'cell "RM 15600 Comm: RM 1100"'
        - cell "18 Dec 2026"
        - cell "Draft 9 Jun 2026"
        - cell:
          - button
      - 'row "Select row Standard Safar Package (v7) PKG-UMR-26-007 Global Travel Agency Umrah • Standard Olayan Ajyad Malaysia Airlines (MH) RM 14400 Comm: RM 1000 17 Dec 2026 Published 8 Jun 2026"':
        - cell "Select row":
          - checkbox "Select row"
        - cell "Standard Safar Package (v7) PKG-UMR-26-007"
        - cell "Global Travel Agency Umrah • Standard"
        - cell "Olayan Ajyad Malaysia Airlines (MH)"
        - 'cell "RM 14400 Comm: RM 1000"'
        - cell "17 Dec 2026"
        - cell "Published 8 Jun 2026"
        - cell:
          - button
      - 'row "Select row VIP Gold Umrah 2026 (v6) PKG-UMR-26-006 Best Seller Zamzam Travels Hajj • VIP Swissotel Makkah Saudi Airlines (SV) RM 13200 Comm: RM 900 16 Dec 2026 Published 7 Jun 2026"':
        - cell "Select row":
          - checkbox "Select row"
        - cell "VIP Gold Umrah 2026 (v6) PKG-UMR-26-006 Best Seller"
        - cell "Zamzam Travels Hajj • VIP"
        - cell "Swissotel Makkah Saudi Airlines (SV)"
        - 'cell "RM 13200 Comm: RM 900"'
        - cell "16 Dec 2026"
        - cell "Published 7 Jun 2026"
        - cell:
          - button
      - 'row "Select row Standard Safar Package (v5) PKG-UMR-26-005 Global Travel Agency Umrah • Standard Olayan Ajyad Malaysia Airlines (MH) RM 12000 Comm: RM 800 15 Dec 2026 Pending Approval 6 Jun 2026"':
        - cell "Select row":
          - checkbox "Select row"
        - cell "Standard Safar Package (v5) PKG-UMR-26-005"
        - cell "Global Travel Agency Umrah • Standard"
        - cell "Olayan Ajyad Malaysia Airlines (MH)"
        - 'cell "RM 12000 Comm: RM 800"'
        - cell "15 Dec 2026"
        - cell "Pending Approval 6 Jun 2026"
        - cell:
          - button
      - 'row "Select row Standard Safar Package (v4) PKG-UMR-26-004 Zamzam Travels Umrah • Premium Swissotel Makkah Saudi Airlines (SV) RM 10800 Comm: RM 700 14 Dec 2026 Draft 5 Jun 2026"':
        - cell "Select row":
          - checkbox "Select row"
        - cell "Standard Safar Package (v4) PKG-UMR-26-004"
        - cell "Zamzam Travels Umrah • Premium"
        - cell "Swissotel Makkah Saudi Airlines (SV)"
        - 'cell "RM 10800 Comm: RM 700"'
        - cell "14 Dec 2026"
        - cell "Draft 5 Jun 2026"
        - cell:
          - button
      - 'row "Select row VIP Gold Umrah 2026 (v3) PKG-UMR-26-003 Best Seller Global Travel Agency Hajj • VIP Olayan Ajyad Malaysia Airlines (MH) RM 9600 Comm: RM 600 13 Dec 2026 Published 4 Jun 2026"':
        - cell "Select row":
          - checkbox "Select row"
        - cell "VIP Gold Umrah 2026 (v3) PKG-UMR-26-003 Best Seller"
        - cell "Global Travel Agency Hajj • VIP"
        - cell "Olayan Ajyad Malaysia Airlines (MH)"
        - 'cell "RM 9600 Comm: RM 600"'
        - cell "13 Dec 2026"
        - cell "Published 4 Jun 2026"
        - cell:
          - button
      - 'row "Select row Standard Safar Package (v2) PKG-UMR-26-002 Zamzam Travels Umrah • Standard Swissotel Makkah Saudi Airlines (SV) RM 8400 Comm: RM 500 12 Dec 2026 Published 3 Jun 2026"':
        - cell "Select row":
          - checkbox "Select row"
        - cell "Standard Safar Package (v2) PKG-UMR-26-002"
        - cell "Zamzam Travels Umrah • Standard"
        - cell "Swissotel Makkah Saudi Airlines (SV)"
        - 'cell "RM 8400 Comm: RM 500"'
        - cell "12 Dec 2026"
        - cell "Published 3 Jun 2026"
        - cell:
          - button
      - 'row "Select row VIP Gold Umrah 2026 (v18) PKG-UMR-26-018 Best Seller Zamzam Travels Hajj • VIP Swissotel Makkah Saudi Airlines (SV) RM 27600 Comm: RM 2100 28 Dec 2026 Published 19 Jun 2026"':
        - cell "Select row":
          - checkbox "Select row"
        - cell "VIP Gold Umrah 2026 (v18) PKG-UMR-26-018 Best Seller"
        - cell "Zamzam Travels Hajj • VIP"
        - cell "Swissotel Makkah Saudi Airlines (SV)"
        - 'cell "RM 27600 Comm: RM 2100"'
        - cell "28 Dec 2026"
        - cell "Published 19 Jun 2026"
        - cell:
          - button
      - 'row "Select row Standard Safar Package (v17) PKG-UMR-26-017 Global Travel Agency Umrah • Standard Olayan Ajyad Malaysia Airlines (MH) RM 26400 Comm: RM 2000 27 Dec 2026 Published 18 Jun 2026"':
        - cell "Select row":
          - checkbox "Select row"
        - cell "Standard Safar Package (v17) PKG-UMR-26-017"
        - cell "Global Travel Agency Umrah • Standard"
        - cell "Olayan Ajyad Malaysia Airlines (MH)"
        - 'cell "RM 26400 Comm: RM 2000"'
        - cell "27 Dec 2026"
        - cell "Published 18 Jun 2026"
        - cell:
          - button
  - text: "Showing 1–10 of 18 Rows per page:"
  - combobox:
    - option "10" [selected]
    - option "25"
    - option "50"
    - option "100"
  - button "<" [disabled]
  - button "1"
  - button "2"
  - button ">"
  - text: © 2026 UmrahHaji.com ERP. All rights reserved.
  - link "Privacy Policy":
    - /url: "#"
  - link "Terms of Service":
    - /url: "#"
  - link "Help Center":
    - /url: "#"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Global Layout & Navigation', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/');
  6  |     await page.evaluate(() => localStorage.setItem('erp_auth', 'true'));
  7  |     await page.goto('/');
  8  |   });
  9  | 
  10 |   test('Sidebar should toggle between expanded and collapsed', async ({ page }) => {
  11 |     // Wait for the app to load
  12 |     await expect(page.locator('.app-shell')).toBeVisible();
  13 |     
  14 |     const sidebar = page.locator('.sidebar');
  15 |     const toggleBtn = page.locator('.menu-toggle-btn');
  16 |     
  17 |     // Check initial state (depends on viewport, usually expanded on desktop)
  18 |     await expect(sidebar).toBeVisible();
  19 |     
  20 |     // Toggle sidebar
  21 |     await toggleBtn.click();
  22 |     
  23 |     // Verify collapsed state class
  24 |     await expect(sidebar).toHaveClass(/sidebar-collapsed/);
  25 |     
  26 |     // Toggle again
  27 |     await toggleBtn.click();
  28 |     
  29 |     // Verify expanded state
  30 |     await expect(sidebar).not.toHaveClass(/sidebar-collapsed/);
  31 |   });
  32 | 
  33 |   test('TopBar Global Search should find and navigate to items', async ({ page }) => {
  34 |     const searchInput = page.locator('input.search-input').first();
  35 |     
  36 |     // Focus and type
  37 |     await searchInput.click();
  38 |     await searchInput.fill('Settings');
  39 |     
  40 |     // Dropdown should appear
  41 |     const searchResults = page.locator('.search-results');
  42 |     await expect(searchResults).toBeVisible();
  43 |     
  44 |     // Click the result
  45 |     const resultItem = searchResults.locator('button', { hasText: 'Settings' }).first();
  46 |     await resultItem.click();
  47 |     
  48 |     // Verify URL hash changed to #settings or #fin-settings
  49 |     await expect(page).toHaveURL(/settings/);
  50 |   });
  51 | 
  52 |   test('Collapsed sidebar parent menu click navigates to first child', async ({ page }) => {
  53 |     // Ensure sidebar is collapsed
  54 |     const toggleBtn = page.locator('.menu-toggle-btn');
  55 |     await toggleBtn.click(); // Collapse
  56 |     
  57 |     // Find a parent menu item, e.g. Travel Agency (which has children)
  58 |     // When collapsed, the text is hidden but it is placed in the title attribute.
  59 |     const taMenu = page.locator('.sidebar-item[title="Travel Agency"]');
  60 |     // Click it
  61 |     await taMenu.click();
  62 |     
  63 |     // The first child of Travel Agency is 'ta-applications', so it should navigate there
  64 |     await expect(page).toHaveURL(/#ta-applications/);
  65 |   });
  66 | 
  67 |   test('Package Management page should load without white screen', async ({ page }) => {
  68 |     await page.goto('/#package-list');
  69 |     
  70 |     // Expect the Page Header to display 'Package Management'
  71 |     await expect(page.locator('.text-page-title')).toHaveText('Package Management');
  72 |     
  73 |     // Expect the Table to be visible
  74 |     await expect(page.locator('.data-table')).toBeVisible();
> 75 |     await expect(page.locator('text=VIP Hajj Package')).toBeVisible();
     |                                                         ^ Error: expect(locator).toBeVisible() failed
  76 |   });
  77 | });
  78 | 
```