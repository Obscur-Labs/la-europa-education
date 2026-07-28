---
title: Vault Conventions
aliases: [Conventions, How to use this vault, Style Guide]
tags: [moc]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: Rules for adding to this vault — folders, tags, frontmatter and linking.
---

# Vault Conventions

Read this before adding notes, so the graph stays useful.

## Folders are dumb on purpose

```
vault/
├── Home.md            — the entry point
├── vault-conventions.md
├── 10-notes/          — atomic notes, one idea each
├── 20-mocs/           — Maps of Content (navigation)
├── 99-archive/        — superseded documents
└── templates/         — new-note scaffolds
```

Folders are coarse buckets. **Navigation happens through links and MOCs**, not
through the file tree — that's the whole reason to use Obsidian rather than a
docs folder.

Wikilinks resolve by **filename**, not path, so `[[model-user]]` works from
anywhere regardless of which folder either note is in.

## Filenames

Kebab-case, no extension in links, and avoid `# | ^ : % [ ]` — they all have
special meaning inside wikilinks.

Data model notes are prefixed `model-`; deployment notes `deploy-`.

## Frontmatter

Every note carries the same properties, in the same order:

```yaml
---
title: Human readable title
aliases: [Other names this note answers to]
tags: [controlled, vocabulary, only]
type: note            # note | moc | dashboard | template
created: 2026-07-28
updated: 2026-07-28
status: evergreen     # seedling | growing | evergreen
summary: One line describing the note.
---
```

Consistency matters more than completeness here — the queries in [[dashboard]]
break if property names drift. Use `created`, never `date` or `Created`.

**Aliases earn their keep.** `[[Multer]]` resolves to [[file-uploads]] because
that note lists it as an alias. Add the names you'd actually search for.

## Controlled tag vocabulary

Pick from this list. Don't invent new ones without adding them here:

`moc` · `architecture` · `backend` · `frontend` · `crm` · `portal` · `domain` ·
`data-model` · `auth` · `security` · `realtime` · `chat` · `documents` ·
`deployment` · `ops` · `design-system` · `dashboard` · `archive`

No `#` prefix inside frontmatter.

## Status

| Value | Meaning |
|---|---|
| `seedling` | Rough capture, not trustworthy yet |
| `growing` | Accurate but incomplete |
| `evergreen` | Reviewed, stable, safe to rely on |

Deployment notes sit at `growing` because nothing has been deployed yet.

## Linking

Link generously — that's what makes the graph worth looking at.

- Every note should be reachable from at least one MOC, or it's an orphan
- Link the first meaningful mention of another concept, not every mention
- End each note with a `## Related` section of 2–4 links
- A link to a note that doesn't exist yet is **fine** — it marks something worth
  writing. Obsidian shows these unresolved links greyed out in the graph.

## Adding a note

1. Copy [[note-template]]
2. Save into `10-notes/` with a kebab-case filename
3. Fill in the frontmatter — `summary` especially
4. Link it from the relevant MOC in `20-mocs/`
5. Run the orphan query in [[dashboard]] to confirm it connected

## Keeping it honest

This vault documents a live codebase. When code changes, bump `updated` on the
notes affected. The `## Related` links are what tell you which those are — follow
the backlinks panel.

Anything that turns out to be wrong should be **fixed**, not annotated. Anything
superseded wholesale goes to `99-archive/` with `status: superseded`.

## Related

- [[Home]]
- [[dashboard]]
- [[note-template]]
