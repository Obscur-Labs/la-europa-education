---
title: Roles and Authorization
aliases: [Roles, RBAC, authorize()]
tags: [auth, security, backend]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: The 12 user roles and the authorize() middleware factory that enforces them.
---

# Roles and Authorization

## The 12 roles

Defined as `UserRole` in `backend/src/models/User.ts`:

| Role | Scope |
|---|---|
| `super_admin` | Everything |
| `admin` | Administration — but **blocked from chat**, see below |
| `counsellor_manager` | Oversees counsellors and their caseloads |
| `counsellor` | Owns assigned students end to end |
| `finance` | Payments, invoices — [[payments-and-invoicing]] |
| `accountant` | Financial records |
| `visa_team` | Visa cases — [[visa-pipeline]] |
| `doc_verification` | Document review — [[document-workflow]] |
| `university_team` | University relationships and applications |
| `support` | General support; the schema default |
| `student` | Portal access to their own record only |
| `university` | External partner, scoped by `universityName` |

> [!note] Not 11
> Older docs said "11 roles". The enum has always had 12. The `university` role
> is the one usually missed — it is an *external* partner login whose access is
> narrowed by the `universityName` field on [[model-user]].

## The guard

```ts
authorize('counsellor', 'counsellor_manager', 'admin')
```

A variadic middleware factory in `backend/src/middleware/auth.ts`. It reads
`req.user.role` (set by `authenticate`, see [[authentication-jwt]]) and rejects
anything not in the list. It runs on every protected route in [[api-routes]].

Handlers always type their request as `AuthRequest` rather than plain `Request`,
and identify the caller with `req.user!.id`.

## Role checks are not the whole story

`authorize()` answers *"may this kind of user call this endpoint?"* — not
*"may this specific user touch this specific record?"* That second question needs
per-record ownership checks inside the handler. The messages routes carry an
`isParticipant` guard for exactly this reason; a missing check there is an IDOR
bug, not a role bug. See [[security-model]].

## Chat is deliberately restricted

`admin` and `super_admin` are blocked from all `/api/messages` routes by a
router-level guard, and the CRM hides the chat navigation from them. Chat is for
staff actively working a case plus the student — not for observers. See
[[chat-messaging]].

## Related

- [[authentication-jwt]]
- [[security-model]]
- [[model-user]]
- [[api-routes]]
