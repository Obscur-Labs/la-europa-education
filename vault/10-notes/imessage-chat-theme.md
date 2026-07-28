---
title: iMessage Chat Theme
aliases: [iMessage Air, Chat Skin, im- classes]
tags: [frontend, chat, design-system]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: The palette-independent chat skin shared by both apps.
---

# iMessage Chat Theme

The chat surface in both apps uses a distinct visual theme — "iMessage Air" —
implemented as `--im-*` CSS variables and `.im-*` utility classes in each app's
`globals.css`.

## The look

- Borderless grey bubbles for received messages
- Blue-gradient bubbles for sent messages (`#0a84ff → #0066f5`)
- Translucent blurred chrome around the thread
- Pill-shaped input
- **No in-thread avatars** — the thread is always two-party, so avatars are noise

## Palette-independent by design

This is the important property. The CRM's switchable accent palettes do **not**
affect the chat. Whatever accent a staff member picks, the chat still looks like
the chat.

Two reasons: a messaging surface people use all day benefits from being visually
stable, and blue-gradient sent bubbles carry a strong "this is a message thread"
convention that a green or purple accent would break.

Consequently the `--im-*` variables sit outside the token system in
[[design-tokens]] rather than deriving from `bg-accent`.

## Light and dark

Each app defines its own light and dark `--im-*` values keyed to its own theme
mechanism:

| App | Default | Override selector |
|---|---|---|
| [[crm-frontend]] | Dark | `:root.light` |
| [[student-portal]] | Light | `:root.dark` — see [[portal-theming]] |

## What renders inside

Structured message cards — document requests, forms, replies, read ticks — via
`components/chat/MessageCards.tsx` in both apps. See [[chat-messaging]].

## Related

- [[chat-messaging]]
- [[design-tokens]]
- [[frontend-moc]]
