---
title: Data Flow
aliases: [System Diagram, Data Flow Diagram]
tags: [architecture]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: End-to-end diagram of database, API and the two clients.
---

# Data Flow

```
                    ┌───────────────────────────────────┐
                    │       MongoDB (via Mongoose)      │
                    │  User · Student · Lead            │
                    │  Application · Visa · Payment     │
                    │  Document · DocumentRequest       │
                    │  Conversation · Message           │
                    │  Notification · ActivityLog       │
                    └────────────────┬──────────────────┘
                                     │
                    ┌────────────────▼──────────────────┐
                    │      Express API (port 5000)      │
                    │  /api/auth      /api/messages     │
                    │  /api/users     /api/notifications│
                    │  /api/leads     /api/dashboard    │
                    │  /api/students  /api/documents    │
                    │  /api/applications  /api/visas    │
                    │  /api/payments                    │
                    │                                   │
                    │  + Socket.IO on the same server   │
                    └───────┬───────────────────┬───────┘
                REST +      │                   │      REST +
                Socket.IO   │                   │      Socket.IO
                            │                   │
            ┌───────────────▼──┐   ┌────────────▼──────────┐
            │  CRM (port 3000) │   │ Student Portal (3001) │
            │  Staff dashboard │   │ Self-service portal   │
            │  crm_token       │   │ student_token         │
            │  crm-auth store  │   │ student-auth store    │
            └──────────────────┘   └───────────────────────┘
```

## Reading the diagram

- **One database, one API.** Neither frontend talks to MongoDB directly.
- **Socket.IO shares the HTTP server** — same port, same origin, same CORS
  whitelist. See [[express-entry-point]] and [[realtime-socketio]].
- **Different token keys per client** so both can be logged in simultaneously in
  one browser. See [[auth-stores]].

## A request end to end

1. Component calls `api.get('/students')` — the Axios instance in [[api-client]]
2. Request interceptor attaches `Authorization: Bearer <token>`
3. `authenticate` middleware verifies the JWT, sets `req.user` — [[authentication-jwt]]
4. `authorize('counsellor', 'admin', ...)` checks the role — [[roles-and-authorization]]
5. Route handler queries Mongoose, mutates, responds
6. If the mutation should notify someone, the handler calls `createNotification`,
   which persists and emits over the socket — [[notifications]]
7. The other client receives the event and updates without a refetch

## Related

- [[three-services]]
- [[data-models-moc]]
- [[architecture-moc]]
