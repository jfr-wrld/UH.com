# design.md - UmrahHaji.com Admin Panel Design Guide

## Purpose

Use this guide to design the UmrahHaji.com Admin Panel consistently across all Admin modules.

The Admin Panel is an operational back-office. It should feel efficient, dense, trustworthy, and permission-aware. It is not a marketing website and should not use hero sections, decorative layouts, or promotional language.

## Design Principles

1. Optimize for repeated operational work.
2. Prioritize scanning, filtering, comparison, review, and approval.
3. Keep layouts calm, structured, and information-dense.
4. Make permissions, locked states, and audit-sensitive actions clear.
5. Avoid exposing sensitive information unless the user has permission.
6. Make status and next action obvious.
7. Use the same design system as Travel Agency Portal, with different navigation and data scope.
8. Use canonical status labels from the taxonomy.
9. Prefer tables, drawers, tabs, timelines, forms, filters, and modals over large decorative cards.
10. Make mobile and tablet usable, but optimize Admin productivity for desktop.

## Visual Tone

The Admin Panel should feel:

1. Professional.
2. Calm.
3. Operational.
4. Trustworthy.
5. Clear.
6. Fast to scan.

Avoid:

1. Marketing-style hero sections.
2. Decorative gradients.
3. Oversized illustration cards.
4. One-note color palettes.
5. UI cards nested inside cards.
6. Excessive rounded corners.
7. Large empty whitespace that reduces operational density.

## Layout System

### Desktop

Use desktop as the primary Admin experience.

Recommended structure:

```text
Top bar
Sidebar navigation
Main content area
Optional right-side detail drawer
```

Main content should use:

1. Page header.
2. Summary row if needed.
3. Filter/search toolbar.
4. Table/list.
5. Detail drawer or detail page.
6. Pagination.

### Tablet

Tablet layout should keep sidebar collapsible and preserve filters/tables with horizontal overflow only where necessary.

### Mobile

Mobile Admin should be usable for urgent review, not full high-volume operations. Use stacked filters, list cards, and detail pages.

## Navigation

Admin navigation groups:

1. Dashboard.
2. Travel Agency.
3. Jamaah.
4. Mutawwif.
5. Package.
6. Booking.
7. Group Trip.
8. Flight.
9. Hotel.
10. Itinerary.
11. Season Management.
12. Finance Management.
13. Articles.
14. Announcement.
15. Testimonial.
16. Reports.
17. Platform Settings.
18. Referral Reward Management.

Finance Management can contain:

1. Overview.
2. Payments.
3. Invoices.
4. Payment Verification.
5. Refund Requests.
6. Commission Summary.
7. Allowance Management.
8. Payout Preparation.
9. Finance Reports.
10. Finance Settings.

## Page Header Pattern

Every module page should have:

1. Title.
2. Short operational description if helpful.
3. Primary action if permitted.
4. Secondary actions such as export, settings, or audit log if permitted.
5. Status/last updated indicator where relevant.

Example:

```text
Travel Agency Applications
Review pending agency applications, legal documents, and verification status.
[Export] [Audit Log] [Add Travel Agency]
```

Do not show unavailable actions as active buttons. Hide or disable with explanation based on product decision.

## Dashboard Pattern

Admin dashboard should show:

1. Pending agency applications.
2. Pending bookings.
3. Payment verification queue.
4. Outstanding invoices.
5. Upcoming departures.
6. Group trip readiness.
7. Reports requiring response.
8. Announcement delivery status.
9. Recent audit-sensitive activity.

Use widgets only when they lead to filtered operational lists.

## Table Pattern

Tables are the default for Admin list pages.

Required table features:

1. Search.
2. Filter.
3. Status tabs or status filter.
4. Sort for date/status/amount where useful.
5. Row action menu.
6. Bulk actions only when safe.
7. Pagination.
8. Empty state.
9. Loading skeleton.
10. Permission-aware columns/actions.

Common columns:

```text
Reference
Name / Entity
Agency
Status
Owner
Last Updated
Created At
Actions
```

Finance tables may include:

```text
Amount
Currency
Payment Status
Outstanding
Settlement Status
```

