# All Roles Feature Sync Audit - Admin, Travel Agency, Jamaah, Mutawwif

Product: UmrahHaji.com  
Scope: Cross-role feature/menu audit, ownership, permission, and synchronization  
Roles: Admin Panel, Travel Agency Portal, Jamaah/User View, Mutawwif View  
Status: Draft Audit  
Last Updated: 20 June 2026  

---

## 1. Executive Summary

Audit ini membandingkan fitur lintas role berdasarkan dokumen Admin Panel, Travel Agency Portal, Jamaah/User View, Mutawwif View PRD 01-18, serta gap audit Mutawwif sebelumnya.

Hasil utama:

1. Admin Panel sudah kuat sebagai source of truth untuk master data, user access, finance, group trip, reports, announcements, articles, testimonials, dan operational governance.
2. Travel Agency Portal sudah kuat untuk agency-scoped operation: package, booking, jamaah, group trip, mutawwif assignment, documents/services, finance, reports, testimonials, announcements, articles, settings.
3. Mutawwif View sudah jauh lebih lengkap setelah PRD 05-18: notifications, reports, guidance, documents readiness, finance statements, ratings, account settings, assignment requests, availability.
4. Gap terbesar sekarang ada di Jamaah/User View detail PRD. Master Jamaah menyebut beberapa P1 module, tetapi detail PRD markdown belum ada untuk Notifications, Referral, Testimonials/Feedback, dan Reports/Support.
5. Ada beberapa cross-role infrastructure yang masih tersebar dan belum punya owner dokumen yang tegas: Admin Platform Settings, global audit/compliance log, staff personal account settings, emergency/safety protocol, dan assignment/service completion evidence.

---

## 2. Role Inventory

### 2.1 Admin Panel

Existing Admin modules:

| Domain | Existing Document |
| --- | --- |
| Dashboard | Module PRD Admin Dashboard |
| User / Access | Module PRD User Management |
| Travel Agency | Module PRD Travel Agency Management |
| Jamaah | Module PRD Jamaah Management |
| Mutawwif | Module PRD Mutawwif Management |
| Package | Module PRD Package Management |
| Booking | Module PRD Booking Management |
| Group Trip | Module PRD Group Trip Management |
| Flight / Hotel / Itinerary / Season | Module PRDs exist |
| Finance / Billing / Allowance | Module PRDs exist |
| Articles | Module PRD Articles Management |
| Announcements | Module PRD Announcement Management |
| Testimonials | Module PRD Testimonial Management |
| Reports | Module PRD Report Management |

Admin is mostly complete, but "Settings" appears in master navigation without a single consolidated Admin Settings PRD.

### 2.2 Travel Agency Portal

Existing Travel Agency modules:

| Domain | Existing Document |
| --- | --- |
| Dashboard | TA PRD 01 |
| Agency Profile | TA PRD 02 |
| Team & Roles | TA PRD 03 |
| Package | TA PRD 04 |
| Booking | TA PRD 05 |
| Jamaah | TA PRD 06 |
| Group Trip | TA PRD 07 |
| Mutawwif Assignment | TA PRD 08 |
| Documents & Services | TA PRD 09 |
| Finance | TA PRD 10 |
| Reports / Support | TA PRD 11 |
| Testimonials | TA PRD 12 |
| Announcements | TA PRD 13 |
| Articles / Knowledge Base | TA PRD 14 |
| Settings | TA PRD 15 |

Travel Agency Portal is mostly complete and is the most evenly documented role.

### 2.3 Jamaah/User View

Existing Jamaah/User View detailed PRDs:

| Domain | Existing Document |
| --- | --- |
| Homepage | JUV PRD 01 |
| Register/Login/Invitation | JUV PRD 02 |
| Profile & Personal Data | JUV PRD 03 |
| Package Discovery | JUV PRD 04 |
| Booking Flow | JUV PRD 05 |
| My Group Trip | JUV PRD 06 |
| Transaction History | JUV PRD 07 |
| Payment Settings | JUV PRD 08 |
| Articles / Guide Content | JUV PRD 09 |
| Travel Agency Public List/Profile | JUV PRD 10 |
| Compare Packages | JUV PRD 11 |
| Checklist & Guidance | JUV PRD 12 |

Jamaah Master PRD also lists Notifications & Announcements, Referral, Testimonials & Feedback, and Reports & Support as P1, but detailed PRDs are not present in the output set.

### 2.4 Mutawwif View

