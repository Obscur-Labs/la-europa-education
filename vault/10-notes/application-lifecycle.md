---
title: Application Lifecycle
aliases: [Applications, Application Status]
tags: [domain]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: One student, many university applications — each with its own status machine.
---

# Application Lifecycle

A student applies to several universities at once. Each application is its own
record with its own status, independent of the student's journey stage.

## Statuses

```
drafting → submitted → offer_received ─────┬→ accepted
                     ↘ conditional_offer ──┤
                                            ├→ rejected
                                            ├→ withdrawn
                                            └→ deferred
```

- **`conditional_offer`** — an offer contingent on something outstanding, usually
  a final transcript or an English test score. It converts to `accepted` once the
  condition is met.
- **`deferred`** — the student postponed to a later intake. Distinct from
  `withdrawn`, which ends it.

## What's tracked

`universityName`, `courseName`, `courseLevel`, `country`, `tuitionFee`,
`currency`, `applicationDate`, `intake`, `notes`, `documents[]`. Full schema in
[[model-application]].

`intake` matters more than it looks — it's the deadline that drives everything
upstream, and the thing `deferred` changes.

## Relationship to the journey

Reaching `submitted` on any application typically moves the student to
`application_submitted` in [[student-journey-stages]]; an offer moves them to
`offer_letter`. But the two are updated separately — the journey stage is not
computed from application statuses.

An accepted application is what a [[visa-pipeline]] case attaches to, via
`Visa.applicationId`.

## In the UI

`/applications` in [[crm-frontend]] lists everything with status filters;
individual applications also appear on the student profile. The portal's
`/applications` page shows the student their own, read-only.

Owned by the `university_team` and `counsellor` roles — see
[[roles-and-authorization]].

## Related

- [[model-application]]
- [[visa-pipeline]]
- [[payments-and-invoicing]]
