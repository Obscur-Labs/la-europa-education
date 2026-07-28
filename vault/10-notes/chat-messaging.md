---
title: Chat and Messaging
aliases: [Chat, Messaging, Conversations]
tags: [domain, chat, realtime]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: Counsellor ↔ student chat carrying structured message types, not just text.
---

# Chat and Messaging

A WhatsApp-style thread between a student and the staff working their case — but
the messages carry structure, not just text.

## Message types

`Message.type` is one of:

| Type | Payload |
|---|---|
| `text` | Plain message |
| `file` | An attachment — see [[file-uploads]] |
| `document_request` | A card listing requested documents — [[document-workflow]] |
| `form_request` | `meta: { title, fields: [{ id, label, required }] }` |
| `form_response` | The student's answers |
| `system` | Automated record, e.g. a counsellor change |

Each type has its own `meta` payload and renders as a distinct card via
`components/chat/MessageCards.tsx` in both apps.

## In-chat forms

A counsellor sends a `form_request` with a field list. The student fills it inline
in the chat and submits `POST /api/messages/form-response`, which creates a
`form_response` message with the answers and marks the original form `answered`.
Submitting twice returns 409.

This replaces the usual "here's a Google Form link" detour.

## Replies

An optional `replyTo` snapshot — `{ messageId, senderName, preview }` — is stored
on the message itself rather than joined at read time, so quoted replies survive
even if the original is later removed.

## Read receipts

`POST /api/messages/:conversationId/read` adds the caller to `readBy` on every
message in the thread and emits `messages_read` to the room. The UIs render
WhatsApp-style ticks: ✓ sent, ✓✓ in the accent colour for read.

## Presence and typing

Green dots and "online" status come from the socket presence map; typing
indicators from the `typing` event. Both in [[realtime-socketio]].

## Who can chat

`admin` and `super_admin` are **blocked** from every `/api/messages` route by a
router-level guard, and the CRM hides the chat navigation from them. Chat is for
the staff actively working a case plus the student — see
[[roles-and-authorization]].

Per-conversation access is enforced by an `isParticipant` guard; role checks alone
would let one participant read another thread. See [[security-model]].

## Reassignment

Changing a student's counsellor archives the old thread and opens a new one —
that whole dance is in [[counsellor-reassignment]].

## Visual design

The chat has its own skin, independent of each app's palette — see
[[imessage-chat-theme]].

## Related

- [[model-conversation-message]]
- [[document-workflow]]
- [[api-routes]]
