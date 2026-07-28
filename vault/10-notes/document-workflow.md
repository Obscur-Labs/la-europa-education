---
title: Document Workflow
aliases: [Documents, Document Requests, Document Review]
tags: [domain, documents]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: Collection, review, versioning and bulk export of student documents.
---

# Document Workflow

Collecting paperwork is most of the operational work in a study-abroad agency, so
this workflow is unusually developed.

## Document types

`passport`, `photo`, `transcript`, `degree`, `ielts`, `toefl`, `gre`, `gmat`,
`sat`, `recommendation`, `sop`, `lor`, `bank_statement`,
`financial_sponsorship`, `visa_form`, `other`

## Review states

```
pending → approved
        → rejected  (with rejectionReason)
        → expired   (past expiryDate)
```

Rejection **requires** a reason — it's what the student sees, so it has to say what
to fix. `expired` matters for police clearances and bank statements that go stale
before filing.

## Versioning

Documents carry a `version` number. A re-upload creates a new version rather than
overwriting, so the review history stays intact.

## Requesting documents (staff → student)

The interesting part. Staff don't just wait — they request, and the request lives
inside the chat:

1. `POST /api/documents/requests` (staff only) creates `DocumentRequest` records
   and drops a `document_request` card into the conversation, then notifies the
   student — see [[notifications]]
2. The student uploads via `POST /api/documents/upload` with an optional
   `requestId`, which fulfils the request and flips the card live via the
   `message_updated` socket event — see [[realtime-socketio]]
3. An optional `conversationId` also posts the file into the chat thread
4. `PUT /api/documents/requests/:id/cancel` withdraws a request
5. `GET /api/documents/requests?studentId=&status=` lists them; the portal's
   Documents page shows outstanding ones

Request state is `pending → fulfilled | cancelled`.

Students can always upload freely without a request — the request mechanism adds
structure, it doesn't gate.

## Bulk export

`GET /api/documents/download-all/:studentId` (staff only) streams every current
document version as a ZIP using `archiver` v8. Buttons sit in the CRM chat header
and on the student profile's Documents tab. This is what gets sent to a university
or a visa office in one go.

## Review queue

`/documents` in [[crm-frontend]] is the approve/reject queue, owned by the
`doc_verification` role — see [[roles-and-authorization]].

Approval is also the gate for `documents_complete` in [[visa-pipeline]].

## Storage caveat

Files go to local disk via Multer. That does not survive a hosted deploy — see
[[file-uploads]] and [[deployment-blockers]] before going live.

## Related

- [[model-document]]
- [[chat-messaging]]
- [[visa-pipeline]]
