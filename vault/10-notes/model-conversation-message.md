---
title: Model — Conversation and Message
aliases: [Conversation, Message, Message Schema, conversations collection]
tags: [data-model, chat]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: Chat threads and the structured messages inside them.
---

# Model — Conversation and Message

`backend/src/models/Conversation.ts` and `Message.ts`

## Conversation

| Field | Notes |
|---|---|
| `studentId` | ObjectId → [[model-student]] — the case this thread is about |
| `participants[]` | ObjectIds → [[model-user]] |
| `archived` | Set by [[counsellor-reassignment]]; read-only when true |
| `lastMessage` | Denormalised preview for the thread list |
| `lastMessageAt` | Sort key for the thread list |
| `createdAt` / `updatedAt` | |

`lastMessage` and `lastMessageAt` are denormalised deliberately — rendering a
thread list otherwise needs one query per conversation.

`participants[]` is what the `isParticipant` guard checks. A role check alone
would let any counsellor read any thread — see [[security-model]].

## Message

| Field | Notes |
|---|---|
| `conversationId` | ObjectId → Conversation |
| `senderId` | ObjectId → [[model-user]] |
| `type` | `text` · `file` · `document_request` · `form_request` · `form_response` · `system` |
| `content` | Body text |
| `meta` | Type-specific payload |
| `replyTo` | Snapshot `{ messageId, senderName, preview }` |
| `readBy[]` | ObjectIds — drives the read ticks |
| `attachments[]` | See [[file-uploads]] |
| `createdAt` / `updatedAt` | |

## Why `replyTo` is a snapshot

It stores the sender name and a text preview rather than only an id, so a quoted
reply still renders if the original is deleted or the sender is deactivated.

## Related

- [[chat-messaging]]
- [[counsellor-reassignment]]
- [[data-models-moc]]
