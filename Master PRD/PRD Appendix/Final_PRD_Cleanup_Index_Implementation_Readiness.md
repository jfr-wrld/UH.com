# Final PRD Cleanup Index & Implementation Readiness

Product: UmrahHaji.com  
Scope: Admin Panel, Travel Agency Portal, Jamaah/User View, Mutawwif View  
Document Type: Final PRD cleanup, indexing, source-of-truth map, and implementation readiness guide  
Status: Draft for implementation handoff  
Last Updated: 21 June 2026  

---

## 1. Objective

This document is the final cleanup and indexing layer for the UmrahHaji.com PRD set.

It consolidates:

1. Which PRDs are source of truth for each role.
2. Which older baseline documents should remain referenced.
3. Which newer documents supersede or extend earlier drafts.
4. Which appendix and audit documents must be used across roles.
5. Which P1 synchronization gaps have been closed.
6. Which implementation sequence should be followed.
7. Which decisions remain open before engineering starts building high-risk flows.

This document does not replace the PRDs. It is an index and handoff guide.

---

## 2. Source-of-Truth Rule

Use the newest role-specific PRD when a module exists in the current output set.

If a module exists only in the earlier baseline output folder, use the earlier baseline PRD as source of truth until a newer replacement is created.

Cross-role taxonomy, status naming, event naming, audit actions, reason codes, snapshots, and visibility rules should follow:

1. `Cross_Role_Status_Event_Taxonomy_Appendix.md`
2. `Admin_PRD_Platform_Settings_Policy_Configuration.md`
3. `Admin_TA_PRD_Referral_Reward_Management.md`
4. Role-specific PRD for local UI and workflow behavior

### 2.1 Supersession Rule

| Case | Rule |
| --- | --- |
| Same PRD number exists in old baseline and current output | Current output supersedes baseline |
| Module exists only in old baseline | Keep baseline as source until revised |
| Cross-role status conflict exists | Taxonomy Appendix wins |
| Platform vs agency setting conflict exists | Platform Settings wins unless explicitly delegated |
| Referral reward conflict exists | Admin/TA Referral Reward Management wins for policy/review/finance handoff |
| Finance payout conflict exists | Admin Finance / TA Finance wins for payout/release/settlement |
| User-facing display conflict exists | Role PRD wins for UI, but cannot override ownership/security rules |

---

## 3. Final Document Families

### 3.1 Governance and Audit Documents

| Document | Status | Purpose |
| --- | --- | --- |
| All Roles PRD Synchronization Audit | Current | Cross-role audit of synchronization gaps |
| All Roles Feature Sync Audit | Current | Feature/menu sync audit across roles |
| MV Feature Gap Audit | Current | Mutawwif-specific gap audit |
| Cross-Role Taxonomy Appendix | Current | Canonical status, event, reason, snapshot, and audit taxonomy |
| Final PRD Cleanup Index | Current | Final source-of-truth index and handoff guide |

### 3.2 Cross-Role Gap Closure Documents

| Priority Gap | Closing Document | Implementation Meaning |
| --- | --- | --- |
| P1-1 JUV Documents & Service Readiness | JUV PRD 17 | Jamaah service/document readiness now syncs with TA/Admin/MV readiness |
| P1-2 JUV Account Settings & Security | JUV PRD 18 | Jamaah account/security policy now syncs with Admin auth and MV account settings |
| P1-3 Status/Event/Report/Audit Taxonomy | Taxonomy Appendix | All roles share canonical status/event/audit naming |
| P1-4 Admin Platform Settings & Policy Configuration | Admin Platform Settings PRD | Platform rules now have Admin-owned policy registry |
| P1-5 Admin/TA Referral Reward Management | Admin/TA Referral Reward PRD | Referral reward policy, review, approval, reversal, and Finance handoff now have back-office owner |

---

## 4. Final Role Index

### 4.1 Admin Panel

Admin baseline PRDs remain in the earlier output folder. Current output adds the missing platform policy and referral reward ownership layer.

