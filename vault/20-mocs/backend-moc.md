---
title: Backend — Map of Content
aliases: [Backend MOC, API MOC]
tags: [moc, backend]
type: moc
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: The Express + TypeScript API — entry point, routes, sockets, uploads.
---

# Backend — Map of Content

Express 4 + TypeScript, Mongoose over MongoDB, Socket.IO on the same HTTP server.
Source lives in `backend/src/`, compiled to `backend/dist/` by `tsc`.

## Core

- [[express-entry-point]] — `src/index.ts`, CORS, static uploads, port binding
- [[api-routes]] — every `/api/*` router and what it owns
- [[realtime-socketio]] — `src/socket/index.ts` and `src/socket/emitter.ts`
- [[notifications]] — `src/utils/notify.ts`
- [[file-uploads]] — Multer disk storage (and why that's a deployment problem)

## Access control

- [[authentication-jwt]]
- [[roles-and-authorization]]
- [[security-model]]

## Data

- [[data-models-moc]] — all Mongoose schemas

## Operations

- [[environment-variables]]
- [[development-commands]]
- [[deploy-backend-render]]

## Related MOCs

- [[architecture-moc]]
- [[domain-moc]]
