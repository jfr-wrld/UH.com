# UmrahHaji.com Admin Panel Design Guidelines

Version: v1.0
Platform: Responsive Web Platform
Scope: Admin Panel / Back Office
Status: Draft
Prepared by: Product / UI/UX Team
Last updated: 10 June 2026

---

## 1. Purpose

This document defines the design direction, layout rules, component behavior, and interaction standards for the UmrahHaji.com Admin Panel.

The Admin Panel is an internal back-office system for Super Admin, Admin, Finance, Operations, Compliance, Support, and Auditor roles. The interface should prioritize clarity, speed, auditability, and safe handling of sensitive operational data.

This document should be read together with the Master PRD and Module PRDs. PRD documents define what the product does. This design document defines how the admin experience should feel and behave.

---

## 2. PRD Reference Table

| PRD | Status | File |
|---|---|---|
| Master PRD - Admin Panel | Updated | `outputs/UmrahHaji_Master_PRD_Admin_Panel.md` |
| Admin Dashboard | New | `outputs/Module_PRD_Admin_Dashboard.md` |
| Travel Agency Management | Updated | `outputs/Module_PRD_Travel_Agency_Management.md` |
| Jamaah Management | Updated | `outputs/Module_PRD_Jamaah_Management.md` |
| User Management / Roles & Permissions | Updated | `outputs/Module_PRD_User_Management.md` |
| Mutawwif Management | Updated | `outputs/Module_PRD_Mutawwif_Management.md` |
| Itinerary Management | New | `outputs/Module_PRD_Itinerary_Management.md` |
| Hotel Management | New | `outputs/Module_PRD_Hotel_Management.md` |
| Flight / Airline Management | New | `outputs/Module_PRD_Flight_Management.md` |
| Group Trip Management | New | `outputs/Module_PRD_Group_Trip_Management.md` |
| Package Management | New | `outputs/Module_PRD_Package_Management.md` |
| Booking Management | New | `outputs/Module_PRD_Booking_Management.md` |
| Billing & Payment Management | New | `outputs/Module_PRD_Billing_Management.md` |
| Finance Management | New | `outputs/Module_PRD_Finance_Management.md` |
| Allowance Management | New | `outputs/Module_PRD_Allowance_Management.md` |
| Season Management | New | `outputs/Module_PRD_Season_Management.md` |
| Testimonial Management | New | `outputs/Module_PRD_Testimonial_Management.md` |
| Report Management | New | `outputs/Module_PRD_Report_Management.md` |
| Articles Management | New | `outputs/Module_PRD_Articles_Management.md` |

---

## 3. Design System Principle

Admin Panel and Travel Agency Portal use the same design system for visual consistency and development efficiency.

However, the Admin Panel must have its own:

1. Navigation structure.
2. Permission model.
3. Data scope.
4. Operational workflows.
5. Sensitive-data visibility rules.
6. Audit and compliance behavior.

The visual language should feel consistent across portals, but the Admin Panel should be denser, more operational, and more control-oriented than the Travel Agency Portal.

---

## 4. Design Goals

1. Make high-risk operational work easy to review before committing.
2. Let admins scan large datasets quickly without losing context.
3. Keep critical actions visible but protected by confirmation and permission rules.
4. Reduce duplicate screens by using consistent list, detail, form, and status patterns.
5. Make sensitive data handling obvious through masking, role-based visibility, and audit trails.
6. Support desktop-first productivity while remaining usable on tablet and mobile web.
7. Deliver a modern, polished, premium interface that does not feel like a basic CRUD admin template.
8. Use refined interaction details, smooth feedback, and strong hierarchy to make dense operational screens feel calm and high quality.

---

## 5. Admin Panel Experience Principles

### 5.1 Operational First

The first screen of each module should help Admin users do real work immediately. Avoid marketing-style headers, oversized hero sections, or decorative panels.

### 5.2 Scan Before Detail

List pages should give enough information for Admin users to prioritize work without opening every row.

Recommended list signals:

1. Status badge.
2. Risk or readiness indicator.
3. Last updated date.
4. Assigned PIC when relevant.
5. Source module or related entity.
6. Quick action menu.

### 5.3 Source of Truth

Each module owns its own source data. Dashboard and cross-module pages should summarize and deep-link, not duplicate full editing behavior.

### 5.4 Safe Editing

For sensitive or high-impact records, editing should include:

1. Permission check.
2. Reason or remark field.
3. Impact preview where needed.
4. Confirmation before save.
5. Activity log after save.

### 5.5 Progressive Disclosure

Complex records should use tabs, accordions, or grouped sections. Do not show every field at once when the user is reviewing a large operational record.

### 5.6 Modern Product Feel

The Admin Panel should look and behave like a modern SaaS operations product, not a default admin template.

Modern does not mean decorative or visually noisy. It means the interface feels:

1. Polished.
2. Intentional.
3. Responsive.
4. Fast.
5. Spatially clear.
6. Calm under complexity.
7. Premium without becoming playful.

Design direction:

| Area | Required Direction |
|---|---|
| Layout | Clean operational layout with strong hierarchy and generous breathing room where needed |
| Tables | Dense but refined, with clear hover, selected, sticky, and bulk-action states |
| Cards | Subtle depth, clean border, no heavy shadows, no nested decorative cards |
| Forms | Modern grouped sections, clear focus states, sticky action footer for long forms |
| Navigation | Smooth sidebar collapse, clear active module, no crowded menu treatment |
| Status | Semantic badges with consistent color, shape, and optional icon |
| Motion | Subtle and fast, used to clarify state changes |
| Empty states | Helpful and polished, not plain placeholder text |
| Uploads | Drag/drop affordance, progress, preview, retry, and clear file rules |
| Review flows | Decision workspace should feel deliberate and trustworthy |

Avoid:

1. Generic Bootstrap-like admin template styling.
2. Flat unstyled tables with only borders.
3. Oversized empty whitespace that reduces productivity.
4. Decorative gradient backgrounds as the main visual style.
5. Random accent colors per module.
6. Heavy shadows, glassmorphism, neumorphism, or overly rounded cards.
7. Purple, beige, dark slate, brown/orange-heavy themes as the dominant palette.
8. Placeholder-looking illustrations where real content, icons, or states are more useful.

### 5.7 Interaction Quality Principle

Every interactive element should communicate state.

Required interaction states:

1. Hover.
2. Focus.
3. Active or pressed.
4. Loading.
5. Disabled.
6. Selected.
7. Error.
8. Success.
9. Empty.

Modern interaction should feel immediate but not jumpy. Use short transitions, clear feedback, and stable layouts.

---

## 6. Responsive Breakpoints

| Device | Width | Layout Behavior |
|---|---:|---|
| Mobile | 320px - 767px | Single column, collapsed sidebar, bottom sheets for filters, stacked cards instead of wide tables |
| Tablet | 768px - 1023px | Collapsible sidebar, wrapped filters, horizontal scroll for dense tables |
| Desktop | 1024px+ | Persistent sidebar, full data tables, multi-column forms, sticky actions where useful |

Desktop is the primary productivity surface. Mobile web is supported for monitoring, quick review, and urgent action, but not every dense workflow should be optimized as a full mobile spreadsheet experience.

---

## 7. Global Layout

### 7.1 App Shell

The Admin Panel should use a consistent shell:

1. Left sidebar navigation.
2. Top bar with current user, notification, and optional global search.
3. Main content area.
4. Page header with title, primary action, and optional export.
5. Content body with filters, summary cards, tables, forms, or details.

### 7.2 Sidebar

Sidebar behavior:

1. Desktop: expanded by default.
2. Tablet: collapsible.
3. Mobile: hidden behind menu trigger.
4. Active module uses a clear highlight.
5. Nested navigation should show only when the parent module is expanded.

Recommended sidebar grouping:

1. Dashboard.
2. Core Operations.
3. Travel Operations.
4. Finance.
5. Communication & Support.
6. System Administration.

### 7.3 Page Header

Each page header should include:

1. Page title.
2. Optional short subtitle only when it adds context.
3. Primary action button on the right.
4. Secondary action such as Export, Import, or Download when relevant.

Avoid large empty headers. Admin screens should keep useful data close to the top.

---

## 8. Visual Tokens

### 8.0 Font Family

Admin Panel uses `Plus Jakarta Sans` as the primary interface font.

Font source:

1. Use self-hosted font files in production when possible.
2. Google Fonts may be used during design/prototyping, but production should prefer self-hosting to reduce external dependency and improve loading consistency.
3. Recommended formats: `woff2` as primary, `woff` as fallback if needed.

