---
title: Deployment Blockers
aliases: [Production Issues, Known Blockers, Pre-launch Checklist]
tags: [deployment, ops, security]
type: note
created: 2026-07-28
updated: 2026-07-28
status: growing
summary: Three things that break in production but never surface locally.
---

# Deployment Blockers

None of these appear in local development. All three appear in production.

## 1. Uploaded files disappear

**What happens.** `routes/documents.ts` and `routes/messages.ts` write to local
disk via `multer.diskStorage`. Render's filesystem is ephemeral — every deploy and
every restart wipes it. Database rows survive with a `url` that now 404s.

**Why it's the worst one.** It's silent. No error is logged anywhere. A document
looks present in the list and fails on click, potentially weeks later, and by then
the file is unrecoverable. Passport scans and chat attachments both go.

**Fixes:**

| Option | Effort | Notes |
|---|---|---|
| Render persistent disk | ~10 min, paid tier | Mount at the uploads path. No code changes. Can't be shared across replicas. |
| S3 / Cloudinary / R2 | Hours | Replace `diskStorage` with a stream upload, store the returned URL. Also fixes the unauthenticated `/uploads` exposure. |

Take the disk to get live; move to object storage before scaling past one instance.

Detail in [[file-uploads]].

## 2. CORS fails closed, and blocks previews

**What happens.** [[express-entry-point]] builds its origin list as:

```ts
origin: [
  process.env.CLIENT_CRM_URL || "",
  process.env.CLIENT_STUDENT_URL || "",
]
```

An unset variable becomes `""`, which matches no origin. Every browser request is
blocked while `curl` and Postman keep working perfectly — so it reads like a
frontend bug when it's a config one.

Separately, every Vercel preview deployment gets a unique `*.vercel.app` URL that
isn't in the whitelist, so **previews can never reach the production API**.

**Fix.** Replace the array with a callback that:
- allows the two configured production origins
- allows `*.vercel.app` previews (or all of them only in a non-production env)
- **throws at boot** if `CLIENT_CRM_URL` or `CLIENT_STUDENT_URL` is missing, rather
  than silently degrading to `""`

The same list is written twice — once for Socket.IO, once for Express. Both need
changing.

## 3. Render free tier sleeps

**What happens.** After 15 minutes idle the service spins down. The next request
takes roughly 50 seconds while it cold-starts, and every Socket.IO connection
drops on the way down (clients reconnect, but chat and presence stall).

Fine for a demo. Not fine for staff using the CRM daily.

**Fix.** Starter plan, around $7/month. External uptime pingers work but are
against the spirit of the free tier and don't help the first user of the day.

See [[realtime-socketio]].

## Worth doing at the same time

- **Rotate `JWT_SECRET`** — the dev value must not reach production. See
  [[authentication-jwt]].
- **Add rate limiting to `/api/auth/login`** — currently unlimited attempts. See
  [[security-model]].
- **Consider TTL indexes** on notifications and activity logs, which grow without
  bound. See [[side-effect-records]].

## Related

- [[deploy-backend-render]]
- [[deploy-frontends-vercel]]
- [[security-model]]
- [[deployment-moc]]
