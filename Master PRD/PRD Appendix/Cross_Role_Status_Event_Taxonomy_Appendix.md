# Cross-Role Status & Event Taxonomy Appendix

Product: UmrahHaji.com  
Scope: Admin Panel, Travel Agency Portal, Jamaah/User View, Mutawwif View  
Document Type: Cross-role taxonomy appendix  
Status: Draft  
Last Updated: 21 June 2026  

---

## 1. Objective

This appendix defines shared status names, event keys, report severity, notification categories, audit action types, and ownership rules used across Admin Panel, Travel Agency Portal, Jamaah/User View, and Mutawwif View.

The goal is to prevent each PRD from inventing slightly different labels for the same operational state.

This appendix must help product, design, and engineering answer:

1. Which module owns each status?
2. Which status labels are canonical for backend/schema?
3. Which labels can be simplified for user-facing UI?
4. Which events should trigger notifications, audit logs, or downstream sync?
5. Which status changes require permission, reason, or audit?
6. Which statuses should be visible to Admin, Travel Agency, Jamaah, and Mutawwif?
7. Which categories are mandatory for notifications and reports?

This appendix is not a replacement for detailed module PRDs. Module PRDs can define local behavior, but they should reference the taxonomy here when naming statuses, events, severity, and audit actions.

---

## 2. Taxonomy Principles

1. Backend status values should be stable, English, lowercase snake_case, and role-neutral.
2. User-facing labels can be localized and simplified.
3. Status owner must be explicit.
4. A user-facing module may display a status but should not update it unless that module owns the action.
5. Sensitive status changes require audit logs.
6. Any manual correction must require actor, permission, reason, timestamp, and audit trail.
7. Historical snapshots must not be silently rewritten after booking, payment, document review, referral attribution, or finance approval.
8. Public/user-facing labels must not expose internal fraud, finance, compliance, or security details.
9. Mandatory notifications cannot be disabled through account preferences.
10. Events should use predictable names: `{domain}.{entity}.{action_or_status}`.

---

## 3. Naming Conventions

### 3.1 Status Values

Use lowercase snake_case:

```text
pending_review
need_revision
payment_pending
approved
reversed
```

Rules:

1. Do not use spaces in backend values.
2. Do not use mixed case in backend values.
3. Do not use UI wording as database values when wording may change.
4. Avoid overloaded status names like `done` or `failed` without domain context.

### 3.2 Event Keys

Use `{domain}.{entity}.{event}`:

```text
booking.booking.submitted
document.item.need_revision
payment.invoice.paid
report.case.status_updated
referral.reward.approved
```

### 3.3 Audit Actions

