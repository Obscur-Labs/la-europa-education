---
title: API Routes
aliases: [Endpoints, REST API, Routers]
tags: [backend]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: The 11 Express routers mounted under /api and what each one owns.
---

# API Routes

All routers live in `backend/src/routes/` and are mounted in
[[express-entry-point]]. Base URL is `NEXT_PUBLIC_API_URL`, i.e. `<host>/api`.

| File | Base path | Owns |
|---|---|---|
| `auth.ts` | `/api/auth` | Login, student self-registration, token validation — [[authentication-jwt]] |
| `users.ts` | `/api/users` | User CRUD, role assignment — [[model-user]] |
| `leads.ts` | `/api/leads` | Lead CRUD, convert → student — [[lead-pipeline]] |
| `students.ts` | `/api/students` | Student CRUD, stage progression, counsellor assignment — [[model-student]] |
| `documents.ts` | `/api/documents` | Upload, approve/reject, versioning, requests, ZIP export — [[document-workflow]] |
| `applications.ts` | `/api/applications` | University application lifecycle — [[application-lifecycle]] |
| `visas.ts` | `/api/visas` | Visa stage progression — [[visa-pipeline]] |
| `payments.ts` | `/api/payments` | Payment records, invoices — [[payments-and-invoicing]] |
| `messages.ts` | `/api/messages` | Conversations, messages, form responses, read receipts — [[chat-messaging]] |
| `notifications.ts` | `/api/notifications` | List and mark-read — [[notifications]] |
| `dashboard.ts` | `/api/dashboard` | Aggregated analytics for the CRM dashboard |

Plus `GET /api/health` defined inline in [[express-entry-point]].

## Handler conventions

- Type the request as **`AuthRequest`**, never plain `Request` — that's what gives
  you `req.user`
- Identify the caller with **`req.user!.id`**
- Every protected route opens with `authenticate` then `authorize(...)` — see
  [[roles-and-authorization]]
- Validate mutating bodies with express-validator
- After a mutation that someone should hear about, call `createNotification` —
  see [[notifications]]

## Endpoints worth knowing

| Endpoint | Why it's notable |
|---|---|
| `POST /api/auth/register-student` | The only public write route; creates User + Student atomically |
| `GET /api/students/by-user/:userId` | Resolves a portal login to its Student record |
| `POST /api/documents/requests` | Staff request a document; drops a card into chat |
| `POST /api/documents/upload` | Optional `requestId` fulfils a request, optional `conversationId` posts to chat |
| `PUT /api/documents/requests/:id/cancel` | Withdraw a request |
| `GET /api/documents/download-all/:studentId` | Streams every current document version as a ZIP |
| `POST /api/messages/form-response` | Submits an in-chat form; duplicates get 409 |
| `POST /api/messages/:conversationId/read` | Marks the thread read, emits `messages_read` |
| `PATCH /api/students/:id/assign-counsellor` | Triggers [[counsellor-reassignment]] |

## Access notes

`admin` and `super_admin` are blocked from **all** `/api/messages` routes at the
router level. The messages routes also carry per-record `isParticipant` guards —
role checks alone would allow reading other people's threads. See
[[security-model]].

## Related

- [[express-entry-point]]
- [[data-models-moc]]
- [[backend-moc]]
