---
title: Frontend — Map of Content
aliases: [Frontend MOC, UI MOC]
tags: [moc, frontend]
type: moc
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: Both Next.js apps — the staff CRM and the student portal — plus shared UI conventions.
---

# Frontend — Map of Content

Two Next.js 16 App Router apps sharing a design token vocabulary but not a codebase.
They differ in audience, default theme, and auth storage keys.

## The two apps

- [[crm-frontend]] — staff dashboard, port 3000
- [[student-portal]] — student self-service, port 3001

## Shared plumbing

- [[auth-stores]] — Zustand + `persist`, and why the keys differ
- [[api-client]] — the Axios instance and its interceptors

## Look and feel

- [[design-tokens]] — `bg-base`, `text-t1`, and the rest of the vocabulary
- [[portal-theming]] — glassmorphism, light-first, animated orbs
- [[imessage-chat-theme]] — the `--im-*` chat skin used by both apps

## Features they surface

- [[chat-messaging]]
- [[document-workflow]]
- [[student-journey-stages]]

## Operations

- [[environment-variables]]
- [[deploy-frontends-vercel]]

## Related MOCs

- [[architecture-moc]]
- [[domain-moc]]
