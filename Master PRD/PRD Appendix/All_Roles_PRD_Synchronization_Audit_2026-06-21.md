# All Roles PRD Synchronization Audit - 21 June 2026

Product: UmrahHaji.com  
Scope: Admin Panel, Travel Agency Portal, Jamaah/User View, Mutawwif View  
Audit Type: Cross-role PRD synchronization, feature ownership, permission, status, and handoff consistency  
Status: Draft Audit  
Last Updated: 21 June 2026  

---

## 1. Executive Summary

Secara umum, PRD antar role sudah semakin tersinkron setelah penambahan Mutawwif View PRD 05-18 dan Jamaah/User View PRD 13-16. Struktur besar produk sudah terbaca jelas:

1. Admin Panel menjadi source of truth untuk master data, permission, finance, booking, group trip, package, reports, announcements, articles, testimonials, dan audit-sensitive changes.
2. Travel Agency Portal menjadi operator agency-scoped untuk package, booking, jamaah, group trip, mutawwif assignment, documents/services, finance, reports, testimonials, announcements, articles, dan settings.
3. Jamaah/User View menjadi customer-facing surface untuk discovery, booking, profile, trip, payment, notifications, support, feedback, referral, dan guidance.
4. Mutawwif View menjadi field-operation surface untuk assignment, trip execution, readiness awareness, reports, guidance, finance visibility, ratings, account security, availability, dan handover.

Kesimpulan audit: sinkronisasi sudah kuat pada domain core seperti package, booking, group trip, mutawwif assignment, reports, announcements, feedback, finance visibility, dan referral boundary. Namun belum sempurna. Ada beberapa area yang masih perlu dikunci agar implementasi tidak bercabang antar role:

1. Jamaah Documents & Service Readiness belum punya PRD mandiri, padahal Admin, TA, dan MV sudah punya padanan kuat.
2. Jamaah Account Settings & Security belum punya PRD mandiri, sementara MV sudah punya PRD 16 dan TA/Admin punya role/security settings.
3. Admin Platform Settings belum punya PRD konsolidasi, padahal banyak aturan lintas role membutuhkan owner tunggal.
4. Referral reward/campaign owner di Admin/TA masih tersebar di Finance, Package, Settings, dan Referral PRD user-facing.
5. Status taxonomy lintas role belum sepenuhnya distandardisasi: booking, payment, document, referral, report, feedback, assignment, readiness, payout.
6. Global audit/compliance log masih tersebar per module, belum ada dokumen owner tunggal.
7. Emergency/safety protocol masih muncul di Reports/Trip/Activity, tetapi belum menjadi canonical severity and escalation model lintas role.
8. Beberapa PRD lama JUV 01-12 formatnya belum sekuat JUV 13-16/MV 10-18 dalam cross-role relationship, flowchart, permission matrix, dan handoff rules.

---

## 2. Audit Input Set

Audit ini membaca dokumen berikut:

1. Master PRD Admin Panel.
2. Master PRD Travel Agency Portal.
3. Master PRD Jamaah/User View.
4. Admin module PRDs: Dashboard, User, Travel Agency, Jamaah, Mutawwif, Package, Booking, Group Trip, Flight, Hotel, Itinerary, Season, Billing, Finance, Allowance, Articles, Announcements, Testimonials, Reports.
5. Travel Agency PRD 01-15.
6. Jamaah/User View PRD 01-16.
7. Mutawwif View PRD 01-18.
8. Existing role audit outputs.

Important note: JUV PRD 13-16 are now present, so older audit statements saying they are missing are outdated.

---

## 3. Current Role Coverage

### 3.1 Admin Panel

| Domain | Coverage | Sync Assessment |
| --- | --- | --- |
| Dashboard | Exists | Good |
| User / Access | Exists | Good, but global security policy can be clearer |
| Travel Agency | Exists | Good |
| Jamaah | Exists | Good |
| Mutawwif | Exists | Good |
| Package | Exists | Good |
| Booking | Exists | Good |
| Group Trip | Exists | Good |
| Flight / Hotel / Itinerary / Season | Exists | Good |
| Billing / Payment | Exists | Good |
| Finance / Allowance | Exists | Good, needs referral reward ledger clarity |
| Articles | Exists | Good |
| Announcements | Exists | Good |
| Testimonials | Exists | Good |
| Reports | Exists | Good |
| Platform Settings | Partial / scattered | Gap |
| Global Audit / Compliance | Partial / scattered | Gap |
| Referral Campaign Admin | Partial / scattered | Gap |

