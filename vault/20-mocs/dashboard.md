---
title: Dashboard
aliases: [Vault Dashboard, Queries]
tags: [moc, dashboard]
type: dashboard
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: Dataview queries for auditing this vault — orphans, stale notes, coverage by tag.
---

# Vault Dashboard

Every block below needs the **Dataview** community plugin
(Settings → Community plugins → Browse → "Dataview" → Install → Enable, then turn on
*JavaScript Queries* only if you add JS blocks — the queries here are plain DQL).

Without Dataview these render as inert code blocks. Nothing breaks.

## All notes by area

```dataview
TABLE type, status, updated
FROM ""
WHERE type != "moc" AND type != "dashboard"
SORT file.folder ASC, file.name ASC
```

## Orphans — no inbound and no outbound links

Anything appearing here needs linking from a MOC. See [[vault-conventions]].

```dataview
LIST
WHERE length(file.inlinks) = 0 AND length(file.outlinks) = 0
```

## Least-linked notes — weak spots in the web

```dataview
TABLE length(file.inlinks) AS "Backlinks", length(file.outlinks) AS "Links out"
FROM ""
WHERE type != "moc"
SORT length(file.inlinks) ASC
LIMIT 15
```

## Notes still marked as work-in-progress

```dataview
TABLE status, summary
FROM ""
WHERE status = "seedling" OR status = "growing"
SORT status ASC
```

## Coverage by tag

```dataview
TABLE length(rows) AS Notes
FROM ""
GROUP BY tags
SORT length(rows) DESC
```

## Superseded / archived

```dataview
LIST summary
FROM "99-archive"
```

## Related

- [[Home]]
- [[vault-conventions]]
