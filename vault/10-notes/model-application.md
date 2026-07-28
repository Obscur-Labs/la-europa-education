---
title: Model — Application
aliases: [Application, Application Schema, applications collection]
tags: [data-model, domain]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: One university application for one student.
---

# Model — Application

`backend/src/models/Application.ts` · collection `applications`

One record per university a student applies to. Several per student is normal.

## Fields

| Field | Notes |
|---|---|
| `studentId` | ObjectId → [[model-student]] |
| `universityName` | Free text — universities are not their own collection |
| `courseName` | |
| `courseLevel` | Bachelor's, Master's, PhD, etc. |
| `country` | |
| `tuitionFee` | |
| `currency` | Per-record; no FX conversion |
| `applicationDate` | |
| `intake` | The term being applied for — the real deadline driver |
| `status` | See [[application-lifecycle]] |
| `notes` | |
| `documents[]` | Documents attached to this specific application |
| `createdAt` / `updatedAt` | |

## No University collection

`universityName` is a string, not a reference. That keeps the model simple but
means typos fragment reporting — worth normalising if university-level analytics
ever matter. The `university` role on [[model-user]] scopes by `universityName`
string match for the same reason.

## Referenced by

`Visa.applicationId` — a visa case attaches to the accepted application. See
[[model-visa]].

## Related

- [[application-lifecycle]]
- [[model-student]]
- [[data-models-moc]]
