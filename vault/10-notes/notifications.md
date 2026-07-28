---
title: Notifications
aliases: [createNotification, Alerts]
tags: [realtime, backend, domain]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: The persist-then-emit helper that powers every in-app alert.
---

# Notifications

One helper in `backend/src/utils/notify.ts` handles every alert in the system:

```ts
createNotification(userId, title, message, type, link?)
```

It does exactly two things:

1. **Persists** a `Notification` document so the alert survives a page reload and
   shows up in the notifications list
2. **Emits** a `notification` socket event to the `user:<userId>` room so it
   arrives instantly if the recipient is online

Persist-then-emit, in that order — an offline user still finds the notification
waiting.

## The document

`userId`, `title`, `message`, `type` (`info | success | warning | error`), `read`,
`link`, timestamps. Schema detail in [[side-effect-records]].

The optional `link` is what makes a notification actionable — clicking it routes
straight to the relevant record.

## Who gets notified when

Route handlers call it after meaningful mutations:

- A document is approved or rejected — [[document-workflow]]
- A staff member requests a document
- An application status changes — [[application-lifecycle]]
- A visa stage advances — [[visa-pipeline]]
- A payment falls due or is recorded — [[payments-and-invoicing]]
- A counsellor is reassigned — [[counsellor-reassignment]]

## On the client

Both apps listen for the `notification` event and surface it through
`useToast()` from `ToastContext`, plus a badge on the notifications nav item.
Each app has a `/notifications` page listing everything with mark-as-read.

`GET /api/notifications` and the mark-read endpoint are in [[api-routes]].

## Related

- [[realtime-socketio]]
- [[side-effect-records]]
- [[crm-frontend]]
- [[student-portal]]
