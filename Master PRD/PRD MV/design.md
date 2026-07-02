# design.md - UmrahHaji.com Mutawwif View Design Guide

Product: UmrahHaji.com Mutawwif View  
Scope: Mutawwif Mobile Web App / Field Operations Companion  
Source PRDs: MV PRD 01-18, Travel Agency Portal Design Guide, UX Research Recommendation, Cross-Role Taxonomy  
Canonical File: outputs/UmrahHaji_PRD_MV/design.md  
Platform: Mobile-first Responsive Web Platform  
Status: Draft Design Guide  
Last Updated: 1 July 2026  
Language Context: English UI copy  
Currency Context: RM  

---

## 1. Purpose

Use this guide to design the UmrahHaji.com Mutawwif View consistently across all mutawwif-facing modules.

Mutawwif View is a mobile-first operational companion for mutawwif who guide assigned Umrah/Hajj group trips. It helps mutawwif view assignments, understand today's activities, follow approved guidance, contact the right PIC, acknowledge changes, report issues, view safe readiness summaries, manage profile/readiness, view allowance/tip status, and update own availability/payment settings.

This document is separate from:

1. Admin Panel `design.md`.
2. Travel Agency Portal `design.md`.
3. JUV Homepage design guide.

The Mutawwif View should reuse the same design system foundation, but optimize for a different context:

| Area | Travel Agency Portal | Mutawwif View |
| --- | --- | --- |
| Primary user | Agency owner/staff | Mutawwif/field guide |
| Primary device | Desktop-first, responsive | Mobile web first |
| Main work | Manage packages, bookings, trips, finance | Execute assigned trip/activity guidance |
| Data scope | Own agency data | Own assigned trips and own account |
| Interaction style | Tables, filters, drawers, wizards | Cards, timelines, bottom sheets, sticky actions |
| Risk | Data operation and finance accuracy | Field clarity, privacy, safety, escalation |

---

## 2. Product Positioning

Mutawwif View should feel like:

1. A field operations companion.
2. A daily activity guide.
3. A safe trip context viewer.
4. A notification and acknowledgement inbox.
5. A lightweight finance visibility surface.
6. A personal readiness and availability control center.

It should not feel like:

1. A desktop admin dashboard.
2. A travel agency operations portal.
3. A public marketing page.
4. A generic productivity app.
5. A chat app.
6. A finance approval tool.
7. A religious authority/fatwa product.

The app must help mutawwif answer quickly:

1. What is my next activity?
2. Which trip am I assigned to?
3. What changed since I last checked?
4. Who should I contact now?
5. Which pilgrims or readiness areas need attention?
6. What guidance is approved for this activity?
7. How do I report an issue safely?
8. Is my profile, availability, payout setup, or assignment status blocking anything?

---

## 3. Design Direction

Accepted direction:

```text
Mobile Field Companion
```

The design should be:

1. Mobile-first.
2. Read-first.
3. Assignment-scoped.
4. Fast to scan outdoors or while moving.
5. Calm and respectful.
6. Privacy-safe.
7. Offline-tolerant where possible.
8. Action-oriented without giving mutawwif back-office authority.

Every screen should help mutawwif:

```text
See, guide, acknowledge, contact, report, prepare, or track.
```

If a section does not support one of those actions, remove or move it behind progressive disclosure.

---

## 4. Design Principles

### 4.1 Mobile Web First

Design for mobile width first, especially 360-430px.

Rules:

1. Primary content must fit a one-handed mobile flow.
2. Primary actions should be reachable near the bottom.
3. Use bottom navigation for top-level modules.
4. Use sticky bottom action bars for activity/trip actions.
5. Use bottom sheets for filters, quick actions, and confirmations.
6. Keep forms short and staged.
7. Avoid desktop-style wide tables.
8. Desktop/tablet can expand layouts but must not define the core experience.

### 4.2 Field Clarity Before Density

Mutawwif may use the app while walking, briefing a group, coordinating transport, or handling a schedule change.

Prioritize:

1. Current/next activity.
2. Time and timezone.
3. Meeting point and location.
4. Trip name/code.
5. Agency PIC contact.
6. WhatsApp group link.
7. Urgent change banners.
8. Readiness blockers.
9. Report Issue action.

Do not bury critical field information under decorative sections.

### 4.3 Assignment-Scoped By Default

Mutawwif can see only own assigned data.

