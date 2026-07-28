---
title: Security Model
aliases: [Security, Threat Surface]
tags: [security, auth]
type: note
created: 2026-07-28
updated: 2026-07-28
status: growing
summary: The full security surface — what's enforced, and the gaps worth watching.
---

# Security Model

## What's enforced

| Concern | Implementation |
|---|---|
| Password storage | bcryptjs, cost factor 12, hashed in a `pre('save')` hook |
| Password leakage | `User.toJSON` strips the field — never omit it manually |
| Auth tokens | JWT signed with `JWT_SECRET`, expiry from `JWT_EXPIRES_IN` |
| Transport | Bearer token in the `Authorization` header |
| Role enforcement | `authorize(...roles)` on every protected route |
| Record ownership | Per-handler checks, e.g. `isParticipant` on messages |
| Input validation | express-validator on mutating endpoints |
| CORS | Whitelist of `CLIENT_CRM_URL` + `CLIENT_STUDENT_URL` only |
| Upload limits | Multer caps files at 10 MB; body parser at 10 MB |

Details in [[authentication-jwt]] and [[roles-and-authorization]].

## Known weak points

**Tokens live in `localStorage`.** That makes them readable by any XSS on the
origin. It's the trade-off for a session-server-free design ([[auth-stores]]);
httpOnly cookies would be stronger but need CSRF handling and a same-site story
across two domains.

**CORS fails open on misconfiguration.** The origin array is built as
`[process.env.CLIENT_CRM_URL || "", ...]`. An unset variable becomes `""`, which
matches nothing and silently blocks every browser request. It also has no entry
for Vercel preview URLs. See [[express-entry-point]] and [[deployment-blockers]].

**Role checks aren't ownership checks.** A `counsellor` passing `authorize()` can
still request another counsellor's student unless the handler checks assignment.
Audit any new route for this.

**Uploaded files are served statically without an auth check.** `/uploads` is
`express.static` — anyone with the URL can fetch a passport scan. The paths are
unguessable in practice, but that's obscurity, not access control. See
[[file-uploads]].

**No rate limiting.** `/api/auth/login` will accept unlimited attempts.

## Audit trail

`ActivityLog` records `userId`, `action`, `resource`, `resourceId`, `details` and
`ip` — see [[side-effect-records]].

## Related

- [[deployment-blockers]]
- [[file-uploads]]
- [[api-routes]]
