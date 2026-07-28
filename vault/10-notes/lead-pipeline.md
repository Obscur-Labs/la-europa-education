---
title: Lead Pipeline
aliases: [Leads, Kanban, Lead Conversion]
tags: [domain]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: Enquiry capture through to conversion into a Student record.
---

# Lead Pipeline

Everything before someone becomes a student. Leads are cheap, numerous, and mostly
don't convert — which is why they're a separate collection from
[[model-student]].

## Statuses

```
new → contacted → qualified → proposal → negotiation → converted
                                                     ↘ lost
```

`lost` is reachable from any status. `converted` is terminal and sets
`convertedStudentId`.

## Sources

`website`, `referral`, `social`, `event`, `walk-in`, `other` — the field that
answers "which channel is actually working".

## Conversion

When a lead reaches `converted`, the system creates a [[model-student]] record and
stores its id on `Lead.convertedStudentId`. The lead is kept, not deleted, so
source attribution survives — you can still ask which channel produced the
students who eventually departed.

The new student enters [[student-journey-stages]] at `inquiry` and gets an
assigned counsellor.

## In the CRM

`/leads` renders `LeadKanban.tsx` — a board with one column per status, cards
dragged between them. See [[crm-frontend]].

`assignedTo` points at the staff [[model-user]] who owns follow-up.

## Related

- [[model-lead]]
- [[student-journey-stages]]
- [[domain-moc]]
