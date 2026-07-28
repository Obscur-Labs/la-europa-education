---
title: Deploy — Backend on Render
aliases: [Render, Backend Hosting, API Deployment]
tags: [deployment, ops, backend]
type: note
created: 2026-07-28
updated: 2026-07-28
status: growing
summary: Step 2 — the Express API as a Render Web Service, monorepo-aware.
---

# Deploy — Backend on Render

Requires [[deploy-mongodb-atlas]] first.

Create a **Web Service** from the repository.

## Settings

| Setting | Value |
|---|---|
| Root Directory | *(blank — the repo root)* |
| Runtime | Node |
| Build Command | `npm install && npm run build:backend` |
| Start Command | `npm run start:backend` |
| Health Check Path | `/api/health` |

> [!warning] Do not set Root Directory to `backend`
> The lockfile and the hoisted `node_modules` live at the repo root. Pointing
> Render at `backend/` breaks the workspace install. See [[monorepo-workspaces]].

## Why that exact start command

`npm run start:backend` expands to `npm run start -w backend`, which runs with the
working directory set to `backend/`. Since [[express-entry-point]] resolves uploads
as `path.join(process.cwd(), 'uploads')`, this puts them in `backend/uploads/`.

Running `node backend/dist/index.js` from the root instead would silently relocate
the upload directory to the repo root — same code, different path, broken file
URLs. See [[file-uploads]].

## Environment variables

```
MONGODB_URI=<atlas srv string>
JWT_SECRET=<long random value — not the dev one>
JWT_EXPIRES_IN=7d
CLIENT_CRM_URL=https://<crm>.vercel.app
CLIENT_STUDENT_URL=https://<student>.vercel.app
```

**Leave `PORT` unset.** Render injects it, and the code already reads
`process.env.PORT`. Setting it manually can bind the wrong port and fail the
health check.

Full matrix in [[environment-variables]].

## The chicken-and-egg

You don't know the Vercel URLs yet. Deploy with placeholders, do
[[deploy-frontends-vercel]], then return here and correct the two `CLIENT_*`
values. Changing them restarts the service.

## Node version

Pin to 20 or higher — the root `package.json` declares `"engines": { "node": ">=20" }`.
Set `NODE_VERSION` if Render's default is older.

## If the build fails

| Symptom | Fix |
|---|---|
| `tsc: not found` | Set `NPM_CONFIG_PRODUCTION=false` so devDependencies install |
| `Cannot find module` at runtime | Root Directory isn't blank — see above |
| Health check timing out | Check `MONGODB_URI`; a failed DB connect can stall startup |

## Verify

```
https://<service>.onrender.com/api/health
→ { "status": "ok", "timestamp": "..." }
```

## Before real users

Read [[deployment-blockers]] — the ephemeral filesystem will silently destroy
uploaded documents.

## Next

→ [[deploy-frontends-vercel]]

## Related

- [[express-entry-point]]
- [[monorepo-workspaces]]
- [[realtime-socketio]]
