---
title: Visa Pipeline
aliases: [Visa, Visa Stages]
tags: [domain]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: Visa case progression from documents through to a decision.
---

# Visa Pipeline

A visa case hangs off an accepted [[model-application]] via `Visa.applicationId`
and is owned by the `visa_team` role.

## Stages

```
not_started → documents_complete → visa_filed → biometrics → interview → decision
                                                                          ↓
                                                        approved / rejected / reapplied
```

- **`documents_complete`** — the gate. Nothing gets filed until
  [[document-workflow]] has approved everything the destination country needs.
- **`biometrics`** and **`interview`** — appointment-driven, and not every country
  requires both.
- **`decision`** — submitted and waiting.
- **`reapplied`** — after a rejection, the case restarts rather than opening a new
  record, so the rejection history stays attached.

## What's tracked

`studentId`, `applicationId`, `country`, `visaType`, `stage`, `submissionDate`,
`decisionDate`, `notes`, and `officer` (the assigned staff [[model-user]]).
Schema in [[model-visa]].

## Relationship to the journey

`visa_filing` and `visa_approved` in [[student-journey-stages]] mirror this
pipeline, but are updated separately — see the three-state-machines note there.

Reaching `approved` here is what unblocks `departure`, the final journey stage.

## In the UI

`/visa` in [[crm-frontend]] groups cases by stage — effectively a workload board
for the visa team. Students see their own status on the portal's `/progress` page.

Stage changes fire a notification to the student — see [[notifications]].

## Related

- [[model-visa]]
- [[application-lifecycle]]
- [[document-workflow]]
