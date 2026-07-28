---
title: Deployment — Map of Content
aliases: [Deployment MOC, Hosting MOC, Going Live]
tags: [moc, deployment, ops]
type: moc
created: 2026-07-28
updated: 2026-07-28
status: growing
summary: Everything needed to take StudyCRM from localhost to a live URL.
---

# Deployment — Map of Content

Target topology: **backend on Render**, **both frontends on Vercel**, **database on
MongoDB Atlas**. All three deploy from this one monorepo.

## Do these in order

1. [[deploy-mongodb-atlas]] — the database has to exist first
2. [[deploy-backend-render]] — get the API URL
3. [[deploy-frontends-vercel]] — two projects, one repo
4. Go back to Render and set `CLIENT_CRM_URL` / `CLIENT_STUDENT_URL` to the real
   Vercel URLs — see [[environment-variables]]

## Read before you ship

- [[deployment-blockers]] — the three things that will break in production

## Supporting notes

- [[monorepo-workspaces]] — why root directory settings matter on both platforms
- [[environment-variables]] — the full matrix, local and hosted
- [[file-uploads]] — the ephemeral-disk problem
- [[express-entry-point]] — CORS origin construction and `PORT` binding
- [[realtime-socketio]] — WebSocket support on each platform

## Related MOCs

- [[backend-moc]]
- [[frontend-moc]]
- [[architecture-moc]]
