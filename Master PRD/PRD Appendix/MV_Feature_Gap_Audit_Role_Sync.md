# Mutawwif View Feature Gap Audit - Role Sync

Product: UmrahHaji.com Mutawwif View  
Scope: Audit fitur/menu Mutawwif dibanding Admin Panel, Travel Agency Portal, dan Jamaah/User View  
Status: Draft Audit  
Last Updated: 20 June 2026  

---

## 1. Audit Objective

Audit ini mengecek fitur/menu apa yang belum ada di Mutawwif View, tetapi sudah ada atau sudah menjadi pola matang di role lain, dan secara produk seharusnya memiliki padanan mutawwif-facing.

Audit ini tidak berarti semua fitur Admin/Travel Agency/Jamaah harus dipindahkan ke Mutawwif. Mutawwif tetap role lapangan yang assignment-scoped, mobile-first, dan read-first. Fitur yang masuk Mutawwif harus membantu:

1. Menjalankan tugas trip.
2. Mengikuti jadwal dan perubahan.
3. Melihat informasi jamaah yang relevan secara aman.
4. Melaporkan issue.
5. Mengelola profile, readiness, availability, dan finance miliknya sendiri.
6. Menerima informasi/announcement yang ditargetkan.

---

## 2. Current Mutawwif Coverage

### 2.1 Sudah Ada sebagai PRD Mutawwif

| PRD | Module | Coverage |
| --- | --- | --- |
| MV PRD 01 | Home / Mutawwif Dashboard | Dashboard, assigned groups, active pilgrims, today activities, earnings summary |
| MV PRD 02 | Register & Invitation Acceptance | Auth, onboarding, invitation, activation, access gate |
| MV PRD 03 | Profile, License & Verification | Personal/professional profile, documents, certification, availability, readiness |
| MV PRD 04 | Calendar & Schedule | Assigned schedule, activity detail, changes, conflicts, reminders |
| MV PRD 05 | My Group Trip & Trip Details | Assigned trip list/detail, members, readiness, contacts, alerts, report issue handoff |
| MV PRD 06 | Activity Guidance / Daily Itinerary Execution | Daily execution, preparation checklist, guidance content, participant context, activity signals |
| MV PRD 07 | Referral | Referral dashboard, link/code, records, reward eligibility, UI mapping |
| MV PRD 08 | Allowance & Tip | Balance, withdrawal request, donation, allowance/tip/referral reward history |
| MV PRD 09 | Payment Settings | Payout destination, masking, verification status, finance notification preferences |

### 2.2 Existing Mutawwif Navigation Baseline

Current Mutawwif nav baseline from MV PRD 01:

```text
Home
My Trips
Calendar
Profile
Notifications
```

After PRD 05-09, additional secondary/profile menu items are effectively needed:

```text
Allowance & Tip
Referral
Payment Settings
```

---

## 3. Cross-Role Feature Matrix

| Feature / Menu | Admin Panel | Travel Agency Portal | Jamaah/User View | Mutawwif Current Status | Audit Decision |
| --- | --- | --- | --- | --- | --- |
| Notifications & Announcements | Exists | Exists | Exists | Partial only as alerts inside modules | Needs standalone Mutawwif inbox |
| Reports & Support / Issue Center | Exists | Exists | Exists | Partial handoff from trip/activity | Needs standalone My Reports/Support |
| Articles / Knowledge Base | Exists | Exists | Exists | Contextual guidance only | Needs Mutawwif Guidance Library |
| Checklist & Guidance | Content/templates owner | Can provide trip/service notes | Exists as user-facing P2 | Partial in PRD 06 | Needs Mutawwif operational checklist expansion |
| Documents & Services | Exists | Exists | Exists for jamaah docs | Profile docs exist; trip docs only partial | Needs read-only Trip Documents & Service Readiness |
| Transaction History / Receipts | Finance records | Finance records | Exists | PRD 08 withdrawal history only | Needs Finance Activity / Statements or PRD08 expansion |
| Testimonials / Feedback / Ratings | Exists | Exists | Exists | Profile links to ratings, no module | Needs Ratings & Feedback view |
| Account Settings / Security | Exists | Exists | Partial in auth/profile/payment | Scattered across PRD02/03/09 | Needs Account Settings consolidation |
| Assignment Acceptance / Handover | Admin/TA assign mutawwif | Exists | Not relevant | Assigned trips shown, no accept/decline/handover | Needs Assignment Requests / Handover |
| Availability Management | Admin/TA consume availability | Assignment uses it | Not relevant | Exists inside Profile | Keep but may need stronger shortcut/widget |
| Jamaah Management | Exists | Exists | Own profile/family | Members tab read-only | Do not create full management; keep read-only context |
| Booking / Package Management | Exists | Exists | Booking exists | Trip snapshot only | Do not create management; show safe summary only |
| Finance Management | Exists | Exists | Payment/transaction view | PRD08/09 user-side only | Do not expose finance ops; add statement/history only |
| Settings / Master Data | Exists | Exists | Account settings only | Not standalone | Mutawwif gets personal settings only |

