# PRD 01 — [Module Name]

## 1. Document Information

| Item | Description |
|---|---|
| Product | UmrahHaji.com Admin Panel |
| Module | [Module Name] |
| Document Type | Module PRD |
| Version | v1.0 |
| Status | Draft / Review / Approved |
| Prepared By | Product / UI/UX Team |
| Last Updated | [Date] |

---

## 2. Module Overview

Explain the purpose of this module and why it exists in the Admin Panel.

Example:

[Module Name] allows Admin to manage, monitor, and control all data and workflows related to [module purpose] within UmrahHaji.com.

---

## 3. Objective

List the main objectives of the module.

Example:

1. Allow Admin to view and manage [module data].
2. Support creation, update, and status management.
3. Provide search, filter, and pagination for operational efficiency.
4. Support audit logs and permission-based access.
5. Ensure the module works on desktop web, tablet web, and mobile web.

---

## 4. Scope

Define what is included and excluded in this module.

### In Scope

1. List page.
2. Create form.
3. Edit form.
4. Detail page.
5. Status management.
6. Search and filter.
7. Activity logs.
8. Export, if applicable.
9. Responsive web behavior.

### Out of Scope

1. Native Android app.
2. Native iOS app.
3. Advanced automation, unless specified.
4. External integrations, unless specified.
5. Features handled by other modules.

### Portal & Design System Principle

Admin Panel and Travel Agency Portal will use the same design system to maintain visual consistency, component reuse, and development efficiency. However, each portal will have a separate navigation structure, permission model, user workflow, and data scope based on the role and operational needs of its users.

---

## 5. User Roles & Permissions

Define which roles can access this module and what actions they can perform.

| Role | View | Create | Update | Delete / Archive | Approve | Export | Notes |
|---|---|---|---|---|---|---|---|
| Super Admin | Yes | Yes | Yes | Yes | Yes | Yes | Full access |
| Admin | Yes | Yes | Yes | Conditional | Conditional | Conditional | Based on permission |
| Finance Admin | Conditional | No | Conditional | No | No | Yes | Finance-related access only |
| Operations Staff | Yes | Conditional | Conditional | No | No | No | Operational access |
| View Only | Yes | No | No | No | No | No | Read-only |

---

## 6. Navigation & Entry Point

Explain how Admin can access this module.

### Sidebar Navigation

```text
Admin Panel
→ [Module Name]
```

### Related Entry Points

Admin may also access this module from:

1. Dashboard shortcut.
2. Related module detail page.
3. Search result.
4. Notification.
5. Activity log.
6. Approval queue, if applicable.

---

## 7. Information Architecture

Describe the page structure inside the module.

Example:

```text
[Module Name]
├── List Page
├── Add / Create Page
├── Detail Page
├── Edit Page
├── Approval / Review Page, if applicable
├── Activity Logs
└── Settings, if applicable
```

---

## 8. Main User Flow

Describe the main admin flow in this module.

Example:

```text
Admin opens [Module Name]
↓
Admin views list page
↓
Admin searches or filters data
↓
Admin opens detail page
↓
Admin reviews information
↓
Admin creates, updates, approves, archives, or manages status
↓
System saves changes and records activity log
```

---

## 9. List Page Requirements

Define the requirements for the main list page.

### 9.1 Page Purpose

The list page allows Admin to view, search, filter, sort, and manage all records in this module.

### 9.2 Table Columns

| Column | Description |
|---|---|
| [Column 1] | [Description] |
| [Column 2] | [Description] |
| Status | Current record status |
| Date Created | Record creation date |
| Actions | View, edit, archive, delete, etc. |

### 9.3 Search

Admin can search by:

1. Name.
2. ID.
3. Email / Phone, if applicable.
4. Related entity.
5. Status, if applicable.

### 9.4 Filters

Recommended filters:

1. Status.
2. Date Created.
3. Country / City, if applicable.
4. Type / Category.
5. Assigned PIC / Staff.
6. Related Travel Agency, if applicable.

### 9.5 Sorting

Admin can sort by:

1. Newest.
2. Oldest.
3. Name A-Z.
4. Status.
5. Date Created.
6. Updated Date.

### 9.6 Pagination

1. Default pagination: 10 records per page.
2. Admin can navigate between pages.
3. System must show total record count.
4. Large tables must support horizontal scroll on desktop.

### 9.7 List Actions

| Action | Description |
|---|---|
| View | Open detail page |
| Edit | Edit selected record |
| Archive | Archive selected record |
| Delete | Delete only if allowed |
| Export | Export selected or filtered data |
| Bulk Action | Optional, based on module needs |

---

## 10. Create / Add Page Requirements

Define how Admin creates a new record.

### 10.1 Page Purpose

The create page allows Admin to add a new [module record] into the platform.

### 10.2 Form Sections

Example structure:

```text
1. Basic Information
2. Contact / PIC Information
3. Related Data
4. Documents / Attachments
5. Pricing / Payment, if applicable
6. Status & Visibility
7. Notes
```

### 10.3 Save Behavior

| Button | Behavior |
|---|---|
| Cancel | Return to previous page without saving |
| Save as Draft | Save incomplete data as draft |
| Save | Validate required fields and create record |
| Submit for Review | Submit record for approval, if applicable |

### 10.4 Validation

1. Required fields must be completed.
2. Email must use valid email format.
3. Phone number must include country code, if applicable.
4. Uploaded files must follow supported format and size.
5. Duplicate data must be prevented where applicable.

---

## 11. Detail Page Requirements

Define what Admin sees after opening a record.

### 11.1 Page Header

The detail page should show:

1. Record name.
2. Status badge.
3. Key summary information.
4. Edit button.
5. Back button.
6. More actions menu, if applicable.

### 11.2 Detail Sections / Tabs

Example:

```text
1. Overview
2. Related Data
3. Documents
4. Financial / Payment
5. Reviews / Reports
6. Activity Logs
7. Internal Notes
8. Settings
```

### 11.3 Data Scope

All data displayed in the detail page must be related only to the selected record.

---

## 12. Edit Page Requirements

Define how Admin edits existing records.

Behavior:

1. Admin can edit fields based on permission.
2. Critical fields may require confirmation.
3. Some changes may trigger re-verification.
4. System must record previous and new values in activity logs.
5. Save button is disabled until changes are detected.

---

## 13. Status Management

Define all statuses used in this module.

| Status | Description |
|---|---|
| Draft | Record is saved but incomplete |
| Pending Verification | Record is submitted and waiting for review |
| Need Revision | Record requires correction |
| Active | Record is active and usable |
| Inactive | Record is not active but still stored |
| Suspended | Record is blocked from operation |
| Archived | Record is hidden from active list |
| Rejected | Record is rejected after review |

### Status Flow

```text
Draft
↓
Pending Verification
↓
Need Revision / Active / Rejected
↓
Inactive / Suspended / Archived
```

Only use statuses that are relevant to the selected module.

---

## 14. Approval / Review Flow

Use this section only if the module has an approval process.

### Admin Actions

| Action | Result |
|---|---|
| Approve | Record becomes active or approved |
| Request Revision | Record returns to the user for correction |
| Reject | Record is rejected |
| Reopen | Admin reopens rejected or closed record |

### Rules

1. Admin must provide a reason when requesting revision.
2. Admin must provide a reason when rejecting.
3. Approval actions must be recorded in activity logs.
4. Notification must be sent after approval, rejection, or revision request.

---

## 15. Field Specification

List detailed fields used in forms.

| Field | Type | Required | Validation | Notes |
|---|---|---:|---|---|
| [Field Name] | Text Input | Yes | Max 100 characters | [Notes] |
| [Field Name] | Dropdown | Yes | Must select one option | [Notes] |
| [Field Name] | File Upload | Conditional | Use module upload policy | Define allowed format, max size, compression, and preview behavior |

### Upload Size & Storage Policy

Each module PRD must define upload constraints per upload type.

Recommended baseline:

| Upload Type | Allowed Format | Max Size | Optimization Rule |
|---|---|---:|---|
| Profile / Logo Image | JPG, JPEG, PNG, WEBP | 2 MB | Compress and resize to max 1024px on longest side |
| Identity / Legal / Travel Document | PDF, JPG, JPEG, PNG, WEBP | 5 MB | Compress where possible and generate preview thumbnail |
| Supporting Document | PDF, JPG, JPEG, PNG, WEBP | 5 MB per file | Require document label and reason |

Upload rules:

1. Reject files above the configured max size.
2. Validate MIME type and file extension.
3. Compress images before storage where possible.
4. Generate thumbnails/previews and avoid loading original files in list/card views.
5. Store files in object storage or equivalent file storage, not directly inside the application server filesystem.
6. Restrict preview/download for sensitive files by permission.
7. Scan uploaded files for malware if scanning service is available.

For very long field lists, move full field details to a separate Data Dictionary section.

---

## 16. Validation Rules

Define validation behavior.

Examples:

1. Required fields cannot be empty.
2. Email must use valid format.
3. Phone number must use valid country code.
4. Date must not be in the past, if applicable.
5. Expiry date must be later than issue date.
6. Duplicate records should be prevented.
7. File upload must follow supported file type and size.

---

## 17. Empty State

Define what the system shows when there is no data.

Example:

```text
No records found.
```

If the Admin has create permission, show relevant CTA:

```text
[Add New Record]
```

---

## 18. Error State

Define what the system shows when something fails.

Examples:

```text
Unable to load data. Please try again.
```

```text
You do not have permission to access this page.
```

```text
This action cannot be completed because the record is currently suspended.
```

---

## 19. Notification Rules

Define notification triggers related to this module.

| Trigger | Recipient | Channel |
|---|---|---|
| Record created | Admin / Related user | In-app / Email |
| Status changed | Related user | In-app / Email |
| Approval completed | Related user | In-app / Email |
| Revision requested | Related user | In-app / Email |
| Issue reported | Support / Operations | In-app / Email |

---

## 20. Activity Log Requirements

The system must log important actions.

### Actions to Log

1. Create record.
2. Edit record.
3. Delete or archive record.
4. Status change.
5. Approval / rejection.
6. Document upload / replacement.
7. Sensitive data viewed.
8. Role or permission changed.
9. Export data.

### Log Data

| Field | Description |
|---|---|
| Actor | User who performed the action |
| Role | User role |
| Action | Activity performed |
| Previous Value | Old data, if applicable |
| New Value | Updated data, if applicable |
| Timestamp | Date and time |
| IP Address | IP address |
| Device | Desktop / Mobile / Tablet |

---

## 21. Responsive Web Behavior

This module must support desktop web, tablet web, and mobile web.

### Desktop Web

1. Use table layout for list pages.
2. Use multi-column forms where appropriate.
3. Show full filters and bulk actions.
4. Support horizontal scroll for wide tables.

### Mobile Web

1. Use card layout or responsive table.
2. Stack form fields vertically.
3. Use collapsible filters.
4. Use horizontal scroll or dropdown for tabs.
5. Primary action should remain easy to access.
6. Complex bulk actions may be hidden or limited.

Native Android and iOS applications are out of scope.

---

## 22. Security & Permission Notes

Define sensitive data rules.

Examples:

1. Sensitive financial data must be hidden from unauthorized roles.
2. Document access must be permission-based.
3. Export data must require export permission.
4. Approval actions must require approval permission.
5. Delete actions must be restricted to Super Admin.
6. All sensitive actions must be logged.

---

## 23. Acceptance Criteria

List measurable criteria for QA and developer validation.

Examples:

1. Admin can access the module from sidebar navigation.
2. Admin can view list data.
3. Admin can search and filter records.
4. Admin can open record detail page.
5. Admin can create a new record if they have permission.
6. Admin can edit a record if they have permission.
7. Admin cannot access restricted actions without permission.
8. System validates required fields before saving.
9. System shows empty state when no data exists.
10. System shows error state when data fails to load.
11. System records critical actions in activity logs.
12. Module works on desktop web and mobile web.
