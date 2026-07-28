---
title: Data Models — Map of Content
aliases: [Data Models MOC, Schemas MOC]
tags: [moc, data-model]
type: moc
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: Every Mongoose schema in backend/src/models and how they reference each other.
---

# Data Models — Map of Content

All schemas live in `backend/src/models/`. Each file exports its TypeScript
interface **and** the compiled model as the default export.

## Relationship map

```
User ──(role=student)──► Student
                            │
        ┌──────────┬────────┼──────────┬──────────┐
        ▼          ▼        ▼          ▼          ▼
  Application  Document  Payment     Visa   Conversation
                                              │
                                              ▼
                                           Message

Lead ──(convertedStudentId)──► Student
Visa ──(applicationId)──────► Application
```

## The entities

| Note | Collection | Role in the domain |
|---|---|---|
| [[model-user]] | `users` | Every login, staff or student |
| [[model-student]] | `students` | The case file at the centre of everything |
| [[model-lead]] | `leads` | Pre-conversion enquiry |
| [[model-application]] | `applications` | One university application |
| [[model-visa]] | `visas` | Visa case for an application |
| [[model-payment]] | `payments` | Money owed and received |
| [[model-document]] | `documents` | Uploaded file + review state |
| [[model-conversation-message]] | `conversations`, `messages` | Chat threads |
| [[side-effect-records]] | `notifications`, `activitylogs` | Audit and alerts |

## Conventions

- Mongoose `timestamps: true` on every schema — `createdAt` / `updatedAt` are free.
- Foreign keys are `Schema.Types.ObjectId` with `ref`, populated at read time.
- `User.toJSON` strips `password`; see [[security-model]].

## Related MOCs

- [[domain-moc]] — the workflows these schemas serve
- [[backend-moc]]
