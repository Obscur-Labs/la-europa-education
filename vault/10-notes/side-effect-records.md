---
title: Model — Notification and ActivityLog
aliases: [Notification, ActivityLog, Audit Log, Side-effect Records]
tags: [data-model, security]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: The two write-mostly collections nothing else references.
---

# Model — Notification and ActivityLog

Both are side-effect records: written constantly, referenced by nothing. They're
grouped here because neither is part of the domain graph in
[[data-models-moc]].

## Notification

`backend/src/models/Notification.ts`

| Field | Notes |
|---|---|
| `userId` | ObjectId → [[model-user]] — the recipient |
| `title` | |
| `message` | |
| `type` | `info` · `success` · `warning` · `error` |
| `read` | Boolean |
| `link` | Optional deep link into the app |
| `createdAt` / `updatedAt` | |

Written exclusively through `createNotification` — see [[notifications]].

## ActivityLog

`backend/src/models/ActivityLog.ts`

| Field | Notes |
|---|---|
| `userId` | ObjectId → [[model-user]] — who acted |
| `action` | What they did |
| `resource` | Which collection |
| `resourceId` | Which record |
| `details` | Free-form context |
| `ip` | Caller IP |
| `createdAt` / `updatedAt` | |

The audit trail referenced in [[security-model]].

## Growth

Both grow without bound — one row per notification and one per logged action,
forever, with nothing pruning them. Worth a TTL index or an archival job before
they dominate the database. Neither is queried by anything else, so expiring old
rows is safe.

## Related

- [[notifications]]
- [[security-model]]
- [[data-models-moc]]