Recommended CSS font stack:

```css
font-family: "Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Recommended font weights:

| Weight | Usage |
|---:|---|
| 400 Regular | Body text, table cells, helper text |
| 500 Medium | Form labels, navigation item, table metadata, input values |
| 600 SemiBold | Section title, table header, button text, status label |
| 700 Bold | Page title, KPI number, important summary value |

Rules:

1. Use Plus Jakarta Sans for all UI text, including navigation, tables, forms, buttons, modals, and dashboard widgets.
2. Use tabular number styling for finance, totals, counters, and table columns when supported.
3. Do not mix additional decorative fonts inside the Admin Panel.
4. If Plus Jakarta Sans fails to load, fall back to the system UI font stack.
5. Avoid using font weights below 400 or above 700 for Admin Panel UI.
6. Do not use negative letter spacing.
7. Keep text rendering consistent across Admin Panel and Travel Agency Portal.

### 8.1 Color Roles

| Role | Recommended Color | Usage |
|---|---|---|
| Primary | `#069AA4` | Primary buttons, active tabs, selected controls |
| Primary Dark | `#087A83` | Hover or pressed primary states |
| Brand Accent | `#F97316` | Brand highlight, limited accent usage |
| Success | `#12A66A` | Active, paid, verified, completed |
| Warning | `#D98200` | Pending, overdue soon, attention needed |
| Danger | `#DC2626` | Reject, delete, overdue, failed, blocked |
| Info | `#2563EB` | Informational status, links, neutral notices |
| Neutral Text | `#111827` | Primary text |
| Muted Text | `#6B7280` | Secondary text |
| Border | `#D9E0E8` | Input, table, card border |
| Surface | `#FFFFFF` | Main content surface |
| Background | `#F6F8FA` | App background |

Use semantic roles rather than hardcoding colors per module.

### 8.1.1 Modern Surface System

Use layered surfaces to create depth without making the UI heavy.

| Surface Token | Color | Usage |
|---|---|---|
| `surface-page` | `#F6F8FA` | Main app background |
| `surface-base` | `#FFFFFF` | Cards, tables, forms |
| `surface-muted` | `#F9FAFB` | Table header, subtle section background |
| `surface-hover` | `#F2FBFC` | Hover row, selected soft background |
| `surface-selected` | `#E6F7F8` | Selected row or active segmented tab |
| `surface-warning` | `#FFF8E6` | Warning alert background |
| `surface-danger` | `#FEF2F2` | Danger alert background |
| `surface-success` | `#ECFDF5` | Success alert background |
| `surface-info` | `#EFF6FF` | Informational alert background |

Rules:

1. Use white surfaces for primary work areas.
2. Use muted surfaces for headers, subgroups, and read-only blocks.
3. Use selected surfaces for active rows, tabs, or chosen records.
4. Keep gradients minimal and only for brand moments or empty illustrations, not operational panels.
5. Tables and forms should feel crisp through border, spacing, and hover states rather than heavy shadow.

### 8.2 Typography

Font family: `Plus Jakarta Sans`.

### 8.2.1 Typography Scale

| Token | Desktop Size | Mobile Size | Line Height | Weight | Usage |
|---|---:|---:|---:|---:|---|
| `text-display` | 32px | 26px | 40px / 32px | 700 | Rare dashboard hero metric or major page heading only |
| `text-page-title` | 24px - 28px | 20px - 22px | 32px | 700 | Page title |
| `text-section-title` | 18px | 16px | 26px | 600 | Card or form section title |
| `text-subsection-title` | 16px | 15px | 24px | 600 | Subsection title, modal section title |
| `text-body-lg` | 16px | 15px | 24px | 400 / 500 | Main body text, detail value |
| `text-body` | 14px | 14px | 22px | 400 | Default UI text |
| `text-body-medium` | 14px | 14px | 22px | 500 | Input value, row title, secondary emphasis |
| `text-label` | 13px | 13px | 18px | 500 / 600 | Field label, small table heading |
| `text-caption` | 12px | 12px | 16px | 400 / 500 | Metadata, helper text, timestamp |
| `text-micro` | 11px | 11px | 14px | 500 | Badge count, compact status metadata |

### 8.2.2 Admin UI Typography Usage

| UI Area | Size Token | Weight | Notes |
|---|---|---:|---|
| Sidebar parent menu | `text-body` | 500 | Active menu may use 600 |
| Sidebar submenu | `text-label` | 500 | Use muted color when inactive |
| Top bar user name | `text-body` | 600 | Role label uses caption |
| Page title | `text-page-title` | 700 | Keep title concise |
| Page subtitle | `text-body` | 400 | Optional only when useful |
| KPI label | `text-caption` or `text-label` | 500 | Muted color |
| KPI value | `text-page-title` or `text-display` | 700 | Use tabular numbers |
| Table header | `text-label` | 600 | Uppercase only if design system already uses it |
| Table main row title | `text-body-medium` | 600 | Entity name, invoice number, package name |
| Table cell | `text-body` | 400 / 500 | Use 500 for important values |
| Table metadata | `text-caption` | 400 | Email, phone, secondary date |
| Form label | `text-label` | 500 | Required marker appears beside label |
| Input value | `text-body` | 400 / 500 | Use 500 for selected dropdown value |
| Button label | `text-body` | 600 | Same size for primary and secondary |
| Badge label | `text-caption` or `text-label` | 600 | Short status only |
| Modal title | `text-page-title` | 700 | Smaller than page title on mobile |
| Alert title | `text-body-medium` | 600 | Alert description uses body |
| Helper text | `text-caption` | 400 | Keep short |
| Error text | `text-caption` | 500 | Use danger color |

### 8.2.3 Numeric Typography

Numbers are important in the Admin Panel because finance, payment, passenger count, trip readiness, and operational metrics need to be scanned quickly.

Recommended CSS:

```css
font-variant-numeric: tabular-nums;
```

Apply tabular numbers to:

1. Currency values.
2. Invoice totals.
3. Commission values.
4. Passenger counts.
5. KPI counters.
6. Dates in dense tables.
7. Progress percentages.
8. Room numbers and ticket numbers when displayed in columns.

Rules:

1. Currency value should use consistent decimal formatting within the same view.
2. Large numbers should use separators, for example `RM 1,034,265`.
3. Negative values should use danger color only when it represents risk or loss.
4. Do not rely only on color to indicate positive or negative trend.

### 8.2.4 Line Height and Readability

| Text Type | Recommended Line Height |
|---|---:|
| Page title | 1.2 |
| Section title | 1.35 |
| Body text | 1.5 |
| Table cell | 1.35 - 1.45 |
| Caption / metadata | 1.35 |
| Button label | 1.2 |

Rules:

1. Long paragraph content should use `text-body` with 1.5 line height.
2. Dense table rows may use tighter line height, but never below 1.3.
3. Multi-line table cells should clamp after 2 lines unless the page is designed for text review.
4. Modal descriptions should wrap naturally and avoid forced small text.

### 8.2.5 Letter Spacing and Case

Letter spacing should remain `0`.

Rules:

1. Do not use negative letter spacing.
2. Avoid excessive uppercase text.
3. Table headers may use uppercase only if the current design direction requires it.
4. Buttons should use title case or sentence case consistently.
5. Status badges should use short title case labels, for example `Pending`, `Active`, `Need Revision`.

### 8.2.6 Responsive Typography Rules

| Element | Desktop | Tablet | Mobile |
|---|---:|---:|---:|
| Page title | 24px - 28px | 22px - 24px | 20px - 22px |
| Section title | 18px | 16px - 18px | 16px |
| Body | 14px - 16px | 14px - 15px | 14px |
| Table cell | 14px | 13px - 14px | 13px - 14px |
| Caption | 12px - 13px | 12px | 12px |

Rules:

1. Do not scale font size with viewport width.
2. On mobile, reduce columns before reducing font below 13px.
3. Mobile card rows should keep entity names readable at 14px or above.
4. Finance values should remain at least 14px in tables and 20px in summary cards.

### 8.2.7 Text Truncation

Use truncation carefully in operational screens.

| Content | Rule |
|---|---|
| Name | Prefer wrap to 2 lines before truncating |
| Email | Truncate middle or end, show full value on hover/copy |
| Phone number | Do not truncate if used for verification |
| Invoice number | Do not truncate |
| Passport / IC | Mask by default, do not visually truncate visible portion |
| Address | Clamp to 2 lines in table, full in detail page |
| Remarks / notes | Clamp in table, full in drawer or details |

