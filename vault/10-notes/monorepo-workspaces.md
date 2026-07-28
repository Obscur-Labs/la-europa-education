---
title: Monorepo — npm Workspaces
aliases: [Workspaces, Monorepo, npm workspaces]
tags: [architecture, ops]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: One root node_modules and one lockfile across all three services — and the rules that follow from it.
---

# Monorepo — npm Workspaces

The repo is an **npm workspaces monorepo**. There is a single root `node_modules`
and a single root `package-lock.json`.

```json
// package.json
"workspaces": ["backend", "crm", "student"]
```

## The one rule

> [!warning] Never run `npm install` inside `backend/`, `crm/` or `student/`
> It recreates the per-app `node_modules` this layout exists to eliminate, and
> gives you two copies of React with subtly different resolution.
> Always install from the repo root.

## Consequences

**Dependencies hoist to the root.** Both Next apps therefore set
`outputFileTracingRoot` in `next.config.ts`:

```ts
outputFileTracingRoot: path.join(process.cwd(), '..')
```

Without it, Next's file tracing starts inside `crm/` or `student/`, misses the
hoisted packages, and the production build ships incomplete.

**Deploy platforms need to be told about the root.** Both Render and Vercel default
to treating a subdirectory as self-contained, which breaks here. See
[[deploy-backend-render]] and [[deploy-frontends-vercel]] — this is the single
most common cause of a failed first deploy.

## Root scripts

Every root script is a `npm run <script> -w <workspace>` wrapper. The per-app
scripts still work if you `cd` into a workspace. Full list in
[[development-commands]].

## Related

- [[three-services]]
- [[repository-structure]]
- [[deployment-moc]]