Admin is strong as a back-office foundation, but several cross-role policies need a consolidated owner document.

### 3.2 Travel Agency Portal

| Domain | Coverage | Sync Assessment |
| --- | --- | --- |
| Dashboard | TA PRD 01 | Good |
| Agency Profile / Verification | TA PRD 02 | Good |
| Team & Roles | TA PRD 03 | Good |
| Package | TA PRD 04 | Good |
| Booking | TA PRD 05 | Good |
| Jamaah | TA PRD 06 | Good |
| Group Trip | TA PRD 07 | Good |
| Mutawwif Assignment | TA PRD 08 | Good |
| Documents & Services | TA PRD 09 | Good |
| Finance | TA PRD 10 | Good |
| Reports / Support | TA PRD 11 | Good |
| Testimonials | TA PRD 12 | Good |
| Announcements | TA PRD 13 | Good |
| Articles / Knowledge Base | TA PRD 14 | Good |
| Settings | TA PRD 15 | Good |
| Referral Campaign Participation | Partial inside Package/Settings/Finance | Gap |

Travel Agency Portal is the most evenly documented role. Main gap is referral campaign participation and reward rule visibility if referral becomes an agency-managed commercial feature.

### 3.3 Jamaah/User View

| Domain | Coverage | Sync Assessment |
| --- | --- | --- |
| Homepage / Public Navigation | JUV PRD 01 | Good |
| Registration / Login / Invitation | JUV PRD 02 | Good |
| Profile / Personal Data | JUV PRD 03 | Good, but account security can be separated |
| Package Discovery | JUV PRD 04 | Good |
| Booking Flow | JUV PRD 05 | Good, needs referral code capture alignment from JUV 16 |
| My Group Trip | JUV PRD 06 | Good, but can be updated with MV 17 handover signals |
| Transaction History | JUV PRD 07 | Good |
| Payment Settings | JUV PRD 08 | Good |
| Articles / Guide Content | JUV PRD 09 | Good |
| Travel Agency Public List/Profile | JUV PRD 10 | Good |
| Compare Packages | JUV PRD 11 | Good, older format |
| Checklist & Guidance | JUV PRD 12 | Good, older format |
| Notifications & Announcements | JUV PRD 13 | Good |
| Reports & Support | JUV PRD 14 | Good |
| Testimonials & Feedback | JUV PRD 15 | Good |
| Referral | JUV PRD 16 | Good |
| Documents & Service Readiness | Embedded in JUV 03/06/12 | Gap for dedicated PRD |
| Account Settings & Security | Embedded in JUV 02/03/08 | Gap for dedicated PRD |

Jamaah coverage is now solid for P1 user journey, but Documents and Account Settings should be separated to match the depth already present in TA and MV.

### 3.4 Mutawwif View

| Domain | Coverage | Sync Assessment |
| --- | --- | --- |
| Dashboard | MV PRD 01 | Good |
| Register / Invitation | MV PRD 02 | Good |
| Profile / License / Verification | MV PRD 03 | Good |
| Calendar / Schedule | MV PRD 04 | Good |
| My Group Trip | MV PRD 05 | Good |
| Activity Guidance | MV PRD 06 | Good |
| Referral | MV PRD 07 | Good |
| Allowance & Tip | MV PRD 08 | Good |
| Payment Settings | MV PRD 09 | Good |
| Notifications & Announcements | MV PRD 10 | Good |
| Reports & Support | MV PRD 11 | Good |
| Knowledge Base & Guidance Library | MV PRD 12 | Good |
| Trip Documents & Service Readiness | MV PRD 13 | Good |
| Finance Activity & Statements | MV PRD 14 | Good |
| Ratings & Feedback | MV PRD 15 | Good |
| Account Settings & Security | MV PRD 16 | Good |
| Assignment Requests & Handover | MV PRD 17 | Good |
| Availability & Assignment Preferences | MV PRD 18 | Good |

Mutawwif View is now the most complete field-role PRD set. Remaining work is mostly syncing older Admin/TA/JUV documents to consume the newer MV handover, readiness, and availability concepts.

---

## 4. Cross-Role Synchronization Matrix

