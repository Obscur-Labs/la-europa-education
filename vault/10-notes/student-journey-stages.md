---
title: Student Journey Stages
aliases: [StudentStage, Journey, Pipeline, 10 Stages]
tags: [domain]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: The 10-stage master pipeline that drives the whole product.
---

# Student Journey Stages

The `StudentStage` enum on [[model-student]] is the spine of the application. Every
dashboard, filter and progress tracker reads from it.

```
inquiry
  → counselling
    → university_selection
      → application_submitted
        → offer_letter
          → fee_payment
            → cas_i20
              → visa_filing
                → visa_approved
                  → departure
```

Defined in `backend/src/models/Student.ts`, defaulting to `inquiry`.

## What each stage means

| Stage | The student has… |
|---|---|
| `inquiry` | Just arrived, usually from [[lead-pipeline]] |
| `counselling` | Been assigned a counsellor and started conversations |
| `university_selection` | Settled on a shortlist of universities and courses |
| `application_submitted` | At least one application filed — [[application-lifecycle]] |
| `offer_letter` | Received an offer |
| `fee_payment` | Paid, or is paying, the deposit — [[payments-and-invoicing]] |
| `cas_i20` | Received the CAS (UK) or I-20 (US) confirming enrolment |
| `visa_filing` | An active visa case — [[visa-pipeline]] |
| `visa_approved` | Been granted the visa |
| `departure` | Left. Case complete. |

## Three separate state machines

This is the detail that trips people up. `Student.stage` is **not** derived from
the others — all three advance independently:

| Machine | Field | Note |
|---|---|---|
| Journey | `Student.stage` | This note |
| Application | `Application.status` | [[application-lifecycle]] |
| Visa | `Visa.stage` | [[visa-pipeline]] |

A student can sit at `offer_letter` while one application is `accepted` and
another is still `submitted`. Journey stage tracks the *student*; the other two
track individual *records*.

## In the UI

`StageTracker.tsx` exists in both apps and renders this pipeline — a horizontal
tracker in [[crm-frontend]], a vertical timeline on the portal's `/progress` page
in [[student-portal]]. The CRM student list filters by stage, and the dashboard
counts students per stage.

## Related

- [[model-student]]
- [[lead-pipeline]]
- [[domain-moc]]
