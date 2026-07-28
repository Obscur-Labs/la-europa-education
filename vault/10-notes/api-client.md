---
title: API Client (Axios)
aliases: [lib/api.ts, Axios Instance, API Client]
tags: [frontend]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: The configured Axios instance both frontends route every request through.
---

# API Client (Axios)

Each frontend has `src/lib/api.ts` exporting a single configured Axios instance.
**All** API calls go through it — no bare `fetch`, no second instance.

```ts
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});
```

## Request interceptor

Reads the token from `localStorage` — `crm_token` in the CRM, `student_token` in
the portal — and sets `Authorization: Bearer <token>`. See [[auth-stores]].

## Response interceptor

On **401**: clears the auth store and redirects to `/login`. This is the entire
session-expiry mechanism; there's no refresh attempt. See
[[authentication-jwt]].

## The two URL variables

| Variable | Value | Used by |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `<host>/api` | This Axios instance |
| `NEXT_PUBLIC_SOCKET_URL` | `<host>` | Socket.IO — [[realtime-socketio]] |

> [!warning] The `/api` suffix differs between them
> `NEXT_PUBLIC_API_URL` ends in `/api`; `NEXT_PUBLIC_SOCKET_URL` does not.
> Copying one into the other is the most common config mistake here.
> See [[environment-variables]].

## Baked in at build time

`NEXT_PUBLIC_*` variables are inlined into the bundle when Next builds. Changing
one on Vercel requires a **redeploy**, not just a restart — see
[[deploy-frontends-vercel]].

## Direct uses of the base URL

A few places read `NEXT_PUBLIC_API_URL` directly rather than through the instance
— the chat pages and the CRM student profile, mostly for file URLs and uploads
that need an absolute path. Those bypass the interceptors, so they attach auth
manually where needed.

## Related

- [[auth-stores]]
- [[api-routes]]
- [[environment-variables]]
