---
title: Architecture — Map of Content
aliases: [Architecture MOC]
tags: [moc, architecture]
type: moc
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: How the three StudyCRM services fit together and talk to each other.
---

# Architecture — Map of Content

StudyCRM is three independently deployable services over one MongoDB database.
Communication is REST for state changes and Socket.IO for push.

## Shape of the system

- [[three-services]] — backend, CRM, student portal
- [[repository-structure]] — where everything lives on disk
- [[monorepo-workspaces]] — the npm workspaces layout that binds them
- [[data-flow]] — the end-to-end diagram

## Cross-cutting concerns

- [[authentication-jwt]] — how a request proves who it is
- [[roles-and-authorization]] — the 12 roles and the `authorize()` guard
- [[security-model]] — the full security surface at a glance
- [[realtime-socketio]] — rooms, events, presence
- [[notifications]] — the persist-then-emit helper

## Related MOCs

- [[backend-moc]]
- [[frontend-moc]]
- [[deployment-moc]]