## Detail Page Pattern

Detail pages should use a structured layout:

1. Summary header.
2. Status and primary next action.
3. Key metadata.
4. Tabs.
5. Related records.
6. Timeline/activity.
7. Internal notes if permitted.
8. Audit log if permitted.

Recommended tabs:

```text
Overview
Details
Documents
Bookings / Trips
Finance
Reports
Activity Log
Audit
```

Only show tabs that apply to the module.

## Drawer Pattern

Use drawers for:

1. Quick review.
2. Status update.
3. Approval/rejection.
4. Internal notes.
5. Lightweight detail preview.

Use full pages for:

1. Long forms.
2. Multi-step review.
3. Finance workflows.
4. Policy settings.
5. Complex booking/trip details.

## Form Pattern

Forms should be sectioned:

1. Basic information.
2. Operational details.
3. Documents/files.
4. Finance/pricing where relevant.
5. Settings/visibility.
6. Review and confirmation for sensitive changes.

Form requirements:

1. Inline validation.
2. Required field markers.
3. Save draft where applicable.
4. Permission-aware field locking.
5. Clear success/error states.
6. Reason field for sensitive actions.
7. Confirmation step for irreversible or audit-sensitive action.

## Status Design

Use status badges with consistent meaning.

Recommended status families:

| Status Family | UI Treatment |
| --- | --- |
| Draft / inactive | Neutral gray |
| Submitted / pending review | Blue or amber |
| Need revision | Amber |
| Approved / active / paid | Green |
| Rejected / failed | Red |
| Cancelled / archived | Gray |
| Suspended / locked | Red or dark neutral |
| Under review | Purple or amber |
| Reversed / refunded | Orange |

Do not rely on color only. Always include text label.

Backend status values should remain lowercase snake_case. UI labels can be human-readable.

## Permission and Locked States

Permission states must be visible and understandable.

Use:

1. Read-only labels.
2. Lock icon where appropriate.
3. Tooltip explaining missing permission.
4. Disabled action with reason for common cases.
5. Hidden action for highly sensitive unavailable actions.

Examples:

```text
Read-only: Finance approval permission required.
Locked: This booking is already paid. Correction requires Finance Admin approval.
```

## Audit-Sensitive Actions

Use confirmation modal or review drawer for:

1. Approve.
2. Reject.
3. Suspend.
4. Reverse.
5. Refund.
6. Verify payment.
7. Change role/permission.
8. Change platform setting.
9. Export sensitive data.
10. Correct historical snapshot.

Modal/drawer should include:

1. Action summary.
2. Entity reference.
3. Old value/new value if changing state.
4. Required reason.
5. User-facing notification option if applicable.
6. Confirm button with specific action label.

Avoid generic destructive labels like `OK`.

## Search and Filter Design

Every operational list should support:

1. Keyword search.
2. Status filter.
3. Date range.
4. Agency filter where relevant.
5. Owner/assignee filter where relevant.
6. Payment/finance filter where relevant.
7. Export only if permitted.

Filters should be persistent during navigation where useful.

## Empty, Loading, and Error States

### Empty State

Show:

1. What is empty.
2. Why it may be empty.
3. Primary next action if permitted.

### Loading State

Use skeleton rows/cards. Avoid large spinners as the only feedback.

### Error State

Show:

1. Plain message.
2. Retry action.
3. Support/action reference if needed.

Do not expose raw backend errors to staff unless debug mode is explicitly allowed.

## Module Design Notes

### Travel Agency Management

Design around review queues, application detail, legal document verification, status decision, and compliance history.

Key UI:

1. Applications / Pending Verification.
2. Agency List.
3. Agency Detail.
4. Legal Documents.
5. Status Decision.
6. Audit/Activity.

### User Management

Design around invitation, role assignment, permission review, account status, sessions, and login history.

Do not bury role/permission changes; they are sensitive and should be auditable.

### Package Management

Design around package list, draft/published status, pricing, dates, inclusions, images, schedules, and booking/referral readiness.

Published package changes should make snapshot behavior clear.

### Booking Management