Use verb-based values:

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
```

---

## 4. Domain Ownership Matrix

| Domain | Source of Truth | User-Facing Consumers | Notes |
| --- | --- | --- | --- |
| Account/Auth | Admin User Management / Auth Service | JUV 02, JUV 18, MV 02, MV 16, TA 03/15 | Account status, session, password, lock/suspend |
| Profile/Jamaah Identity | Admin Jamaah Management + JUV Profile | TA Jamaah, JUV Profile, Documents, Booking | Sensitive data is permission-controlled |
| Agency Profile | Admin TA Management + TA Profile | JUV Agency Profile, Package Discovery | Verification status is Admin-owned |
| Package | Admin/TA Package Management | JUV Discovery/Compare/Booking/Referral | Public package data must use published snapshot |
| Booking | Admin/TA Booking Management | JUV Booking/My Trip, TA Finance, Reports | Booking status is not changed by JUV except user actions |
| Payment/Invoice | Admin Billing/Finance + TA Finance | JUV Transaction/Payment Settings, MV Finance | User views status; Finance owns verification |
| Group Trip | Admin/TA Group Trip Management | JUV My Trip, MV Trip/Activity | User-facing snapshot, operations-owned |
| Assignment | Admin/TA Mutawwif Assignment | MV Assignment, JUV My Trip | Mutawwif can accept/decline only if workflow enables |
| Documents/Services | TA Documents & Services + Admin rules | JUV 17, MV 13, JUV 06/12 | Jamaah submits; TA/Admin verifies |
| Reports/Support | Admin Report + TA Reports | JUV 14, MV 11 | Case lifecycle must be shared |
| Notifications | Admin/TA Notification/Announcement Mgmt | JUV 13, MV 10, account preferences | Event naming must be shared |
| Testimonials/Feedback | Admin Testimonial Mgmt + TA Testimonials | JUV 15, MV 15 | Jamaah submits; Admin/TA moderates |
| Referral | Admin/Finance/Referral policy | JUV 16, MV 07 | Back-office reward owner still required |
| Audit | Admin Audit / Platform Compliance | All modules | Every sensitive action emits audit |

---

## 5. Global Status Families

### 5.1 Universal Lifecycle Status

Use these only when no more specific domain status applies.

| Canonical Status | UI Label | Meaning | Typical Owner |
| --- | --- | --- | --- |
| draft | Draft | Created but not submitted | Actor module |
| submitted | Submitted | Submitted by user/staff | Actor module |
| pending_review | Pending Review | Waiting authorized review | Reviewer module |
| approved | Approved | Accepted by authorized owner | Admin/TA/Finance |
| rejected | Rejected | Rejected with reason | Admin/TA/Finance |
| need_revision | Need Revision | User/staff must fix and resubmit | Reviewer module |
| active | Active | Currently valid/enabled | Owner module |
| inactive | Inactive | Not active but retained | Owner module |
| paused | Paused | Temporarily stopped | Owner module |
| expired | Expired | Validity/window ended | Owner module |
| cancelled | Cancelled | Intentionally cancelled | Owner module |
| archived | Archived | Retained but hidden from active workflow | Owner module |
| locked | Locked | Editing/access temporarily blocked | Admin/Auth/Owner |
| suspended | Suspended | Account/entity restricted by policy | Admin/Auth |
| under_review | Under Review | Manual/extra review in progress | Admin/Compliance |

### 5.2 Status Visibility Levels

| Visibility Level | Description | Example |
| --- | --- | --- |
| public | Safe for public visitors | Package published |
| user_safe | Safe for owning user | Document need revision |
| role_safe | Safe for assigned role | Mutawwif trip readiness warning |
| internal | Staff-only | Internal verification notes |
| restricted | Elevated permission only | Fraud score, payment proof metadata |
| audit_only | Audit/compliance only | Raw override reason, system identifiers |

---

## 6. Account and Auth Status

### 6.1 Account Status

| Canonical Status | UI Label | Owner | Visible To |
| --- | --- | --- | --- |
| pending_verification | Pending Verification | Auth/Admin | User, Admin |
| active | Active | Auth/Admin | User, Admin |
| invited | Invited | Auth/Admin/TA | User, Admin, TA |
| invitation_expired | Invitation Expired | Auth/Admin/TA | User, Admin, TA |
| locked | Locked | Auth/Admin | User, Admin |
| suspended | Suspended | Auth/Admin | User, Admin |
| deactivation_requested | Deactivation Requested | Admin/Support | User, Admin |
| deactivated | Deactivated | Admin/Auth | User, Admin |
| deletion_requested | Deletion Requested | Admin/Support | User, Admin |
| anonymized | Anonymized | Admin/Compliance | Admin only unless policy allows |

Rules:

1. Users cannot self-set `active`, `locked`, `suspended`, `deactivated`, or `anonymized`.
2. Deactivation and deletion are request workflows, not immediate destructive actions.
3. Active booking, trip, payment, refund, report, referral reward, or legal retention can block deletion.

### 6.2 Session Status

| Canonical Status | Meaning |
| --- | --- |
| active | Session can be used |
| current | Current device/session |
| expired | Session expired by timeout |
| revoked | Session manually revoked |
| invalidated | Session invalidated after password/security event |
| suspicious | Session flagged for review |

---

## 7. Booking Status

### 7.1 Booking Lifecycle

| Canonical Status | UI Label | Owner | Notes |
| --- | --- | --- | --- |
| draft | Draft | JUV Booking / TA Booking | User/staff started but not submitted |
| submitted | Submitted | Booking | Booking request submitted |
| pending_review | Pending Review | TA/Admin Booking | Waiting agency/admin action |
| pending_payment | Payment Pending | Booking/Billing | Payment required |
| confirmed | Confirmed | TA/Admin Booking | Booking accepted/confirmed |
| waitlisted | Waitlisted | TA/Admin Booking | Capacity or approval pending |
| partially_paid | Partially Paid | Billing/Finance | Payment plan/deposit exists |
| paid | Paid | Billing/Finance | Required payment completed |
| assigned_to_trip | Assigned to Trip | Group Trip | Linked to group trip |
| cancelled | Cancelled | Booking | Cancelled before/after confirmation |
| expired | Expired | Booking | Booking window expired |
| refunded | Refunded | Finance | Refund completed |
| completed | Completed | Group Trip/Booking | Trip journey completed |

Rules:

1. Booking status owner is Admin/TA Booking.
2. Payment status can influence booking status but does not replace booking status.
3. Referral attribution must be snapshotted at booking submission and not silently changed later.
4. Jamaah can submit/cancel/request changes only where policy allows.

---

## 8. Payment, Invoice, Refund, and Payout Status

### 8.1 Invoice Status

| Canonical Status | UI Label | Owner |
| --- | --- | --- |
| draft | Draft | Billing/Finance |
| issued | Issued | Billing/Finance |
| pending_payment | Pending Payment | Billing/Finance |
| partially_paid | Partially Paid | Billing/Finance |
| paid | Paid | Billing/Finance |
| overdue | Overdue | Billing/Finance |
| void | Void | Billing/Finance |
| cancelled | Cancelled | Billing/Finance |
| refunded | Refunded | Billing/Finance |
| written_off | Written Off | Finance |

### 8.2 Payment Status

| Canonical Status | UI Label | Owner | Notes |
| --- | --- | --- | --- |
| initiated | Initiated | Billing/Gateway | Payment started |
| pending_proof | Proof Required | Billing | Manual transfer proof needed |
| proof_uploaded | Proof Uploaded | User/TA | Waiting review |
| processing | Processing | Gateway/Billing | Gateway or manual review |
| verified | Verified | Finance/Billing | Payment accepted |
| rejected | Rejected | Finance/Billing | Safe reason required |
| failed | Failed | Gateway/Billing | Payment failed |
| expired | Expired | Billing/Gateway | Link/session expired |
| reversed | Reversed | Finance | Payment reversed |
| chargeback | Chargeback | Finance | Provider dispute |

### 8.3 Refund Status

| Canonical Status | UI Label | Owner |
| --- | --- | --- |
| requested | Requested | User/Support/Finance |
| pending_review | Pending Review | Finance |
| approved | Approved | Finance |
| rejected | Rejected | Finance |
| processing | Processing | Finance/Gateway |
| paid | Paid | Finance |
| failed | Failed | Finance/Gateway |
| cancelled | Cancelled | Finance |

### 8.4 Payout / Withdrawal Status

| Canonical Status | UI Label | Owner |
| --- | --- | --- |
| not_available | Not Available | Finance/Policy |
| eligible | Eligible | Finance |
| requested | Requested | User/Mutawwif/Finance |
| pending_review | Pending Review | Finance |
| approved | Approved | Finance |
| rejected | Rejected | Finance |
| processing | Processing | Finance/Provider |
| paid | Paid | Finance |
| failed | Failed | Finance/Provider |
| reversed | Reversed | Finance |

Rules:

1. JUV/MV Payment Settings can manage destination only if policy allows.
2. User-facing modules must not mark finance records as approved, paid, reversed, or rejected.
3. Finance-sensitive changes require audit and reason.

---

## 9. Document and Service Readiness Status

### 9.1 Document Status

| Canonical Status | UI Label | Blocks Readiness | Owner |
| --- | --- | ---: | --- |
| not_required | Not Required | No | TA/Admin rules |
| missing | Missing | Yes | System/rules |
| draft | Draft | Yes | User |
| uploaded | Uploaded | Yes | User/system |
| processing | Processing | Yes | System |
| pending_review | Pending Review | Yes | TA/Admin |
| need_revision | Need Revision | Yes | TA/Admin |
| verified | Verified | No | TA/Admin |
| expiring_soon | Expiring Soon | Warning | System/rules |
| expired | Expired | Yes | System/rules |
| waived | Waived | No if approved | TA/Admin |
| locked | Locked | Depends | TA/Admin |

### 9.2 Service Readiness Status

| Canonical Status | UI Label | Blocks Readiness | Owner |
| --- | --- | ---: | --- |
| not_required | Not Required | No | TA/Admin rules |
| not_started | Not Started | Warning/Yes | TA/Admin |
| in_progress | In Progress | Warning | TA/Admin |
| pending_user_action | Action Needed | Yes | TA/Admin/User |
| ready | Ready | No | TA/Admin |
| released | Released | No | TA/Admin |
| delayed | Delayed | Warning/Yes | TA/Admin |
| blocked | Blocked | Yes | TA/Admin |
| cancelled | Cancelled | N/A | TA/Admin |

### 9.3 Overall Readiness Status

| Canonical Status | UI Label | Meaning |
| --- | --- | --- |
| ready | Ready | All required items complete |
| action_needed | Action Needed | User must act |
| pending_review | Pending Review | Waiting reviewer |
| warning | Warning | Attention needed but not necessarily blocking |
| blocked | Blocked | Required item blocks readiness |
| not_available | Not Available | Requirements not generated |
| locked | Locked | Temporarily blocked by review/policy |

Rules:

1. Jamaah can submit documents but cannot verify documents.
2. Mutawwif can view safe readiness summary only.
3. TA/Admin owns verification and service readiness.
4. Rejection must include user-safe reason.

---

## 10. Group Trip, Assignment, and Activity Status

### 10.1 Group Trip Status

| Canonical Status | UI Label | Owner |
| --- | --- | --- |
| planning | Planning | TA/Admin Group Trip |
| open | Open | TA/Admin |
| ready | Ready | TA/Admin |
| upcoming | Upcoming | TA/Admin |
| active | Active | TA/Admin |
| completed | Completed | TA/Admin |
| cancelled | Cancelled | TA/Admin |
| archived | Archived | TA/Admin |

### 10.2 Assignment Status

| Canonical Status | UI Label | Owner |
| --- | --- | --- |
| proposed | Proposed | TA/Admin Assignment |
| pending_response | Awaiting Response | Mutawwif/TA |
| accepted | Accepted | Mutawwif/TA |
| declined | Declined | Mutawwif/TA |
| assigned | Assigned | TA/Admin |
| active | Active | TA/Admin |
| handover_requested | Handover Requested | Mutawwif/TA |
| handover_in_progress | Handover In Progress | TA/Admin |
| handed_over | Handed Over | TA/Admin |
| replaced | Replaced | TA/Admin |
| cancelled | Cancelled | TA/Admin |

### 10.3 Activity Execution Status

| Canonical Status | UI Label | Owner |
| --- | --- | --- |
| scheduled | Scheduled | Itinerary/Group Trip |
| upcoming | Upcoming | Itinerary/Group Trip |
| in_progress | In Progress | Mutawwif/TA |
| delayed | Delayed | Mutawwif/TA |
| completed | Completed | Mutawwif/TA |
| skipped | Skipped | TA/Admin |
| cancelled | Cancelled | TA/Admin |
| changed | Changed | TA/Admin |

Rules:

1. Mutawwif can update activity execution only if assignment and policy allow.
2. Jamaah sees safe user-facing changes and guidance, not internal staff notes.
3. Handover/reassignment should trigger notification when user-facing.

---

## 11. Reports and Support Taxonomy

### 11.1 Report Category

| Canonical Category | UI Label | Default Owner |
| --- | --- | --- |
| account_access | Account Access | Support/Admin |
| booking | Booking | TA/Admin Booking |
| payment_refund | Payment / Refund | Finance |
| documents_services | Documents & Services | TA Ops/Admin |
| group_trip | Group Trip | TA Ops/Admin |
| itinerary_activity | Itinerary / Activity | TA Ops/Mutawwif |
| mutawwif | Mutawwif | TA Ops/Admin |
| travel_agency | Travel Agency | Admin/Support |
| safety_emergency | Safety / Emergency | Support/Admin/TA |
| referral_reward | Referral / Reward | Finance/Admin |
| testimonial_feedback | Feedback / Testimonial | Admin/TA |
| technical_issue | Technical Issue | Platform Support |
| privacy_data | Privacy / Data Request | Admin/Compliance |
| other | Other | Support |

### 11.2 Report Severity

| Severity | UI Label | Meaning | Example SLA Direction |
| --- | --- | --- | --- |
| s1_emergency | Emergency | Immediate safety/medical/security risk | Immediate escalation |
| s2_critical | Critical | Blocks travel, payment, document, or active trip operation | Same day |
| s3_high | High | Serious issue, time-sensitive but not emergency | 1-2 business days |
| s4_normal | Normal | Standard support case | 2-5 business days |
| s5_low | Low | Feedback/question/no urgent action | Best effort |

### 11.3 Report Status

| Canonical Status | UI Label | Owner |
| --- | --- | --- |
| draft | Draft | User |
| submitted | Submitted | User/system |
| received | Received | Support system |
| triage | In Triage | Support/Admin/TA |
| assigned | Assigned | Support/Admin/TA |
| in_progress | In Progress | Owner |
| waiting_user | Waiting for You | Owner/user |
| waiting_internal | Waiting Internal Review | Owner |
| escalated | Escalated | Support/Admin |
| resolved | Resolved | Owner |
| closed | Closed | Owner |
| reopened | Reopened | User/Owner |
| cancelled | Cancelled | User/Owner |
| archived | Archived | Owner |

Rules:

1. Emergency cases bypass normal notification preferences.
2. Case previews must mask sensitive details.
3. Internal notes are not user-facing unless explicitly released as public reply.
4. Reopen rules must be policy-controlled.

---

## 12. Notification and Announcement Taxonomy

### 12.1 Notification Category

| Category | Mandatory | Examples |
| --- | ---: | --- |
| security | Yes | Login alert, password changed |
| account | Yes | Account locked, invitation accepted |
| booking | Limited | Booking submitted, confirmed, cancelled |
| payment | Limited | Payment due, proof rejected, refund status |
| documents | Limited | Missing, rejected, expiring document |
| trip | Limited | Trip update, itinerary change, hotel/ticket released |
| safety | Yes | Emergency, critical safety alert |
| support | Limited | Report status update, reply received |
| announcement | Limited | Agency/platform announcement |
| referral | Optional/limited | Referral converted, reward status |
| feedback | Optional | Feedback request, moderation status |
| guidance | Optional | New guide, checklist reminder |
| marketing | Optional | Promotion, campaign |

### 12.2 Notification Status

| Canonical Status | Meaning |
| --- | --- |
| queued | Waiting delivery |
| sent | Sent to provider/channel |
| delivered | Delivery confirmed |
| failed | Delivery failed |
| read | User opened/read |
| unread | User has not read |
| acknowledged | User acknowledged required notice |
| archived | User/system archived |
| expired | No longer relevant |
| suppressed | Suppressed by policy/rate limit |

### 12.3 Notification Event Key Examples

| Event Key | Source | Target Roles |
| --- | --- | --- |
| account.password.changed | Auth | User |
| booking.booking.submitted | Booking | Jamaah, TA |
| booking.booking.confirmed | Booking | Jamaah, TA |
| payment.invoice.overdue | Billing | Jamaah, TA, Admin |
| payment.proof.rejected | Finance/Billing | Jamaah, TA |
| document.item.need_revision | Docs & Services | Jamaah, TA |
| document.item.verified | Docs & Services | Jamaah, TA |
| service.ticket.released | Group Trip / Services | Jamaah |
| trip.itinerary.changed | Group Trip / Itinerary | Jamaah, Mutawwif |
| assignment.mutawwif.replaced | Assignment | Jamaah, Mutawwif, TA |
| report.case.status_updated | Reports | Reporter, owner |
| feedback.request.created | Testimonials | Jamaah |
| referral.reward.approved | Finance/Referral | Jamaah/Mutawwif |
| safety.alert.critical | Admin/TA | Targeted roles |

Rules:

1. Notification event preview must use safe public/user-facing text.
2. Deep links must re-check permission before opening target.
3. Mandatory categories cannot be disabled.
4. Delivery failure does not change source record status.

---

## 13. Testimonial, Feedback, and Rating Status

### 13.1 Feedback Request Status

| Canonical Status | UI Label |
| --- | --- |
| available | Available |
| submitted | Submitted |
| skipped | Skipped |
| expired | Expired |
| cancelled | Cancelled |

### 13.2 Feedback Submission Status

| Canonical Status | UI Label | Owner |
| --- | --- | --- |
| submitted | Submitted | Jamaah/Mutawwif |
| pending_review | Pending Review | Admin/TA |
| approved_internal | Approved Internal | Admin/TA |
| approved_public | Approved Public | Admin/TA |
| hidden | Hidden | Admin/TA |
| flagged | Under Review | Admin/TA |
| escalated | Escalated | Admin/Support |
| archived | Archived | Admin/TA |

Rules:

1. Public testimonial requires consent and moderation.
2. Feedback does not automatically become report/support case.
3. Tip/gratuity must stay separate from review score.

---

## 14. Referral and Reward Status

### 14.1 Referral Lifecycle Status

| Canonical Status | UI Label | Owner |
| --- | --- | --- |
| active_code | Active Code | Referral policy |
| clicked | Clicked | System |
| registered | Registered | Auth/Referral |
| booking_started | Booking Started | Booking/Referral |
| booking_submitted | Booking Submitted | Booking/Referral |
| payment_pending | Payment Pending | Billing/Referral |
| eligible | Eligible | Referral/Finance |
| pending_review | Pending Review | Finance/Admin |
| approved | Approved | Finance/Admin |
| rewarded | Rewarded | Finance |
| rejected | Rejected | Finance/Admin |
| expired | Expired | Referral policy |
| reversed | Reversed | Finance/Admin |
| suspicious | Under Review | Admin/Compliance |

### 14.2 Reward Status

| Canonical Status | UI Label |
| --- | --- |
| not_applicable | Not Applicable |
| estimate | Estimate |
| pending_eligibility | Pending Eligibility |
| eligible_for_review | Eligible for Review |
| pending_finance_review | Pending Finance Review |
| approved | Approved |
| credited | Credited |
| payout_pending | Payout Pending |
| paid | Paid |
| rejected | Rejected |
| reversed | Reversed |

Rules:

1. Referral estimate is not final reward.
2. Finance/Admin owns approval, rejection, reversal, payout, and paid status.
3. Referred user data must be masked.
4. Self-referral and duplicate attribution must be blocked or reviewed.

---

## 15. Content, Article, and Announcement Status

### 15.1 Content Status

| Canonical Status | UI Label | Owner |
| --- | --- | --- |
| draft | Draft | Admin/TA Content |
| pending_review | Pending Review | Admin/TA Content |
| approved | Approved | Admin/TA Content |
| scheduled | Scheduled | Admin/TA Content |
| published | Published | Admin/TA Content |
| unpublished | Unpublished | Admin/TA Content |
| archived | Archived | Admin/TA Content |
| rejected | Rejected | Admin/TA Content |

### 15.2 Announcement Status

| Canonical Status | UI Label |
| --- | --- |
| draft | Draft |
| pending_approval | Pending Approval |
| approved | Approved |
| scheduled | Scheduled |
| sending | Sending |
| sent | Sent |
| partially_sent | Partially Sent |
| failed | Failed |
| cancelled | Cancelled |
| archived | Archived |

---

## 16. Audit Log Taxonomy

### 16.1 Audit Action Type

| Action | Meaning |
| --- | --- |
| create | New record created |
| view | Sensitive record viewed |
| update | Existing record changed |
| delete_request | User requested deletion/removal |
| archive | Record archived |
| restore | Record restored |
| submit | Record submitted |
| approve | Record approved |
| reject | Record rejected |
| verify | Document/payment/profile verified |
| revoke | Access/session/token revoked |
| invite | Invitation sent |
| accept | Invitation/assignment accepted |
| decline | Invitation/assignment declined |
| assign | Owner/role/assignment set |
| reassign | Assignment changed |
| handover | Assignment handover action |
| status_change | Status changed |
| override | Manual override/correction |
| export | Data exported |
| download | File/report downloaded |
| upload | File uploaded |
| login | Login event |
| logout | Logout event |
| failed_attempt | Failed sensitive action |
| support_handoff | Support/report created from module |

### 16.2 Required Audit Fields

| Field | Required | Notes |
| --- | ---: | --- |
| audit_id | Yes | Unique event ID |
| actor_id | Yes | User/system actor |
| actor_role | Yes | Admin, TA, Jamaah, Mutawwif, System |
| action | Yes | Canonical audit action |
| target_type | Yes | Entity type |
| target_id | Yes | Entity ID |
| result | Yes | success, failed, blocked |
| reason_code | Conditional | Required for override/reject/reverse/delete |
| reason_text | Conditional | Internal or public reason based on visibility |
| source_module | Yes | Module that emitted event |
| occurred_at | Yes | Timestamp |
| ip_hint | Optional | Masked/coarse if retained |
| metadata_visibility | Yes | internal, user_safe, audit_only |

Rules:

1. Audit events should be append-only.
2. Audit logs must not store raw passwords, OTP, session tokens, card data, or secrets.
3. Sensitive data access must be logged.
4. Overrides and reversals require reason.
5. Export/download of sensitive data requires audit.

---

## 17. Data Ownership and Snapshot Rules

### 17.1 Snapshot Required

The following must store snapshots because later changes should not silently rewrite history:

| Snapshot | Trigger |
| --- | --- |
| package_snapshot | Booking submitted |
| price_snapshot | Invoice/booking created |
| booking_member_snapshot | Booking submitted / trip assignment |
| referral_attribution_snapshot | Booking submitted |
| payment_eligibility_snapshot | Referral/finance eligibility review |
| group_trip_snapshot | Trip assignment / user-facing trip view |
| document_requirement_snapshot | Booking/trip requirement generated |
| service_readiness_snapshot | Readiness status published |
| terms_policy_snapshot | User accepts/refers/books |
| notification_template_snapshot | Notification sent |

### 17.2 Correction Rule

Any correction after snapshot lock must include:

1. Actor.
2. Permission.
3. Reason.
4. Old value.
5. New value.
6. Effective time.
7. Audit event.
8. User-facing notification if the change affects user action or status.

---

## 18. Permission and Visibility Rule

| Rule | Description |
| --- | --- |
| Own scope | Users can view own account/profile/booking/trip/payment/referral data |
| Family/PIC scope | PIC can view/manage permitted family/dependent items only |
| Agency scope | TA can access only agency-owned records |
| Assignment scope | Mutawwif can access only assigned trip/member safe context |
| Admin scope | Admin access is permission-based and audited |
| Finance scope | Finance data requires finance permission |
| Sensitive file scope | Raw document/payment/support files require explicit permission |
| Internal note scope | Internal notes are hidden from user-facing surfaces |

---

## 19. Mandatory Reason Codes

Use reason codes for sensitive state changes.

| Reason Code | Use Case |
| --- | --- |
| user_request | User requested action |
| duplicate_record | Duplicate booking/referral/document |
| invalid_document | Document invalid |
| expired_document | Document expired |
| payment_unverified | Payment not verified |
| payment_reversed | Payment reversed/chargeback |
| booking_cancelled | Booking cancelled |
| trip_cancelled | Trip cancelled |
| policy_mismatch | Does not meet policy |
| fraud_review | Under fraud review |
| compliance_hold | Compliance/legal hold |
| manual_correction | Manual correction |
| system_error_correction | Corrected after system issue |
| agency_request | Agency requested change |
| admin_override | Admin override |
| user_privacy_request | Privacy/data request |

User-facing copy must not expose `fraud_review` details unless policy allows.

---

## 20. Implementation Requirements

1. Engineering schema should reference canonical status values from this appendix.
2. Frontend should map canonical status to localized UI labels.
3. API responses should include status, visibility, owner/source module, and last_updated_at where relevant.
4. Sensitive status transitions must require permission and audit.
5. Notification events should use canonical event keys.
6. Report categories and severity should use canonical values.
7. Analytics should not use raw sensitive values.
8. Existing PRDs should be updated to reference this appendix during cleanup pass.

---

## 21. Open Questions

1. Should this taxonomy live as a versioned system configuration or static engineering enum?
2. Which statuses must support localization in Malay, Indonesian, English, and Arabic?
3. Which status changes require explicit user notification?
4. What audit log retention period applies per domain?
5. Should emergency severity SLA be measured in minutes or business hours?
6. Should referral reward status become part of Finance taxonomy or a separate Referral taxonomy?
7. Which status values must be exposed in public API versus internal API only?
8. Who approves taxonomy changes after engineering implementation starts?

---

## 22. Final Product Decision

This appendix should be used as the canonical cross-role status, event, notification, report, audit, and ownership reference for UmrahHaji.com PRDs.

Phase 1 implementation should prioritize the shared taxonomies for account/auth, booking, payment, document/service readiness, group trip, assignment, reports/support, notifications, feedback, referral, and audit logs.

Future PRDs and cleanup passes should reference this appendix instead of redefining incompatible status names inside each module.
