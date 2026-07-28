---
title: Express Entry Point
aliases: [index.ts, Server Entry, backend/src/index.ts]
tags: [backend]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: What backend/src/index.ts wires up, in order — and the two lines that matter at deploy time.
---

# Express Entry Point

`backend/src/index.ts` — roughly 85 lines, executed top to bottom.

## Order of operations

1. `dotenv.config()` — loads `backend/.env` in development; a no-op in hosting,
   where the platform injects real environment variables
2. Creates the Express app, wraps it in `http.createServer`
3. Attaches Socket.IO to that server with its own CORS block
4. Express CORS middleware with the same origin list
5. Body parsers — JSON and urlencoded, both capped at 10 MB
6. Ensures `process.cwd()/uploads` exists, then serves it with `express.static`
7. `connectDB()` — Mongoose connection
8. `setupSocket(io)` — see [[realtime-socketio]]
9. Mounts the 11 routers — see [[api-routes]]
10. `GET /api/health` — returns `{ status: 'ok', timestamp }`
11. `server.listen(process.env.PORT || 5000)`
12. Exports the `io` singleton for routes to import

## The CORS block

```ts
origin: [
  process.env.CLIENT_CRM_URL || "",
  process.env.CLIENT_STUDENT_URL || "",
]
```

Written twice — once for Socket.IO, once for Express. Both need updating together.

> [!warning] This fails closed *and* silently
> An unset variable becomes `""`, matching no origin, so every browser request is
> blocked with a CORS error while `curl` still works fine. It also has no wildcard
> for Vercel preview deployments, so previews can't reach production.
> See [[deployment-blockers]].

## The uploads directory

```ts
const uploadsDir = path.join(process.cwd(), "uploads");
```

Relative to the **working directory**, not the source file. Start the process from
`backend/` and files land in `backend/uploads/`; start it from the repo root and
they land in `./uploads/`. This is why the start command matters — see
[[deploy-backend-render]] and [[file-uploads]].

## Port binding

`process.env.PORT || 5000` — already correct for Render, which injects `PORT` and
expects the service to bind to it.

## Health check

`GET /api/health` is the endpoint to point a platform health check at, and the
fastest way to confirm a deploy is alive.

## Related

- [[api-routes]]
- [[realtime-socketio]]
- [[environment-variables]]
- [[security-model]]
