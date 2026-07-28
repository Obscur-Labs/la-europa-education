---
title: Environment Variables
aliases: [Env Vars, .env, Configuration]
tags: [ops, deployment]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: Every variable across the three services, local and hosted.
---

# Environment Variables

## Local setup

```bash
cp backend/.env.example       backend/.env
cp crm/.env.local.example     crm/.env.local
cp student/.env.local.example student/.env.local
```

All `.env*` files are gitignored.

## Backend — `backend/.env`

| Variable | Local | Hosted |
|---|---|---|
| `PORT` | `5000` | **Don't set it** — Render injects it |
| `MONGODB_URI` | `mongodb://localhost:27017/studycrm` | Atlas SRV string — [[deploy-mongodb-atlas]] |
| `JWT_SECRET` | anything | A long random value, **not** the dev one |
| `JWT_EXPIRES_IN` | `7d` | `7d` |
| `CLIENT_CRM_URL` | `http://localhost:3000` | The CRM's Vercel URL |
| `CLIENT_STUDENT_URL` | `http://localhost:3001` | The portal's Vercel URL |

The two `CLIENT_*` variables build the CORS whitelist in
[[express-entry-point]]. Getting them wrong blocks every browser request while
`curl` keeps working — see [[deployment-blockers]].

## Frontends — `crm/.env.local` and `student/.env.local`

| Variable | Local | Hosted |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000/api` | `https://<service>.onrender.com/api` |
| `NEXT_PUBLIC_SOCKET_URL` | `http://localhost:5000` | `https://<service>.onrender.com` |

Same values in both apps.

> [!warning] Only one of these ends in `/api`
> `NEXT_PUBLIC_API_URL` has the suffix. `NEXT_PUBLIC_SOCKET_URL` does not.
> See [[api-client]].

## Two gotchas

**`NEXT_PUBLIC_*` is baked in at build time.** Next inlines these into the client
bundle during `next build`. Changing one on Vercel needs a **redeploy** — a
restart won't pick it up. See [[deploy-frontends-vercel]].

**The URLs are circular.** The backend needs the frontend URLs for CORS; the
frontends need the backend URL for API calls. Deploy the backend first with
placeholder `CLIENT_*` values, then come back and correct them once Vercel has
assigned real URLs. Order in [[deployment-moc]].

## Related

- [[development-commands]]
- [[deploy-backend-render]]
- [[deploy-frontends-vercel]]
