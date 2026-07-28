---
title: Model — Payment
aliases: [Payment, Payment Schema, payments collection]
tags: [data-model, domain]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: A single fee record — owed, paid, or refunded.
---

# Model — Payment

`backend/src/models/Payment.ts` · collection `payments`

## Fields

| Field | Notes |
|---|---|
| `studentId` | ObjectId → [[model-student]] |
| `type` | `tuition` · `application_fee` · `visa_fee` · `service_fee` · `other` |
| `amount` | |
| `currency` | Per-record — no conversion is performed |
| `status` | `pending` · `paid` · `overdue` · `cancelled` · `refunded` |
| `dueDate` | Drives the `overdue` transition |
| `paidDate` | |
| `description` | |
| `invoiceNumber` | |
| `receipt` | Path or reference to the receipt file |
| `createdAt` / `updatedAt` | |

## A ledger, not a gateway

No payment processor is wired in. Finance staff record money that moved
elsewhere. See [[payments-and-invoicing]].

## Amount storage

Stored as billed, in the currency billed. Any cross-currency reporting has to
handle conversion at the query layer — there's no base-currency column.

## Related

- [[payments-and-invoicing]]
- [[model-student]]
- [[data-models-moc]]
