# skills.md - UmrahHaji.com Admin Panel AI Agent Guide

## Purpose

Use this file as the operating guide for AI coding/design agents working on the UmrahHaji.com Admin Panel.

The agent must build from the Admin Panel PRDs and must not invent unrelated product behavior. The Admin Panel is the back-office source for platform operations, verification, finance, support, content, settings, audit, and cross-role governance.

## Source Documents

Read these first when working on Admin Panel tasks:

1. `Master_PRD_Admin_Panel_UmrahHaji.md`
2. `Module_PRD_User_Management.md`
3. `Module_PRD_Travel_Agency_Management.md`
4. `Module_PRD_Package_Management.md`
5. `Module_PRD_Booking_Management.md`
6. `Module_PRD_Group_Trip_Management.md`
7. `Module_PRD_Jamaah_Management.md`
8. `Module_PRD_Mutawwif_Management.md`
9. `Module_PRD_Finance_Management.md`
10. `Module_PRD_Billing_Management.md`
11. `Module_PRD_Allowance_Management.md`
12. `Module_PRD_Report_Management.md`
13. `Module_PRD_Announcement_Management.md`
14. `Module_PRD_Articles_Management.md`
15. `Module_PRD_Testimonial_Management.md`
16. `Admin_PRD_Platform_Settings_Policy_Configuration.md`
17. `Admin_TA_PRD_Referral_Reward_Management.md`
18. `Cross_Role_Status_Event_Taxonomy_Appendix.md`
19. `Final_PRD_Cleanup_Index_Implementation_Readiness.md`

If a conflict exists:

1. Cross-role taxonomy wins for status/event/audit naming.
2. Platform Settings wins for global settings, ownership, feature flags, and policy rules.
3. Admin/TA Referral Reward Management wins for referral reward policy, review, approval, reversal, and finance handoff.
4. Finance Management wins for payout, settlement, release, reversal, and financial records.
5. Module PRD wins for local workflow, screen behavior, fields, and acceptance criteria.

## Agent Mission

The agent should produce implementation that is:

1. Permission-aware.
2. Audit-ready.
3. Agency-scoped where relevant.
4. Snapshot-safe for historical records.
5. Finance-safe for payment, reward, refund, allowance, and payout.
6. Privacy-safe for jamaah, mutawwif, travel agency, document, payment, and support data.
7. Consistent with canonical status/event naming.
8. Responsive for desktop, tablet, and mobile web.

## Admin Panel Role Model

Use these roles as the default admin access model:

| Role | Default Behavior |
| --- | --- |
| Super Admin | Full access to all modules and platform settings |
| Admin | Permission-based operational access |
| Finance Admin | Billing, payment, finance, refund, allowance, payout, settlement, export |
| Operations Staff | Jamaah, group trip, hotel, flight, mutawwif, itinerary operations |
| Compliance Officer | Agency verification, legal docs, audit/compliance-sensitive review |
| Support Staff | Reports, issues, complaints, support context |
| Content Admin | Articles, announcements, testimonials where granted |
| Auditor / View Only | Read-only access and audit logs |
| Travel Agency Admin | Never global Admin Panel access unless explicitly modeled; agency access belongs to TA Portal |

Never assume a staff user can perform a sensitive action only because they can view a screen.

## Core Permission Rules

Every Admin action must answer:

1. Who is the actor?
2. What role and permission does the actor have?
3. What entity is being accessed?
4. What scope applies: global, agency, user, booking, trip, assignment, finance, restricted?
5. Is this action view-only, create, update, approve, reject, reverse, export, delete request, or override?
6. Does it require reason, confirmation, recent authentication, or audit?

Permission key style:

```text
admin.{module}.{resource}.{action}
```

Examples:

```text
admin.booking.view
admin.booking.update
admin.finance.payment.verify
admin.referral.reward.approve
admin.platform_settings.manage_security
admin.report.case.status_change
```

## Sensitive Action Rules

Sensitive actions require explicit permission, reason, confirmation, and audit:

1. Agency approval/rejection/suspension.
2. Booking correction/cancellation override.
3. Payment verification/reversal/refund.
4. Commission, reward, allowance, payout, settlement change.
5. Referral attribution correction, reward approval, rejection, reversal.
6. Document verification override.
7. Account lock, suspend, deactivate, anonymize.
8. Role/permission changes.
9. Platform setting changes.
10. Export of finance, user, document, or audit data.

