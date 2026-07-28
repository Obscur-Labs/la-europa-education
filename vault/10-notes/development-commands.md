---
title: Development Commands
aliases: [Commands, npm scripts, Running Locally]
tags: [ops]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: Every root script — run them all from the repo root.
---

# Development Commands

Run everything from the **repo root**. See [[monorepo-workspaces]] for why.

## Install

```bash
npm install              # installs all three workspaces at once
```

> [!warning] Never `npm install` inside a workspace
> It recreates the per-app `node_modules` the workspace layout exists to avoid.

## Develop

```bash
npm run dev              # all three concurrently, colour-tagged output
npm run dev:backend      # ts-node + nodemon, port 5000
npm run dev:crm          # next dev, port 3000
npm run dev:student      # next dev, port 3001
```

`npm run dev` uses `concurrently` with per-service colours: backend blue, CRM
green, student magenta.

## Build

```bash
npm run build            # backend → crm → student, sequentially
npm run build:backend    # tsc → backend/dist/
npm run build:crm
npm run build:student
```

## Run production locally

```bash
npm start                # all three concurrently
npm run start:backend    # node dist/index.js
npm run start:crm
npm run start:student
```

`start:backend` runs with the working directory set to `backend/`, which is what
puts uploads in `backend/uploads/`. See [[file-uploads]].

## Utility

```bash
npm run seed             # seed initial data via backend/src/seed.ts
npm run typecheck        # tsc --noEmit across all three
npm run clean            # remove node_modules and build outputs
```

## Per-workspace

Each root script is a thin `npm run <script> -w <workspace>` wrapper, so
`cd crm && npm run dev` still works.

## Before you start

Environment files must exist — see [[environment-variables]]. A local MongoDB
needs to be running, or point `MONGODB_URI` at Atlas.

## Related

- [[monorepo-workspaces]]
- [[environment-variables]]
- [[deployment-moc]]