---

## 4. Missing or Under-Covered Mutawwif Features

## 4.1 Notifications & Announcements Inbox

### Current Gap

Mutawwif receives notifications in multiple PRDs, but there is no dedicated PRD/menu for:

1. All notifications list.
2. Announcement inbox.
3. Read/unread state.
4. Acknowledgement-required announcement.
5. Filter by trip, finance, profile, schedule, support, system.
6. Deep-link behavior across PRD 03-09.

### Why It Should Exist

Admin and Travel Agency have Announcement Management. Jamaah/User View also has Notifications & Announcements. Mutawwif is a target audience for schedule changes, trip alerts, finance status, verification status, and operational instructions, so a standalone inbox is required.

### Recommended PRD

`MV PRD 10 - Notifications & Announcements`

### Priority

P1.

### Role Sync

| Source | Mutawwif Behavior |
| --- | --- |
| Admin Announcement | Read targeted platform/trip/safety/finance announcement |
| Travel Agency Announcement | Read assigned-trip or assignment-related announcement |
| PRD 03 Profile | Receive document/license verification alerts |
| PRD 04 Calendar | Receive schedule change/upcoming activity alerts |
| PRD 05 Trip | Receive trip alert and operational update |
| PRD 08 Finance | Receive allowance/tip/withdrawal status |
| PRD 09 Payment Settings | Receive payout destination status |

---

## 4.2 Reports & Support / My Cases

### Current Gap

PRD 05 and PRD 06 already include `Report Issue` handoff, but mutawwif does not yet have a full support/case center:

1. Create report from general menu.
2. View own report list.
3. View report detail and status.
4. Add comment/reply.
5. Upload evidence safely.
6. Track SLA/priority/status.
7. Reopen resolved issue.

### Why It Should Exist

Admin and Travel Agency both have Report Management / Reports & Support. Jamaah also has Reports & Support. Since mutawwif can report trip, activity, schedule, jamaah support, payment, profile, payout, or verification issues, this must exist as a user-facing My Cases module.

### Recommended PRD

`MV PRD 11 - Reports & Support`

### Priority

P1.

### Role Sync

| Source | Mutawwif Behavior |
| --- | --- |
| Admin Report Management | Receives/escalates/supports mutawwif cases |
| TA Reports / Support | Receives agency-scoped operational cases |
| PRD 05 Trip | Prefills trip context |
| PRD 06 Activity | Prefills activity context |
| PRD 08 Finance | Prefills withdrawal/allowance issue context |
| PRD 09 Payment Settings | Prefills payout destination issue context |

---

## 4.3 Knowledge Base / Mutawwif Guidance Library

### Current Gap

PRD 06 has contextual guidance for daily activity execution, but Mutawwif View does not yet have a browse/search library like:

1. Articles/guides for mutawwif.
2. Ritual guidance reference.
3. Emergency/safety guidance.
4. Group handling SOP.
5. Travel agency-specific notes.
6. Saved/bookmarked guidance.
7. Contextual recommendations from trip/activity.

### Why It Should Exist