Existing Mutawwif View detailed PRDs:

| Domain | Existing Document |
| --- | --- |
| Home / Dashboard | MV PRD 01 |
| Register / Invitation | MV PRD 02 |
| Profile / License / Verification | MV PRD 03 |
| Calendar & Schedule | MV PRD 04 |
| My Group Trip | MV PRD 05 |
| Activity Guidance | MV PRD 06 |
| Referral | MV PRD 07 |
| Allowance & Tip | MV PRD 08 |
| Payment Settings | MV PRD 09 |
| Notifications & Announcements | MV PRD 10 |
| Reports & Support | MV PRD 11 |
| Knowledge Base & Guidance Library | MV PRD 12 |
| Trip Documents & Service Readiness | MV PRD 13 |
| Finance Activity & Statements | MV PRD 14 |
| Ratings & Feedback | MV PRD 15 |
| Account Settings & Security | MV PRD 16 |
| Assignment Requests & Handover | MV PRD 17 |
| Availability & Assignment Preferences | MV PRD 18 |

Mutawwif View is now mostly complete for field operations. Remaining gaps are advanced operational modules, not basic role coverage.

---

## 3. Cross-Role Coverage Matrix

| Feature Domain | Admin | Travel Agency | Jamaah | Mutawwif | Sync Status |
| --- | --- | --- | --- | --- | --- |
| Authentication / Invitation | User Management | Team & Roles | JUV 02 | MV 02 | Mostly synced |
| Profile / Identity | Jamaah, Mutawwif, TA Management | Agency Profile, Jamaah | JUV 03 | MV 03 | Mostly synced |
| Account Settings / Security | User Management partial | Settings / Team partial | Missing detailed account settings | MV 16 | Gap for Admin/TA/Jamaah self-service |
| Package Discovery / Sales | Package Management | Package Management | JUV 04, 11 | Not needed | Correct boundary |
| Booking / Reservation | Booking Management | Booking Management | JUV 05 | Not needed | Correct boundary |
| Group Trip | Group Trip Management | Group Trip Management | JUV 06 | MV 05 | Mostly synced |
| Calendar / Itinerary Execution | Itinerary + Group Trip | Group Trip itinerary | JUV 06/12 partial | MV 04/06 | Jamaah activity update/ack gap |
| Documents & Services | Group Trip/Jamaah docs partial | TA 09 | JUV 03/06 partial | MV 13 | Admin/Jamaah dedicated doc PRD gap |
| Mutawwif Assignment | Group Trip + Mutawwif Mgmt | TA 08 | View assigned mutawwif only | MV 17/18 | Mostly synced |
| Availability | Mutawwif Mgmt | Consumes in TA 08 | Not relevant | MV 18 | Synced |
| Notifications & Announcements | Announcement Mgmt | TA 13 | Missing detailed PRD | MV 10 | Jamaah gap |
| Reports & Support | Report Mgmt | TA 11 | Missing detailed PRD | MV 11 | Jamaah gap |
| Testimonials / Feedback | Testimonial Mgmt | TA 12 | Missing detailed PRD | MV 15 view-only | Jamaah gap |
| Articles / Knowledge Base | Articles Mgmt | TA 14 | JUV 09 | MV 12 | Synced |
| Checklist / Guidance | Articles/Itinerary owner | TA content/notes partial | JUV 12 | MV 06/12 | Mostly synced |
| Finance / Transactions | Finance/Billing/Allowance | TA 10 | JUV 07/08 | MV 08/09/14 | Mostly synced |
| Referral | Finance/Marketing owner not explicit | Not detailed | Missing detailed PRD | MV 07 | Cross-role gap |
| Ratings / Reviews | Testimonial Mgmt | TA 12 | Missing detailed PRD | MV 15 | Jamaah gap |
| Audit Logs | Scattered per Admin modules | TA Settings/activity logs | Partial via sensitive actions | Per MV modules | Dedicated global audit gap |
| Emergency / Safety | Reports/Group Trip partial | Reports/Group Trip partial | Reports missing | Reports/Trip/Activity partial | Cross-role gap |
| Assignment Completion / Attendance | Group Trip/Mutawwif partial | TA Assignment partial | My Trip partial | PRD 06/17 Phase 2 | Cross-role operational gap |

---

## 4. Highest Priority Gaps

### 4.1 Jamaah Notifications & Announcements - Missing Detailed PRD

Current state:

1. Admin has Announcement Management.
2. TA has Announcements.
3. Mutawwif has MV PRD 10.
4. Jamaah Master PRD marks Notifications & Announcements as P1, but no detailed JUV PRD exists.

Why this matters:

Jamaah needs trip updates, payment reminders, document reminders, itinerary changes, agency announcements, safety notices, feedback requests, and report status updates.

Recommendation:

Create `JUV PRD 13 - Notifications & Announcements`.

Priority:

P1.

### 4.2 Jamaah Reports & Support - Missing Detailed PRD

Current state:

1. Admin Report Management exists.
2. TA Reports / Support exists.
3. Mutawwif Reports & Support exists.
4. Jamaah Master PRD marks Reports & Support as P1, but no detailed JUV PRD exists.

Why this matters:

Jamaah needs a structured way to report booking, payment, document, trip, mutawwif, agency, emergency, and refund issues. Without a detailed PRD, Admin/TA report workflows will lack a user-facing counterpart.

Recommendation:

Create `JUV PRD 14 - Reports & Support`.

Priority:

P1.

### 4.3 Jamaah Testimonials & Feedback - Missing Detailed PRD

Current state:

1. Admin Testimonial Management exists.
2. TA Testimonials exists.
3. Mutawwif Ratings & Feedback exists as read-only visibility.
4. Jamaah is the main source of feedback/testimonials, but no detailed Jamaah PRD exists.

Why this matters:

Feedback collection, moderation consent, daily feedback, trip rating, mutawwif rating, agency rating, anonymous feedback, media consent, and public testimonial permission need to be defined at the source.

Recommendation:

Create `JUV PRD 15 - Testimonials & Feedback`.

Priority:

P1.

### 4.4 Jamaah Referral - Missing Detailed PRD

Current state:

1. Jamaah Master PRD lists Referral as P1.
2. Mutawwif has MV PRD 07 Referral.
3. Finance and transaction modules exist, but referral source and reward rules for Jamaah are not detailed.

Why this matters:

Referral usually starts from Jamaah/User View. Without a Jamaah referral PRD, reward attribution, invite link, reward status, withdrawal eligibility, and finance sync remain unclear.

Recommendation:

Create `JUV PRD 16 - Referral`.

Priority:

P1 if referral is launch scope. P2 if marketing/reward program launches later.

### 4.5 Jamaah Documents & Service Readiness - Embedded but Not Dedicated

Current state:

1. TA has Documents & Services.
2. Mutawwif has Trip Documents & Service Readiness.
3. Admin handles documents inside Jamaah/Group Trip modules.
4. Jamaah profile and My Group Trip mention documents, but no dedicated JUV Documents PRD exists.

Why this matters:

Jamaah is usually the uploader/source for passport, visa, photo, vaccination, ticket readiness, room/service confirmation, and family member documents.

Recommendation:

Create `JUV PRD 17 - Documents & Service Readiness`, or explicitly expand JUV PRD 03 and JUV PRD 06 with a dedicated section.

Priority:

P1 if document upload/readiness is handled by Jamaah directly. P2 if agency staff uploads all documents.

### 4.6 Admin Platform Settings - Missing Consolidated PRD

Current state:

1. Admin master navigation includes Settings.
2. User Management exists.
3. TA Settings exists.
4. Many modules refer to platform settings, security policy, notification policy, upload limits, provider settings, finance settings, and role permissions.

Why this matters:

Global policies need a single source: security policy, portal access, notification channel availability, provider settings, upload limits, retention, compliance, localization, master data, and feature flags.

Recommendation:

Create `Admin Module PRD - Platform Settings & Policy`.

Priority:

P1.

### 4.7 Global Audit & Activity Log - Scattered but No Dedicated Owner

Current state:

1. Most modules require audit logs.
2. Admin User Management includes activity logs.
3. TA Settings includes activity logs.
4. Mutawwif PRDs create audit events per module.

Why this matters:

There is no single cross-module audit workspace for filtering by actor, module, entity, sensitive data access, permission changes, finance changes, document views, report actions, and admin overrides.

Recommendation:

Create `Admin Module PRD - Audit Log & Compliance Activity`.

Priority:

P1 for admin/compliance visibility; P2 for export/analytics.

### 4.8 Staff Personal Account Settings - Missing for Admin and TA Staff

Current state:

1. Mutawwif has Account Settings & Security.
2. Jamaah has auth/profile/payment settings but no consolidated account settings.
3. TA Settings is agency-level, not staff personal account settings.
4. Admin User Management is admin-managed, not "my account" self-service for internal staff.

