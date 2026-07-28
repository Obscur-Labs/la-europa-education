---
title: Portal Theming (Glassmorphism)
aliases: [Glassmorphism, Theme Switcher, Dark Mode, ThemeContext]
tags: [frontend, portal, design-system]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: The student portal's light-first frosted-glass design and its dark mode.
---

# Portal Theming (Glassmorphism)

`student/src/context/ThemeContext.tsx` plus the utility classes in
`student/src/app/globals.css`.

The student portal has a user-facing light/dark switcher. The CRM does not — it
has an accent palette switcher instead. See [[crm-frontend]].

## Light is the default

Dark is secondary here, the reverse of the CRM. Preference persists in
`localStorage` under `student-theme`, and dark mode is applied by toggling a
`dark` class on `<html>`, so `:root.dark` overrides the CSS variables.

## Palettes

| | Light (default) | Dark |
|---|---|---|
| Canvas | `#f0f4ff` blue-white | `#111318` near-black |
| Surfaces | White | Elevated near-black |
| Text | Navy | Light |
| Accent | `#2563eb` | `#4f8ef7` |

PWA `themeColor` in the layout viewport is `#2563eb`.

## The glass utilities

Defined in `globals.css`:

- `.glass`, `.glass-card`, `.glass-nav` — frosted `backdrop-blur` surfaces
- `.glow-accent`, `.glow-accent-sm` — accent glows
- `.nav-active-glow` — active navigation state
- `.animate-orb-a` / `-b` / `-c` — three animated background orbs driven by the
  `--orb-1/2/3` variables

The orbs are what make the frosted surfaces read as glass — blur over a flat
background just looks grey.

## Relationship to the tokens

Glassmorphism sits **on top of** the shared token vocabulary in
[[design-tokens]] — `.glass-card` still uses `text-t1` and `border-line` inside.
The tokens handle colour roles; these classes handle material.

## Not applied to chat

The chat surface uses its own skin — see [[imessage-chat-theme]].

## Related

- [[student-portal]]
- [[design-tokens]]
- [[frontend-moc]]
