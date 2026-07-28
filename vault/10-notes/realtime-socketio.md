---
title: Real-time (Socket.IO)
aliases: [Socket.IO, Websockets, Presence]
tags: [realtime, backend]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: Rooms, events and presence tracking on the shared Express HTTP server.
---

# Real-time (Socket.IO)

Socket.IO attaches to the same `http.Server` that serves Express — same port, same
origin, same CORS whitelist. There is no separate WebSocket service to deploy.

Wiring lives in `backend/src/socket/index.ts`; `backend/src/socket/emitter.ts`
exports the singleton `io` that routes import to emit after a mutation.

## Handshake

The client passes its JWT in `socket.handshake.auth`:

```ts
io(SOCKET_URL, { auth: { token } })
```

On connect the socket joins a room named `user:<userId>`, which is how targeted
events reach one person across all their open tabs.

## Events

**Client → server:** `join_room`, `leave_room`, `send_message`, `typing`,
`get_presence`, `disconnect`

**Server → client:** `receive_message`, `message_updated`, `messages_read`,
`presence`, `notification`, `conversations_changed`, `conversation_archived`

## Presence

The socket layer keeps a `userId → socket ids` map. A user is online while that
set is non-empty; the last disconnect stamps `lastSeenAt` on [[model-user]].
Changes broadcast as `presence { userId, online }`, and `get_presence` answers
with the current online-id list. Both frontends render green dots from this.

## What each event drives

| Event | Effect in the UI |
|---|---|
| `receive_message` | New bubble appears in [[chat-messaging]] |
| `message_updated` | A document-request card flips to fulfilled live |
| `messages_read` | Read ticks turn accent-coloured |
| `presence` | Online dot toggles |
| `notification` | Toast + badge — see [[notifications]] |
| `conversations_changed` | Thread list refetches after [[counsellor-reassignment]] |
| `conversation_archived` | Thread switches to read-only |

## Deployment notes

Render supports WebSockets on all plans, so no special configuration is needed —
but on the free tier the service **spins down after 15 minutes idle**, dropping
every connection. Clients reconnect, though the cold start takes roughly a minute.
See [[deployment-blockers]].

The client URL comes from `NEXT_PUBLIC_SOCKET_URL`, which is the API host
*without* the `/api` suffix. Getting that wrong is a common mistake — see
[[environment-variables]].

## Related

- [[chat-messaging]]
- [[notifications]]
- [[express-entry-point]]