| Domain | Admin | Travel Agency | Jamaah | Mutawwif | Current Sync |
| --- | --- | --- | --- | --- | --- |
| Authentication / Invitation | User Management | Team & Roles | JUV 02 | MV 02 | Good |
| Profile / Identity | Jamaah + Mutawwif + TA Mgmt | Agency Profile + Jamaah | JUV 03 | MV 03 | Good |
| Account Settings / Security | User Mgmt partial | TA 03 + TA 15 | Embedded only | MV 16 | Partial |
| Package / Discovery | Package Mgmt | TA 04 | JUV 04/10/11 | Read-only trip snapshot | Good |
| Booking | Booking Mgmt | TA 05 | JUV 05 | Read-only assignment context | Good |
| Group Trip | Group Trip Mgmt | TA 07 | JUV 06 | MV 05 | Good |
| Itinerary / Activity Execution | Itinerary + Group Trip | TA 07 | JUV 06/12 | MV 04/06 | Good, but activity acknowledgement taxonomy should be shared |
| Documents / Services | Admin docs in Jamaah/Trip | TA 09 | Embedded only | MV 13 | Partial |
| Mutawwif Assignment | Mutawwif + Group Trip Mgmt | TA 08 | JUV 06 view | MV 17/18 | Good, needs JUV reassignment/handover update |
| Notifications | Announcement Mgmt | TA 13 | JUV 13 | MV 10 | Good, event taxonomy still needs canonical owner |
| Reports / Support | Report Mgmt | TA 11 | JUV 14 | MV 11 | Good, category/severity taxonomy still needs canonical owner |
| Testimonials / Feedback | Testimonial Mgmt | TA 12 | JUV 15 | MV 15 | Good |
| Articles / Knowledge Base | Articles Mgmt | TA 14 | JUV 09/12 | MV 12 | Good |
| Finance / Billing / Transactions | Finance + Billing | TA 10 | JUV 07/08 | MV 08/09/14 | Good, reward/payout ledger needs final owner |
| Referral | Partial via Finance/Package/User | Partial via Package/Settings | JUV 16 | MV 07 | Partial |
| Audit Logs | Scattered per module | Scattered in Settings/modules | Scattered in sensitive actions | Scattered in modules | Partial |
| Emergency / Safety | Reports + Group Trip partial | Reports + Group Trip partial | JUV 14 + JUV 06 partial | MV 06/11 partial | Partial |
| Settings | Missing consolidated Admin PRD | TA 15 | Embedded only | MV 16 personal settings | Partial |

---

## 5. Strongly Synchronized Areas

### 5.1 Booking and Package Lifecycle

The package-to-booking journey is generally synchronized:

1. Admin Package Management owns global package governance.
2. TA Package Management owns agency package creation and operational package updates.
3. JUV Package Discovery, Compare Packages, Travel Agency Profile, and Booking Flow consume public package snapshots.
4. Booking Management and TA Booking Management own booking state.
5. JUV Booking Flow creates user-facing booking requests and captures payment/referral handoffs.
6. Mutawwif View does not manage bookings, which is correct. It consumes assignment/trip snapshots only.

Verdict: good sync.  
Action needed: update JUV PRD 05 with explicit referral code/link attribution from JUV PRD 16.

### 5.2 Group Trip and Itinerary Execution

The group trip model is mostly strong:

1. Admin Group Trip Management owns platform-level group trip structure.
2. TA Group Trip Management owns agency operations.
3. JUV My Group Trip shows the jamaah-facing trip detail.
4. MV My Group Trip and Activity Guidance support field execution.
5. MV Assignment/Handover and Availability now complete the mutawwif operational loop.

Verdict: good sync.  
Action needed: update JUV PRD 06 and TA PRD 08/07 references to include mutawwif reassignment/handover user-facing notifications and safe jamaah visibility.

### 5.3 Reports, Support, Feedback, and Testimonials

After JUV PRD 14 and JUV PRD 15, this domain is well connected:

1. JUV creates user-side reports and feedback.
2. MV creates mutawwif-side reports and views released feedback.
3. TA handles agency-scoped reports/testimonials.
4. Admin owns moderation, escalation, archive, analytics, and audit.

Verdict: good sync.  
Action needed: create canonical report category/severity/status dictionary so JUV/MV/TA/Admin use the same terms.

