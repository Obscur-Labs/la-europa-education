---
title: StudyCRM Overview
aliases: [StudyCRM, What is StudyCRM]
tags: [architecture, domain]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: A study-abroad management platform tracking students from first inquiry to departure.
---

# StudyCRM Overview

StudyCRM is a study-abroad management platform. It tracks a student from their first
enquiry all the way through visa approval and departure, replacing the spreadsheets
that counselling agencies otherwise run on.

## What it replaces

A typical agency juggles enquiry lists, document folders, application trackers, visa
checklists and fee ledgers across separate files. StudyCRM makes all of that one
record per student, with a defined pipeline ([[student-journey-stages]]) and
real-time updates on both sides of the relationship.

## Who uses it

| Audience | Surface |
|---|---|
| Staff — counsellors, finance, visa team, admins | [[crm-frontend]] |
| Students | [[student-portal]] |
| Nobody directly | The API — see [[api-routes]] |

See [[three-services]] for how those split up, and [[roles-and-authorization]] for
the 12 distinct staff roles.

## The core loop

1. **Lead capture** — enquiries land in a Kanban pipeline ([[lead-pipeline]])
2. **Onboarding** — a converted lead becomes a Student, assigned a counsellor
3. **Applications** — counsellors manage university applications ([[application-lifecycle]])
4. **Documents** — students upload, staff review ([[document-workflow]])
5. **Visa** — the visa team drives the case to a decision ([[visa-pipeline]])
6. **Fees** — finance records payments and invoices ([[payments-and-invoicing]])
7. **Messaging** — counsellor and student talk throughout ([[chat-messaging]])

## Why these technical choices

- **MongoDB + Mongoose** — student data is genuinely irregular (education history,
  test scores, country preferences), so a flexible schema beats rigid tables.
- **JWT with 12 roles** — agencies have real functional separation; see
  [[roles-and-authorization]].
- **Socket.IO on the same Express instance** — live chat and notifications without
  standing up a second server. See [[realtime-socketio]].
- **Zustand + localStorage** — client-side auth state, no session store to run.
  See [[auth-stores]].
- **Tailwind CSS v4 with custom tokens** — one visual vocabulary across two apps.
  See [[design-tokens]].

## Stack at a glance

```
Backend  : Node.js · Express · TypeScript · MongoDB (Mongoose) · Socket.IO · JWT
Frontend : Next.js 16 (App Router) · React 19 · Axios · Zustand · Tailwind CSS v4
```

## Related

- [[three-services]]
- [[repository-structure]]
- [[data-flow]]
- [[Home]]
