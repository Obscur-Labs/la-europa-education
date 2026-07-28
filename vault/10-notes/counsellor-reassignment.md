---
title: Counsellor Reassignment
aliases: [Reassignment, handleCounsellorChange, Archived Conversations]
tags: [domain, chat]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: What happens to chat history when a student's case changes hands.
---

# Counsellor Reassignment

Changing `assignedCounsellor` on a student — via `PUT`/`PATCH /students/:id` or
`PATCH /students/:id/assign-counsellor` — triggers `handleCounsellorChange`.

## What it does

1. **Archives the old conversation** — sets `archived: true` on the previous
   counsellor ↔ student thread
2. **Opens the new one** — creates a conversation with the incoming counsellor, or
   un-archives an existing one if that counsellor held the case before
3. **Writes system messages** into both threads recording the change
4. **Emits `conversations_changed` and `conversation_archived`** so both clients
   refresh without a reload — see [[realtime-socketio]]

## Archived means readable, not deleted

History stays visible to both sides. What stops is writing: `/send`, `/send-file`
and `/form-response` all return **403 "conversation is closed"** on an archived
thread.

This is deliberate. A student can still scroll back through advice their previous
counsellor gave, and the agency keeps a complete record — but nobody can add to a
thread the assigned counsellor isn't part of.

## In the portal

The student's chat page is a **rooms list**, not a single thread:

- Closed rooms carry a "Closed" badge and a read-only notice
- The current counsellor's room is tagged "Current"

A student who has changed counsellors twice sees three rooms.

## Why it works this way

The obvious alternatives are worse. Deleting history loses context the next
counsellor needs. Transferring the thread wholesale makes it look like the new
counsellor said things they didn't. Archiving keeps attribution honest.

## Related

- [[chat-messaging]]
- [[model-conversation-message]]
- [[model-student]]
