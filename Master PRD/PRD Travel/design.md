# design.md - UmrahHaji.com Travel Agency Portal Design Guide

Product: UmrahHaji.com Travel Agency Portal  
Scope: Travel Agency Portal / Agency Workspace  
Source PRDs: Master PRD Travel Agency Portal, TA PRD 01-15, Admin Design Guide, UX Research Recommendation  
Canonical File: outputs/UmrahHaji_PRD_Travel_Agency/design.md  
Platform: Responsive Web Platform  
Status: Draft Design Guide  
Last Updated: 30 June 2026  
Language Context: English UI copy  
Currency Context: RM  

---

## 1. Purpose

Use this guide to design the UmrahHaji.com Travel Agency Portal consistently across all Travel Agency modules.

The Travel Agency Portal is an agency-scoped operational workspace for verified travel agencies to manage their own packages, bookings, pilgrims, group trips, mutawwif assignments, documents, finance, support cases, announcements, testimonials, articles, and settings.

This document is separate from:

1. Admin Panel `design.md`.
2. JUV Homepage design guide.
3. Public marketplace design direction.

It must use the same design system foundation as the Admin Panel, but with a different user goal:

| Area | Admin Panel | Travel Agency Portal |
| --- | --- | --- |
| Primary user | Platform internal team | Agency owner and staff |
| Data scope | Platform-wide | Own agency only |
| Mental model | Supervise, approve, audit | Operate, sell, prepare, resolve |
| Main work | Cross-agency review | Daily agency operations |
| Risk | Platform governance | Agency execution and customer readiness |

---

## 2. Product Positioning

The Travel Agency Portal should feel like:

1. A professional operations workspace.
2. A package and booking management tool.
3. A trip readiness command center.
4. A finance and payment tracking workspace.
5. A support and communication desk.
6. A secure staff permission system.

It should not feel like:

1. A public landing page.
2. A marketing website.
3. A decorative travel brochure.
4. A generic SaaS dashboard.
5. A full accounting ERP.
6. A chat app.
7. An admin superuser console.

The design must help agency staff answer:

1. What needs attention today?
2. Which bookings are blocked?
3. Which pilgrims still need documents or payment?
4. Which trips are not ready for departure?
5. Which finance items need verification or follow-up?
6. Which staff can access sensitive data?
7. Which support cases require response?

---

## 3. Design Principles

### 3.1 Agency-Scoped By Default

Every screen must reinforce that the user is working inside one Travel Agency workspace.

Use:

1. Agency name in top bar or sidebar context.
2. Agency verification badge.
3. Clear staff role/profile menu.
4. No cross-agency filters.
5. Empty states that mention "your agency" instead of platform-wide data.

Do not show:

1. Other agency names unless needed as platform/public context.
2. Platform-wide metrics.
3. Admin-only controls.
4. Global approval actions.

### 3.2 Operational Clarity Before Decoration

Prioritize data needed to act:

1. Package status.
2. Booking status.
3. Payment status.
4. Document readiness.
5. Departure date.
6. Pilgrim count.
7. Assigned mutawwif.
8. Outstanding balance.
9. Required next action.
10. Last updated timestamp.

Avoid large decorative panels, oversized empty cards, hero sections, and abstract gradients.

### 3.3 Permission-Aware UX

The portal is role and permission heavy. The UI must make permission boundaries clear without leaking sensitive data.

Rules:

1. Hide highly sensitive actions if the user has no permission.
2. Disable common unavailable actions with a short reason.
3. Mask sensitive values by default where possible.
4. Use locked/read-only indicators for platform-controlled or verification-controlled fields.
5. Require reason and confirmation for sensitive changes.
6. Log export, download, sensitive view, permission change, refund, verification, and snapshot correction actions.

### 3.4 Readiness Over Raw Data

Travel agency staff need to know whether a booking, pilgrim, document, or trip is ready.

Use readiness patterns:

1. Readiness score.
2. Missing item count.
3. Blocking item labels.
4. Next required action.
5. Due date.
6. Responsible role or assignee.

Do not force staff to inspect multiple tabs to discover basic blockers.

### 3.5 Snapshot Awareness

Package, booking, invoice, group trip, hotel, flight, itinerary, room, mutawwif, and commission data can be snapshotted.