Jamaah has Articles / Guide Content. Travel Agency has Articles / Knowledge Base. Admin manages Articles. Mutawwif should have a narrower operational knowledge base because the role needs field guidance, not marketing/public content.

### Recommended PRD

`MV PRD 12 - Knowledge Base & Guidance Library`

### Priority

P1 if mutawwif field guidance is central to MVP. Otherwise P2 with PRD 06 contextual guidance as P1.

### Role Sync

| Source | Mutawwif Behavior |
| --- | --- |
| Admin Articles Management | Source of approved guidance |
| TA Articles / Knowledge Base | Agency-specific operational notes if enabled |
| Jamaah Articles | Shared public guidance content, filtered for mutawwif use |
| PRD 06 Activity Guidance | Links to activity-specific guidance |

### Boundary

Mutawwif should not create/publish official articles in P1. They can read, save, and share approved content where allowed.

---

## 4.4 Trip Documents & Service Readiness

### Current Gap

Mutawwif Profile covers mutawwif's own license/documents. PRD 05 has trip readiness and member context. But there is no dedicated mutawwif-facing module for assigned trip document/service awareness:

1. Visa/passport/service readiness summary.
2. Ticket/voucher/rooming/transport readiness.
3. Which items are blocked or pending for the group.
4. Safe visibility of service instructions.
5. Document/service notices relevant to the mutawwif's duty.

### Why It Should Exist

Travel Agency has Documents & Services. Jamaah has Documents. Admin has document/service management. Mutawwif should not manage documents, but should see operational readiness needed for field guidance.

### Recommended PRD

Option A: `MV PRD 13 - Trip Documents & Service Readiness`  
Option B: Expand PRD 05 Readiness tab if scope should stay smaller.

### Priority

P1 if mutawwif needs to coordinate jamaah readiness in the field. P2 if mutawwif only needs agency PIC contact and high-level group readiness.

### Role Sync

| Source | Mutawwif Behavior |
| --- | --- |
| TA Documents & Services | Read readiness summary and service notes for assigned trip |
| Admin Jamaah/Document Management | Source of document status, not editable |
| Jamaah Documents | Jamaah own upload/status, not visible in raw form to mutawwif unless allowed |
| PRD 05 Trip Details | Displays readiness summary and links into details |

### Boundary

Mutawwif should not upload, approve, reject, delete, or export jamaah documents in P1.

---

## 4.5 Finance Activity / Statements

### Current Gap

PRD 08 includes allowance/tip dashboard and withdrawal history. But Jamaah has a full Transaction History / Receipts module. Mutawwif currently lacks a broader finance activity ledger:

1. All finance activity list.
2. Allowance source detail.
3. Tip receipt/detail.
4. Referral reward release.
5. Withdrawal/donation record.
6. Download receipt/statement if Finance allows.
7. Search/filter by status/source/date.

### Why It Should Exist

Admin and Travel Agency have finance records. Jamaah has Transaction History. Mutawwif should have a safe equivalent for own earnings and payout records, but not finance operations.

### Recommended PRD

Option A: Add as section to `MV PRD 08 - Allowance & Tip`.  
Option B: `MV PRD 14 - Finance Activity & Statements` if reports/downloads become large.

### Priority

P1-lite inside PRD 08; P2 as standalone.

### Role Sync

| Source | Mutawwif Behavior |
| --- | --- |
| Admin Finance | Source of approved/released/paid/reversed records |
| TA Finance | Source if agency manages finance |
| JUV Transaction History | Pattern for list/detail/receipt/download |
| PRD 07 Referral | Reward source lines |
| PRD 08 Allowance & Tip | Balance and withdrawal owner |
| PRD 09 Payment Settings | Masked destination snapshot |

---

## 4.6 Ratings, Reviews & Feedback

### Current Gap

Admin and Travel Agency have Testimonials/Feedback. Jamaah can submit feedback/testimonial. Mutawwif Profile mentions ratings and reviews as linked modules, but Mutawwif View does not yet define:

1. View own rating summary.
2. View trip feedback summary.
3. View daily activity feedback if enabled.
4. Privacy-safe comments.
5. Performance trend.
6. Report unfair/abusive feedback.