| Area | Source Document | Current Status | Notes |
| --- | --- | --- | --- |
| Admin Master | Admin Master PRD | Baseline | Overall Admin structure |
| Admin Dashboard | Admin Dashboard PRD | Baseline | Dashboard and overview |
| User Management | User Management PRD | Baseline | Auth, roles, sessions, security permissions |
| Travel Agency Management | Travel Agency Management PRD | Baseline | Agency onboarding, verification, status |
| Package Management | Package Management PRD | Baseline | Package/source snapshot for booking/referral |
| Booking Management | Booking Management PRD | Baseline | Booking lifecycle and status owner |
| Group Trip Management | Group Trip Management PRD | Baseline | Trip and assignment source |
| Jamaah Management | Jamaah Management PRD | Baseline | Jamaah profile/admin view |
| Mutawwif Management | Mutawwif Management PRD | Baseline | Mutawwif account, verification, compliance |
| Itinerary Management | Itinerary Management PRD | Baseline | Trip/activity structure |
| Documents/Services via TA/Admin | TA Documents & Services | Baseline | Operational document verification owner |
| Billing & Payment | Billing Management PRD | Baseline | Invoice/payment source |
| Finance Management | Finance Management PRD | Baseline | Commission, allowance, payout prep, reports |
| Allowance Management | Allowance Management PRD | Baseline | Operational allowance owner |
| Report Management | Report Management PRD | Baseline | Support/report owner |
| Announcement Management | Announcement Management PRD | Baseline | Notification/announcement source |
| Articles Management | Articles Management PRD | Baseline | Content source |
| Testimonial Management | Testimonial Management PRD | Baseline | Moderation source |
| Platform Settings | Admin Platform Settings PRD | Current | New source for global settings/policy registry |
| Referral Reward Management | Admin/TA Referral Reward PRD | Current | New source for referral program/reward back-office |

### 4.2 Travel Agency Portal

TA baseline PRDs are mostly complete. Current additions clarify platform policy and referral reward delegation.

| PRD | Module | Source Status | Implementation Notes |
| --- | --- | --- | --- |
| TA PRD 01 | Dashboard | Baseline | Use existing TA dashboard PRD |
| TA PRD 02 | Agency Profile & Verification Status | Baseline | Sync with Admin agency verification |
| TA PRD 03 | Team & Roles | Baseline | Must respect role/permission logic |
| TA PRD 04 | Package Management | Baseline | Source of agency package participation |
| TA PRD 05 | Booking Management | Baseline | Agency booking owner |
| TA PRD 06 | Jamaah Management | Baseline | Agency-scoped jamaah visibility |
| TA PRD 07 | Group Trip Management | Baseline | Group trip owner for agency |
| TA PRD 08 | Mutawwif Assignment | Baseline | Assignment owner for TA/MV sync |
| TA PRD 09 | Documents & Services | Baseline | Source for document/service readiness |
| TA PRD 10 | Finance Management | Baseline | Agency finance/settlement source |
| TA PRD 11 | Reports & Support | Baseline | Agency support workflow |
| TA PRD 12 | Testimonials | Baseline | Agency testimonial moderation |
| TA PRD 13 | Announcements | Baseline | Agency notification/announcement workflow |
| TA PRD 14 | Articles / Knowledge Base | Baseline | Agency content if enabled |
| TA PRD 15 | Settings | Baseline | Agency settings and ownership model |
| TA Extension | Referral Reward Management | Current | Use Admin/TA Referral Reward PRD where agency referral management is delegated |
| TA Extension | Platform Settings read-only policy | Current | Use Admin Platform Settings PRD for platform-controlled settings |

### 4.3 Jamaah/User View

JUV PRD 01-12 remain from the earlier baseline. JUV PRD 13-18 are current output and should be treated as the latest documents for those modules.

