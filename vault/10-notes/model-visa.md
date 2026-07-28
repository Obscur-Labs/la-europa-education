---
title: Model — Visa
aliases: [Visa, Visa Schema, visas collection]
tags: [data-model, domain]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: A visa case attached to a student and their accepted application.
---

# Model — Visa

`backend/src/models/Visa.ts` · collection `visas`

## Fields

| Field | Notes |
|---|---|
| `studentId` | ObjectId → [[model-student]] |
| `applicationId` | ObjectId → [[model-application]] — the accepted one |
| `country` | Destination |
| `visaType` | e.g. UK Student, F-1 |
| `stage` | See [[visa-pipeline]] |
| `submissionDate` | When filed |
| `decisionDate` | When decided |
| `notes` | |
| `officer` | ObjectId → [[model-user]] — assigned `visa_team` member |
| `createdAt` / `updatedAt` | |

## Why it references the application

The visa depends on a specific offer — the CAS or I-20 comes from one university.
A student with three offers who accepts the second gets a visa case pointing at
that application, not at the student generally.

## Reapplication stays in place

A rejected case moves to `reapplied` rather than spawning a second record, so the
rejection history remains attached. Visa officers need that history; a fresh
record would hide it.

## Related

- [[visa-pipeline]]
- [[document-workflow]]
- [[data-models-moc]]