Use:

1. Assignment status labels.
2. Trip role labels: Lead, Assistant, Replacement, Standby.
3. Clear blocked/pending states.
4. Own-user finance and payout data only.
5. Own support cases only.

Do not show:

1. Unassigned trips.
2. Other mutawwif private data.
3. Travel Agency internal data.
4. Admin internal notes.
5. Pilgrim finance details.

### 4.4 Privacy-Safe Pilgrim Context

Mutawwif often needs group context, but not full private data.

Default visible data:

1. Display name.
2. Family/group label.
3. Participant count.
4. Language preference if released.
5. Assistance flag if operationally relevant and permission-based.
6. Readiness status.
7. Room/service assignment only when released.

Hidden by default:

1. Full IC/passport files.
2. Full document numbers.
3. Private medical notes.
4. Payment amounts/invoices.
5. Bank data.
6. Internal Admin/Travel Agency notes.

### 4.5 Guidance Is Not Official Fatwa

Ritual/service guidance must be framed as approved guidance content.

Use labels:

```text
Approved guidance
Agency instruction
Platform guidance
Official source link
```

Avoid implying the app replaces official authority, qualified religious advice, medical advice, legal advice, or local authority instructions.

### 4.6 Read-Only Unless Explicitly Enabled

Mutawwif View is mostly read-first.

Mutawwif can:

1. View assigned trip/activity context.
2. Acknowledge updates.
3. Contact PIC/support.
4. Report issues.
5. Submit allowed assignment response.
6. Update own availability.
7. Update own profile/payment settings if permitted.
8. Request withdrawal from approved balance if enabled.

Mutawwif cannot:

1. Edit trip master data.
2. Edit itinerary template.
3. Change hotel/flight/transport.
4. Add/remove pilgrims.
5. Verify documents.
6. Edit payment/invoice data.
7. Approve payout.
8. Assign/replace mutawwif.

### 4.7 English + RM

UI copy should be English.

Use RM for:

1. Allowance.
2. Tips.
3. Referral reward.
4. Withdrawal.
5. Fees.
6. Net amount.
7. Statements.

Example:

```text
RM 1,250 available
RM 15 fee
RM 1,235 net amount
```

Religious greeting such as `Assalamu'alaikum` is acceptable when used respectfully, but surrounding action labels and instructions should remain English.

---

## 5. Visual System

### 5.1 Color Tokens

Use approved UmrahHaji.com brand tokens.

| Token | Hex | Usage |
| --- | --- | --- |
| Primary | `#0694A2` | Main CTA, active bottom nav, selected tab, focus ring |
| Primary Dark | `#057C88` | Primary hover/pressed |
| Primary Soft | `#E6F7F9` | Active tab/chip background, calm info section |
| Secondary | `#C27803` | Attention, warning, finance highlight, activity change accent |
| Secondary Dark | `#9A6002` | Secondary emphasis text |
| Secondary Soft | `#FFF3DC` | Warning/attention background |
| Text Primary | `#172326` | Main text |
| Text Secondary | `#5D6B70` | Metadata |
| Border | `#DDE7EA` | Dividers, cards, inputs |
| Surface | `#FFFFFF` | Cards, bottom sheets, forms |
| Page Background | `#F7FAFA` | App background |
| Success | `#16A34A` | Ready, verified, paid, completed |
| Warning | `#F59E0B` | Pending, expiring soon, attention |
| Error | `#DC2626` | Blocked, rejected, failed, destructive |
| Info | `#2563EB` | Submitted, schedule info, neutral system update |

Rules:

1. Primary owns main action.
2. Secondary highlights attention, not general decoration.
3. Keep activity and trip screens calm, with strong contrast for critical actions.
4. Finance amounts should be neutral unless warning/blocked.
5. Never rely on color alone for status.

### 5.2 Typography

Default font:

```text
Plus Jakarta Sans
```

Mobile scale:

| Style | Size / Line | Usage |
| --- | --- | --- |
| H1 | 26/34 | Screen title |
| H2 | 22/30 | Section title |
| H3 | 18/26 | Card title |
| Body | 15-16/24 | Main text |
| Body Small | 14/21 | Metadata |
| Caption | 12/18 | Timestamps, labels |

Rules:

1. Use 15-16px minimum body text.
2. Use tabular numbers for time, counts, and RM amounts.
3. Avoid tiny low-contrast metadata for time/location/status.
4. Activity time and next action should be visually stronger than decorative copy.