### 8.2.8 Font Loading Behavior

Recommended implementation:

```css
@font-face {
  font-family: "Plus Jakarta Sans";
  src: url("/fonts/plus-jakarta-sans/PlusJakartaSans-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Plus Jakarta Sans";
  src: url("/fonts/plus-jakarta-sans/PlusJakartaSans-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Plus Jakarta Sans";
  src: url("/fonts/plus-jakarta-sans/PlusJakartaSans-SemiBold.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Plus Jakarta Sans";
  src: url("/fonts/plus-jakarta-sans/PlusJakartaSans-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

Use `font-display: swap` to keep the Admin Panel usable while the font loads.

### 8.3 Spacing

| Token | Size | Usage |
|---|---:|---|
| `space-1` | 4px | Small gaps, icon spacing |
| `space-2` | 8px | Inline controls |
| `space-3` | 12px | Form field gaps |
| `space-4` | 16px | Card padding, section gaps |
| `space-6` | 24px | Page section gaps |
| `space-8` | 32px | Large layout separation |

### 8.4 Radius

| Component | Radius |
|---|---:|
| Buttons | 8px |
| Inputs | 8px |
| Cards | 8px |
| Tables | 8px |
| Modals | 12px |
| Pills / badges | 999px |

Do not use nested cards unless the inner element is a repeated row, table, modal, or framed tool.

### 8.5 Technical Design Tokens

These tokens should be mirrored in Figma and frontend implementation.

#### 8.5.1 Layout Tokens

| Token | Value | Usage |
|---|---:|---|
| `sidebar-width-expanded` | 280px | Desktop sidebar |
| `sidebar-width-collapsed` | 72px | Collapsed sidebar |
| `topbar-height` | 72px | Global top bar |
| `page-max-width` | 1440px | Optional content max width for very wide screens |
| `content-padding-desktop` | 24px | Main content padding |
| `content-padding-tablet` | 20px | Tablet content padding |
| `content-padding-mobile` | 16px | Mobile content padding |
| `sticky-footer-height` | 80px | Long form action footer |

#### 8.5.2 Component Size Tokens

| Component | Desktop | Mobile | Notes |
|---|---:|---:|---|
| Button height - small | 36px | 36px | Compact table action |
| Button height - default | 44px | 44px | Standard button |
| Button height - large | 52px | 48px | Primary page action |
| Input height | 44px | 44px | Standard form input |
| Search input height | 48px | 44px | List page search |
| Dropdown trigger height | 44px | 44px | Filter and form dropdown |
| Table row height - compact | 56px | N/A | Dense operational table |
| Table row height - default | 72px | N/A | List with metadata/avatar |
| Card padding | 16px - 20px | 16px | Summary and section cards |
| Icon size - small | 16px | 16px | Inline metadata |
| Icon size - default | 20px | 20px | Buttons and menu |
| Icon size - large | 24px | 24px | Page header or empty state |

#### 8.5.3 Border, Shadow, and Layer Tokens

| Token | Value | Usage |
|---|---|---|
| `border-default` | 1px solid `#D9E0E8` | Cards, tables, inputs |
| `border-strong` | 1px solid `#B8C2CC` | Active or focused container |
| `focus-ring` | 2px solid `#069AA4` + 2px offset | Keyboard focus |
| `shadow-xs` | 0 1px 1px rgba(15, 23, 42, 0.04) | Subtle card lift |
| `shadow-sm` | 0 1px 2px rgba(15, 23, 42, 0.08) | Dropdown, small floating element |
| `shadow-md` | 0 8px 24px rgba(15, 23, 42, 0.12) | Modal, popover, drawer |
| `shadow-lg` | 0 20px 40px rgba(15, 23, 42, 0.16) | Large modal or command palette |
| `overlay` | rgba(15, 23, 42, 0.48) | Modal background |

Modern shadow rule:

1. Cards should usually use border plus `shadow-xs` or no shadow.
2. Floating UI such as dropdowns and popovers may use `shadow-sm`.
3. Modals and drawers may use `shadow-md`.
4. Avoid heavy shadow stacks.
5. Do not use glow effects as a default style.

Layering:

| Layer | z-index | Usage |
|---|---:|---|
| Base content | 0 | Page content |
| Sticky table header | 10 | Table header |
| Sticky footer | 20 | Form action footer |
| Dropdown / popover | 40 | Select, filter, date picker |
| Sidebar drawer | 60 | Mobile sidebar |
| Modal overlay | 80 | Modal backdrop |
| Modal content | 90 | Modal content |
| Toast / notification | 100 | Temporary notification |

### 8.6 Motion and Interaction Tokens

Motion should support clarity, not decoration.

| Token | Value | Usage |
|---|---:|---|
| `motion-fast` | 120ms | Hover, pressed, small control feedback |
| `motion-base` | 180ms | Dropdown, tab, accordion, sidebar item |
| `motion-slow` | 240ms | Modal, drawer, sidebar collapse |
| `ease-standard` | cubic-bezier(0.2, 0, 0, 1) | Default UI transition |
| `ease-emphasized` | cubic-bezier(0.16, 1, 0.3, 1) | Modal/drawer entrance |

Motion rules:

1. Keep most UI transitions between 120ms and 240ms.
2. Avoid bouncy or playful motion for operational screens.
3. Animate opacity and transform where possible.
4. Avoid animating layout-heavy properties that cause jank.
5. Respect reduced motion preferences.

Recommended interaction transitions:

```css
transition:
  background-color 160ms cubic-bezier(0.2, 0, 0, 1),
  border-color 160ms cubic-bezier(0.2, 0, 0, 1),
  color 160ms cubic-bezier(0.2, 0, 0, 1),
  box-shadow 160ms cubic-bezier(0.2, 0, 0, 1),
  transform 160ms cubic-bezier(0.2, 0, 0, 1);
```

---

## 9. Core Components

### 9.1 Buttons

| Type | Usage |
|---|---|
| Primary | Main page action such as Add, Create, Save, Approve |
| Secondary | Export, Preview, Download, Cancel |
| Ghost | Low-emphasis actions |
| Danger | Delete, reject, archive destructive action |
| Icon Button | Row action, upload, view, edit, more menu |

Rules:

1. Only one primary button should dominate a page area.
2. Destructive actions must use confirmation.
3. Icon-only buttons need tooltip or accessible label.
4. Disabled buttons must include a visible reason when the blocked state is not obvious.

Button states:

| State | Visual Behavior | Interaction Rule |
|---|---|---|
| Default | Normal background and text color | Clickable |
| Hover | Slightly darker background, elevated border, or subtle translateY(-1px) for primary actions | Desktop only |
| Active / Pressed | Darker background and return to neutral position | Applies during click/tap |
| Focus | Visible focus ring | Required for keyboard users |
| Disabled | Muted color, no pointer action | Show reason if action is permission or status blocked |
| Loading | Spinner or progress icon with label retained | Prevent duplicate submit |

Button labels should be specific. Use `Approve Application`, `Record Payment`, `Assign PIC`, or `Send Reminder` instead of generic `Submit`.

Modern button behavior:

1. Primary buttons should feel tactile through color, subtle shadow, and fast pressed state.
2. Secondary buttons should have crisp border and calm hover background.
3. Danger buttons should not dominate unless the destructive action is the primary task.
4. Loading buttons should keep their width stable.
5. Buttons should not shift surrounding layout when changing state.

### 9.2 Tables

Admin tables should be dense but readable.

Recommended table structure:

1. Checkbox column for bulk selection.
2. Main entity column with avatar or thumbnail when useful.
3. Key metadata columns.
4. Status column.
5. Date column.
6. Actions column.

Rules:

1. Keep row height consistent.
2. Truncate long text with tooltip or details drawer.
3. Use horizontal scroll for unavoidable wide tables.
4. Keep actions right-aligned.
5. Avoid placing primary destructive action directly in the row without menu or confirmation.

Table states and behavior:

| Pattern | Rule |
|---|---|
| Sticky header | Recommended for tables with more than 10 visible rows |
| Frozen first column | Recommended for document/service matrices and finance tables |
| Bulk selection | Show bulk action bar after at least 1 row is selected |
| Select all | Selects visible page first; provide explicit option for all matching filters when needed |
| Sort | Allow one primary sort by default; multi-sort can be Phase 2 |
| Pagination | Use server-side pagination for large datasets |
| Empty filtered state | Explain that no result matches current filters and provide reset |
| Export | Export should respect current filters and permissions |
| Long text | Clamp in table, show full value in drawer/detail |

Bulk action bar should show selected count, available actions, and clear selection.