### 5.4 Notifications and Announcements

JUV PRD 13 and MV PRD 10 now match TA Announcements and Admin Announcement Management well.

Verdict: good sync.  
Action needed: create one canonical notification event map and preference taxonomy, because every module emits notifications and the source of event naming should not live only inside user-facing PRDs.

### 5.5 Finance Visibility and Payment Boundaries

Finance boundaries are now mostly healthy:

1. Admin Finance/Billing owns invoice, payment, refund, commission, allowance, payout, and finance audit.
2. TA Finance owns agency-scoped finance operations.
3. JUV Transaction History and Payment Settings are user-facing views/preferences, not finance authority.
4. MV Allowance, Payment Settings, and Finance Activity are mutawwif-facing views/preferences, not finance authority.
5. JUV Referral and MV Referral both avoid payout execution and correctly hand off to Finance/Payment Settings.

Verdict: good sync.  
Action needed: define referral reward ledger and payout/withdrawal lifecycle in Admin Finance or a dedicated Admin Referral/Reward PRD.

---

## 6. Main Gaps and Required Fixes

### 6.1 Gap 1 - Jamaah Documents & Service Readiness PRD

Current condition:

1. TA PRD 09 Documents & Services exists.
2. MV PRD 13 Trip Documents & Service Readiness exists.
3. Admin handles jamaah/trip documents in multiple modules.
4. Jamaah documents are embedded in JUV Profile, My Group Trip, and Checklist, but no dedicated JUV PRD exists.

Why it matters:

Jamaah is often the source of passport, visa photo, vaccination, family document, ticket confirmation, room/service readiness, and final trip readiness actions. Without a dedicated JUV document PRD, document upload, rejection reason, expiry, masking, family/PIC permissions, and readiness sync can drift.

Recommended action:

Create `JUV PRD 17 - Documents & Service Readiness`.

Priority: P1 if jamaah uploads or tracks own documents. P2 only if all documents are agency-managed.

### 6.2 Gap 2 - Jamaah Account Settings & Security PRD

Current condition:

1. MV PRD 16 Account Settings & Security exists.
2. TA has Team & Roles and Settings.
3. Admin has User Management.
4. JUV has login/profile/payment settings, but no consolidated account security PRD.

Why it matters:

Jamaah needs personal account controls: password, MFA if enabled, sessions, login alerts, device history, notification preference, account deletion/deactivation request, privacy consent, and family/PIC security behavior.

Recommended action:

Create `JUV PRD 18 - Account Settings & Security`, or explicitly expand JUV PRD 02/03 if module count should stay smaller.

Priority: P1 for security basics, P2 for advanced privacy/export/delete workflows.

### 6.3 Gap 3 - Admin Platform Settings PRD

Current condition:

Settings appear across Admin master navigation and module settings, but there is no consolidated Admin Platform Settings PRD.

Why it matters:

Many cross-role rules need a source of truth:

1. Referral attribution priority.
2. Notification event categories and rate limits.
3. Report category/severity/SLA.
4. Feedback/testimonial moderation defaults.
5. Document type templates and expiry rules.
6. Payment method settings.
7. Payout/withdrawal thresholds.
8. Security and MFA policies.
9. Audit retention.
10. Public content visibility.

Recommended action:

Create `Admin PRD - Platform Settings & Policy Configuration`.

Priority: P1 before development freeze.

### 6.4 Gap 4 - Admin Referral / Reward Owner

Current condition:

JUV PRD 16 and MV PRD 07 are strong user-facing referral PRDs, but the Admin/TA side of referral campaign and reward rule ownership is scattered.

Why it matters:

Referral involves campaign terms, package eligibility, Travel Agency participation, attribution rules, reward validation, fraud review, payout, reversal, disclosure copy, and audit. User-facing PRDs correctly avoid owning those controls, but the back office owner must be explicit.

Recommended action:

Option A: Add referral/reward campaign section into Admin Finance Management and TA Settings/Package.  
Option B: Create dedicated `Admin PRD - Referral & Reward Management` and optional `TA PRD - Referral Campaign Participation`.

Priority: P1 if referral launches with rewards. P2 if referral launches as non-financial tracking only.

### 6.5 Gap 5 - Canonical Status Dictionary

Current condition:

Each PRD defines statuses locally. This is useful for module clarity, but can cause inconsistent implementation.