### 5.3 Surface and Radius

Recommended radius:

| Element | Radius |
| --- | ---: |
| Small controls | 8px |
| Inputs/buttons | 10-12px |
| Cards | 12px |
| Bottom sheets | 16px top corners |
| Chips/status | Fully rounded only for chips/status |

Use soft borders and light shadows sparingly.

Default card:

```text
background: #FFFFFF
border: 1px solid #DDE7EA
box-shadow: 0 4px 16px rgba(23, 35, 38, 0.04)
```

Avoid nested cards. Use dividers, lists, and tabs inside cards instead.

### 5.4 Iconography

Use one consistent outline icon family.

Use icons for:

1. Home.
2. Trip.
3. Calendar.
4. Notification.
5. Profile.
6. Map/location.
7. Call/contact.
8. WhatsApp.
9. Report issue.
10. Documents/readiness.
11. Allowance/payment.
12. Availability.
13. Security.

Important actions must include text labels. Icon-only actions require accessible labels.

---

## 6. App Shell

### 6.1 Mobile Top Bar

Default top bar:

```text
Logo / screen title
Notification bell
Profile/avatar optional
```

Rules:

1. Use a compact top bar.
2. Notification bell is always reachable after login.
3. Show unread badge only when count is reliable.
4. Do not crowd top bar with many icons.
5. Use screen-specific title on deep pages if logo is not useful.

### 6.2 Bottom Navigation

Recommended Phase 1 bottom nav:

| Order | Label | Destination |
| ---: | --- | --- |
| 1 | Home | Dashboard |
| 2 | My Trips | Assigned trips |
| 3 | Calendar | Schedule and activities |
| 4 | Profile | Profile and account hub |

Rules:

1. Active tab must be clear.
2. Bottom nav must respect safe-area padding.
3. Bottom nav must not cover sticky CTAs.
4. Notification inbox opens from top bar, not bottom nav in Phase 1.
5. Allowance/Tip, Reports, Availability, Payment Settings, and Knowledge Base can be accessible from Profile, Home shortcuts, trip/activity actions, or contextual links.

### 6.3 Deep Page Header

Deep pages should show:

1. Back button.
2. Screen title.
3. Critical status chip where useful.
4. More menu for secondary actions.

Example:

```text
< Activity Guidance
Tawaf Briefing
Changed
```

### 6.4 Sticky Bottom Action Bar

Use sticky bottom actions for field-critical screens:

1. Activity Guidance.
2. Trip Details.
3. Assignment Request.
4. Withdrawal Confirmation.
5. Report Detail.

Rules:

1. One primary action at most.
2. Secondary actions can be icon+text buttons or compact menu.
3. Never stack more than two primary-looking buttons.
4. Keep safe-area padding.

Examples:

```text
[Acknowledge Update] [Report Issue]
[Open WhatsApp] [Contact PIC]
[Accept Assignment] [Decline]
```

---

## 7. Mobile Layout Patterns

### 7.1 Dashboard Pattern

Home should be compact and operational.

Recommended order:

1. Greeting.
2. Urgent alert if any.
3. Stats row: Assigned Groups, Active Pilgrims, Today's Activities.
4. Active Trip card.
5. Next Activity card.
6. Earnings summary.
7. Quick actions.
8. Recent notifications.

Rules:

1. Do not turn Home into analytics.
2. Show current/next action above finance summary.
3. Earnings should link to Allowance & Tip, not expand into full finance view.
4. If no active trip, show next assignment or empty state.

### 7.2 Card List Pattern

Use card lists instead of tables for:

1. My Trips.
2. Calendar agenda.
3. Assignment requests.
4. Notifications.
5. Reports.
6. Withdrawal history.
7. Saved payout destinations.

Card anatomy:

1. Primary title.
2. Status chip.
3. Key metadata.
4. One next action or deep link.
5. Optional warning/attention row.

### 7.3 Timeline Pattern

Use timeline for:

1. Daily itinerary.
2. Activity instructions.
3. Report status.
4. Assignment history.
5. Withdrawal status.

Timeline item should include:

1. Time/date.
2. Title.
3. Status.
4. Location/context.
5. Next action if applicable.

### 7.4 Bottom Sheet Pattern

Use bottom sheets for:

1. Filters.
2. Quick actions.
3. Contact options.
4. Report category selection.
5. Assignment decline reason.
6. Confirmation summary.
7. Payout destination selector.

Bottom sheet requirements:

1. Clear title.
2. Safe-area padding.
3. Large tap targets.
4. Close action.
5. Scrollable content when needed.

### 7.5 Full-Screen Sheet Pattern

Use full-screen sheets for:

1. Create Report.
2. Edit profile section.
3. Add payout destination.
4. Change password.
5. Add unavailable date range.
6. Submit handover note.

Rules:

1. Preserve draft where possible.
2. Show clear cancel/back behavior.
3. Validate inline.
4. Confirm before discarding entered data.

---

## 8. Core Components

### 8.1 Buttons

Button hierarchy:

| Type | Usage |
| --- | --- |
| Primary | Acknowledge, Accept, Save, Submit, Request Withdrawal |
| Secondary | Contact PIC, Open WhatsApp, View Details |
| Tertiary | Read More, View History, Open Guide |
| Destructive | Decline, Remove Destination, Logout Other Sessions |

Use specific labels:

```text
Acknowledge Update
Open Trip Details
Contact Agency PIC
Report Issue
Request Withdrawal
Set Available
Submit Handover Note
```

Avoid vague labels:

```text
OK
Proceed
Click Here
Get Started
```

### 8.2 Status Chips

Status chips must include label and color.

Recommended status families:

| Family | Examples |
| --- | --- |
| Neutral | Draft, Archived, Not Required |
| Info | Submitted, Scheduled, New |
| Warning | Pending, Need Revision, Expiring Soon, Changed |
| Success | Active, Verified, Ready, Paid, Completed |
| Error | Blocked, Rejected, Failed, Suspended |
| Secondary | Refunded, Reversed, Withdrawn |

### 8.3 Readiness Summary

Use for trip, activity, document/service, profile, payout, and assignment readiness.

Display:

```text
Ready
0 blocking items
```

or:

```text
Blocked
3 items need agency action
```

Rules:

1. Do not show only percentage.
2. Always show blocker count or next action.
3. Separate readiness from official verification status.

### 8.4 Contact Actions

Contact actions should be obvious and separated:

1. Call Agency PIC.
2. WhatsApp Group.
3. Admin Support.
4. Report Issue.

Rules:

1. Show contact role and name when available.
2. Do not expose personal phone numbers unless released.
3. If WhatsApp link is unavailable, show reason.
4. Emergency contacts should be clearly labeled and not mixed with ordinary support.

### 8.5 Forms

Mobile forms must be short and clear.

Every form field must include:

1. Visible label.
2. Input value.
3. Helper text if needed.
4. Error state.
5. Disabled/read-only state.
6. Permission or policy reason where locked.

Use step-up confirmation for:

1. Payment destination changes.
2. Withdrawal request.
3. Decline assignment.
4. Remove payout destination.
5. Logout other sessions.
6. Account deactivation request.

### 8.6 File Upload

Use file upload for:

1. Profile/license documents.
2. Support report evidence.
3. Future handover attachments if enabled.

Rules:

1. Show accepted file types and max size.
2. Show upload progress.
3. Show failure state and retry.
4. Never trust original filename as safe display alone.
5. Evidence attachments are sensitive.
6. Download/open actions require permission and audit where applicable.

### 8.7 Finance Amount Block

Use for Allowance & Tip.

Structure:

```text
Available Balance
RM 1,250.00
Approved and ready to request withdrawal
```

Withdrawal confirmation must show:

1. Amount.
2. Fee.
3. Net amount.
4. Method.
5. Masked destination.
6. Processing note.
7. Confirmation action.

### 8.8 Offline and Sync Indicator

Mutawwif may operate with weak connectivity.

Use states:

1. Online.
2. Offline cached.
3. Syncing.
4. Sync failed.
5. Last updated.

Copy examples:

```text
Offline view. Last updated 09:42.
This action will sync when connection returns.
```

In Phase 1, read-only offline cache is safer than offline mutation.

---

## 9. Module Design Guidance

### 9.1 Home / Mutawwif Dashboard

Purpose:

1. Show current assignment context.
2. Surface next activity.
3. Highlight urgent notifications.
4. Link to My Trips, Calendar, Notifications, Allowance, and Profile.

Recommended sections:

1. Greeting.
2. Urgent alert.
3. Stats row.
4. Active Trip card.
5. Next Activity card.
6. Earnings summary.
7. Quick actions.

Rules:

1. Home is not a full analytics dashboard.
2. Active Trip and Next Activity are more important than earnings.
3. Show blocked/pending verification state clearly.
4. Hide finance summary if unavailable or not permitted.

### 9.2 Registration / Invitation Acceptance

Design should be simple, reassuring, and secure.

Flow:

```text
Invitation Link
-> Verify invitation
-> Create/confirm account
-> Accept terms
-> Complete profile/license readiness
```

Rules:

1. Avoid account enumeration.
2. Explain expired/invalid invitation clearly.
3. Do not expose assignment details before account rules allow.
4. Use accessible authentication patterns.

### 9.3 Profile, License & Verification

Profile is assignment-readiness, not social profile.

Sections:

1. Profile Overview.
2. Personal Information.
3. Professional Information.
4. License & Documents.
5. Availability.
6. Linked Modules.

Design should show:

1. Verification status.
2. Profile completion.
3. Assignment readiness.
4. Missing/expired/rejected documents.
5. Travel Agency visible summary.

Rules:

1. Mutawwif cannot approve own verification.
2. Sensitive fields are masked.
3. Document rejection needs clear reason and resubmit action.
4. Bank/payout setup belongs to Payment Settings.

### 9.4 Calendar & Schedule

Calendar is the daily operational workspace.

Recommended mobile structure:

1. Today summary.
2. Date strip.
3. Day agenda.
4. Filters.
5. Activity cards.
6. Schedule alerts.

Activity card should show:

1. Time and timezone.
2. Activity name.
3. Trip/group.
4. Location/meeting point.
5. Status/change indicator.
6. Quick action: Open.

Rules:

1. Calendar reads Group Trip schedule snapshots.
2. Mutawwif cannot edit schedule.
3. Changed activities need visible change marker.
4. Timezone must be clear for destination activities.
5. Offline cached schedule should show last updated.

### 9.5 My Group Trip & Trip Details

Trip Details is the assigned trip workspace.

Recommended tabs:

1. Overview.
2. Today / Itinerary.
3. Members.
4. Readiness.
5. Hotel.
6. Flight.
7. Transport.
8. Contacts.
9. Reports.

Trip card should show:

1. Trip name/code.
2. Agency name.
3. Date range.
4. City flow.
5. Assignment role.
6. Pilgrim count.
7. Readiness status.
8. Next activity.

Rules:

1. Read-first.
2. Assignment-scoped.
3. Privacy-safe member display.
4. Acknowledge schedule changes when required.
5. Report Issue should be easy to find.
6. Full trip access depends on assignment status.

### 9.6 Activity Guidance / Daily Itinerary Execution

Activity Guidance is the "what should I do now?" screen.

Recommended structure:

1. Activity header.
2. Time, timezone, and status.
3. Location and meeting point.
4. Trip/group context.
5. Preparation checklist.
6. Step-by-step instructions.
7. Approved guidance.
8. Participant summary.
9. Assistance/readiness alerts.
10. Contact/actions.

Sticky actions:

```text
[Acknowledge Update] [Report Issue]
```

or:

```text
[Open Map] [Contact PIC]
```

Rules:

1. Do not edit official itinerary here.
2. Guidance must show source/review label where applicable.
3. Optional execution signals are policy-controlled.
4. Activity issue report should prefill trip/activity context.
5. Keep controls large and separated.

### 9.7 Referral

Referral should be lightweight and finance-safe.

Design should show:

1. Referral code/link.
2. Share action.
3. Referral status.
4. Reward eligibility.
5. Finance-approved reward status.
6. Support/report link for dispute.

Rules:

1. Do not promise guaranteed reward.
2. Approved reward withdrawal belongs to Allowance & Tip.
3. Payout destination belongs to Payment Settings.
4. Referral benefits should be traceable and disclosed where needed.

### 9.8 Allowance & Tip

Allowance & Tip is balance visibility and withdrawal request.

Recommended sections:

1. Available Balance.
2. Pending Balance.
3. Source breakdown.
4. Withdraw Funds.
5. Withdrawal history.
6. Payment Settings shortcut.

Withdrawal flow:

```text
Enter amount
-> Select method/destination
-> Review fee and net amount
-> Confirm request
-> Request submitted
```

