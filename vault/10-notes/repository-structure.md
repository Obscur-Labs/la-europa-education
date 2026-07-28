---
title: Repository Structure
aliases: [File Layout, Directory Structure]
tags: [architecture]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: Where every source file lives across the three workspaces.
---

# Repository Structure

```
La Europa Education/
├── package.json              — workspace root, orchestration scripts
├── package-lock.json         — the only lockfile
├── node_modules/             — the only node_modules
├── CLAUDE.md                 — instructions for Claude Code
├── README.md                 — repo front door
├── vault/                    — this Obsidian vault
├── backend/
├── crm/
└── student/
```

## `backend/src/`

```
index.ts              — Express + Socket.IO entry     → [[express-entry-point]]
seed.ts               — database seed script
config/db.ts          — Mongoose connection
middleware/auth.ts    — authenticate + authorize()    → [[roles-and-authorization]]
models/               — 11 Mongoose schemas           → [[data-models-moc]]
  ActivityLog · Application · Conversation · Document
  DocumentRequest · Lead · Message · Notification
  Payment · Student · User · Visa
routes/               — 11 Express routers            → [[api-routes]]
  applications · auth · dashboard · documents · leads
  messages · notifications · payments · students · users · visas
socket/
  index.ts            — event wiring                  → [[realtime-socketio]]
  emitter.ts          — singleton io export
utils/notify.ts       — createNotification()          → [[notifications]]
```

## `crm/src/`

```
app/
  layout.tsx          — root layout, providers
  page.tsx            — redirect → /dashboard
  login/page.tsx
  globals.css         — design tokens + .im-* chat skin
  (crm)/              — authenticated route group
    dashboard · students · students/[id] · leads
    applications · documents · visa · finance
    chat · reports · settings · notifications
components/
  AppShell · LeadKanban · PaletteWidget · Skeleton
  StageTracker · StatCard
  chat/MessageCards · chat/RequestModals
context/  ThemeContext · ToastContext
stores/   authStore.ts                                → [[auth-stores]]
lib/      api.ts                                      → [[api-client]]
types/    index.ts
```

Detail in [[crm-frontend]].

## `student/src/`

```
app/
  layout.tsx · page.tsx (→ /home) · login · register
  manifest.ts         — PWA manifest
  globals.css         — tokens + glassmorphism + chat skin
  (portal)/           — authenticated route group
    home · profile · progress · applications
    documents · payments · notifications · chat
components/
  AppShell · Skeleton · StageTracker
  chat/MessageCards
context/  ThemeContext · ToastContext
stores/   authStore.ts
lib/      api.ts
types/    index.ts
```

Detail in [[student-portal]].

## Ignored paths

`node_modules/`, `backend/dist/`, `**/.next/`, all `.env*` files, and
`backend/uploads/` — see [[file-uploads]] for why that last one matters at
deploy time.

## Related

- [[monorepo-workspaces]]
- [[three-services]]
