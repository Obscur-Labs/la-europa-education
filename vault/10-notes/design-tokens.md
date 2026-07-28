---
title: Design Tokens
aliases: [Tokens, Tailwind Tokens, Design System]
tags: [frontend, design-system]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: The custom Tailwind v4 token vocabulary shared by both frontends.
---

# Design Tokens

Tailwind CSS v4, with a custom token vocabulary defined in each app's
`globals.css` — **not** in `tailwind.config`. Tailwind v4 moves theme definition
into CSS, so there's no config file to look in.

## The vocabulary

| Token | Use |
|---|---|
| `bg-base` | Page background |
| `bg-surface` | Panel and sidebar background |
| `bg-card` | Card background |
| `bg-muted` | Subtle background |
| `border-line` | Dividers and borders |
| `text-t1` | Primary text |
| `text-t2` | Secondary text |
| `text-t3` | Tertiary / placeholder text |
| `bg-accent` | Brand accent |

Three text weights rather than a colour scale — pick by role, not by lightness.

## Shared vocabulary, different values

Both apps use these exact names, backed by different CSS variable values:

- **[[crm-frontend]]** — dark by default, `:root.light` overrides. Accent is
  switchable through `PaletteWidget`.
- **[[student-portal]]** — light by default, `:root.dark` overrides. See
  [[portal-theming]].

Same class names, opposite defaults. A component copied between apps looks correct
in both without edits — which is the entire point of the shared vocabulary.

## Rule

Use the tokens. Raw Tailwind colours like `bg-gray-800` break theme switching and
palette switching, because nothing updates them when the theme flips.

## The exception

The chat skin uses its own `--im-*` variables and `.im-*` classes, deliberately
outside this system so accent palettes don't affect it. See
[[imessage-chat-theme]].

## Related

- [[portal-theming]]
- [[crm-frontend]]
- [[frontend-moc]]