Why this matters:

Every authenticated user should have safe self-service for password, sessions, notification preferences, language/timezone, and security alerts.

Recommendation:

Create a shared pattern:

1. `JUV PRD - Account Settings & Security`.
2. Add `My Account` subsection to TA Settings / Team & Roles.
3. Add `Admin My Account & Security` subsection under Admin Settings/User Management.

Priority:

P1 for password/session/security basics.

### 4.9 Emergency & Safety Protocol - Cross-Role Gap

Current state:

1. Reports exist for Admin/TA/Mutawwif.
2. Trip and activity PRDs mention emergency/support contacts.
3. Jamaah Reports PRD is missing.
4. No dedicated emergency escalation model exists across roles.

Why this matters:

Umrah/Hajj trips can involve urgent safety, health, missing person, transport, hotel, crowd, or documentation issues. Emergency flows need clear role routing and notification priority.

Recommendation:

Create cross-role spec or PRDs:

1. `Admin Emergency & Incident Protocol`.
2. `TA Emergency / Incident Support`.
3. `JUV Emergency Help`.
4. Mutawwif can be covered by MV PRD 11 plus PRD 05/06 updates if not standalone.

Priority:

P1 if platform supports in-trip operations at launch.

### 4.10 Assignment Completion, Attendance, and Service Sign-Off - Cross-Role Operational Gap

Current state:

1. TA Mutawwif Assignment includes assignment lifecycle and payout-ready reference.
2. MV PRD 06 has optional activity execution signals.
3. MV PRD 17 has assignment completion sign-off as Phase 2.
4. Finance/Allowance may need proof of completed service.

Why this matters:

If allowance, payout, ratings, or service quality depend on completed assignment/activity, the system needs a shared completion evidence model.

Recommendation:

Create `MV PRD 19 - Assignment Completion & Service Sign-Off`, and sync with TA Assignment, Admin Group Trip, Finance/Allowance, Testimonials, and Reports.

Priority:

P1 if payout/quality depends on completion evidence. P2 if manual ops handles it.

---

## 5. Medium Priority Gaps

| Gap | Affected Roles | Recommendation | Priority |
| --- | --- | --- | --- |
| Jamaah refund/cancellation request detail | Jamaah, TA Finance, Admin Finance | Expand JUV Booking/Transaction or create Refund Requests flow | P1/P2 |
| Saved Packages / Wishlist | Jamaah, TA Package analytics | Create JUV Saved Packages if discovery roadmap needs it | P2 |
| Public agency/package review browsing | Jamaah, TA Testimonials, Admin Testimonial | Add review browsing only after moderation rules are stable | P2 |
| Content translation / multi-language control | Admin, TA, Jamaah, Mutawwif | Add translation/language publishing rules to Articles/Announcements/Guidance | P2 |
| Offline mode policy | Jamaah, Mutawwif | Define what can be cached, masked, or action-queued | P2 |
| Provider integrations | Admin, TA, Jamaah, Mutawwif | Place under Admin Platform Settings / Integrations | P2 |
| Data export/deletion request | Jamaah, Mutawwif, Admin support | Add privacy request workflow under Account Settings + Reports | P2 unless compliance requires P1 |

---

## 6. Mutawwif Status After PRD 18

Mutawwif View no longer has a major P1 role-sync gap for the currently mapped operational model. It now has:

1. Auth and onboarding.
2. Profile and verification.
3. Dashboard.
4. Calendar.
5. Group trip detail.
6. Activity guidance.
7. Referral.
8. Allowance/tip.
9. Payment settings.
10. Notifications.
11. Reports/support.
12. Guidance library.
13. Trip documents/service readiness.
14. Finance activity/statements.
15. Ratings/feedback.
16. Account settings/security.
17. Assignment requests/handover.
18. Availability/preferences.

Remaining Mutawwif candidates are advanced operational workflows:

| Candidate | Why It May Be Needed | Priority |
| --- | --- | --- |
| MV PRD 19 - Assignment Completion & Service Sign-Off | Needed if allowance, quality scoring, or trip closure needs mutawwif evidence | P1/P2 |
| MV PRD 20 - Field Attendance / Assembly Support | Needed if mutawwif must confirm jamaah assembly/check-in | P2 unless core ops |
| MV PRD 21 - Emergency Quick Actions | Needed if emergency support must be separate from Reports | P1/P2 |
| MV PRD 22 - Offline Trip Pack | Needed if in-trip offline access is required | P2 |