### Why It Should Exist

Mutawwif's service quality affects assignment readiness, trust, and future assignment. They should see feedback that is safe and approved for visibility, without exposing jamaah private identity by default.

### Recommended PRD

`MV PRD 15 - Ratings & Feedback`

### Priority

P2 for MVP, P1 if ratings affect assignment/pay/quality workflow at launch.

### Role Sync

| Source | Mutawwif Behavior |
| --- | --- |
| Admin Testimonial Management | Moderated source of visible feedback |
| TA Testimonials | Agency-scoped service quality feedback |
| Jamaah Testimonials & Feedback | Source of jamaah rating/comment |
| Admin Mutawwif Management | Uses rating/performance reference |

---

## 4.7 Account Settings & Security

### Current Gap

Authentication, Profile, and Payment Settings include pieces of settings, but Mutawwif View does not yet have a consolidated personal settings area:

1. Language preference.
2. Timezone display preference.
3. Notification channel settings.
4. Password/security settings.
5. Active sessions/trusted devices.
6. Privacy display preferences.
7. Account deletion/deactivation request if policy allows.

### Why It Should Exist

Travel Agency has Settings. Admin has Settings. Jamaah Profile includes account settings patterns. Mutawwif needs personal settings, not platform/agency settings.

### Recommended PRD

`MV PRD 16 - Account Settings & Security`

### Priority

P1 for notification/channel/security basics; P2 for trusted devices and advanced session management.

### Role Sync

| Source | Mutawwif Behavior |
| --- | --- |
| Admin User Management | Owns account, portal access, security policy |
| Notification Management | Source of channel availability |
| PRD 02 Auth | Password reset and session rules |
| PRD 09 Payment Settings | Finance notification preferences only, not all settings |

---

## 4.8 Assignment Requests, Confirmation & Handover

### Current Gap

Travel Agency Mutawwif Assignment can assign/replace mutawwif. Mutawwif View currently shows assigned trips, but there is no explicit workflow for:

1. New assignment request.
2. Accept/decline assignment where policy allows.
3. Assignment acknowledgement.
4. Replacement notice.
5. Handover notes between old/new mutawwif.
6. Lead/assistant role confirmation.

### Why It Should Exist

If assignments are operationally sensitive, mutawwif should explicitly acknowledge or confirm assignment before being treated as ready. This syncs tightly with TA Mutawwif Assignment and Admin Group Trip.

### Recommended PRD

Option A: Expand `MV PRD 05 - My Group Trip & Trip Details`.  
Option B: `MV PRD 17 - Assignment Requests & Handover` if accept/decline/handover is material.

### Priority

P1 if assignment confirmation is required before trip operation. Otherwise P2.

### Role Sync

| Source | Mutawwif Behavior |
| --- | --- |
| TA Mutawwif Assignment | Source of assignment offer/status/replacement |
| Admin Group Trip | Platform-level assignment record |
| PRD 04 Calendar | Calendar opens after assignment accepted/active |
| PRD 05 My Group Trip | Trip appears based on assignment state |
| Notifications | Assignment request, accepted, replaced, cancelled |

---

## 4.9 Availability & Assignment Preference Shortcut

### Current Gap

Availability exists in PRD 03 Profile, but it may be too buried for a role whose assignment depends on availability.

### Why It Should Exist

Travel Agency Mutawwif Assignment consumes availability. Admin Mutawwif Management uses readiness and availability. Mutawwif should have quick access from Home/Profile to update availability, unavailable dates, and assignment preferences.

### Recommended Action

Update `MV PRD 03 - Profile, License & Verification` and `MV PRD 01 - Home / Dashboard`.

### Priority

P1 as shortcut/widget. No new PRD required unless advanced availability calendar becomes large.

---

## 5. Features That Should Not Become Mutawwif Menus

These features exist in other roles but should not be copied into Mutawwif View as full modules.