Affected status families:

1. Booking status.
2. Payment/invoice/refund status.
3. Document readiness status.
4. Report status and priority.
5. Feedback moderation status.
6. Referral lifecycle and reward status.
7. Assignment/handover status.
8. Availability status.
9. Notification read/acknowledgement status.

Recommended action:

Create shared `Status & Event Taxonomy Appendix` used by all PRDs.

Priority: P1 before engineering schema design.

### 6.6 Gap 6 - Global Audit and Compliance Model

Current condition:

Audit logs are mentioned in many PRDs, but there is no single model for audit event ownership, retention, export, actor identity, reason requirement, and visibility.

Why it matters:

Sensitive actions span all roles:

1. Payment verification and refund.
2. Referral reward approval/reversal.
3. Document approval/rejection.
4. Booking correction.
5. Mutawwif reassignment/handover.
6. Report escalation.
7. Testimonial moderation.
8. Account lock/suspension.
9. TA verification.

Recommended action:

Create `Admin PRD - Audit Log & Compliance Trail`, or a cross-role appendix.

Priority: P1 for regulated/sensitive flows.

### 6.7 Gap 7 - Emergency and Safety Protocol

Current condition:

Emergency/safety appears in Reports, Group Trip, Activity Guidance, Notifications, and Support. It is present, but not canonical.

Why it matters:

Emergency cases need consistent severity, routing, SLA, notification, escalation, visibility, and privacy rules across Jamaah, Mutawwif, TA, and Admin.

Recommended action:

Create `Emergency & Safety Escalation Appendix` linked to:

1. JUV PRD 06 and 14.
2. MV PRD 05, 06, and 11.
3. TA PRD 07 and 11.
4. Admin Report Management and Announcement Management.

Priority: P1 if emergency reporting is in launch scope.

### 6.8 Gap 8 - Older JUV PRD Format Consistency

Current condition:

JUV PRD 13-16 and MV PRD 10-18 have stronger structure: cross-role tables, key sync rules, boundaries, flowcharts, permission logic, status models, and data fields. JUV PRD 01-12 are useful but sometimes lighter.

Affected docs:

1. JUV PRD 01 Homepage.
2. JUV PRD 02 Registration/Login.
3. JUV PRD 03 Profile.
4. JUV PRD 04 Package Discovery.
5. JUV PRD 05 Booking Flow.
6. JUV PRD 06 My Group Trip.
7. JUV PRD 09 Articles.
8. JUV PRD 10 Travel Agency Public Profile.
9. JUV PRD 11 Compare Packages.
10. JUV PRD 12 Checklist & Guidance.

Recommended action:

Do a cleanup pass after JUV PRD 17/18:

1. Add explicit cross-role boundary tables.
2. Add key sync rules.
3. Add canonical status references.
4. Add Mermaid flowcharts where missing.
5. Add permission/action matrices where sensitive.
6. Add data ownership and handoff rules.

Priority: P2 for documentation polish, P1 for Booking/Profile/Documents.

---

## 7. Detailed Domain Findings

### 7.1 Identity, Account, and Permission

Current sync:

1. Admin User Management owns account and portal access.
2. TA Team & Roles owns agency staff roles.
3. JUV Registration/Login and Profile own jamaah onboarding/profile.
4. MV Register/Profile/Account Settings own mutawwif onboarding/profile/security.

Finding:

The identity chain is good, but Jamaah lacks a dedicated account security equivalent to MV PRD 16.

Required fix:

Create or expand Jamaah account settings with:

1. Password change/reset.
2. MFA preference if enabled.
3. Active sessions/devices.
4. Login alerts.
5. Notification preference.
6. Data/privacy consent.
7. Account deletion/deactivation request.
8. Family/PIC security scope.

### 7.2 Package, Travel Agency Profile, and Public Discovery

Current sync:

1. Admin Package and TA Package are the owners.
2. JUV Discovery, Compare, and TA Public Profile consume public data.
3. Referral now can deep-link into package/agency destinations.

Finding:

Public package data is synchronized well. The main addition needed is a formal rule that referral share cards must use package snapshots and availability from Package/TA sources, not Referral-owned data.

Required fix:

Update JUV PRD 04/10/11 and TA PRD 04 with referral-enabled visibility fields if referral is launch scope.