Rules:

1. Available balance must be Finance-approved.
2. Pending balance is separate from available balance.
3. Mutawwif cannot approve payout.
4. Use RM consistently.
5. Show masked payout destination.
6. Confirm before submission.

### 9.9 Payment Settings

Payment Settings owns payout destination readiness.

Sections:

1. Payout readiness.
2. Saved payout destinations.
3. Add bank/e-wallet destination.
4. Verification status.
5. Receipt/notification preferences.
6. Security/privacy notes.

Rules:

1. Mask saved destination after save.
2. Do not collect raw card/CVV/banking password.
3. Destination status is separate from withdrawal status.
4. Sensitive changes require OTP/password/recent authentication.
5. PRD 08 reads summary only.

### 9.10 Notifications & Announcements

Inbox should provide signal, not noise.

Tabs:

```text
All, Urgent, Trips, Schedule, Profile, Finance, Support, System
```

Notification item should show:

1. Priority.
2. Category.
3. Safe summary.
4. Source module.
5. Time.
6. Read/unread.
7. Acknowledgement required if applicable.

Rules:

1. Preview must not expose sensitive data.
2. In-app inbox is the communication source of record.
3. Email/WhatsApp delivery failure does not remove inbox record.
4. Required acknowledgement should be reserved for important operational updates.

### 9.11 Reports & Support

Reports & Support is a structured case center, not chat.

Create report flow:

```text
Choose category
-> Confirm related context
-> Add title/description
-> Attach evidence
-> Review and submit
```

Case detail should show:

1. Public status.
2. Category/priority.
3. Related context.
4. Public comments/replies.
5. Attachments.
6. Resolution note.
7. Reopen action if eligible.

Rules:

1. Hide Admin/TA internal notes.
2. Contextual reports from trip/activity/finance should be prefilled.
3. Attachments are sensitive.
4. Urgent priority should be available but not overused.
5. Reopen requires reason.

### 9.12 Knowledge Base & Guidance Library

Knowledge Base supports field guidance and self-help.

Design should include:

1. Search.
2. Categories.
3. Saved/recent articles.
4. Trip/activity contextual suggestions.
5. Source/reviewer label.
6. Disclaimer for sensitive guidance.

Rules:

1. Guidance must be approved/published.
2. Religious/legal/medical guidance should include appropriate source/review metadata.
3. Article pages should be readable offline where cached.
4. Do not mix draft/internal guidance into mutawwif view.

### 9.13 Trip Documents & Service Readiness

Readiness is awareness, not management.

Categories:

1. Documents.
2. Visa.
3. Health/Vaccination.
4. Flight Ticket.
5. Train Ticket.
6. Hotel/Rooming.
7. Transport.
8. Kit/Service.
9. Payment Clearance if configured.

Rules:

1. Show Ready, Warning, Blocked, Pending, Not Required.
2. Show blocker count and departure/activity impact.
3. Hide raw document files by default.
4. Mutawwif cannot upload/verify/reject documents in Phase 1.
5. Contact PIC and Report Issue should be available.

### 9.14 Finance Activity Statements

Finance statements should summarize own records only.

Design should show:

1. Monthly summary.
2. Allowance lines.
3. Tip lines.
4. Referral reward lines.
5. Withdrawal lines.
6. Status and source.
7. Download/export only if enabled.

Rules:

1. Use RM.
2. Show status for every money line.
3. Do not expose internal finance notes.
4. Paid, reversed, rejected, pending, and processing must be distinct.

### 9.15 Ratings & Feedback

Ratings & Feedback is feedback visibility, not reputation manipulation.

Design should show:

1. Rating summary.
2. Trip-linked feedback.
3. Moderation/status labels.
4. Response/report option if enabled.
5. Privacy-safe reviewer display.

Rules:

1. Do not show private pilgrim data.
2. Do not allow mutawwif to edit ratings.
3. Low-rating support handoff should be respectful.
4. Public visibility depends on Admin/TA moderation.

### 9.16 Account Settings & Security

Account Settings is self-service, not Admin settings.

Sections:

1. Login identity.
2. Language/timezone/date format.
3. Notification channel preferences.
4. Password/security.
5. Sessions.
6. Privacy display preferences.
7. Account support/deactivation request.

Rules:

1. Sensitive changes require recent authentication.
2. Mandatory safety/security/trip/finance notifications cannot be disabled.
3. Session list should show current session.
4. Account deactivation is a request workflow.
5. Do not expose internal security risk labels.

### 9.17 Assignment Requests & Handover

Assignment Request is the response surface, not assignment authority.

Assignment detail should show:

1. Role: Lead, Assistant, Replacement, Standby.
2. Trip name/code.
3. Date range.
4. Destination/city flow.
5. Agency.
6. Expected pilgrim count.
7. Responsibility summary.
8. Conflict/readiness warnings.
9. Accept/Decline/Acknowledge action based on policy.

Rules:

1. Pending assignment preview must minimize private data.
2. Decline requires reason.
3. Handover note preserves history.
4. Confirmed assignment controls visibility in Calendar and My Trips.
5. Mutawwif cannot self-assign or replace another mutawwif.

### 9.18 Availability & Assignment Preferences

Availability is mutawwif-owned input, not final eligibility.

Sections:

1. Availability status.
2. Unavailable date ranges.
3. Reason and visibility.
4. Assignment preferences.
5. Readiness blockers.
6. Conflict warnings.

Rules:

1. Changing availability never cancels assignment automatically.
2. Conflicts route to Admin/TA or Reports & Support.
3. Private reason should not be exposed to TA unless policy allows.
4. Preferences are matching signals, not guarantees.
5. Show affected assignment before save when overlap exists.

---

## 10. Status and Readiness Patterns

### 10.1 Separate Status Domains

Do not merge unrelated statuses into one label.

Example Activity screen:

| Domain | Example |
| --- | --- |
| Assignment status | Active |
| Activity status | Changed |
| Acknowledgement status | Not Acknowledged |
| Readiness status | 2 blockers |

### 10.2 Operational Priority

Urgency should be factual and respectful.

Good:

```text
Schedule changed 12 minutes ago.
Trip departs in 2 days with 3 blocking items.
Payout destination needs verification.
```

Avoid:

```text
Hurry!
Last chance!
Critical!!!
```

### 10.3 Acknowledgement States

Use acknowledgement for important changes.

States:

1. Not Required.
2. Required.
3. Acknowledged.
4. Overdue.

Acknowledgement does not mean the mutawwif changed the source record. It only records that the mutawwif has seen and confirmed awareness.

---

## 11. Privacy and Sensitive Data

### 11.1 Minimum Necessary Access

Every screen should ask:

```text
Does mutawwif need this data to guide, coordinate, contact, report, or prepare?
```

If no, hide it.

### 11.2 Sensitive Data Masking

Mask:

1. Identity/passport number.
2. Bank/e-wallet destination.
3. Payment destination.
4. Phone/email where full value is unnecessary.
5. Private report attachment name where needed.

Examples:

```text
Maybank XXXX7890
+60XXXXXX543
Passport status: Verified
```

### 11.3 Notification Privacy

Notification previews must be safe.

Good:

```text
Schedule changed for GT-2026-09-012.
3 readiness items need attention.
```

Avoid:

```text
Ahmad passport number A12345678 was rejected.
```

---

## 12. Offline, Loading, Empty, and Error States

### 12.1 Offline

Offline read-only cache is recommended for:

1. Today's schedule.
2. Active trip overview.
3. Activity guidance.
4. Agency PIC contact if safe.
5. Recent notifications.

Show:

```text
Offline view. Last updated 09:42.
```

If an action cannot be submitted offline, say so clearly.

### 12.2 Loading

Use skeleton cards for:

1. Dashboard cards.
2. Trip cards.
3. Activity list.
4. Notification list.
5. Case list.

Avoid full-page spinner unless first load requires it.

### 12.3 Empty

Empty state should include:

1. What is empty.
2. Why it may be empty.
3. Next action if available.

Example:

```text
No assigned trips yet
New assignments will appear here after they are released by your agency.
```

### 12.4 Error

Error state should include:

1. Plain explanation.
2. Retry action.
3. Support route when useful.

Do not expose raw backend error messages.

---

## 13. Accessibility

Requirements:

1. Body text minimum 15-16px.
2. Touch targets at least 44 x 44px where possible.
3. Visible focus states.
4. Inputs always have visible labels.
5. Status does not rely on color only.
6. Icons have accessible names.
7. Dynamic status messages are announced where appropriate.
8. Bottom sheets and modals trap focus and return focus after close.
9. Reduced motion support.
10. Clear language for errors and locked states.