Design around booking status, jamaah/family participants, payment summary, document readiness, trip assignment, and support cases.

Show booking timeline prominently.

### Group Trip Management

Design around manifest, itinerary, flight/hotel assignment, mutawwif assignment, jamaah readiness, and operational completion.

Use tabs and readiness badges.

### Jamaah Management

Design for sensitive profile and booking context. Mask sensitive identity fields unless permission allows.

### Mutawwif Management

Design around verification, license, assignment eligibility, account status, and compliance.

### Finance Management

Design should be conservative and precise.

Show:

1. Amount.
2. Currency.
3. Status.
4. Source.
5. Related booking/trip/agency.
6. Proof/receipt only if permitted.
7. Audit trail.

Never make payout/settlement look complete before Finance status is final.

### Report Management

Design around case queues, severity, SLA, assignee, status, response, escalation, and internal notes.

### Announcement Management

Design around audience targeting, channel, schedule, delivery status, and announcement history.

### Articles Management

Design around editorial workflow: draft, review, publish, archive, categories, language, and visibility.

### Testimonial Management

Design around moderation: submitted, pending review, approved, rejected, published, hidden.

### Platform Settings

Design as a policy registry:

1. Ownership label.
2. Editable/read-only state.
3. Current value.
4. Effective date.
5. Version history.
6. Impacted modules.
7. Audit log.

Settings should deep-link to owning module when module-controlled.

### Referral Reward Management

Design around:

1. Program/campaign registry.
2. Attribution records.
3. Reward review queue.
4. Eligibility checklist.
5. Approval/rejection/reversal.
6. Finance handoff.
7. Safe user-facing status projection.

Do not expose fraud score or internal finance notes in user-facing projections.

## Component Guidance

Use:

1. Tables for large operational lists.
2. Tabs for detail sections.
3. Drawers for quick review.
4. Modals for confirmations.
5. Badges for statuses.
6. Tooltips for locked actions.
7. Breadcrumbs for deep module navigation.
8. Date range pickers for reports/finance.
9. Segmented controls for status tabs.
10. Checkboxes only for bulk-safe selection.

Avoid:

1. Cards inside cards.
2. Huge rounded panels.
3. Decorative gradients.
4. Marketing copy.
5. Explainer text that describes obvious UI.
6. Unbounded text inside small buttons.

## Responsive Rules

### Desktop

1. Sidebar remains visible.
2. Tables can show many columns.
3. Detail drawer can appear beside list.

### Tablet

1. Sidebar collapses.
2. Filters collapse into panel.
3. Tables may horizontally scroll.

### Mobile

1. Use stacked list rows/cards.
2. Move filters into sheet/drawer.
3. Keep primary action accessible.
4. Avoid complex multi-column forms.

## Copywriting Rules

Use short operational labels:

```text
Approve Agency
Reject Booking
Verify Payment
Send to Finance
Request Revision
Export Report
View Audit Log
```

Avoid vague labels:

```text
Submit
OK
Proceed
Do it
```

For sensitive actions, button label should name the action:

```text
Confirm Reversal
Approve Reward
Suspend Account
```

## Accessibility Rules

1. Do not rely on color only.
2. Use readable contrast.
3. Keep tap targets usable on mobile.
4. Provide labels for icon buttons.
5. Ensure tables can be navigated with keyboard where possible.
6. Status updates should be perceivable.
7. Error messages should explain how to fix the issue.

## Design QA Checklist

Before approving a screen:

1. Does the screen match Admin operational workflow?
2. Is the main action obvious and permission-aware?
3. Are statuses canonical and readable?
4. Are sensitive fields masked or locked?
5. Are audit-sensitive actions confirmed with reason?
6. Are empty/loading/error states designed?
7. Is the layout usable on desktop, tablet, and mobile?
8. Does the screen avoid marketing-style composition?
9. Is cross-role data scope clear?
10. Is the source-of-truth module clear?

## Final Design Decision

The Admin Panel should use a restrained operational dashboard style with strong tables, filters, status badges, detail tabs, drawers, confirmation modals, and audit timelines.

Every design must make ownership, permission, status, and next action clear.