### 7.3 Booking, Payment, and Transaction

Current sync:

1. Booking is owned by Admin/TA Booking.
2. JUV Booking submits/continues user booking.
3. JUV Transaction History displays receipts and records.
4. JUV Payment Settings stores preferences only.
5. MV finance modules correctly avoid booking/payment authority.

Finding:

The boundary is good. Referral attribution must be added explicitly to JUV Booking Flow if not already updated.

Required fix:

Add booking attribution snapshot fields:

1. referral_code.
2. referral_link_id.
3. attribution_source.
4. attribution_priority_rule.
5. attribution_locked_at.
6. attribution_correction_reason.

### 7.4 Documents and Service Readiness

Current sync:

1. TA has strong Documents & Services.
2. MV has read-only Trip Documents & Service Readiness.
3. JUV has document mentions in Profile/My Trip/Checklist.

Finding:

This is the biggest remaining Jamaah-side module gap.

Required fix:

Create JUV Documents & Service Readiness with:

1. Own document upload.
2. Family/PIC document management.
3. Passport/visa/photo/vaccination/ticket/service readiness.
4. Rejection reason and resubmit.
5. Expiry reminders.
6. TA/Admin review status.
7. Mutawwif-safe readiness projection.
8. Sensitive document masking.

### 7.5 Group Trip, Activity, Assignment, and Handover

Current sync:

1. Admin/TA manage group trips and mutawwif assignment.
2. MV has trip, activity, assignment request, handover, and availability.
3. JUV has My Group Trip.

Finding:

The mutawwif side is now ahead of older JUV/TA documents. JUV should explicitly show reassignment/handover notification and safe assigned-mutawwif history if needed.

Required fix:

Update:

1. JUV PRD 06 - show assigned mutawwif changed, handover note if user-facing.
2. JUV PRD 13 - add assignment/handover notification events.
3. TA PRD 08 - link to MV PRD 17/18 lifecycle.
4. Admin Group Trip / Mutawwif Management - align handover status.

### 7.6 Notifications and Announcements

Current sync:

1. Admin Announcement Management.
2. TA Announcements.
3. JUV PRD 13.
4. MV PRD 10.

Finding:

Feature coverage is good. Main risk is event naming drift.

Required fix:

Create a canonical notification event registry:

1. event_key.
2. source_module.
3. target_role.
4. priority.
5. channel eligibility.
6. acknowledgement_required.
7. deep_link_target.
8. privacy level.
9. rate limit.
10. retention.

### 7.7 Reports, Support, and Emergency

Current sync:

1. Admin Report Management.
2. TA Reports/Support.
3. JUV Reports/Support.
4. MV Reports/Support.

Finding:

Coverage is good. Emergency/safety severity still needs a canonical escalation model.

Required fix:

Create shared report taxonomy:

1. category.
2. subcategory.
3. severity.
4. SLA.
5. owner role.
6. visible-to roles.
7. escalation path.
8. evidence rules.
9. privacy restrictions.
10. reopen rules.

### 7.8 Testimonials, Feedback, Ratings, and Tip Boundary

Current sync:

1. Admin Testimonial Management owns moderation.
2. TA Testimonials consumes agency-scoped feedback.
3. JUV Testimonials & Feedback is the source surface.
4. MV Ratings & Feedback receives released projection.
5. Tip/gratuity is separated from positive review.

Finding:

This is well synchronized.

Required fix:

Small cleanup only: standardize feedback status labels across Admin, TA, JUV, and MV.

### 7.9 Referral and Reward

Current sync:

1. JUV Referral now exists.
2. MV Referral exists.
3. JUV Payment Settings and Transaction History provide downstream handoff.
4. MV Allowance/Tip, Payment Settings, and Finance Statements provide downstream handoff.

Finding:

User-facing boundary is good. Back-office owner is still partial.

Required fix:

Define whether referral is:

1. Non-financial tracking.
2. Voucher/discount.
3. Wallet credit.
4. Cash payout.
5. Referral reward statement.
6. Donation/infaq option.

Then add corresponding Admin/TA management owner.

### 7.10 Articles, Guidance, and Checklist

Current sync:

1. Admin Articles owns official content.
2. TA Articles owns agency notes/knowledge base.
3. JUV Articles and Checklist consume user guidance.
4. MV Knowledge Base consumes mutawwif guidance.

Finding:

