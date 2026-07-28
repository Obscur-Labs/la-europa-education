---
title: Model — Student
aliases: [Student, Student Schema, students collection]
tags: [data-model, domain]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: The case file at the centre of the system — everything else hangs off it.
---

# Model — Student

`backend/src/models/Student.ts` · collection `students`

The hub of the data model. Applications, documents, payments, visas and
conversations all reference it.

## Fields

| Field | Notes |
|---|---|
| `userId` | ObjectId → [[model-user]] — their portal login |
| `studentId` | Human-readable generated identifier, distinct from `_id` |
| `firstName`, `lastName`, `email`, `phone` | |
| `dateOfBirth`, `nationality`, `passportNumber` | Needed for visa filing |
| `stage` | `StudentStage` enum, default `inquiry` — [[student-journey-stages]] |
| `assignedCounsellor` | ObjectId → [[model-user]] |
| `preferredCountries` | Array |
| `preferredCourses` | Array |
| `educationHistory` | Array of prior qualifications |
| `testScores` | IELTS, TOEFL, GRE, GMAT, SAT |
| `workExperience` | Array |
| `notes` | Free text |
| `createdAt` / `updatedAt` | |

## Two identifiers

`_id` is the Mongo ObjectId used in every reference. `studentId` is the readable
code staff quote on the phone. Don't mix them up in queries.

## The irregular fields are the point

`educationHistory`, `testScores`, `workExperience` and the preference arrays vary
enormously between students — a school-leaver has no work history, a PhD applicant
has no SAT. This shape is the main reason the project uses MongoDB rather than a
relational store. See [[studycrm-overview]].

## Changing the assigned counsellor

Not a plain field update — it triggers conversation archiving and system messages.
See [[counsellor-reassignment]].

## Resolving from a login

`GET /api/students/by-user/:userId` maps a portal User to their Student record.
The CRM chat uses it to enable document requests and ZIP download for the person
it's talking to.

## Children

[[model-application]] · [[model-document]] · [[model-payment]] ·
[[model-visa]] · [[model-conversation-message]]

Created from a converted [[model-lead]].

## Related

- [[student-journey-stages]]
- [[data-models-moc]]
