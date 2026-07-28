---
title: Model — User
aliases: [User, User Schema, users collection]
tags: [data-model, auth]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: Every login in the system, staff or student, with role-based access.
---

# Model — User

`backend/src/models/User.ts` · collection `users`

Every login is a User. Staff have only a User; students have a User **and** a
[[model-student]], linked by `studentId`.

## Fields

| Field | Notes |
|---|---|
| `name` | Trimmed |
| `email` | Unique, lowercased, trimmed — the login identifier |
| `password` | bcrypt hash, min length 6, stripped from JSON output |
| `role` | `UserRole` enum, 12 values, defaults to `support` |
| `avatar` | Optional |
| `phone` | Optional |
| `studentId` | ObjectId → `Student`. Set when `role === 'student'` |
| `universityName` | Set when `role === 'university'` — scopes their access |
| `isActive` | Boolean, default `true` — soft deactivation |
| `lastSeenAt` | Stamped when the user's last socket disconnects |
| `createdAt` / `updatedAt` | From `timestamps: true` |

## Password handling

Hashed in a `pre('save')` hook at cost factor 12, and only when the field is
actually modified — so an unrelated update doesn't re-hash and invalidate the
password.

`comparePassword(candidate)` is an instance method used at login.

> [!important] `toJSON` strips `password`
> Never manually omit it in a route handler. The schema already guarantees it, and
> hand-rolled omissions are the ones that get forgotten. See [[security-model]].

## The `university` role

An external partner login. `universityName` narrows what they can see to their own
institution's applications — it's the field that makes the role safe.

## Deactivation, not deletion

`isActive: false` rather than removing the record, so historical references from
`assignedCounsellor`, `uploadedBy`, `approvedBy` and `officer` stay resolvable.

## Referenced by

`Student.userId` and `Student.assignedCounsellor` · `Lead.assignedTo` ·
`Document.uploadedBy` / `approvedBy` · `Visa.officer` ·
`Conversation.participants[]` · `Message.senderId` · `Notification.userId` ·
`ActivityLog.userId`

## Related

- [[roles-and-authorization]]
- [[authentication-jwt]]
- [[model-student]]
- [[data-models-moc]]