Design must show when data is:

1. Live reference.
2. Snapshot at booking.
3. Snapshot at group trip creation.
4. Locked historical record.
5. Manually refreshed.
6. Changed with impact review.

Use clear copy:

```text
Snapshot captured on 12 Jun 2026.
Refresh requires reason and will be logged.
```

### 3.6 English + RM

Customer-facing and agency-facing UI copy should be English.

Use RM for prices, invoices, deposits, outstanding balances, refunds, commissions, and settlement values.

Examples:

```text
RM 7,890
per pilgrim
```

```text
RM 1,500 deposit
RM 6,390 remaining balance
```

Avoid mixing English UI with Indonesian CTA labels.

---

## 4. Visual System

### 4.1 Color Tokens

Use the approved UmrahHaji.com brand tokens.

| Token | Hex | Usage |
| --- | --- | --- |
| Primary | `#0694A2` | Primary CTA, active nav, selected filter, focus ring, verified accent |
| Primary Dark | `#057C88` | Primary hover/pressed |
| Primary Soft | `#E6F7F9` | Info surface, selected tab background, subtle highlight |
| Secondary | `#C27803` | Warnings, promo/commercial highlight, pending attention accent |
| Secondary Dark | `#9A6002` | Secondary hover/pressed and high-contrast text |
| Secondary Soft | `#FFF3DC` | Warning or promo-tinted background |
| Text Primary | `#172326` | Main text |
| Text Secondary | `#5D6B70` | Metadata and helper text |
| Border | `#DDE7EA` | Dividers, card borders, table lines |
| Surface | `#FFFFFF` | Cards, forms, modals, drawers |
| Page Background | `#F7FAFA` | Main portal background |
| Success | `#16A34A` | Completed, verified, paid |
| Warning | `#F59E0B` | Pending, expiring soon, attention |
| Error | `#DC2626` | Rejected, blocked, failed, destructive |
| Info | `#2563EB` | Submitted, informational status |

Rules:

1. Primary owns main operational action.
2. Secondary is not the default CTA color; use it for warnings, promotions, and pending attention.
3. Finance amounts should use neutral text except overdue, refund, or warning states.
4. Do not use color as the only status indicator.
5. Keep dense operational screens mostly neutral.

### 4.2 Typography

Default font:

```text
Plus Jakarta Sans
```

Recommended scale:

| Style | Desktop | Mobile | Usage |
| --- | --- | --- | --- |
| H1 | 32/40 | 26/34 | Page title |
| H2 | 24/32 | 22/30 | Section title |
| H3 | 20/28 | 18/26 | Panel title |
| Body | 15-16/24 | 15-16/24 | Main content |
| Body Small | 14/21 | 14/21 | Metadata |
| Caption | 12/18 | 12/18 | Status helper, timestamps |

Rules:

1. Use tabular numbers for RM amounts, counts, due dates, and KPI values where supported.
2. Do not use hero-scale typography inside operational dashboards.
3. Use `600` for table row primary labels and card titles.
4. Use `500` for buttons, tabs, and filters.
5. Avoid tiny grey metadata for important operational status.

### 4.3 Surface and Radius

Recommended radius:

| Element | Radius |
| --- | ---: |
| Small controls | 8px |
| Inputs/buttons | 10-12px |
| Standard cards | 12px |
| Drawers/modals | 12-16px |
| Pills/chips | Fully rounded only if semantically a chip/status |

Use borders more than shadows.

Recommended card style:

```text
background: #FFFFFF
border: 1px solid #DDE7EA
box-shadow: 0 4px 16px rgba(23, 35, 38, 0.04)
```

Avoid nested cards. Use dividers, tabs, and section headers inside detail pages instead.

---

## 5. Layout System

### 5.1 Desktop

Desktop is the primary Travel Agency Portal experience.

Recommended structure:

```text
Top bar
Sidebar navigation
Main content area
Optional right-side drawer
```

Main content should use:

1. Page header.
2. Context/status strip if needed.
3. Summary cards or readiness cards.
4. Search/filter toolbar.
5. Table/list/board.
6. Detail drawer or detail page.
7. Pagination.

Use maximum content width only for forms and settings. Data-heavy lists can use available width.