| PRD | Module | Source Status | Implementation Notes |
| --- | --- | --- | --- |
| JUV PRD 01 | Homepage / Public Navigation | Baseline | Public entry and navigation |
| JUV PRD 02 | Registration, Login, Invitation Acceptance | Baseline | Auth entry and invitation flow |
| JUV PRD 03 | Profile & Personal Data | Baseline | Jamaah identity data |
| JUV PRD 04 | Package Discovery & Search | Baseline | Package browsing/referral destination |
| JUV PRD 05 | Booking Flow | Baseline | Booking attribution capture |
| JUV PRD 06 | My Group Trip & Trip Details | Baseline | Jamaah trip view |
| JUV PRD 07 | Transaction History & Receipts | Baseline | Finance activity display after release |
| JUV PRD 08 | Payment Settings | Baseline | Payment/refund/payout destination preferences |
| JUV PRD 09 | Articles / Guide Content | Baseline | Content consumption |
| JUV PRD 10 | Travel Agency Public List & Profile | Baseline | Agency discovery |
| JUV PRD 11 | Compare Packages | Baseline | Package comparison |
| JUV PRD 12 | Checklist & Guidance | Baseline | Trip/document/task checklist |
| JUV PRD 13 | Notifications & Announcements | Current | Canonical notification behavior |
| JUV PRD 14 | Reports & Support | Current | Support/report sync |
| JUV PRD 15 | Testimonials & Feedback | Current | Feedback/testimonial sync |
| JUV PRD 16 | Referral | Current | User-facing referral sharing/status |
| JUV PRD 17 | Documents & Service Readiness | Current | New readiness sync module |
| JUV PRD 18 | Account Settings & Security | Current | New account/security sync module |

### 4.4 Mutawwif View

MV PRD 01-04 remain from earlier baseline. MV PRD 05-18 in the current output should be treated as the latest source of truth.

| PRD | Module | Source Status | Implementation Notes |
| --- | --- | --- | --- |
| MV PRD 01 | Home Dashboard | Baseline | Mutawwif main dashboard |
| MV PRD 02 | Register / Invitation Acceptance | Baseline | Auth/invitation |
| MV PRD 03 | Profile / License Verification | Baseline | Mutawwif profile and verification |
| MV PRD 04 | Calendar & Schedule | Baseline | Schedule foundation |
| MV PRD 05 | My Group Trip & Trip Details | Current | Trip detail and assigned group context |
| MV PRD 06 | Activity Guidance / Daily Itinerary Execution | Current | Daily operational guidance |
| MV PRD 07 | Referral | Current | Mutawwif referral sharing/status |
| MV PRD 08 | Allowance & Tip | Current | Balance/allowance/tip/withdrawal readiness |
| MV PRD 09 | Payment Settings | Current | Payout destination setup |
| MV PRD 10 | Notifications & Announcements | Current | Mutawwif notifications |
| MV PRD 11 | Reports & Support | Current | Mutawwif support/reporting |
| MV PRD 12 | Knowledge Base & Guidance Library | Current | Guidance library |
| MV PRD 13 | Trip Documents & Service Readiness | Current | Assigned-trip readiness visibility |
| MV PRD 14 | Finance Activity & Statements | Current | Read-only finance ledger projection |
| MV PRD 15 | Ratings & Feedback | Current | Feedback and ratings |
| MV PRD 16 | Account Settings & Security | Current | Account/security settings |
| MV PRD 17 | Assignment Requests & Handover | Current | Assignment acceptance/replacement/handover |
| MV PRD 18 | Availability & Assignment Preferences | Current | Availability and assignment preferences |

---

## 5. Implementation Priority Index

### 5.1 Foundation First

| Priority | Area | Why First |
| --- | --- | --- |
| P0 | Account/Auth/User Management | All roles depend on account, session, role, permission, lock/suspend |
| P0 | Role/Permission Framework | Needed before sensitive Admin/TA/JUV/MV workflows |
| P0 | Taxonomy Appendix | Prevents incompatible status/event/audit naming |
| P0 | Platform Settings | Defines platform-controlled vs agency-controlled vs user-controlled settings |
| P0 | Package/Agency/Booking Core | Booking, referral, finance, trip, readiness all depend on these records |

