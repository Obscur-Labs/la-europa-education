---
title: Student Portal
aliases: [Portal, Student App, student app]
tags: [frontend, portal]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: The student-facing Next.js self-service portal on port 3001, installable as a PWA.
---

# Student Portal

`student/` · Next.js 16 App Router · React 19 · port 3001 in development.

Mirrors the CRM's structure but with a different audience, a different default
theme, and a PWA manifest.

## Route structure

The `(portal)` route group holds authenticated pages; `/login` and `/register`
sit outside. `/` redirects to `/home`.

| Route | What the student does |
|---|---|
| `/home` | Stage summary and quick links |
| `/profile` | View and edit personal info, passport details |
| `/progress` | Journey timeline via `StageTracker.tsx` — [[student-journey-stages]] |
| `/applications` | See their applications and statuses — read-only |
| `/documents` | Upload documents, see approval status and outstanding requests |
| `/payments` | Payment history and outstanding dues |
| `/notifications` | All alerts, mark as read |
| `/chat` | Rooms list — current and closed counsellor threads |

`/chat` being a rooms list rather than one thread is a consequence of
[[counsellor-reassignment]].

## Auth

Token under `student_token`, store under `student-auth`. The store also keeps
`studentId` separately, because most portal endpoints key on Student rather than
User. See [[auth-stores]].

## Self-registration

`/register` posts to `POST /api/auth/register-student`, which creates the User and
Student atomically and returns a token — registration logs you straight in. See
[[authentication-jwt]].

This is the only public write endpoint in the system.

## PWA

`app/manifest.ts` defines the manifest; `themeColor` in the layout viewport is
`#2563eb`. Students can install it to a home screen.

## Theming

Light by default with `:root.dark` as the override — the opposite of the CRM.
Glassmorphism throughout. See [[portal-theming]].

## Components

`AppShell` · `StageTracker` · `Skeleton` · `chat/MessageCards`

Fewer than the CRM — the portal is mostly read-only surfaces over the same data.

## Conventions

Identical to [[crm-frontend]]: `'use client'` everywhere, `useEffect` fetching,
Axios via [[api-client]], feedback through `useToast()`.

## Related

- [[crm-frontend]]
- [[deploy-frontends-vercel]]
- [[frontend-moc]]