Modern table behavior:

1. Row hover should use `surface-hover`.
2. Selected rows should use `surface-selected` and checked state.
3. The primary entity cell should use stronger typography and metadata hierarchy.
4. Row action menu should appear consistently and not jump on hover.
5. Sticky headers should use slight backdrop or solid muted surface.
6. Loading tables should use skeleton rows with preserved column widths.
7. Empty tables should use a polished empty state with action if permitted.
8. Long tables should not feel like spreadsheets unless the module is a matrix, such as trip documents or services.

### 9.3 Filters

Filter bar behavior:

1. Search should be visually prominent.
2. Common filters appear as dropdown pills.
3. Advanced filters can open in a popover or drawer.
4. Applied filters should be visible and removable.
5. Reset filter should be available when any filter is active.

Mobile:

1. Filters open in a bottom sheet.
2. Search remains visible above the list when space allows.
3. Applied filters can show as chips.

Filter states:

| State | Behavior |
|---|---|
| No filter | Show default dropdown label, for example `All Status` |
| Filter active | Show selected value or count, for example `Status: Active` or `3 Statuses` |
| Multi-select | Allow search inside dropdown when options exceed 8 items |
| Date range | Offer presets and custom range |
| Loading options | Show skeleton or loading row inside dropdown |
| No options | Show empty state inside dropdown |

Filter changes should update the table without losing selected rows unless the selected rows are no longer visible. If selection is cleared due to filter changes, show a short notice.

Modern filter behavior:

1. Filter chips should show active state clearly.
2. Multi-select dropdowns should include search, select all, clear, and apply actions when the option list is long.
3. Date range picker should show presets and custom range.
4. Filter bar should remain visually attached to the table it controls.
5. Mobile filter sheet should include Apply and Reset actions in a sticky footer.

### 9.4 Status Badges

Use semantic colors consistently:

| Status Type | Examples | Color |
|---|---|---|
| Success | Active, Paid, Verified, Completed, Resolved | Success |
| Warning | Pending, Need Revision, Draft, In Progress | Warning |
| Danger | Rejected, Failed, Overdue, Suspended, Blocked | Danger |
| Neutral | Inactive, Archived, Void, Cancelled | Neutral |
| Info | Sent, Open, Scheduled, Processing | Info |

Status names must match PRD terminology. Do not create new status labels in UI without updating the relevant PRD.

Badge design:

| Badge Type | Shape | Text Weight | Notes |
|---|---|---:|---|
| Status badge | Pill | 600 | Use semantic color |
| Count badge | Pill or circle | 600 | Use neutral or module color |
| Risk badge | Pill | 600 | Warning or danger color |
| Verification badge | Pill with icon | 600 | Use icon only when meaningful |

Badges should remain short. If a status needs explanation, show helper text, tooltip, or detail panel.

Modern badge behavior:

1. Use soft background with high-contrast text.
2. Icons are optional and should clarify meaning, not decorate.
3. Avoid saturated badge backgrounds for normal states.
4. Danger badge should be reserved for real risk or blocking status.

### 9.5 Forms

Forms should be grouped by business meaning:

1. Basic Information.
2. Contact / PIC Information.
3. Document / Media.
4. Operational Configuration.
5. Finance / Bank / Payment.
6. Notes / Internal Remarks.

Rules:

1. Required fields use clear indicators.
2. Validation should appear near the field.
3. Save as Draft is allowed for long forms where PRD supports draft state.
4. Sticky footer actions are recommended for long create/edit forms.
5. Sensitive fields should show masking or permission-based reveal.

Form field states:

| State | Visual Behavior | Rule |
|---|---|---|
| Default | Normal border and label | Ready for input |
| Focus | Primary focus ring or border | Required |
| Filled | Value visible with normal border | Keep label visible |
| Disabled | Muted background and text | Used for unavailable fields |
| Read-only | Normal text with no edit affordance | Used for locked records |
| Error | Danger border and message | Explain how to fix |
| Warning | Warning message under field | Used for non-blocking issue |
| Success | Optional success state | Use sparingly |

Conditional fields should appear only when relevant or be disabled with a clear explanation.

Modern form behavior:

1. Inputs should have a clear focus ring or border transition.
2. Long forms should use section cards with collapsible areas only when it reduces scanning burden.
3. Required and optional states should be clear without cluttering every label.
4. Save feedback should be immediate, for example inline success, toast, or saved timestamp.
5. Sticky footer should show primary action, secondary action, and unsaved changes state.
6. For sensitive changes, show summary before submit.

### 9.6 Modals and Drawers

Use modal for focused short tasks:

1. Add remark.
2. Assign PIC.
3. Confirm action.
4. Upload file.
5. Invite user.

Use drawer or detail page for complex review:

1. Travel Agency application review.
2. Jamaah details.
3. Group trip member matrix.
4. Invoice preview.
5. Report details.

Modal sizing:

| Modal Type | Width | Usage |
|---|---:|---|
| Small | 420px - 480px | Confirmation, short form |
| Medium | 640px - 760px | Add remark, assign PIC, invite user |
| Large | 900px - 1100px | Review, preview, multi-section form |
| Full-screen mobile | 100% width | Mobile modal behavior |

Drawers are preferred when the user needs to keep list context visible. Modals are preferred when the task blocks the current workflow.

Modern modal and drawer behavior:

1. Modal entrance uses subtle fade and scale or slide with `motion-slow`.
2. Drawer entrance uses slide from right on desktop and bottom/full screen on mobile.
3. Background overlay should dim the page without making it feel visually heavy.
4. Long modal content should have sticky header and footer.
5. Confirmation modals should include the object name and impact.
6. Closing with unsaved changes should trigger confirmation.

### 9.7 Tabs

Use tabs when a record has multiple independent scopes.

Rules:

1. Tabs should not hide critical blocking alerts.
2. Badges can show count or issue state.
3. Tab labels should be short.
4. On mobile, tabs can become horizontal scroll.

Tab states:

| State | Behavior |
|---|---|
| Active | Primary background or underline |
| Inactive | Neutral text |
| Disabled | Muted, with tooltip or reason |
| Has issue | Show small warning badge or count |
| Has unsaved changes | Show dot indicator and confirm before leaving |

Modern tab behavior:

1. Segmented tabs can use pill background for high-level switches.
2. Record detail tabs can use underline or clean horizontal tabs.
3. Active tab transition should be smooth but fast.
4. Tabs with counts should keep count badges aligned.
5. On mobile, horizontal tabs should scroll with visible overflow cue.

### 9.8 Upload Controls

Upload controls must show:

1. Allowed formats.
2. Max file size.
3. Max file count.
4. Whether upload is required or optional.
5. Preview when relevant.
6. Replace/delete controls with permission check.

Performance rules:

1. Compress images client-side when possible.
2. Generate thumbnails for preview.
3. Do not load original large files in table rows.
4. Use background upload for large batches.
5. Reject unsupported formats before upload.

Upload states:

| State | Behavior |
|---|---|
| Empty | Show format and max size |
| Drag over | Highlight drop zone |
| Uploading | Show progress per file |
| Uploaded | Show thumbnail or file row |
| Failed | Show reason and retry action |
| Replacing | Confirm when replacing verified document |
| Deleting | Confirm when deleting sensitive document |

For sensitive files, show view/download actions only to roles with permission.

Modern upload behavior:

1. Drag/drop area should react on hover and drag-over.
2. Upload progress should be per file, not only global.
3. Uploaded media should use thumbnail preview with remove/replace action.
4. Document upload should show filename, type, size, status, and last uploaded timestamp.
5. Failed uploads should keep the file row visible with retry and remove actions.
6. Large files should not block the whole form.

### 9.9 Modern Interaction Patterns

Use these interaction patterns across modules to avoid a basic admin feel.

| Pattern | Usage | Behavior |
|---|---|---|
| Hover reveal action | Dense tables | Secondary row actions can become more visible on hover, but primary more menu remains visible |
| Inline status change | Status dropdown | Status update shows confirmation if high impact |
| Optimistic feedback | Low-risk actions | UI updates immediately, then confirms or reverts on failure |
| Skeleton loading | Lists and cards | Preserve layout while data loads |
| Toast feedback | Save, update, send, export | Short success/error confirmation |
| Detail drawer | Quick inspect from list | Opens without losing list context |
| Sticky action footer | Long forms | Keeps save/cancel reachable |
| Stepper | Complex create flows | Shows progress, completion, and in-progress state |
| Impact preview | Sensitive changes | Shows affected records before confirmation |
| Smart empty state | Empty list or filter result | Explains why empty and offers permitted action |