### 5.2 Role Workflow Core

| Priority | Area | Roles Affected |
| --- | --- | --- |
| P1 | TA Package + Booking + Group Trip | TA, Admin, JUV, MV |
| P1 | JUV Package Discovery + Booking + My Trip | JUV, TA, Admin |
| P1 | MV Trip Detail + Activity Guidance | MV, TA, Admin, JUV |
| P1 | Documents & Service Readiness | JUV, MV, TA, Admin |
| P1 | Notifications & Announcements | All roles |
| P1 | Reports & Support | All roles |

### 5.3 Finance and Referral

| Priority | Area | Notes |
| --- | --- | --- |
| P1 | Billing/Payment/Transaction History | Needed before reward/finance projections |
| P1 | Finance Management / TA Finance | Source of payout, release, settlement, reversal |
| P1 | MV Allowance & Tip + Payment Settings | Needed for mutawwif payout readiness |
| P1 | Referral Sharing JUV/MV | User-facing referral code/link/status |
| P1 | Admin/TA Referral Reward Management | Back-office reward decision and Finance handoff |
| P2 | Automated payout / advanced reward campaign | Keep out of Phase 1 unless business approves |

---

## 6. Cross-Role Synchronization Map

### 6.1 Account, Security, and Permissions

| Source of Truth | Consumers | Rule |
| --- | --- | --- |
| Admin User Management / Auth Service | TA, JUV, MV | Account status, session, MFA, lock/suspend, password reset |
| Admin Platform Settings | TA, JUV, MV | Security policy labels and global rules |
| JUV PRD 18 / MV PRD 16 | User-facing account screens | Cannot override Admin/Auth state |

### 6.2 Booking, Trip, and Assignment

| Source of Truth | Consumers | Rule |
| --- | --- | --- |
| Admin/TA Booking Management | JUV My Trip, MV Trip, Finance, Referral | Booking status and attribution snapshot |
| Admin/TA Group Trip Management | JUV My Trip, MV Trip, Documents/Readiness | Group trip snapshot |
| TA Mutawwif Assignment | MV assignment and JUV mutawwif display | Assignment status and handover logic |
| MV PRD 17/18 | TA/Admin assignment planning | Mutawwif action/preferences are inputs, not final assignment authority |

### 6.3 Documents and Service Readiness

| Source of Truth | Consumers | Rule |
| --- | --- | --- |
| TA Documents & Services + Admin policy | JUV PRD 17, MV PRD 13, reports/support | Verification owner is TA/Admin |
| JUV PRD 17 | Jamaah upload/readiness view | Jamaah can submit but not verify |
| MV PRD 13 | Mutawwif trip-readiness view | Mutawwif sees assignment-safe readiness only |
| Taxonomy Appendix | All | Readiness statuses must use canonical names |

### 6.4 Finance, Allowance, and Payout

| Source of Truth | Consumers | Rule |
| --- | --- | --- |
| Admin Finance / TA Finance | JUV Transaction, MV PRD 08/09/14, Referral Reward | Finance owns release, payout, reversal, settlement |
| MV PRD 08 | Mutawwif balance/withdrawal request | Cannot approve or execute payout |
| MV PRD 09 | Mutawwif payout destination | Stores preference, not finance authority |
| MV PRD 14 | Mutawwif finance activity | Read-only projection after Finance release |
| JUV Transaction History | Jamaah/user finance history | Shows only released user-safe records |

### 6.5 Referral

| Source of Truth | Consumers | Rule |
| --- | --- | --- |
| Admin/TA Referral Reward Management | JUV PRD 16, MV PRD 07, Finance | Program/rule/review/reward decision owner |
| Booking Flow | Referral Reward Management | Stores attribution snapshot |
| Finance Management | JUV Transaction, MV Finance Activity, Referral Reward | Release/payout/paid/reversal owner |
| JUV PRD 16 / MV PRD 07 | Users | Share, track, and view safe status only |

### 6.6 Reports, Support, Feedback, and Notifications

