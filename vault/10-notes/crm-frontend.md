---
title: CRM Frontend
aliases: [CRM, Staff Dashboard, crm app]
tags: [frontend, crm]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: The staff-facing Next.js dashboard on port 3000.
---

# CRM Frontend

`crm/` · Next.js 16 App Router · React 19 · port 3000 in development.

## Route structure

The `(crm)` route group holds every authenticated page; `/login` sits outside it.
`/` redirects to `/dashboard`.

| Route | What it does |
|---|---|
| `/dashboard` | KPI cards, recent activity, pipeline overview |
| `/students` | Paginated list, search, filter by stage or counsellor |
| `/students/[id]` | Full profile — info, stage tracker, documents, applications, visa, payments, chat |
| `/leads` | Kanban board via `LeadKanban.tsx` — [[lead-pipeline]] |
| `/applications` | All applications with status filters — [[application-lifecycle]] |
| `/documents` | Review queue, approve/reject with reason — [[document-workflow]] |
| `/visa` | Cases grouped by stage — [[visa-pipeline]] |
| `/finance` | Payment records and invoices — [[payments-and-invoicing]] |
| `/chat` | Conversations with students — [[chat-messaging]] |
| `/notifications` | Alert list — [[notifications]] |
| `/reports` | Analytics charts |
| `/settings` | Admin: users, roles, system config |

`/students/[id]` is the workhorse screen — most staff live there.

## Providers

```
RootLayout
  └─ ThemeProvider (ThemeContext)
       └─ ToastProvider (ToastContext)
            └─ page content
```

`useToast()` handles all user-facing feedback. Don't add a second toast mechanism.

## Components

`AppShell` (nav and socket connection) · `LeadKanban` · `StageTracker` ·
`StatCard` · `Skeleton` · `PaletteWidget` (accent palette switcher) ·
`chat/MessageCards` · `chat/RequestModals`

## Conventions

- Every page is `'use client'`
- Data is fetched in `useEffect` — there is **no** server-side data fetching or
  RSC data loading anywhere in this app
- All HTTP goes through the Axios instance in [[api-client]]
- Auth state comes from `useAuthStore` — [[auth-stores]]

That `useEffect` pattern is a deliberate simplification, not an oversight: the
whole app is behind auth, so there's nothing to server-render usefully.

## Theming

Dark by default with `:root.light` as the override — the opposite of the portal.
Accent palettes are switchable via `PaletteWidget`. See [[design-tokens]].

Chat is palette-independent — see [[imessage-chat-theme]].

## Hidden from admins

`admin` and `super_admin` don't see the chat navigation at all — see
[[roles-and-authorization]].

## Related

- [[student-portal]]
- [[deploy-frontends-vercel]]
- [[frontend-moc]]