Rules:

1. Use microinteractions to clarify state changes, not to entertain.
2. Keep layout stable during loading and updates.
3. Do not auto-close important feedback before the user can read it.
4. For high-risk operations, prioritize explicit confirmation over speed.
5. Prefer drawers for inspection and modals for decisions.

### 9.10 Modern Visual Quality Checklist

Before approving a component or screen, check:

1. It does not look like a default browser control.
2. Hover, focus, selected, disabled, and loading states are designed.
3. Spacing feels intentional and aligned.
4. Typography hierarchy is clear.
5. Icons are from a consistent icon set.
6. Empty states feel designed, not temporary.
7. Dense tables still have visual rhythm.
8. Forms feel structured, not like a long flat stack of fields.
9. Motion is subtle and does not distract.
10. The screen still works with real long data.

### 9.11 Global UI Component Library

All Admin Panel modules must use the global component library. Do not create one-off UI components for a single module unless the pattern is truly unique and approved as a domain component.

Global component rules:

1. Components must use the design tokens defined in this document.
2. Components must support light responsive web usage for desktop, tablet, and mobile.
3. Components must include required interaction states before implementation is considered complete.
4. Components must support permission-aware behavior where relevant.
5. Components must support loading, empty, error, disabled, and long-content states.
6. Components must be reusable across Admin Panel and Travel Agency Portal unless the data scope is portal-specific.
7. Component names should remain stable across Figma, code, QA, and PRD references.

Every global component should define:

| Requirement | Description |
|---|---|
| Anatomy | Slots and visible parts of the component |
| Variants | Visual or behavioral variations |
| Sizes | Supported sizes when relevant |
| States | Default, hover, focus, selected, loading, disabled, error, success |
| Accessibility | Keyboard behavior, labels, focus order, contrast |
| Responsive behavior | Desktop, tablet, and mobile behavior |
| Data behavior | Empty, long text, slow loading, failed loading |
| Permission behavior | Hidden, disabled, read-only, or masked states |

#### 9.11.1 Foundation Components

| Component | Global Usage | Required Variants / Notes |
|---|---|---|
| App Shell | Main layout wrapper for Admin Panel and Travel Agency Portal | Sidebar layout, collapsed sidebar, mobile drawer navigation |
| Page Container | Standard content width and page spacing | Fluid dashboard, constrained form page, full-width table page |
| Sidebar | Primary navigation | Expanded, collapsed, active item, disabled item, nested menu, notification count |
| Top Bar | Global header area | User menu, notification icon, portal switch label, breadcrumb support |
| Page Header | Page title and main actions | Title only, title + subtitle, title + status, title + action group |
| Section Header | Header for form sections and content panels | With icon, with count, with action, collapsible |
| Card / Surface | Standard content grouping | Basic, metric, alert, selected, interactive, read-only |
| Divider | Separates content groups | Horizontal, vertical, subtle |
| Stack | Vertical or horizontal layout primitive | Gap-based layout using spacing tokens |
| Grid | Responsive layout primitive | 1-column mobile, 2-column tablet, 3/4-column desktop |
| Scroll Area | Controlled scrolling area | Vertical, horizontal, table scroll, sticky shadow |
| Spacer | Controlled spacing element | Token-based only |
| Icon | Standard icon renderer | Lucide or approved icon set only |
| Logo | Brand display | Full logo, icon-only logo, collapsed sidebar logo |
| Avatar | Person or organization identity | Image, initials, organization logo, fallback |
| Thumbnail | Small preview for hotel, package, article, media | Image, video, file, fallback |

#### 9.11.2 Navigation Components

| Component | Global Usage | Required Variants / Notes |
|---|---|---|
| Breadcrumb | Shows page hierarchy | Desktop visible, mobile optional or back-only |
| Back Button | Return to previous list or parent page | Icon + label on desktop, icon-only on mobile |
| Tabs | Record details and module views | Underline, segmented, count badge, warning badge |
| Segmented Control | Switch between two or more modes | Equal-width options, mobile scroll if many |
| Stepper | Multi-step create/edit flows | Horizontal desktop, compact mobile, complete/in-progress/error |
| Pagination | Table and list navigation | Server-side pagination, page size optional |
| Dropdown Menu | Context actions | Row action, page action, user menu |
| Command Menu | Fast navigation/search in Phase 2 | Optional, keyboard shortcut aware |
| Anchor Navigation | Jump within long details page | Sticky side nav for long forms, optional |
| Mobile Bottom Navigation | Mobile portal navigation when needed | Use only if sidebar drawer is too heavy |

#### 9.11.3 Action Components

| Component | Global Usage | Required Variants / Notes |
|---|---|---|
| Button | Primary and secondary actions | Primary, secondary, ghost, danger, link |
| Icon Button | Compact actions | View, edit, delete, archive, more, upload, download |
| Split Button | Main action with secondary menu | Useful for export or create options |
| Button Group | Related actions | Left/right attached, equal emphasis |
| Action Bar | Page-level actions | Header action group, review decision bar |
| Sticky Footer Action Bar | Long forms and review pages | Save, save draft, cancel, continue, publish |
| Bulk Action Bar | Multi-select table actions | Selected count, clear selection, available actions |
| Floating Action Button | Mobile create action | Use sparingly for primary create action |
| Quick Action Panel | Dashboard and details quick actions | Permission-aware action list |
| Confirmation Action | High-risk action wrapper | Requires object name, impact, optional reason |

#### 9.11.4 Form Input Components

| Component | Global Usage | Required Variants / Notes |
|---|---|---|
| Text Input | Standard text entry | Prefix, suffix, helper, error, read-only |
| Textarea | Notes, descriptions, remarks | Auto-height optional, character counter |
| Search Input | List and picker search | Debounced search, clear button, loading state |
| Password Input | Temporary password or secure setting | Reveal toggle, strength helper if needed |
| Number Input | Counts, capacity, duration | Min/max, stepper optional |
| Currency Input | Price, commission, allowance, invoice values | Currency prefix, decimal handling, negative prevention |
| Percentage Input | Tax, discount, commission percentage | Suffix `%`, min/max validation |
| Phone Input | International phone number | Country code selector, formatting, validation |
| Email Input | Email address | Duplicate warning when applicable |
| URL Input | Website, WAG link, payment link | Validation and copy action |
| Date Picker | Single date selection | Presets when relevant, min/max support |
| Date Range Picker | Filter and schedule ranges | Presets, custom range, timezone awareness |
| Time Picker | Itinerary and schedule times | 12/24-hour support based on locale setting |
| Date Time Picker | Event timestamps and reminders | Timezone-aware display |
| Select | Single option selection | Searchable when options exceed 8 |
| Combobox | Search and select from large options | Async loading, empty option |
| Multi Select | Multiple options | Search, select all, clear, apply |
| Checkbox | Boolean selection | Checked, unchecked, indeterminate |
| Radio Group | Mutually exclusive options | Horizontal and vertical variants |
| Switch | Immediate on/off settings | Clear label and save behavior |
| Slider | Range values | Use only when exact value is not critical |
| Tag Input | Tags, skills, labels | Add, remove, suggested tags |
| OTP / Code Input | Verification code when needed | Auto-advance, paste support |
| Rich Text Editor | Articles, announcements, long content | Toolbar, media insert, preview, word count |
| File Uploader | Documents, images, videos | Drag/drop, progress, retry, preview, size rules |
| Image Cropper | Profile, hotel, package, article images | Aspect ratio presets, compression |
| Color Picker | Limited branding settings if needed | Token-bound, not free-form by default |
| Form Field Wrapper | Label, hint, error, required marker | Must wrap all form inputs consistently |
| Form Section | Group of related fields | Collapsible, read-only, completion indicator |
| Field Group | Related inline fields | Phone + country code, price + currency, date + time |

#### 9.11.5 Selection and Picker Components

| Component | Global Usage | Required Variants / Notes |
|---|---|---|
| User Picker | Select platform users | Existing user search, invite new user, selected chips |
| Jamaah Picker | Add jamaah to trip, booking, invoice | Individual, family/group, status indicator |
| Mutawwif Picker | Assign mutawwif to group trip | Availability, language, rating, status |
| Travel Agency Picker | Admin-assisted creation and filtering | Verification status, active/suspended states |
| Package Picker | Invoice, booking, group trip connection | Price, schedule, agency, status |
| Group Trip Picker | Report, billing, testimonial, member assignment | Schedule, agency, capacity, status |
| Hotel Picker | Package and trip accommodation | City, rating, distance, thumbnail |
| Flight Picker | Package and trip flight setup | Airline, airport, flight route, class |
| Itinerary Template Picker | Package and trip schedule setup | Type, duration, day count, status |
| Season Picker | Package pricing and schedule mapping | Season type, active period, overlap warning |
| Invoice Item Picker | Manual invoice item source | Package, add-on, service, custom |
| Document Type Picker | Trip member document matrix | IC, passport, visa, photo, vaccination |
| Role Picker | User management and permission assignment | Admin role, staff role, portal role |
| Permission Picker | Role configuration | Module, action, scope |

