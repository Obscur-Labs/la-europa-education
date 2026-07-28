---
title: Model — Lead
aliases: [Lead, Lead Schema, leads collection]
tags: [data-model, domain]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: Pre-conversion enquiry, kept after conversion for source attribution.
---

# Model — Lead

`backend/src/models/Lead.ts` · collection `leads`

## Fields

| Field | Notes |
|---|---|
| `firstName`, `lastName`, `email`, `phone` | |
| `source` | `website` · `referral` · `social` · `event` · `walk-in` · `other` |
| `status` | `new` → `contacted` → `qualified` → `proposal` → `negotiation` → `converted` / `lost` |
| `interestedCountries` | Array |
| `interestedCourses` | Array |
| `notes` | Free text |
| `assignedTo` | ObjectId → [[model-user]] — who follows up |
| `convertedStudentId` | ObjectId → [[model-student]], set on conversion |
| `createdAt` / `updatedAt` | |

## Why leads are separate from students

Most leads never convert. Keeping them in their own collection means the students
collection stays clean, and the lead fields that don't survive conversion
(`source`, `status`) don't clutter the student schema.

## Kept after conversion

`convertedStudentId` links forward rather than the record being deleted. That's
what makes source attribution possible end-to-end — you can ask which channel
produced the students who actually departed, not just which produced enquiries.

## Related

- [[lead-pipeline]]
- [[model-student]]
- [[data-models-moc]]