---

## 7. Recommended Next Build Order

### 7.1 If Continuing Jamaah/User View

| Order | PRD | Priority | Reason |
| --- | --- | --- | --- |
| 1 | JUV PRD 13 - Notifications & Announcements | P1 | Required by trip, payment, docs, reports, feedback |
| 2 | JUV PRD 14 - Reports & Support | P1 | Required counterpart to Admin/TA/MV support |
| 3 | JUV PRD 15 - Testimonials & Feedback | P1 | Jamaah is feedback source for Admin/TA/MV ratings |
| 4 | JUV PRD 16 - Referral | P1/P2 | Master says P1; finance/reward sync needed |
| 5 | JUV PRD 17 - Documents & Service Readiness | P1/P2 | Needed if jamaah uploads/tracks documents directly |
| 6 | JUV PRD 18 - Account Settings & Security | P1 | Needed to match MV PRD 16 and user account safety |

### 7.2 If Continuing Admin/Platform Infrastructure

| Order | PRD | Priority | Reason |
| --- | --- | --- | --- |
| 1 | Admin Platform Settings & Policy | P1 | Central source for global settings, providers, security, feature flags |
| 2 | Admin Audit Log & Compliance Activity | P1 | Required because every module emits audit events |
| 3 | Admin Notification Delivery Center | P1/P2 | Needed if staff need inbox/delivery monitoring beyond Announcement Management |
| 4 | Admin Emergency & Incident Protocol | P1/P2 | Needed for in-trip incident governance |

### 7.3 If Continuing Mutawwif View

| Order | PRD | Priority | Reason |
| --- | --- | --- | --- |
| 1 | MV PRD 19 - Assignment Completion & Service Sign-Off | P1/P2 | Connects assignment, activity, allowance, rating, reports |
| 2 | MV PRD 20 - Field Attendance / Assembly Support | P2 | Supports active group coordination |
| 3 | MV PRD 21 - Emergency Quick Actions | P1/P2 | Can be standalone if emergency is critical |

---

## 8. Features That Should Not Be Mirrored Across All Roles

Some gaps are intentional and should not become duplicated modules:

| Feature | Should Not Be Added To | Reason | Correct Pattern |
| --- | --- | --- | --- |
| Package creation | Jamaah, Mutawwif | Only Admin/TA sell/manage packages | Jamaah discovers/books; Mutawwif sees trip snapshot |
| Assignment creation | Jamaah, Mutawwif | Assignment authority belongs to Admin/TA | Mutawwif responds/acknowledges only |
| Finance approval | Jamaah, Mutawwif | Finance authority belongs to Admin/TA | User roles see status/request only |
| Testimonial moderation | Jamaah, Mutawwif | Moderation authority belongs to Admin/TA | Jamaah submits; Mutawwif views released feedback |
| Announcement creation | Jamaah, Mutawwif | Broadcast authority belongs to Admin/TA | User roles receive/read/acknowledge |
| Document verification | Jamaah, Mutawwif | Verification belongs to Admin/TA | User roles upload/view/readiness |
| Conflict override | Jamaah, Mutawwif | Override is operational/admin authority | User roles see warning/report |
| Role/permission management | Jamaah, Mutawwif | Access governance belongs to Admin/TA owner | User roles view limited own access only |

---

## 9. Final Audit Decision

The cross-role product architecture is mostly coherent. Admin owns platform governance, Travel Agency owns agency operations, Jamaah owns customer journey inputs/actions, and Mutawwif owns field execution inputs/actions.

The main sync problem is not Mutawwif anymore. After PRD 18, the main missing detailed docs are:

1. Jamaah Notifications & Announcements.
2. Jamaah Reports & Support.
3. Jamaah Testimonials & Feedback.
4. Jamaah Referral.
5. Jamaah Documents & Service Readiness, if documents are user-managed.
6. Jamaah Account Settings & Security.
7. Admin Platform Settings & Policy.
8. Admin Audit Log & Compliance Activity.
9. Cross-role Emergency & Safety Protocol.
10. Assignment Completion / Service Sign-Off, especially if finance or rating depends on completion evidence.

Recommended next move: create the missing Jamaah P1 modules first, because those are explicitly listed in the Jamaah Master PRD but do not yet exist as detailed PRDs. After that, create Admin Platform Settings and Admin Audit Log to stabilize permission, policy, provider, and audit ownership across all roles.
