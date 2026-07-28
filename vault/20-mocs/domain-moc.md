---
title: Domain — Map of Content
aliases: [Domain MOC, Business Logic MOC]
tags: [moc, domain]
type: moc
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: The business pipeline StudyCRM encodes — from first enquiry to departure.
---

# Domain — Map of Content

StudyCRM models the work of a study-abroad counselling agency. Everything below is
a state machine or a workflow that the software enforces.

## The main pipeline

1. [[lead-pipeline]] — enquiry captured, qualified, converted
2. [[student-journey-stages]] — the 10-stage master pipeline
3. [[application-lifecycle]] — one student, many university applications
4. [[visa-pipeline]] — filing through decision
5. [[payments-and-invoicing]] — what the finance team tracks

## Supporting workflows

- [[document-workflow]] — collection, review, versioning, ZIP export
- [[chat-messaging]] — counsellor ↔ student, with structured message types
- [[counsellor-reassignment]] — what happens to history when a case changes hands
- [[notifications]] — how users find out something happened

## Who can do what

- [[roles-and-authorization]]

## Related MOCs

- [[data-models-moc]] — the schemas behind these workflows
- [[backend-moc]]