### 5.2 Tablet

Tablet should:

1. Collapse sidebar.
2. Keep filters accessible.
3. Convert wide tables to responsive tables with horizontal scroll only when necessary.
4. Preserve critical columns.
5. Use drawers carefully; prefer full-page details for complex forms.

### 5.3 Mobile

Mobile web is for urgent actions, review, and lightweight updates.

Use:

1. Collapsed navigation.
2. Stacked filter button and active filter chips.
3. Card-list rows instead of wide tables.
4. Full-screen sheets for forms.
5. Sticky primary action where useful.
6. Simplified table columns.

Do not make mobile the only place where critical fields are hidden.

---

## 6. Navigation

### 6.1 Sidebar Groups

Recommended Travel Agency Portal navigation:

```text
Dashboard

Agency Administration
- Agency Profile
- Team & Roles

Sales & Booking
- Package Management
- Booking Management
- Pilgrim Management

Trip Operations
- Group Trip Management
- Mutawwif Assignment
- Documents & Services

Finance
- Overview
- Invoices
- Payments
- Outstanding Balance
- Refunds
- Commission View
- Settlement View
- Finance Reports

Communication & Support
- Reports / Support
- Testimonials
- Announcements
- Articles / Knowledge Base

Settings
```

Naming rule:

1. PRD/module name may remain `Jamaah Management`.
2. Visible English UI label should use `Pilgrim Management` unless the business intentionally keeps `Jamaah`.
3. Do not mix `My Booking`, `Booking Dashboard`, and `Reservation` for the same concept. Use `Booking Management`.

### 6.2 Top Bar

Top bar should include:

1. Agency name.
2. Verification badge.
3. Global agency-scoped search.
4. Notification center.
5. Help/support shortcut.
6. User avatar and role.
7. Portal switcher only if user has access to another portal.

Global search can search:

1. Booking ID.
2. Invoice number.
3. Pilgrim name/email/phone.
4. Group trip name/code.
5. Package name.
6. Report ID.

Sensitive identifiers should search only if the user has permission.

### 6.3 Breadcrumbs

Use breadcrumbs for deep operational pages:

```text
Group Trip Management / GT-2026-09-UMR-012 / Trip Members
```

Keep breadcrumbs short and useful. Do not repeat page title if space is limited.

---

## 7. Page Patterns

### 7.1 Page Header

Every page should include:

1. Title.
2. Short operational description if useful.
3. Status or context badge when relevant.
4. Last updated timestamp for dynamic summaries.
5. Primary action if permitted.
6. Secondary actions: export, settings, audit log, view history.

Example:

```text
Booking Management
Create, confirm, allocate, and track package bookings for your agency.
[Export] [Create Booking]
```

Do not show disabled primary buttons without a reason.

### 7.2 List Page Pattern

Use for:

1. Packages.
2. Bookings.
3. Pilgrims.
4. Group trips.
5. Invoices.
6. Reports.
7. Staff.

Recommended structure:

```text
Page header
Summary cards
Search/filter toolbar
Active filter chips
Table/list
Pagination
Optional detail drawer
```

Required list behavior:

1. Keyword search.
2. Status filter.
3. Date range filter where relevant.
4. Owner/assignee filter where relevant.
5. Export only if permitted.
6. Saved view if useful in Phase 2.
7. Empty, loading, error states.

### 7.3 Detail Page Pattern

Use detail pages for complex entities:

1. Package.
2. Booking.
3. Pilgrim profile.
4. Group trip.
5. Invoice.
6. Report.
7. Agency profile.

Recommended structure:

```text
Summary header
Status and next action
Key metadata
Tabs
Related records
Activity timeline
Audit log if permitted
```

Recommended tabs:

```text
Overview
Details
Participants / Pilgrims
Documents
Finance
Readiness
Reports
Activity Log
Audit
```

Only show tabs that apply to the module and user permission.

### 7.4 Drawer Pattern

Use drawers for:

1. Quick preview.
2. Status update.
3. Assign PIC.
4. Add internal note.
5. Verify/reject document.
6. Record lightweight payment note.
7. View activity summary.

Use full pages for:

1. Create package wizard.
2. Create booking flow.
3. Create group trip.
4. Refund approval.
5. Permission matrix editing.
6. Finance settings.
7. Sensitive profile/legal update.

### 7.5 Wizard Pattern

Use wizards for long, staged creation flows:

1. Create Package.
2. Create Booking.
3. Create Group Trip.
4. Invite Staff with permission setup.
5. Create Invoice.

Wizard requirements:

1. Stepper with current step and completion state.
2. Save draft.
3. Validation per step.
4. Review step before final submission.
5. Permission-aware field locking.
6. Clear snapshot warning when relevant.

---

## 8. Core Components

### 8.1 Buttons

Button hierarchy:

| Type | Usage | Style |
| --- | --- | --- |
| Primary | Main create/submit/confirm action | Primary background, white text |
| Secondary | View details, compare, export, preview | White background, primary border/text |
| Tertiary | Low emphasis actions | Text or subtle surface |
| Destructive | Cancel, void, remove, reject | Error styling, confirmation required |

Use specific labels:

```text
Create Booking
Publish Package
Send Invoice
Record Payment
Verify Document
Assign Mutawwif
Export Trip Summary
```

Avoid:

```text
OK
Submit
Proceed
Get Started
Click Here
```

unless context makes them unambiguous.

### 8.2 Status Chips

Status chips must include text and color.

Recommended status treatment:

| Status Family | UI Treatment |
| --- | --- |
| Draft / inactive | Neutral |
| Submitted / pending review | Info or warning |
| Need revision | Warning |
| Approved / active / paid / verified | Success |
| Rejected / failed / blocked | Error |
| Cancelled / archived | Neutral |
| Suspended / locked | Error or dark neutral |
| Refunded / reversed | Secondary |

Backend values should remain lowercase snake_case. UI labels are English and human-readable.

### 8.3 Data Tables

Tables are the primary desktop pattern.

Table requirements:

1. Sticky header for long lists.
2. Row primary label.
3. Status chip.
4. Date/time metadata.
5. Permission-aware row actions.
6. Empty/loading/error state.
7. Pagination.
8. Export if permitted.

Do not include too many low-value columns. Use detail drawer for secondary data.

### 8.4 Cards

Use cards for:

1. KPI summary.
2. Readiness summary.
3. Dashboard widgets.
4. Package previews.
5. Mobile list rows.
6. Settings grouped entry points.

Do not turn every section into cards. Use table/list/detail layouts for operational depth.

### 8.5 Forms

Every form field must include:

1. Visible label.
2. Required indicator where applicable.
3. Help text if needed.
4. Error state.
5. Focus state.
6. Disabled/read-only state.
7. Permission lock state where applicable.

Sensitive fields should show:

```text
Locked: Finance permission required.
```

or:

```text
This field is verification-controlled. Changes require Admin review.
```

### 8.6 File Upload

Use for legal documents, passport/IC, visa, vaccination, ticket, payment proof, brochure, gallery, and report attachments.

Upload rules:

1. Show accepted file types and max size.
2. Show upload progress.
3. Show scan/processing status if available.
4. Require reason when replacing verified documents.
5. Mask sensitive file previews unless permission is granted.
6. Log open/download actions.
7. Use signed/protected URLs for sensitive files.

### 8.7 Empty States

Empty states should explain:

1. What is missing.
2. Why it may be empty.
3. What the user can do next if permitted.

Example:

```text
No bookings yet
Create a booking from a published package or wait for customer reservations to arrive.
[Create Booking]
```

### 8.8 Loading and Error States

Use skeleton rows/cards for lists and dashboards.

Widget failure must not block the entire dashboard. Show per-widget error:

```text
Payment summary could not load.
[Retry]
```

Do not expose raw backend errors.

---

## 9. Permission and Sensitive Data Design

### 9.1 Permission Layers

Design must reflect the Travel Agency permission hierarchy:

```text
Agency
-> Staff User
-> Role
-> Permission Group
-> Module Permission
-> Action Permission
-> Sensitive Data Permission
```

Permission types:

| Type | UI Impact |
| --- | --- |
| Module permission | Show/hide navigation and page access |
| Action permission | Show/disable create/edit/archive/export buttons |
| Sensitive data permission | Mask or block protected values/files |
| Settings permission | Lock configuration areas |
| Report permission | Limit case visibility and response actions |

