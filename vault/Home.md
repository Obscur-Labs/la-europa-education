---
title: Home
aliases: [Index, StudyCRM Vault]
tags: [moc]
type: moc
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: Entry point for the StudyCRM knowledge vault — start here.
---

# StudyCRM — Home

The documentation vault for **StudyCRM**, a study-abroad management platform. Every
note here describes the system in `D:\Workspace\ClaudeCode\La Europa Education`.

Open this `vault/` folder as an Obsidian vault (**Open folder as vault**). Hit
`Ctrl+G` for the graph view once it's open.

> [!tip] New here?
> Read [[studycrm-overview]] first, then [[three-services]], then follow whichever
> Map of Content below matches what you're doing.

## Maps of Content

| MOC | Covers |
|---|---|
| [[architecture-moc]] | How the three services fit together, auth, real-time |
| [[backend-moc]] | Express API, routes, sockets, uploads |
| [[frontend-moc]] | CRM dashboard, student portal, design system |
| [[domain-moc]] | The business pipeline — leads, journey, visas, money |
| [[data-models-moc]] | Mongoose schemas and their relationships |
| [[deployment-moc]] | Getting it online: Render, Vercel, Atlas |

## Quick jumps

- **What is this thing?** → [[studycrm-overview]]
- **Run it locally** → [[development-commands]] · [[environment-variables]]
- **Repo layout** → [[monorepo-workspaces]] · [[repository-structure]]
- **Ship it** → [[deploy-backend-render]] · [[deploy-frontends-vercel]] · [[deployment-blockers]]
- **The pipeline** → [[student-journey-stages]]
- **Chat system** → [[chat-messaging]] · [[document-workflow]]

## Conventions used in this vault

- Notes are **atomic** — one idea each — and connected with `[[wikilinks]]`.
- Folders are coarse buckets only. Navigation happens through MOCs and links.
- Frontmatter properties are consistent across every note: `title`, `aliases`,
  `tags`, `type`, `created`, `updated`, `status`, `summary`.
- Controlled tag vocabulary — see [[vault-conventions]] before inventing a new tag.
- New notes start from [[note-template]].

## Recently updated

```dataview
TABLE updated, tags
FROM ""
WHERE type != "moc"
SORT updated DESC
LIMIT 10
```

*(The block above renders as a table if the Dataview plugin is installed; otherwise
it shows as plain code. See [[dashboard]].)*