Do not implement destructive deletes for regulated or finance-sensitive records. Use `archived`, `cancelled`, `void`, `reversed`, `deactivation_requested`, or `deletion_requested` workflows as appropriate.

## Canonical Naming

Backend statuses must be stable, English, lowercase snake_case:

```text
draft
submitted
pending_review
approved
rejected
need_revision
active
inactive
paused
expired
cancelled
archived
locked
suspended
under_review
```

Event keys must use:

```text
{domain}.{entity}.{event}
```

Examples:

```text
booking.booking.submitted
payment.invoice.paid
document.item.need_revision
referral.reward.approved
report.case.status_updated
```

Audit actions must use verb values:

```text
create
view
update
approve
reject
revoke
override
export
delete_request
status_change
reverse
```

## Data Ownership Rules

| Domain | Admin Source of Truth | Notes |
| --- | --- | --- |
| Account/Auth | User Management / Auth Service | Account status, roles, sessions, locks, suspension |
| Travel Agency | Travel Agency Management | Agency verification and compliance status |
| Package | Package Management | Published package snapshot used by booking/referral |
| Booking | Booking Management | Booking lifecycle, cancellation, assignment-to-trip |
| Group Trip | Group Trip Management | Trip operations, manifests, readiness, assignment context |
| Jamaah | Jamaah Management | Sensitive profile and admin view |
| Mutawwif | Mutawwif Management | Verification, compliance, assignment eligibility |
| Flight/Hotel/Itinerary | Travel Operations modules | Operational travel data |
| Billing/Payment | Billing and Finance | Invoice, payment, verification, refund |
| Finance | Finance Management | Commission, allowance, payout prep, settlement, reversal |
| Reports/Support | Report Management | Case lifecycle, severity, escalation |
| Content | Articles, Announcements, Testimonials | Content, moderation, publishing |
| Platform Policy | Platform Settings | Global policy, ownership, feature flags, audit retention |
| Referral Reward | Admin/TA Referral Reward Management | Reward rules, review, approval, reversal, finance handoff |

## Snapshot Rules

Never silently rewrite historical business records.

Use snapshots for:

1. Booking price/package snapshot.
2. Referral attribution snapshot.
3. Reward rule/version snapshot.
4. Payment eligibility snapshot.
5. Group trip snapshot.
6. Document/service requirement snapshot.
7. Terms/policy acceptance snapshot.
8. Notification template snapshot.

Any correction after snapshot lock requires:

1. Actor.
2. Permission.
3. Reason code.
4. Old value.
5. New value.
6. Effective time.
7. Audit event.
8. User-facing notification decision.

## Module Skills

### Dashboard

Build dashboards as operational summaries, not marketing pages. Show actionable cards, pending queues, alerts, finance/readiness status, and deep links to filtered lists.

### User Management

Handle staff users, roles, permissions, invitations, access status, password reset, session policy, and login history. Never mix staff permissions with public user profile editing.

### Travel Agency Management

Support application review, legal document verification, agency status, compliance notes, profile details, and approval/rejection workflows. Agency status changes are audit-sensitive.

### Package Management

Manage package data, pricing, schedules, inclusions, publish state, and package snapshots. Published package data is consumed by JUV discovery, booking, comparison, and referral.

### Booking Management

Manage booking list/detail, status lifecycle, payment readiness, cancellation, refund references, participant data, and assignment to group trip. Booking changes can affect finance, referral, documents, and trip readiness.

### Group Trip Management

Manage group trips, manifests, jamaah assignment, mutawwif assignment, flight/hotel/itinerary links, readiness status, and operational notes.

### Jamaah Management

Manage jamaah profile/admin data, family/PIC relation, document context, booking/trip linkage, and safe visibility. Sensitive identity data must be permission-controlled.

### Mutawwif Management

Manage mutawwif profile, license, verification, account status, assignment eligibility, compliance status, and operational relationship to group trips.

### Travel Operations

Flight, Hotel, and Itinerary modules support group trip execution. They should be reusable operational data sources, not isolated static lists.

### Finance Management

Finance is the owner of payment verification, invoice, refund, commission, allowance, payout preparation, settlement, release, reversal, finance reports, and finance audit. User-facing modules display finance projections only after approved/released states.

