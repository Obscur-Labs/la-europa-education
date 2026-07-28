---
title: Three Services
aliases: [Services, Service Split]
tags: [architecture]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: Backend API, staff CRM and student portal — what each owns and why they're separate.
---

# Three Services

StudyCRM runs as three processes. They share a database but nothing else — no shared
component library, no shared build output.

| Service | Framework | Dev port | Audience | Deploys to |
|---|---|---|---|---|
| `backend/` | Express + TypeScript | 5000 | Internal (API only) | [[deploy-backend-render]] |
| `crm/` | Next.js 16 App Router | 3000 | Staff | [[deploy-frontends-vercel]] |
| `student/` | Next.js 16 App Router | 3001 | Students | [[deploy-frontends-vercel]] |

## Why split the frontends

The two audiences have almost no overlapping screens, opposite default themes
(CRM is dark-first, the portal is light-first — see [[portal-theming]]), and very
different security postures. A student should never receive the CRM's JavaScript
bundle at all, which a single app with route guards can't guarantee.

They also store auth under different keys so both can be open in one browser
without fighting — see [[auth-stores]].

## What they share

- The API contract in [[api-routes]]
- The design token vocabulary in [[design-tokens]]
- The chat skin in [[imessage-chat-theme]]
- Near-identical `lib/api.ts` and `stores/authStore.ts` — see [[api-client]]

Shared code is duplicated deliberately rather than extracted into a fourth workspace;
the two copies drift on purpose (different tokens, different themes).

## How they communicate

REST for every state change, Socket.IO for push. Both are served by the same
Node HTTP server — see [[express-entry-point]] and [[realtime-socketio]].

The full picture is in [[data-flow]].

## Related

- [[monorepo-workspaces]] — how the three live in one repo
- [[repository-structure]]
- [[architecture-moc]]