### 9.2 Sensitive Data

Sensitive data includes:

1. Passport.
2. IC/identity number.
3. Visa.
4. Vaccination/medical files.
5. Payment proof.
6. Bank details.
7. Refund information.
8. Staff security/session data.
9. Internal report attachments.

Default behavior:

1. Mask sensitive values in lists.
2. Show status without exposing files.
3. Require explicit open/download action.
4. Log every view/download/export.
5. Require permission and possibly re-authentication for high-risk actions.

### 9.3 Locked and Read-Only States

Use consistent locked states:

| Lock Reason | UI Copy |
| --- | --- |
| No permission | Permission required to edit this field. |
| Platform-controlled | This setting is controlled by UmrahHaji.com. |
| Verification-controlled | Changes require Admin review. |
| Historical snapshot | This value is locked as a historical snapshot. |
| Completed trip | Completed trips are locked except for correction permission. |
| Paid invoice | Paid invoices cannot be edited. Create adjustment instead. |

---

## 10. Audit-Sensitive Actions

Use confirmation modal or review drawer for:

1. Publish package.
2. Edit published package pricing.
3. Archive package.
4. Confirm booking.
5. Cancel booking.
6. Record or verify payment.
7. Void invoice.
8. Approve/reject refund.
9. Replace mutawwif.
10. Change active trip date/hotel/flight/itinerary.
11. Verify/reject document.
12. Export sensitive data.
13. Change role or permission group.
14. Change bank/settlement information.
15. Refresh or correct historical snapshot.

Required confirmation content:

1. Action summary.
2. Entity reference.
3. Old value and new value if state change.
4. Impacted records if applicable.
5. Required reason.
6. Notification preview if users will be notified.
7. Specific confirm button.

Example:

```text
Confirm Hotel Change
This affects 42 pilgrims and 3 pending documents.
Reason is required.
[Confirm Hotel Change]
```

---

## 11. Module Design Guidance

### 11.1 Dashboard

Dashboard is a read-first and action-oriented overview.

Recommended sections:

1. Header with agency context and verification badge.
2. KPI summary.
3. Urgent actions.
4. Upcoming departures.
5. Booking and package overview.
6. Payment overview.
7. Document and service readiness.
8. Reports/support overview.
9. Announcements.
10. Recent activities.
11. Quick actions.

Rules:

1. Hide widgets if the user lacks permission.
2. Finance and document widgets must not leak sensitive data.
3. Each widget should deep-link into the source module with filters applied.
4. Use last updated timestamp for high-risk widgets.
5. Failed widget loading must not block the dashboard.

### 11.2 Agency Profile

Agency Profile is compliance-sensitive.

Design should include:

1. Verification badge in header.
2. Profile summary.
3. Tabs for Agency Information, PIC & Contacts, Address, Legal Documents, Bank & Settlement, Plan & Limits, Remarks & History.
4. Clear admin remarks and revision requests.
5. Submit for Review action only when draft/sensitive change exists.

Rules:

1. Legal, license, PIC, and bank changes may require Admin review.
2. No agency role can approve its own verification.
3. Show public profile status separately from internal verification status.
4. Mask bank details unless permission is granted.

### 11.3 Team & Roles

Team & Roles must make permissions understandable for non-technical agency owners.

Design should include:

1. Staff list.
2. Invitation status.
3. Role template selector.
4. Permission group summary.
5. Sensitive-data permission section.
6. Activity/login history.
7. Owner protection warning.

Permission matrix rules:

1. Group by module.
2. Separate View, Create, Edit, Archive, Export.
3. Separate sensitive data permissions.
4. Show effective permissions before save.
5. Require confirmation for reducing own or owner access.

### 11.4 Package Management

Package Management is a commercial product builder.

Primary screens:

1. Package list.
2. Create/edit package wizard.
3. Package detail.
4. Preview package.
5. Version history.
6. Readiness checklist.

Package list key columns:

1. Package name.
2. Category/type.
3. Status.
4. Schedule/departure.
5. Starting price in RM.
6. Bookings.
7. Readiness.
8. Last updated.

Create package wizard steps:

1. Basic Info & Package Details.
2. Features & Inclusions.
3. Itinerary Planning.
4. Schedule & Season.
5. Flight & Hotel Information.
6. Room Configuration & Pricing.
7. Payment & Promotion.
8. Commission if permitted.
9. Transport.
10. Gallery & Media.
11. Review & Publish.

Rules:

1. Publish action requires readiness checklist.
2. Pricing and commission fields require separate permission.
3. Published major edits require versioning.
4. Preview should show how package appears publicly.
5. Booking and group trip snapshots must not silently change after package edit.

### 11.5 Booking Management

Booking Management is the reservation and payment intent layer.

Create booking flow:

```text
Select Package & Schedule
-> Booker Information
-> Participants
-> Room & Pricing
-> Invoice & Payment
-> Documents Summary
-> Review & Confirm
```

Booking detail tabs:

1. Overview.
2. Participants.
3. Payment & Invoice.
4. Documents.
5. Allocation.
6. Cancellation / Refund.
7. Notes & Remarks.
8. Activity Logs.

Rules:

1. Always show package snapshot and price snapshot.
2. Confirmed booking edits require audit.
3. Cancellation with payment requires finance review.
4. Allocation to group trip requires operations permission.
5. Booking status and payment status must be visually separate.

### 11.6 Pilgrim Management

Visible label should be `Pilgrim Management`. PRD/internal naming may remain `Jamaah Management`.

Primary purpose:

1. Manage pilgrim/customer operational profiles.
2. Track identity and document readiness.
3. Link booking history, trip history, and payment summary.
4. Prevent duplicate records.

List view should show:

1. Pilgrim name.
2. Contact.
3. Status.
4. Current booking/trip.
5. Document readiness.
6. Payment summary if permitted.
7. Last updated.

Rules:

1. Do not show sensitive identifiers in list view by default.
2. Payment summary is read-only and permission-controlled.
3. Customer-owned fields should prefer request-update flow after account activation.
4. Duplicate detection should appear before creating a new profile.
5. Export requires explicit permission and audit log.

### 11.7 Group Trip Management

Group Trip is the real departure operation workspace.

Detail tabs:

1. Overview.
2. Trip Members.
3. Members by Documents.
4. Members by Services.
5. Mutawwif.
6. Hotel.
7. Flight.
8. Itinerary.
9. Transport.
10. Finance Summary.
11. Readiness.
12. Export.
13. Activity Logs.

Readiness summary should show:

1. Departure date.
2. Total members.
3. Ready members.
4. Blocking documents.
5. Blocking services.
6. Payment clearance summary.
7. Mutawwif assignment.
8. Hotel/flight status.

Active trip change rules:

1. Show impact review before major changes.
2. Show affected members and invoices.
3. Show notification preview.
4. Require reason.
5. Store previous and new value in activity log.

### 11.8 Mutawwif Assignment

Mutawwif Assignment should support operational matching without exposing unnecessary sensitive data.

Design should show:

1. Eligible mutawwif list.
2. Languages.
3. Assigned trips.
4. Availability/conflict warning.
5. Profile summary.
6. Assignment history.
7. Payout-ready reference if permitted.

Rules:

1. Assign/replace/remove requires permission.
2. Conflict override requires reason.
3. Assignment snapshot is stored in Group Trip.
4. Sensitive mutawwif identity and bank data are hidden unless permitted.

### 11.9 Documents & Services

Documents & Services is a readiness control layer.

Navigation views:

1. Readiness Dashboard.
2. By Documents.
3. By Services.
4. By Member.
5. By Group Trip.
6. Reminders.
7. Export.
8. Document & Service Rules.

Status values:

1. Not Required.
2. Missing.
3. Uploaded.
4. Pending Review.
5. Need Revision.
6. Verified.
7. Completed.
8. Expiring Soon.
9. Expired.
10. Waived.

Rules:

1. Required blockers must be visually obvious.
2. Users without sensitive document permission can see status but not file content.
3. Rejected/Need Revision documents require reason.
4. Bulk updates require confirmation.
5. Reminders must avoid exposing sensitive file details in notification preview.

### 11.10 Finance Management

Finance Management must feel precise, audit-safe, and calm.

Navigation:

1. Finance Dashboard.
2. Invoices.
3. Payments.
4. Outstanding Balance.
5. Refunds & Adjustments.
6. Commission.
7. Settlement.
8. Reports.
9. Finance Settings.

Finance dashboard cards:

1. Total Revenue.
2. Invoiced Amount.
3. Collected.
4. Outstanding.
5. Overdue.
6. Refund Pending.
7. Platform Commission.
8. Settlement Ready.

Rules:

1. Use RM consistently.
2. Show paid amount and outstanding separately.
3. Never delete verified payment records.
4. Paid invoice edits should become adjustment/credit note flow.
5. Refund approval requires permission and reason.
6. Commission and settlement values are visible only if permitted.

### 11.11 Reports / Support

Reports / Support is a structured case workspace, not chat.

Design should include:

1. Report dashboard.
2. All reports list.
3. Waiting Agency Response view.
4. Create Report flow.
5. Report detail thread.
6. Related context panel.
7. Attachments.
8. Activity log.

Rules:

1. Platform/Admin internal notes must not be visible.
2. Agency internal notes are visible only to the agency unless shared.
3. Sensitive attachments require permission.
4. SLA/response expectation should be clear.
5. Reopen actions should show eligibility and reason.

### 11.12 Testimonials, Announcements, Articles

These modules support trust, communication, and knowledge.

Rules:

1. Keep them operational, not decorative.
2. Use moderation and approval states.
3. Show audience/visibility clearly.
4. Respect customer privacy.
5. Article guidance with religious, legal, medical, or visa implications should show reviewer/source metadata and disclaimer when configured.

### 11.13 Settings

Settings must not become uncontrolled.

Group cards:

1. General Preferences.
2. Team & Roles.
3. Notifications.
4. Finance.
5. Security.
6. Module Settings.
7. Activity Logs.
8. Platform-Controlled Data.

Rules:

1. Label setting ownership: Agency-Controlled, Permission-Controlled, Platform-Controlled, Verification-Controlled, Module-Controlled.
2. Platform-controlled settings are read-only with reason.
3. Sensitive changes require confirmation and audit log.
4. Link to module-specific settings instead of duplicating complex controls.

---

## 12. Status and Readiness Patterns

### 12.1 Status Separation

Do not merge different status domains into one badge.

Example for booking row:

| Domain | Example |
| --- | --- |
| Booking status | Confirmed |
| Payment status | Partially Paid |
| Document readiness | 7/10 complete |
| Allocation status | Not Allocated |

### 12.2 Readiness Score

Use readiness score for:

1. Documents.
2. Services.
3. Group trip.
4. Pilgrim readiness.
5. Package publish readiness.

Display:

```text
82% ready
4 blocking items
```

Never show a percentage without the blocking count or next action.

### 12.3 Due Date and Urgency

Use urgency respectfully.

Good:

```text
Passport expires in 18 days.
Payment due tomorrow.
Trip departs in 7 days with 3 blocking items.
```

Avoid:

```text
Hurry!
Last chance!
Urgent!!! 
```

---

## 13. Search, Filters, and Bulk Actions

### 13.1 Filters

Every operational list should support relevant filters:

1. Keyword.
2. Status.
3. Date range.
4. Package.
5. Booking.
6. Group trip.
7. Pilgrim.
8. Assignee/PIC.
9. Payment status.
10. Readiness status.

### 13.2 Active Filter Chips

Show active filters as chips below the toolbar.

Each chip should be removable.

Example:

```text
Status: Pending Payment x
Departure: Next 30 days x
```

### 13.3 Bulk Actions

Bulk actions may be used for:

1. Send reminders.
2. Update service status.
3. Export selected rows.
4. Assign internal PIC.
5. Archive eligible records.

Rules:

1. Show selected count.
2. Hide actions that are not valid for all selected rows.
3. Require confirmation for sensitive bulk changes.
4. Show partial success results.

---

## 14. Notifications and Announcements

Notification previews must not expose sensitive details.

Examples:

Good:

```text
3 documents need review for GT-2026-09-012.
```

Avoid:

```text
Ahmad passport number A12345678 was rejected.
```

Mandatory operational notifications cannot be disabled if required for booking, payment, trip, document, security, or compliance.