### Report Management

Reports/support cases must use severity, category, SLA, owner, status, escalation, internal notes, and user-safe responses. Sensitive reports must not leak internal notes to user-facing apps.

### Announcement Management

Announcements should support audience targeting, delivery channel, template summary, scheduling, status, and audit. Mandatory notifications cannot be disabled by user preferences.

### Articles Management

Articles use draft/review/published/archived workflow, categories, language, SEO/public visibility, and content ownership.

### Testimonial Management

Testimonials require moderation. User-submitted feedback does not become public until approved by authorized Admin/TA workflow.

### Platform Settings

Treat settings as a policy registry, not a catch-all. Every setting needs owner, scope, permission, audit rule, effective date behavior, and module relationship.

### Referral Reward Management

Referral reward management owns program/rule registry, attribution review, eligibility checks, approval/rejection/reversal, finance handoff, and safe projection to JUV/MV.

## Default Screen Pattern

For every Admin module, prefer this structure:

1. Overview/dashboard if the module has operational volume.
2. List page with search, filters, status tabs, bulk-safe actions, and export if permitted.
3. Detail page with summary, tabs, timeline/activity, related records, documents/files where applicable.
4. Create/edit form with validation, review step for sensitive data, and save state.
5. Audit/activity log for sensitive modules.
6. Empty, loading, error, no permission, locked, and archived states.

## Required States

Every feature must define:

1. Loading.
2. Empty.
3. No result.
4. Permission denied.
5. Read-only.
6. Locked/suspended.
7. Pending review.
8. Save success.
9. Save failed.
10. Conflict detected.
11. Export processing if export exists.

## API Expectations

APIs should return:

1. Stable IDs.
2. Canonical status.
3. UI-safe label if needed.
4. Owner/source module.
5. Visibility level.
6. Permission hints for available actions.
7. `created_at`, `updated_at`, and actor fields where relevant.
8. Snapshot references for historical records.
9. Audit reference for sensitive actions.

Do not return internal notes, fraud scores, payment proof metadata, document files, or payout credentials unless permission and visibility level explicitly allow it.

## Database Expectations

Default database tables should include:

1. `created_at`, `updated_at`.
2. `created_by`, `updated_by` where user-driven.
3. `status`.
4. `agency_id` where agency-scoped.
5. `visibility_level` for sensitive projections.
6. `metadata jsonb` only for flexible non-critical metadata.
7. Audit log table for sensitive actions.

Avoid storing business-critical status only inside `metadata`.

## RLS and Scope Guidance

Admin access should still be scoped by permission. Travel Agency data must be agency-scoped. User-facing JUV/MV data must use safe projection, not raw Admin tables.

RLS should protect:

1. Agency records by `agency_id`.
2. User-owned records by `user_id`.
3. Assignment records by mutawwif assignment scope.
4. Finance records by finance permission.
5. Sensitive files by explicit file permission.

## QA Checklist

Before considering a module complete, test:

1. Role can view allowed data.
2. Role cannot view forbidden data.
3. Role cannot mutate without permission.
4. Sensitive action requires reason and audit.
5. Status uses canonical value.
6. User-facing status hides internal details.
7. Agency data isolation works.
8. Export requires explicit permission.
9. Snapshot is preserved after source change.
10. Empty/loading/error/read-only states exist.
11. Mobile/tablet/desktop layout remains usable.

## Do Not Do

1. Do not create landing pages for Admin workflows.
2. Do not expose internal finance, fraud, compliance, or audit notes to user-facing modules.
3. Do not let TA override platform-controlled settings.
4. Do not execute payout from referral or allowance screens unless Finance owns the action.
5. Do not silently edit paid, approved, released, verified, or historical snapshot records.
6. Do not create new status names when taxonomy already defines a canonical value.
7. Do not rely on frontend-only permission checks.
8. Do not store service role keys or database passwords in frontend code.

## Agent Output Requirements

When producing implementation:

1. State which PRD/module is being implemented.
2. List assumptions.
3. Use existing taxonomy and permission naming.
4. Include empty/error/no-permission states.
5. Include audit behavior for sensitive actions.
6. Mention affected cross-role consumers.
7. Keep implementation scoped to the requested module.