#### 9.11.6 Data Display Components

| Component | Global Usage | Required Variants / Notes |
|---|---|---|
| Data Table | Main list pages | Sort, filter, pagination, selection, sticky header |
| Simple Table | Small detail summaries | No heavy controls |
| Matrix Table | Trip documents, services, pricing | Frozen first column, horizontal scroll |
| Description List | Read-only detail data | Label/value, masked value, copy action |
| Key Value Grid | Summary sections | Responsive 1/2/3 columns |
| Entity Cell | Table identity cell | Avatar/thumbnail, title, metadata, status |
| User Identity Cell | Person identity | Avatar, name, email, phone, role badge |
| Organization Cell | Travel agency identity | Logo, name, verification badge |
| Metric Card | KPI summary | Value, trend, icon, source, last updated |
| Chart Card | Analytics and dashboard charts | Empty, loading, failed, export |
| Progress Bar | Payment and completion progress | Percent, label, warning threshold |
| Circular Progress | Compact completion status | Optional for dashboard/widgets |
| Timeline | Activity, review history, payment history | Icon, actor, timestamp, note |
| Activity Log | Audit and operational events | Filterable, immutable display |
| Status Badge | Any status display | Semantic colors only |
| Count Badge | Counts in tabs and navigation | Neutral, warning, danger |
| Rating Display | Hotel, mutawwif, testimonial rating | Star rating, numeric score |
| Media Gallery | Image/video browsing | Thumbnail, preview, download, remove |
| Attachment List | Documents and files | File icon, size, status, actions |
| Code Block / Reference Box | Payment reference, API-like references if needed | Copy action |
| Empty State | No data, no filter result, no permission | Contextual message and action |
| Skeleton | Loading placeholder | Match final layout shape |
| Inline Loader | Small async states | Search, save, picker loading |

#### 9.11.7 Feedback and Messaging Components

| Component | Global Usage | Required Variants / Notes |
|---|---|---|
| Toast | Short feedback after actions | Success, error, warning, info, undo optional |
| Alert Banner | Page-level alert | Critical, warning, info, success |
| Inline Alert | Field or section-level message | Validation, missing data, blocked action |
| Tooltip | Short explanation | Keyboard and hover accessible |
| Popover | Lightweight contextual UI | Filters, details, quick edit |
| Modal | Focused short tasks | Small, medium, large, mobile full-screen |
| Drawer | Detail preview and review | Right drawer desktop, full-screen mobile |
| Confirmation Dialog | Destructive or high-impact action | Object name, impact, reason when required |
| Unsaved Changes Dialog | Leaving dirty forms | Stay, leave, save if available |
| Error Boundary | Failed page or widget | Retry, contact support, technical ID optional |
| Loading Overlay | Blocking async action | Use sparingly for whole-page blocking |
| Notification Item | In-app notification list | Read/unread, action link, timestamp |
| Announcement Banner | Platform announcement | Dismissible when allowed |

#### 9.11.8 Admin Domain Components

These components are specific to UmrahHaji.com operations and should be reusable across related modules.

| Component | Global Usage | Required Variants / Notes |
|---|---|---|
| Verification Checklist | Agency, mutawwif, document verification | Required items, optional items, pass/fail, remarks |
| Approval Decision Bar | Review and approval flows | Approve, request revision, reject, assign reviewer |
| Review History Panel | Application, payment, report, document review | Immutable timeline with actor and decision |
| Remark Panel | Internal notes and operational remarks | Category, priority, title, visibility, attachments optional |
| Document Status Control | Trip documents and profile documents | Pending, submitted, confirmed, rejected, expired |
| Sensitive Data Reveal | Passport, IC, bank, payment information | Masked by default, reveal permission, audit log |
| Audit Log Panel | Security and compliance record | Filter by actor/action/module |
| Permission Gate | UI wrapper for permission behavior | Hide, disable, read-only, masked |
| Status Transition Menu | Controlled status changes | Allowed transitions only, reason when required |
| Export Control | PDF, CSV, XLSX export | Current filters, permission-aware |
| Import Control | Bulk upload if supported | Template download, validation result, error report |
| Payment Progress Cell | Billing list and invoice details | Paid, outstanding, overdue, installments |
| Invoice Summary Panel | Invoice create/preview | Subtotal, discount, tax, fee, total, due now |
| Commission Breakdown | Package and billing finance | Platform, agent, public commission |
| Room Configuration Matrix | Package and group trip room setup | Room type, adult, child, infant, default room |
| Pricing Matrix | Package price by season/room/passenger | Discount, default, validation |
| Trip Member Matrix | Group trip documents/services | By documents, by services, family grouping |
| Family Group Builder | Add or edit jamaah family/group | Existing users, invite users, PIC/member roles |
| Itinerary Day Builder | Itinerary template and trip schedule | Day title, location, activities, reorder |
| Activity Builder | Itinerary activity item | Time, icon, title, description, timezone |
| Flight Segment Editor | Flight setup in package/trip | Departure, return, transit, class, airline |
| Hotel Selection Card | Package/trip hotel selection | Makkah, Madinah, distance, rating |
| Transport Selector | Trip/package transport setup | Makkah, Madinah, inter-city status |
| Season Period Editor | Season management | Type, period, overlap validation |
| Report Assignment Panel | Report management | Assigned PIC, reassignment, SLA status |
| Testimonial Review Card | Testimonial management | Rating, text, media, visibility, archive |
| Article Editor Layout | Article management | Editor, publish settings, SEO, tags, media |

#### 9.11.9 Global Component States

All components must support the relevant states below. A component is not ready if the state exists in real usage but is not designed.

| State | Usage | UI Rule |
|---|---|---|
| Default | Normal ready state | Clear visual affordance |
| Hover | Desktop pointer interaction | Subtle color or border change |
| Focus | Keyboard navigation | Visible focus ring |
| Active / Pressed | Click or tap feedback | Immediate tactile response |
| Selected | Chosen row, option, tab, card | Use `surface-selected` and clear indicator |
| Open | Dropdown, popover, drawer, modal | Active trigger state visible |
| Checked | Checkbox, switch, radio | Primary color with accessible contrast |
| Indeterminate | Parent checkbox with partial selection | Distinct from checked |
| Disabled | Not actionable | Muted, no pointer action, reason if needed |
| Read-only | View-only data | Visible value without edit affordance |
| Loading | Waiting for data/action | Skeleton or inline loader |
| Saving | Form or inline edit saving | Stable layout with progress feedback |
| Success | Completed action | Short confirmation |
| Warning | Non-blocking issue | Explain risk and next action |
| Error | Blocking issue | Explain fix and keep user input |
| Empty | No data available | Contextual empty state |
| Permission Blocked | User lacks access | Hide, disable, read-only, or mask based on rule |
| Archived | Record is inactive but retained | Neutral visual treatment |
| Syncing | Background update | Small status indicator, no blocking unless necessary |

#### 9.11.10 Global Component Accessibility Rules

| Component Type | Accessibility Requirement |
|---|---|
| Buttons | Must have accessible label; icon-only buttons need tooltip and aria label |
| Forms | Labels must be associated with inputs; errors must be announced |
| Tables | Header cells, row selection, sort state, and keyboard navigation must be supported |
| Dropdowns | Open/close with keyboard, arrow navigation, escape to close |
| Modals | Focus trap, escape close when safe, return focus to trigger |
| Drawers | Same focus behavior as modal when blocking; non-blocking drawer must still be keyboard reachable |
| Tabs | Arrow key navigation and active tab semantics |
| Uploads | File restrictions visible before upload; upload errors announced |
| Toasts | Important errors should persist or be reachable from notification history |
| Charts | Provide accessible summary and data table alternative when needed |

#### 9.11.11 Component Implementation Priority

Build global components in this order so early screens stay consistent:

| Priority | Component Set | Why |
|---|---|---|
| P0 | App Shell, Page Header, Button, Form Field, Select, Date Picker, Data Table, Badge, Modal, Drawer, Toast, Empty State, Skeleton | Required by almost every module |
| P1 | Filter Bar, Bulk Action Bar, Stepper, Upload, Tabs, Metric Card, Timeline, Attachment List, Confirmation Dialog | Required by complex admin workflows |
| P2 | Matrix Table, User Picker, Entity Picker, Rich Text Editor, Media Gallery, Chart Card, Audit Log, Approval Decision Bar | Required by advanced modules |
| P3 | Command Menu, Import Control, Advanced Chart Components, Mobile Bottom Navigation | Useful but not blocking for Phase 1 |

---

## 10. Page Patterns

### 10.1 List Page Pattern

Recommended order:

1. Page header.
2. Summary cards when useful.
3. Alert banner if there are urgent issues.
4. Filter and search bar.
5. Data table.
6. Pagination.

Use this pattern for:

1. Travel Agency List.
2. Jamaah List.
3. Mutawwif List.
4. Package List.
5. Booking List.
6. Group Trip List.
7. Hotel List.
8. Flight / Airline List.
9. Itinerary List.
10. Billing / Payment List.
11. Report List.
12. Articles List.

### 10.2 Detail Page Pattern

Recommended order:

1. Header summary with status and primary actions.
2. Important alerts or blockers.
3. Tabs or grouped sections.
4. Activity log or review history near the bottom.

Detail pages should support deep links from dashboard, reports, notifications, and related modules.

### 10.3 Create / Edit Page Pattern

Recommended order:

1. Back navigation.
2. Page title.
3. Optional stepper for multi-step flows.
4. Grouped form sections.
5. Sticky footer actions.

For complex create flows, use steps:

1. Basic Info.
2. Operational Setup.
3. Documents / Media.
4. Review & Publish.

### 10.4 Review / Approval Workspace Pattern

Use this pattern for Travel Agency Applications, document verification, payment verification, refund approval, report resolution, and sensitive status changes.

Recommended order:

1. Header with entity identity, status, and submitted date.
2. Submitted data summary.
3. Document or evidence viewer.
4. Review checklist.
5. Internal notes and review history.
6. Decision action bar.

Decision actions:

1. Approve.
2. Request revision.
3. Reject.
4. Assign reviewer or PIC.
5. Save internal note.

Rules:

1. Approval and rejection require confirmation.
2. Rejection and request revision require reason.
3. Reviewer should see what notification will be sent before confirming.
4. Review history must remain visible after decision.

### 10.5 Analytics / Report Page Pattern

Use this pattern for Dashboard, Finance Reports, Report Analytics, Testimonial Analytics, and operational summary pages.

Recommended order:

1. Page header with date range.
2. KPI cards.
3. Alert or insight banner if needed.
4. Charts or trend cards.
5. Supporting table.
6. Export action.

Rules:

1. Metrics must show source module when not obvious.
2. Cached metrics should show last updated time.
3. Financial analytics must respect role permissions.
4. Empty chart states should explain that there is no data for selected range.

### 10.6 Permission-Based UI Behavior

| Permission Condition | UI Behavior |
|---|---|
| User has full permission | Show action normally |
| User has view-only permission | Hide create/edit/delete actions; show read-only data |
| User lacks module access | Hide module from sidebar and block direct URL |
| User can view but not reveal sensitive data | Show masked data and disabled reveal control |
| User can request but not approve | Show `Request Approval` instead of final action |
| Record status blocks action | Disable action and show status reason |
| Action requires approval evidence | Keep action disabled until required evidence or reason is provided |

Default rule:

1. Hide actions when the user should not know the action exists.
2. Disable actions when the user can understand the action but a condition is not met.
3. Always enforce permissions on backend even if UI hides the action.

### 10.7 Form Validation Pattern

| Validation Type | UI Rule |
|---|---|
| Required field | Show required marker and inline error after blur or submit |
| Optional field | Do not mark as optional unless the surrounding form is mostly required |
| Conditional field | Show condition in helper text |
| Duplicate data | Show blocking or warning message with existing record link if permitted |
| Invalid format | Show expected format |
| Upload too large | Show max file size and selected file size |
| Unsaved changes | Confirm before leaving page/modal |
| Save as Draft | Allow incomplete non-critical fields when PRD supports draft |
| Publish / Activate | Validate all required and conditional fields |

Validation messages should be specific and actionable.

Example:

```text
Passport expiry date must be at least 6 months after departure date.
```

### 10.8 UX Writing and Microcopy Pattern

Use consistent wording for repeated actions.

| Scenario | Recommended Copy |
|---|---|
| Delete confirmation | `Delete this record? This action cannot be undone.` |
| Archive confirmation | `Archive this record? You can restore it later if needed.` |
| Reject application | `Reject this application? Please add a reason for the applicant.` |
| Request revision | `Request revision? The applicant will be notified with your notes.` |
| Payment recorded | `Payment recorded successfully.` |
| Upload failed | `Upload failed. Check the file format and size, then try again.` |
| Permission blocked | `You do not have permission to perform this action.` |
| Unsaved changes | `You have unsaved changes. Leave without saving?` |
| Empty filtered result | `No results match the selected filters.` |

Rules:

1. Use direct action verbs.
2. Avoid technical error codes in user-facing copy unless support needs them.
3. For destructive actions, state the impact.
4. For approval actions, state who will be notified.

---

## 11. Dashboard Design

Dashboard should feel like a command center, not a report archive.

Recommended hierarchy:

1. KPI summary cards.
2. Operational alerts.
3. Pending approvals.
4. Upcoming departures.
5. Finance snapshot for authorized roles.
6. Reports and support snapshot.
7. Recent activities.
8. Quick actions.

Rules:

1. Every widget should deep-link to its source module.
2. Widgets must respect permissions.
3. A failed widget should show local error state, not break the dashboard.
4. Finance widgets must be hidden from unauthorized users.
5. Use concise labels and last-updated timestamps for cached metrics.

---

## 12. Module Design Notes

### 12.1 Travel Agency Management

Design focus:

1. Verification clarity.
2. Document review.
3. Agency status visibility.
4. Safe approval, rejection, revision, suspend, and reactivate actions.

Recommended detail tabs:

1. Profile.
2. Users & Team.
3. Jamaah & Mutawwif.
4. Packages & Group Trips.
5. Operations.
6. Finance.
7. Quality & Logs.

### 12.2 Jamaah Management

Design focus:

1. Search and identity clarity.
2. Document readiness.
3. Trip membership history.
4. Sensitive personal data protection.

Admin should primarily review and correct operational data. Sensitive profile edits should require permission and activity log.

### 12.3 Mutawwif Management

Design focus:

1. Verification and certification.
2. Assignment readiness.
3. Experience, language, skill, and document quality.
4. Rating and report signals.

Payout-ready labels must not imply automated payout in Phase 1.

### 12.4 Package Management

Design focus:

1. Package ownership by Travel Agency.
2. Admin-assisted creation and edits with approval evidence.
3. Schedule, season, hotel, flight, itinerary, price, commission, and publication status.

Use stepper for create package because the form is long.

### 12.5 Booking Management

Design focus:

1. Booking lifecycle visibility.
2. Jamaah/group composition.
3. Payment linkage.
4. Document and service readiness.

Booking should connect commercial intent to operational execution.

### 12.6 Group Trip Management

Design focus:

1. Operational readiness.
2. Hotel, flight, itinerary, mutawwif, and member sync.
3. Document and service matrix.
4. Exportable operational summary.

For trip member tables, use horizontal scroll on desktop and grouped cards on mobile.

### 12.7 Flight / Airline Management

Design focus:

1. Airline catalog.
2. Flight number and route clarity.
3. Airport, transit, class, baggage, and usage in packages/trips.

Admin manages master data. Travel Agency selects from approved catalog.

### 12.8 Hotel Management

Design focus:

1. Hotel catalog clarity.
2. City, distance to mosque, rating, gallery, amenities, room types.
3. Usage in packages and group trips.

Use clear media previews and do not overload list rows with large images.

### 12.9 Itinerary Management

Design focus:

1. Template-based itinerary creation.
2. Day-by-day activity structure.
3. Timezone clarity.
4. Reuse by package and group trip.

Itinerary templates should be easy to clone, edit, and preview.

### 12.10 Finance and Billing

Design focus:

1. Payment status clarity.
2. Invoice lifecycle safety.
3. Commission and settlement visibility.
4. Manual payment verification.
5. Audit and export.

High-impact actions should require confirmation and reason.

### 12.11 Reports Management

Design focus:

1. Report triage.
2. Assignment and SLA visibility.
3. Sender/reported entity clarity.
4. Status and resolution history.

Reports should stay simpler than a full helpdesk system in Phase 1, but still cover urgent issues, role-based reports, comments, attachment, and resolution.

### 12.12 Testimonial Management

Design focus:

1. Daily feedback vs end-of-trip testimonial separation.
2. Moderation state.
3. Public vs internal visibility.
4. Rating for Travel Agency and Mutawwif.

Daily feedback is operational insight. End-of-trip feedback is the main public testimonial candidate.

### 12.13 Announcements

Design focus:

1. Audience targeting.
2. Schedule and delivery state.
3. Channel visibility.
4. Quiet hours and urgent override.

Show delivery counts and failed delivery reasons.

### 12.14 Articles Management

Design focus:

1. Content status.
2. Category and tags.
3. Featured article.
4. Reviewer metadata for sensitive religious, health, or legal content.

Article editor should keep writing area clean and metadata in side panel.

### 12.15 Settings, Roles & Permissions

Design focus:

1. Permission clarity.
2. Role-based access.
3. Audit log.
4. System settings ownership.

Settings should not become a dumping ground. Each setting must have a clear owner module.

---

## 13. Empty, Loading, and Error States

### 13.1 Empty State

Empty state should include:

1. Clear title.
2. Short reason.
3. Primary action when the user has permission.
4. No action button for view-only roles.

Example:

```text
No travel agency applications yet.
New applications from the public website will appear here for review.
```

### 13.2 Loading State

Use:

1. Skeleton rows for tables.
2. Skeleton cards for dashboard widgets.
3. Local loading indicators for row actions.

Avoid full-page blocking spinners unless the whole page is truly unavailable.

### 13.3 Error State

Error state should explain:

1. What failed.
2. What the user can do next.
3. Whether retry is available.

For permission errors, show a calm message:

```text
You do not have permission to perform this action.
Contact a Super Admin if this access is required.
```

---

## 14. Confirmation and Destructive Actions

Actions requiring confirmation:

1. Approve application.
2. Reject application.
3. Request revision.
4. Suspend or reactivate travel agency.
5. Delete, archive, or restore records.
6. Void invoice.
7. Record refund.
8. Mark report as resolved or closed.
9. Publish announcement.
10. Change active group trip details.

Confirmation modal should include:

1. Action summary.
2. Impact statement.
3. Optional or required reason field.
4. Confirm button with action-specific label.
5. Cancel button.

---

## 15. Accessibility

Minimum requirements:

1. All interactive controls must be keyboard accessible.
2. Focus state must be visible.
3. Color cannot be the only status indicator.
4. Icon-only buttons need accessible labels.
5. Form errors must be readable by assistive technology.
6. Tables should preserve semantic structure.
7. Modals must trap focus and close with Escape.

### 15.1 Concrete Accessibility Rules

| Area | Requirement |
|---|---|
| Color contrast | Text should meet WCAG AA contrast minimum |
| Focus order | Focus should follow visual reading order |
| Focus ring | Must be visible on keyboard navigation |
| Modal | Trap focus, close with Escape, restore focus to trigger |
| Dropdown | Support keyboard open, navigate, select, and close |
| Table | Use semantic header and cell structure |
| Icon-only action | Provide accessible label and tooltip |
| Form error | Associate error message with field |
| Required field | Indicate visually and programmatically |
| Toast | Do not rely only on timeout; critical messages should remain discoverable |

### 15.2 Keyboard Interaction Standards

| Component | Keyboard Behavior |
|---|---|
| Button | `Enter` or `Space` activates |
| Link | `Enter` opens |
| Dropdown | `Enter` opens, arrow keys navigate, `Escape` closes |
| Tabs | Arrow keys move between tabs, `Enter` selects if needed |
| Modal | `Tab` cycles inside modal, `Escape` closes |
| Date picker | Keyboard date selection must be possible or manual input allowed |
| Table row action menu | `Enter` opens menu, arrow keys navigate |

### 15.3 Accessibility Do Not Do

1. Do not remove focus outlines.
2. Do not use color-only status indicators.
3. Do not make table rows clickable without clear focus and action behavior.
4. Do not put critical instructions only inside placeholder text.
5. Do not use icon-only buttons without accessible labels.

---

## 16. Data Privacy and Security UI

Sensitive data includes:

1. Passport number.
2. IC / ID number.
3. Bank account number.
4. Payment proof.
5. Legal documents.
6. Personal documents.
7. Internal notes.
8. Report attachments.

Design rules:

1. Mask sensitive values by default where possible.
2. Reveal sensitive data only with permission.
3. Log reveal, download, replace, and delete actions.
4. Use watermark or download tracking for sensitive documents if supported.
5. Do not show sensitive files in public or customer-facing contexts.

---

## 17. Notifications

Notification UI should distinguish:

1. System alert.
2. Action required.
3. Status update.
4. Failed delivery.
5. Approval request.

Notification center should show:

1. Source module.
2. Related entity.
3. Timestamp.
4. Priority.
5. Deep-link action.

Do not duplicate notifications when the same event is already sent through Announcement, Report, or module-specific notification.

---

## 18. Responsive Table Behavior

| Screen | Table Behavior |
|---|---|
| Desktop | Full table with optional horizontal scroll |
| Tablet | Reduced columns plus horizontal scroll |
| Mobile | Card list or essential columns only |

Mobile card list should show:

1. Entity name.
2. Status.
3. Key metadata.
4. Primary action.
5. More menu.

---

## 19. Content and Copy Guidelines

Tone:

1. Clear.
2. Direct.
3. Calm.
4. Operational.

Use action labels:

1. `Approve Application`
2. `Request Revision`
3. `Reject Application`
4. `Record Payment`
5. `Send Reminder`
6. `Assign PIC`
7. `Export to PDF`

Avoid vague labels:

1. `Submit` when the action is more specific.
2. `OK` for irreversible actions.
3. `Proceed` without context.

---

## 20. Figma and Developer Handoff

### 20.1 Figma Structure

Recommended Figma page structure:

1. Cover.
2. Design Tokens.
3. Core Components.
4. Admin Layout.
5. Dashboard.
6. Module Screens.
7. Responsive Screens.
8. Prototype Flows.
9. Edge States.
10. Handoff Notes.

### 20.2 Component Naming

Use consistent component names:

| Component | Naming Example |
|---|---|
| Button | `Button / Primary / Default` |
| Input | `Input / Text / Default` |
| Select | `Select / Single / Default` |
| Badge | `Badge / Status / Success` |
| Table | `Table / Admin / Default` |
| Modal | `Modal / Confirmation` |
| Drawer | `Drawer / Detail` |
| Upload | `Upload / Document` |
| Tabs | `Tabs / Segmented` |

### 20.3 Required Handoff Annotation

Each screen handoff should include:

1. Screen purpose.
2. Source PRD reference.
3. Role and permission assumptions.
4. Data source module.
5. Primary action.
6. Empty state.
7. Error state.
8. Loading state.
9. Responsive behavior.
10. Sensitive data visibility rule.
11. Audit or activity log requirement if applicable.

### 20.4 Developer Implementation Notes

1. Use design tokens rather than hardcoded styles.
2. Use shared components across Admin Panel and Travel Agency Portal where behavior matches.
3. Do not reuse a component if the permission or data-sensitivity behavior differs.
4. Keep table, filter, modal, upload, and status badge behavior consistent across modules.
5. Use server-side pagination and filtering for large operational datasets.
6. Keep source-of-truth logic in the owning module.

---

## 21. Design QA Checklist

Before a screen is approved, check:

1. The page has a clear primary task.
2. The layout works on desktop, tablet, and mobile.
3. Status labels match PRD terminology.
4. Sensitive data is masked or permission-protected.
5. Empty, loading, and error states are defined.
6. Destructive actions require confirmation.
7. Upload controls show allowed formats and max size.
8. Tables remain readable with real long content.
9. Filters and search are easy to reset.
10. Actions are logged where required.
11. The screen does not duplicate source-of-truth editing from another module.

---

## 22. Open Design Decisions

| Topic | Recommendation | Notes |
|---|---|---|
| Global search | Phase 2 | Useful after data volume grows |
| Custom dashboard widgets | Phase 2 | Keep Phase 1 dashboard standardized |
| Full mobile operational editing | Limited Phase 1 | Prioritize review and urgent action |
| Advanced table column customization | Phase 2 | Useful but not critical for MVP |
| Bulk import for all modules | Selective Phase 1 | Only where operationally needed |
