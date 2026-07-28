---
title: Deploy — Frontends on Vercel
aliases: [Vercel, Frontend Hosting, CRM Deployment, Portal Deployment]
tags: [deployment, ops, frontend]
type: note
created: 2026-07-28
updated: 2026-07-28
status: growing
summary: Step 3 — two Vercel projects from one repo, and the setting that makes it work.
---

# Deploy — Frontends on Vercel

Two **separate Vercel projects** pointing at the **same** Git repository, one per
app.

## Settings

| | CRM | Student portal |
|---|---|---|
| Root Directory | `crm` | `student` |
| **Include source files outside of the Root Directory** | **ON** | **ON** |
| Framework Preset | Next.js (auto-detected) | Next.js (auto-detected) |
| Build Command | default | default |
| Install Command | default | default |

> [!important] That checkbox is the whole game
> Settings → General → Root Directory → *"Include source files outside of the
> Root Directory in the Build Step"*.
>
> Without it Vercel uploads only the `crm/` subtree. The root
> `package-lock.json` never arrives, the workspace install fails, and the build
> dies before Next runs. This is the most common cause of a failed first deploy
> here. See [[monorepo-workspaces]].

The other half of the same problem is already handled in code: both apps set
`outputFileTracingRoot` to the repo root in `next.config.ts`, so file tracing
finds the hoisted dependencies.

## Environment variables

Identical in both projects:

```
NEXT_PUBLIC_API_URL=https://<service>.onrender.com/api
NEXT_PUBLIC_SOCKET_URL=https://<service>.onrender.com
```

From [[deploy-backend-render]]. Note only the first ends in `/api` — see
[[api-client]].

> [!warning] Changing these needs a redeploy
> `NEXT_PUBLIC_*` values are inlined into the client bundle at build time.
> Editing them in the dashboard does nothing until you redeploy.

## After deploying

Go back to Render and set `CLIENT_CRM_URL` and `CLIENT_STUDENT_URL` to the real
Vercel URLs, or every browser request fails CORS. See [[environment-variables]].

## Preview deployments

Every branch and pull request gets a unique `*.vercel.app` URL. None of them are
in the backend's CORS whitelist, so **previews can't reach the production API** —
they build fine and then fail on the first request. Fix in
[[deployment-blockers]].

## `vercel.json`

`crm/vercel.json` declares only `"framework": "nextjs"`, which Vercel would detect
anyway. Harmless — keep or delete. The student app has none and works the same.

## Custom domains

Add them per project (e.g. `crm.example.com`, `portal.example.com`). Update the
Render `CLIENT_*` variables to match, since the whitelist is exact-match on origin.

## Related

- [[monorepo-workspaces]]
- [[crm-frontend]]
- [[student-portal]]
- [[deployment-blockers]]
