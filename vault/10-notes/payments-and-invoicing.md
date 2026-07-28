---
title: Payments and Invoicing
aliases: [Payments, Finance, Fees, Invoices]
tags: [domain]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: What the finance team tracks — fee types, payment states, invoices and receipts.
---

# Payments and Invoicing

Owned by the `finance` and `accountant` roles — see [[roles-and-authorization]].

> [!note] This is a ledger, not a payment gateway
> StudyCRM **records** payments; it does not process them. There's no Stripe or
> Razorpay integration. Money moves outside the system and finance marks it here.

## Fee types

| Type | Typically |
|---|---|
| `tuition` | The big one — deposit then balance |
| `application_fee` | Per university application |
| `visa_fee` | Government filing charges |
| `service_fee` | The agency's own commission |
| `other` | Everything else |

## Statuses

```
pending → paid
        → overdue
        → cancelled
        → refunded
```

`overdue` is a function of `dueDate` passing while still `pending`. `refunded`
follows `paid`, not `pending`.

## What's tracked

`studentId`, `type`, `amount`, `currency`, `status`, `dueDate`, `paidDate`,
`description`, `invoiceNumber`, `receipt`. Schema in [[model-payment]].

`currency` is per-record because tuition is billed in the destination country's
currency while service fees are usually local. There is no FX conversion — amounts
are stored as billed.

## Relationship to the journey

`fee_payment` in [[student-journey-stages]] is the deposit that unlocks
`cas_i20` — a university won't issue the CAS or I-20 until the deposit clears.
Payments continue past that stage.

## In the UI

`/finance` in [[crm-frontend]] holds the records and invoice management. The
portal's `/payments` page shows the student their history and outstanding dues.
Due and overdue payments raise [[notifications]].

## Related

- [[model-payment]]
- [[application-lifecycle]]
- [[domain-moc]]
