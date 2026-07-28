---
title: Authentication (JWT)
aliases: [JWT, Auth Flow, Login Flow]
tags: [auth, security, backend]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: How a request proves who it is — bearer tokens issued at login, verified by middleware.
---

# Authentication (JWT)

Stateless JWT. No session store, no refresh tokens.

## The flow

1. `POST /api/auth/login` validates credentials against the bcrypt hash on
   [[model-user]] and returns `{ token, user }`
2. The client stores the token in `localStorage` — see [[auth-stores]]
3. Every subsequent request carries `Authorization: Bearer <token>`, attached by
   the Axios interceptor in [[api-client]]
4. `authenticate` in `backend/src/middleware/auth.ts` verifies the signature and
   attaches `req.user`
5. `authorize(...roles)` then gates by role — see [[roles-and-authorization]]

## Token configuration

Signed with `JWT_SECRET`, expiring after `JWT_EXPIRES_IN` (default `7d`). Both come
from the environment — see [[environment-variables]].

> [!warning] Rotate the secret before going live
> The development `JWT_SECRET` must not survive into production. Changing it
> invalidates every issued token, which is exactly what you want at cutover.

## Student self-registration

`POST /api/auth/register-student` is the only public write endpoint. It atomically
creates **both** a `User` (with `role: 'student'`) and a `Student`, then links them
via `User.studentId`. The response includes a token, so registration logs you in.

The portal additionally keeps `studentId` in its store, because most portal
endpoints are keyed by Student, not User. `GET /api/students/by-user/:userId`
resolves one to the other when only the User is known.

## Expiry handling

There is no silent refresh. When the token expires the API returns 401, the
response interceptor clears the auth store and redirects to `/login`. Users are
logged out abruptly after 7 days — acceptable for staff, worth revisiting for
students.

## Related

- [[roles-and-authorization]]
- [[security-model]]
- [[model-user]]
- [[api-routes]]