| Source of Truth | Consumers | Rule |
| --- | --- | --- |
| Admin/TA Report Management | JUV PRD 14, MV PRD 11 | Case lifecycle and severity owner |
| Admin/TA Announcement Management | JUV PRD 13, MV PRD 10 | Announcement templates, routing, audience |
| Admin/TA Testimonial Management | JUV PRD 15, MV PRD 15 | Moderation and display owner |
| Taxonomy Appendix | All | Notification categories, report severity, audit actions |

---

## 7. Canonical Naming and Versioning Rules

### 7.1 Backend Naming

1. Status values use lowercase snake_case.
2. Event keys use `{domain}.{entity}.{event}`.
3. Audit actions use verb-based values such as `create`, `update`, `approve`, `reject`, `reverse`, `override`, `export`, and `status_change`.
4. Permission keys use role/module scope such as `admin.referral.reward.approve`.
5. User-facing labels can be localized and simplified, but backend values must remain canonical.

### 7.2 Snapshot Rule

The following records must use snapshots:

1. Booking price/package snapshot.
2. Referral attribution snapshot.
3. Reward rule/version snapshot.
4. Payment eligibility snapshot.
5. Group trip snapshot.
6. Document/service requirement snapshot.
7. Notification template snapshot.
8. Terms/policy acceptance snapshot.

### 7.3 Correction Rule

Any correction after snapshot lock requires:

1. Actor.
2. Permission.
3. Reason code.
4. Old value.
5. New value.
6. Effective time.
7. Audit event.
8. User-facing notification decision.

---

## 8. Menu Coverage Check

### 8.1 Admin Panel

| Menu | Coverage |
| --- | --- |
| Dashboard | Covered |
| User Management | Covered |
| Travel Agency Management | Covered |
| Package Management | Covered |
| Booking Management | Covered |
| Group Trip Management | Covered |
| Jamaah Management | Covered |
| Mutawwif Management | Covered |
| Documents/Services | Covered via TA/Admin docs and readiness PRDs |
| Finance Management | Covered |
| Referral Reward Management | Covered by new P1-5 |
| Reports/Support | Covered |
| Announcements | Covered |
| Articles/Knowledge Base | Covered |
| Testimonials/Feedback | Covered |
| Platform Settings | Covered by new P1-4 |
| Audit/Taxonomy | Covered by appendix/audit docs |

### 8.2 Travel Agency Portal

| Menu | Coverage |
| --- | --- |
| Dashboard | Covered |
| Agency Profile | Covered |
| Team & Roles | Covered |
| Package Management | Covered |
| Booking Management | Covered |
| Jamaah Management | Covered |
| Group Trip Management | Covered |
| Mutawwif Assignment | Covered |
| Documents & Services | Covered |
| Finance Management | Covered |
| Referral Campaign/Reward | Covered as delegated extension |
| Reports & Support | Covered |
| Testimonials | Covered |
| Announcements | Covered |
| Articles/Knowledge Base | Covered |
| Settings | Covered |

### 8.3 Jamaah/User View

| Menu | Coverage |
| --- | --- |
| Home/Public Navigation | Covered |
| Registration/Login | Covered |
| Profile | Covered |
| Package Discovery/Search | Covered |
| Booking Flow | Covered |
| My Group Trip | Covered |
| Transaction History | Covered |
| Payment Settings | Covered |
| Articles/Guide | Covered |
| Travel Agency Public Profile | Covered |
| Compare Packages | Covered |
| Checklist/Guidance | Covered |
| Notifications/Announcements | Covered |
| Reports/Support | Covered |
| Testimonials/Feedback | Covered |
| Referral | Covered |
| Documents/Service Readiness | Covered |
| Account Settings/Security | Covered |

### 8.4 Mutawwif View