| Feature | Reason | Mutawwif Alternative |
| --- | --- | --- |
| Package Management | Mutawwif does not create/sell packages | Read-only package/trip snapshot inside My Group Trip |
| Booking Management | Booking is sales/agency/customer workflow | Read-only assignment/trip context only |
| Jamaah Management | Sensitive customer admin workflow | Read-only participant context, safe contact/support only |
| Finance Management | Back-office finance authority | Allowance/Tip, Payment Settings, own statements only |
| Billing/Invoice Management | Customer/agency/admin finance workflow | No mutawwif access except own payout/earning records |
| Hotel/Flight Master Management | Admin/TA operational master data | Read-only hotel/flight/trip logistics |
| Itinerary Template Management | Admin/TA owns schedule templates | Mutawwif sees schedule snapshot and activity guidance |
| Team & Roles Management | Agency/admin staff permission workflow | Mutawwif can view own permissions/status only |
| Announcement Creation | Admin/TA creates announcements | Mutawwif reads/acknowledges targeted announcements |
| Article Publishing | Admin/TA content management | Mutawwif reads approved guidance content |

---

## 6. Recommended Next PRD Order

Recommended continuation after PRD 09:

| Proposed PRD | Module | Priority | Reason |
| --- | --- | --- | --- |
| PRD 10 | Notifications & Announcements | P1 | Needed across all existing mutawwif modules |
| PRD 11 | Reports & Support | P1 | Handoffs already exist in PRD 05/06/08/09; needs full case tracking |
| PRD 12 | Knowledge Base & Guidance Library | P1/P2 | Role already depends on guidance; shares Admin/TA/Jamaah content base |
| PRD 13 | Trip Documents & Service Readiness | P1/P2 | Exists in TA/Jamaah/Admin; mutawwif needs safe assigned-trip visibility |
| PRD 14 | Finance Activity & Statements | P1-lite/P2 | Could be PRD08 expansion first |
| PRD 15 | Ratings & Feedback | P2 | Important for quality loop, not always core MVP |
| PRD 16 | Account Settings & Security | P1 | Consolidates scattered account/security preferences |
| PRD 17 | Assignment Requests & Handover | P1/P2 | Needed if assignment confirmation/handover is part of ops |

### 6.1 Best Immediate Next Step

The strongest next PRD is:

```text
MV PRD 10 - Notifications & Announcements
```

Reason:

1. Notifications are referenced in almost every Mutawwif PRD.
2. Admin and Travel Agency already have announcement ownership.
3. Jamaah has notification/announcement behavior in the user view.
4. It becomes the glue for assignment, schedule changes, profile verification, payout status, report updates, and trip alerts.

---

## 7. Recommended Mutawwif IA Update

### 7.1 Bottom Navigation

Keep bottom nav compact:

```text
Home
My Trips
Calendar
Notifications
Profile
```

### 7.2 Profile / More Menu

Add secondary menu:

```text
Profile & License
Availability
Allowance & Tip
Referral
Payment Settings
Reports & Support
Knowledge Base
Trip Documents & Readiness
Ratings & Feedback
Account Settings
Logout
```

### 7.3 Contextual Entry Points

Do not force every feature into bottom nav. Use contextual deep links:

| Context | Opens |
| --- | --- |
| Schedule changed | Notifications -> Activity Detail |
| Activity issue | Reports & Support create form |
| Missing payout destination | Payment Settings |
| Withdrawal status | Allowance & Tip detail |
| Document readiness warning | Trip Documents & Readiness |
| Assignment offer | Assignment Request detail |
| Guidance needed | Knowledge Base / Activity Guidance |

---

## 8. Final Audit Decision

Mutawwif View is already strong for core trip operation and finance after PRD 05-09. The main remaining gaps are not sales/admin modules. The real missing mutawwif-facing modules are:

1. Notifications & Announcements.
2. Reports & Support.
3. Knowledge Base / Guidance Library.
4. Trip Documents & Service Readiness.
5. Finance Activity / Statements.
6. Ratings & Feedback.
7. Account Settings & Security.
8. Assignment Requests / Handover.
9. Stronger Availability shortcut.

The recommended next build order is PRD 10 Notifications & Announcements, then PRD 11 Reports & Support, because both are already referenced by existing PRDs and are needed as cross-module infrastructure for Mutawwif View.