Good sync. The missing piece is a canonical taxonomy for content category, trip phase, ritual phase, target role, and visibility.

Required fix:

Create shared content taxonomy fields:

1. content_type.
2. target_role.
3. trip_phase.
4. ritual_phase.
5. package_type.
6. agency_scope.
7. visibility.
8. language.
9. version.

---

## 8. Required Cross-Role Appendices

These appendices would reduce future PRD drift:

| Appendix | Purpose | Priority |
| --- | --- | --- |
| Status & Event Taxonomy | Canonical statuses/events across all modules | P1 |
| Notification Event Registry | Shared notification keys and delivery rules | P1 |
| Report Category & Severity Matrix | Shared support/emergency taxonomy | P1 |
| Audit Log & Compliance Model | Shared audit actor/action/reason/retention rules | P1 |
| Data Ownership Matrix | Clarify source of truth for each entity | P1 |
| Privacy & Masking Rules | Shared masking rules for jamaah, mutawwif, payment, docs | P1 |
| Referral Reward Policy | Attribution, reward, reversal, payout, disclosure | P1 if referral rewards launch |
| Document Type & Readiness Taxonomy | Shared document/service status model | P1 |
| Content & Guidance Taxonomy | Shared categories across Articles/Guidance/Checklist | P2 |

---

## 9. Recommended Next PRD Sequence

Based on remaining sync gaps, the best next sequence is:

| Order | PRD / Document | Why |
| --- | --- | --- |
| 1 | JUV PRD 17 - Documents & Service Readiness | Biggest remaining Jamaah P1 sync gap |
| 2 | JUV PRD 18 - Account Settings & Security | Needed to match MV 16 and security model |
| 3 | Admin PRD - Platform Settings & Policy Configuration | Needed for cross-role policies |
| 4 | Admin PRD - Audit Log & Compliance Trail | Needed for sensitive operations |
| 5 | Cross-Role Status & Event Taxonomy Appendix | Needed before engineering schema lock |
| 6 | Referral & Reward Management Appendix / Admin PRD | Needed if referral rewards launch |
| 7 | Emergency & Safety Escalation Appendix | Needed if emergency reporting is launch scope |

---

## 10. Immediate Fix List

### P1 Documentation Fixes

1. Create JUV PRD 17 - Documents & Service Readiness.
2. Create JUV PRD 18 - Account Settings & Security.
3. Update JUV PRD 05 Booking Flow with referral attribution snapshot from JUV PRD 16.
4. Update JUV PRD 06 My Group Trip with mutawwif reassignment/handover visibility from MV PRD 17.
5. Update JUV PRD 13 Notifications with assignment/handover and documents readiness event keys.
6. Create canonical status taxonomy before development.
7. Create canonical report category/severity taxonomy before development.
8. Decide referral reward model and back-office owner.

### P2 Documentation Fixes

1. Normalize JUV PRD 01-12 to the richer structure of JUV PRD 13-16.
2. Add missing Mermaid IA/flowchart diagrams to older PRDs where useful.
3. Add stronger data ownership tables to JUV PRD 01-12.
4. Add shared content taxonomy for Articles/Guidance/Checklist.
5. Add cross-role analytics event naming.
6. Add user-facing copy rules for sensitive states.

---

## 11. Final Audit Verdict

The PRD set is now mostly synchronized across Admin, Travel Agency, Jamaah, and Mutawwif roles.

The strongest synchronized domains are:

1. Package and booking lifecycle.
2. Group trip and mutawwif assignment.
3. Notifications and announcements.
4. Reports and support.
5. Testimonials and feedback.
6. Finance visibility boundaries.
7. Referral user-facing boundaries.
8. Knowledge base and guidance.

The remaining weak points are not fundamental product gaps, but ownership and taxonomy gaps:

1. Jamaah Documents & Service Readiness needs its own PRD.
2. Jamaah Account Settings & Security needs its own PRD or a strong expansion.
3. Admin Platform Settings needs a consolidated owner.
4. Referral reward/campaign management needs back-office ownership.
5. Status/event/report/audit taxonomies need canonical shared appendices.

Recommended next step: continue with `JUV PRD 17 - Documents & Service Readiness`, then `JUV PRD 18 - Account Settings & Security`, before doing a cleanup pass on JUV PRD 01-12 and cross-role appendices.