Field-specific guidance:

1. Separate urgent actions so they are not tapped accidentally.
2. Avoid tiny icon-only controls during active trip/activity flows.
3. Use clear confirmation for finance/security/destructive actions.

---

## 14. Performance

Mobile field use needs fast pages.

Rules:

1. Prioritize Home, Calendar, Active Trip, and Activity Guidance.
2. Cache read-only active trip/activity data where safe.
3. Lazy-load heavy tabs such as history, finance statements, and support threads.
4. Do not load sensitive files until opened.
5. Use small image thumbnails and compressed media.
6. Keep notification list paginated.
7. Use last-updated timestamps on cached data.

---

## 15. AI Design Prompting Rules

When asking an AI design agent to create Mutawwif View screens, do not ask:

```text
Create a nice mobile dashboard for mutawwif.
```

Use:

```text
Create a mobile web first Mutawwif View screen for UmrahHaji.com.

It must feel like a field operations companion for assigned Umrah/Hajj guidance, not a generic SaaS dashboard.

Use English UI copy and RM for finance examples.

Prioritize:
- current/next activity
- assigned trip clarity
- schedule changes
- approved guidance
- agency PIC contact
- WhatsApp group access
- privacy-safe pilgrim context
- readiness blockers
- issue reporting
- acknowledgement states
- offline-friendly read-only behavior

Avoid:
- desktop admin tables
- generic KPI dashboards
- decorative hero sections
- vague CTAs
- exposing pilgrim payment/document data
- pretending guidance is official fatwa
- editing trip or finance data from mutawwif view

Every section must help mutawwif see, guide, acknowledge, contact, report, prepare, or track.
```

Reject AI output if:

1. It looks like a generic mobile dashboard.
2. It gives mutawwif edit authority over trip/package/finance data.
3. It hides next activity below low-value metrics.
4. It exposes sensitive pilgrim data.
5. It uses desktop table layouts as the primary mobile pattern.
6. It uses non-English UI copy.
7. It uses non-RM finance examples.
8. It lacks offline/error/changed-state behavior.
9. It presents guidance as final religious authority.

---

## 16. Design QA Checklist

Before approving any Mutawwif View screen:

1. Is the screen mobile web first?
2. Is the main field action clear within 5 seconds?
3. Is assigned trip/activity context visible?
4. Are time, timezone, location, and meeting point clear where relevant?
5. Are schedule changes and acknowledgements visible?
6. Are privacy boundaries respected?
7. Are sensitive values masked or hidden?
8. Are mutawwif edit limitations clear?
9. Is Report Issue easy to reach from trip/activity context?
10. Are contact actions clear and separated?
11. Are offline/loading/error states designed?
12. Are touch targets comfortable?
13. Is visible copy English?
14. Are RM amounts used for finance?
15. Does guidance show source/review/disclaimer where needed?
16. Are mandatory notifications not suppressed?
17. Are assignment and availability authority boundaries clear?
18. Does the screen avoid generic SaaS/mobile dashboard patterns?

---

## 17. Component Checklist

Core components required:

1. Mobile top bar.
2. Bottom navigation.
3. Deep page header.
4. Sticky bottom action bar.
5. Urgent alert banner.
6. Trip card.
7. Activity card.
8. Timeline item.
9. Status chip.
10. Readiness summary.
11. Acknowledgement banner.
12. Contact action group.
13. Bottom sheet.
14. Full-screen form sheet.
15. File upload.
16. Finance amount block.
17. Payout destination card.
18. Notification item.
19. Report case card.
20. Guidance content block.
21. Offline/sync indicator.
22. Empty/loading/error states.
23. Permission/locked state.
24. Privacy mask.
25. Confirmation modal.

---

## 18. Final Design Decision

Mutawwif View should be designed as a mobile web first field companion.

It should optimize for:

1. Assigned trip visibility.
2. Today's schedule.
3. Activity execution guidance.
4. Safe pilgrim context.
5. Readiness awareness.
6. Contact and escalation.
7. Assignment response and handover.
8. Availability/readiness controls.
9. Allowance/tip visibility.
10. Payment destination safety.
11. Account security.

The accepted direction is:

```text
Mobile Field Companion
```

It must be English-first, RM-priced for finance, privacy-safe, assignment-scoped, offline-tolerant, and centered on field execution rather than back-office management.