---

## 15. Accessibility

The portal must support older users, busy agency staff, and staff with varied digital confidence.

Requirements:

1. Body text minimum 15-16px.
2. Touch targets at least 44 x 44px where possible.
3. Visible focus states.
4. Keyboard accessible menus, tables, drawers, modals, and forms.
5. Inputs always have visible labels.
6. Status does not rely only on color.
7. Error messages explain recovery.
8. Reduced motion support.
9. Tooltips must not contain critical information only.
10. Export/download actions should be clearly labeled.

---

## 16. Performance

Operational pages must feel fast even with many records.

Rules:

1. Use server-side pagination for large tables.
2. Use debounced search.
3. Cache dashboard aggregates where safe.
4. Use per-widget loading/error states.
5. Lazy-load heavy detail tabs.
6. Do not load sensitive files until user opens them.
7. Avoid rendering very large permission matrices all at once on mobile.

---

## 17. AI Design Prompting Rules

When asking an AI design agent to create Travel Agency Portal screens, do not ask:

```text
Create a nice dashboard for a travel agency.
```

Use:

```text
Create an operational Travel Agency Portal screen for UmrahHaji.com.

It must be agency-scoped, permission-aware, English UI, RM currency, and designed for daily operations.

Prioritize:
- package management
- booking and payment status
- pilgrim readiness
- document and service blockers
- group trip departure readiness
- finance accuracy
- support case response
- audit-sensitive actions

Avoid generic SaaS dashboard patterns, decorative cards, fake charts, abstract hero sections, and vague CTAs.
Every section must help agency staff review, act, verify, prepare, resolve, or audit.
```

Reject AI output if:

1. It looks like a generic SaaS dashboard.
2. It has large decorative KPI cards with no operational next action.
3. It ignores agency data scope.
4. It exposes sensitive data without permission state.
5. It uses non-specific CTAs.
6. It hides payment/document/trip blockers.
7. It uses Indonesian visible copy despite English context.
8. It uses non-RM currency examples.

---

## 18. Design QA Checklist

Before approving any Travel Agency Portal screen:

1. Is the screen agency-scoped?
2. Is the primary user goal clear within 5 seconds?
3. Are status and next action visible?
4. Are permission states clear?
5. Are sensitive values masked or protected?
6. Are snapshot and locked states explained?
7. Are RM amounts formatted consistently?
8. Is visible copy in English?
9. Are table/list columns scannable?
10. Are filters relevant and not overloaded?
11. Are audit-sensitive actions confirmed with reason?
12. Are empty/loading/error states designed?
13. Does mobile support urgent review and action?
14. Does the screen avoid decorative marketing layout?
15. Does it use canonical status labels from taxonomy?
16. Are finance, document, and export permissions respected?
17. Are historical records protected from silent edits?
18. Are notifications privacy-safe?

---

## 19. Component Checklist

Core components required:

1. Top bar with agency context.
2. Sidebar navigation.
3. Page header.
4. KPI/readiness cards.
5. Search/filter toolbar.
6. Active filter chips.
7. Data table.
8. Mobile list card.
9. Detail drawer.
10. Detail page tabs.
11. Wizard stepper.
12. Status chip.
13. Readiness score.
14. Price/RM amount block.
15. Permission lock state.
16. Sensitive data mask.
17. File upload.
18. Confirmation modal.
19. Impact review drawer.
20. Activity timeline.
21. Audit log table.
22. Empty/loading/error states.
23. Toast/notification.
24. Bottom sheet for mobile.

---

## 20. Final Design Decision

The Travel Agency Portal should be designed as a dense, calm, agency-scoped operations workspace.

It should reuse the Admin Panel design system foundation, but optimize for Travel Agency daily work:

1. Create and manage packages.
2. Create and confirm bookings.
3. Manage pilgrims.
4. Prepare group trips.
5. Assign mutawwif.
6. Track documents and services.
7. Manage invoices, payments, refunds, commission, and settlement.
8. Respond to reports/support cases.
9. Manage agency team permissions and settings.

The accepted direction is:

```text
Agency Operations Command Center
```

It must be English-first, RM-priced, permission-aware, audit-safe, and designed around operational readiness rather than decorative dashboards.
