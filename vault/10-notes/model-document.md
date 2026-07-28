---
title: Model — Document
aliases: [Document, Document Schema, DocumentRequest, documents collection]
tags: [data-model, documents]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: An uploaded file plus its review state, and the request that asked for it.
---

# Model — Document

`backend/src/models/Document.ts` · collection `documents`

## Fields

| Field | Notes |
|---|---|
| `studentId` | ObjectId → [[model-student]] |
| `type` | `DocType` enum — 16 values, see [[document-workflow]] |
| `name` | Display name |
| `url` | Path to the file on disk — see [[file-uploads]] |
| `version` | Increments on re-upload; old versions are kept |
| `status` | `pending` · `approved` · `rejected` · `expired` |
| `uploadedBy` | ObjectId → [[model-user]] |
| `approvedBy` | ObjectId → [[model-user]] |
| `rejectionReason` | Required when rejected — the student reads this |
| `expiryDate` | Drives the `expired` state |
| `createdAt` / `updatedAt` | |

## DocumentRequest

`backend/src/models/DocumentRequest.ts` — a separate model for staff asking a
student for paperwork. State is `pending → fulfilled | cancelled`. Creating one
posts a `document_request` card into the chat; an upload carrying its `requestId`
fulfils it and updates the card live. Full flow in [[document-workflow]].

## The `url` field is a liability

It points at local disk. On an ephemeral filesystem the row survives while the
file does not, producing a document that looks present and 404s on click. See
[[deployment-blockers]].

## Related

- [[document-workflow]]
- [[file-uploads]]
- [[data-models-moc]]