| Menu | Coverage |
| --- | --- |
| Home Dashboard | Covered |
| Register/Invitation | Covered |
| Profile/License Verification | Covered |
| Calendar/Schedule | Covered |
| My Group Trip | Covered |
| Activity Guidance | Covered |
| Referral | Covered |
| Allowance & Tip | Covered |
| Payment Settings | Covered |
| Notifications/Announcements | Covered |
| Reports/Support | Covered |
| Knowledge Base | Covered |
| Trip Documents/Service Readiness | Covered |
| Finance Activity/Statements | Covered |
| Ratings/Feedback | Covered |
| Account Settings/Security | Covered |
| Assignment Requests/Handover | Covered |
| Availability/Assignment Preferences | Covered |

---

## 9. Remaining Business Decisions Before Development

These are not blockers for PRD completeness, but they should be decided before implementation of sensitive modules.

| Decision | Owner | Impact |
| --- | --- | --- |
| Whether referral reward launches as attribution-only, fixed amount, percentage, voucher, wallet credit, or manual review | Product + Finance | Affects Referral Reward Management, JUV/MV Referral, Finance |
| Whether TA reward approval is final or only recommendation | Product + Finance + Operations | Affects TA permissions and Admin review queue |
| Referral reward release trigger: payment paid, trip completed, or post-trip hold period | Product + Finance | Affects Finance handoff and user-facing reward status |
| Reversal window after cancellation/refund | Finance + Legal/Compliance | Affects reward reversal and statements |
| Maker-checker requirement for finance/security/referral settings | Product + Compliance | Affects Platform Settings and Referral Reward Management |
| Audit retention period by domain | Compliance + Engineering | Affects audit storage and export |
| Which exports are allowed for TA vs Admin | Product + Compliance | Affects finance/referral/report export |
| Whether multi-currency is P1 or P2 | Product + Finance | Affects finance and reward models |

---

## 10. Implementation Handoff Checklist

### 10.1 Before Engineering Starts

1. Lock role and permission keys.
2. Lock canonical status/event/audit taxonomy.
3. Confirm source-of-truth ownership per module.
4. Confirm Phase 1 referral reward policy.
5. Confirm finance release and reversal behavior.
6. Confirm platform vs agency setting delegation.
7. Confirm audit retention and export rules.
8. Confirm user-facing copy rules for sensitive statuses.

### 10.2 During Engineering

1. Build shared enums from Taxonomy Appendix.
2. Build role/permission checks before module screens.
3. Implement snapshots for booking, referral, payment eligibility, document readiness, and policy terms.
4. Use safe projection APIs for JUV/MV.
5. Keep Admin/TA internal notes and risk signals out of user-facing responses.
6. Emit audit events for sensitive actions.
7. Wire notifications through canonical event keys.
8. Validate agency scope on every TA query.

### 10.3 Before QA Signoff

1. Test cross-role status sync.
2. Test permission denial and read-only states.
3. Test agency data isolation.
4. Test user-safe masking.
5. Test referral approval/rejection/reversal to JUV/MV display.
6. Test finance release to transaction/finance activity display.
7. Test document readiness from TA/Admin to JUV/MV.
8. Test notification deep links re-check permission.
9. Test audit logs for sensitive actions.
10. Test exports with allowed and denied users.

---

## 11. Final Readiness Assessment

The PRD set is ready as a Phase 1 product and engineering baseline.

The major cross-role gaps have been closed:

1. JUV document/service readiness is now defined.
2. JUV account/security settings are now defined.
3. Cross-role status/event/report/audit taxonomy is now defined.
4. Admin platform policy/settings ownership is now defined.
5. Admin/TA referral reward back-office ownership is now defined.

Implementation should proceed with the taxonomy and platform policy documents treated as shared foundations, then role-specific PRDs used for UI, screen behavior, local flows, and acceptance criteria.

---

## 12. Final Product Decision

Use this index as the final PRD handoff map for UmrahHaji.com Phase 1 planning.

The current document set is coherent enough for implementation planning, technical discovery, backlog creation, and QA scenario drafting. Any future PRD additions should reference this index, the Taxonomy Appendix, and the Platform Settings PRD before defining new statuses, permissions, settings, or cross-role workflows.
