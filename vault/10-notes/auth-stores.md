---
title: Auth Stores (Zustand)
aliases: [authStore, Zustand, Client Auth State]
tags: [frontend, auth]
type: note
created: 2026-07-28
updated: 2026-07-28
status: evergreen
summary: Client-side auth state in both apps, and why the storage keys differ.
---

# Auth Stores (Zustand)

Each frontend has its own `src/stores/authStore.ts` — Zustand with the `persist`
middleware writing to `localStorage`.

## The four keys

| | CRM | Student portal |
|---|---|---|
| Token key | `crm_token` | `student_token` |
| Store key | `crm-auth` | `student-auth` |

Deliberately distinct so a staff member can have both apps open in one browser
without the two sessions overwriting each other — which matters constantly during
development and support.

## Shapes

```ts
// crm
{ user: User | null, token: string | null, setAuth, clearAuth }

// student
{ user: StudentUser | null, token: string | null,
  studentId: string | null, setAuth, clearAuth }
```

The portal carries `studentId` separately because most of its endpoints key on
[[model-student]], not [[model-user]]. Keeping it in the store avoids resolving
it on every page.

## Two reads of the same token

`persist` hydrates the store from the `*-auth` key, while the Axios interceptor in
[[api-client]] reads the raw `*_token` key directly from `localStorage`. Both are
written at login. The interceptor reads raw storage so it works during the render
before hydration completes.

## Lifecycle

- **Login** → `setAuth(user, token)` writes both keys
- **401 response** → the interceptor calls `clearAuth()` and redirects to `/login`
- **Expiry** → no refresh mechanism; the next request 401s and logs you out. See
  [[authentication-jwt]].

## Security note

Tokens in `localStorage` are readable by any XSS on the origin. That's the
trade-off for having no session server — see [[security-model]].

## Related

- [[api-client]]
- [[crm-frontend]]
- [[student-portal]]
