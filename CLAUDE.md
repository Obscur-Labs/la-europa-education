# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

StudyCRM is a study-abroad management platform with three separate sub-projects:

- **`backend/`** — Express + TypeScript API (port 5000)
- **`crm/`** — Next.js 16 staff-facing CRM dashboard (port 3000)
- **`student/`** — Next.js 16 student self-service portal (port 3001)

## Commands

This is an **npm workspaces monorepo**. Run everything from the repo root — there is a
single root `node_modules` and a single root `package-lock.json`. Do not run `npm install`
inside `backend/`, `crm/`, or `student/`; that would recreate the per-app `node_modules`
this layout exists to avoid.

```bash
npm install              # installs all three workspaces at once

npm run dev              # all three concurrently (colour-tagged output)
npm run dev:backend      # ts-node with nodemon (hot reload), port 5000
npm run dev:crm          # next dev, port 3000
npm run dev:student      # next dev, port 3001

npm run build            # backend → crm → student, sequentially
npm run build:backend    # tsc → backend/dist/
npm run build:crm
npm run build:student

npm start                # all three production servers concurrently
npm run start:backend    # node dist/index.js
npm run start:crm
npm run start:student

npm run seed             # seed initial data via ts-node backend/src/seed.ts
npm run typecheck        # tsc --noEmit across all three
npm run clean            # remove node_modules and build outputs
```

The per-app scripts still exist in each workspace's `package.json`, so `cd crm && npm run dev`
also works. The root scripts are just `npm run <script> -w <workspace>` wrappers.

Both Next apps set `outputFileTracingRoot` to the repo root in `next.config.ts` — required
because dependencies are hoisted above each app directory.

## Environment Setup

Copy `.env.example` → `.env` in `backend/`, and `.env.local.example` → `.env.local` in both `crm/` and `student/`.

**backend/.env** required vars:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/studycrm
JWT_SECRET=...
JWT_EXPIRES_IN=7d
CLIENT_CRM_URL=http://localhost:3000
CLIENT_STUDENT_URL=http://localhost:3001
```

**crm/.env.local** / **student/.env.local**:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

## Architecture

### Auth Flow
JWT-based. The backend issues a token on `/api/auth/login`. The CRM stores it in `localStorage` under `crm_token`; the student portal uses `student_token`. Both frontends use Zustand with `persist` middleware (`crm-auth` / `student-auth` keys) to hydrate auth state. The Axios instance in `src/lib/api.ts` (each frontend has one) attaches the token via an interceptor and redirects to `/login` on 401.

Users have a `role` field (`super_admin`, `admin`, `counsellor_manager`, `finance`, `visa_team`, `doc_verification`, `university_team`, `counsellor`, `accountant`, `support`, `student`, `university`). Route-level authorization uses the `authorize(...roles)` middleware from `backend/src/middleware/auth.ts`.

The `student` role has a `studentId` FK on the User document pointing to the `Student` collection. Self-registration (`POST /api/auth/register-student`) atomically creates both records and links them.

### Data Model Relationships
```
User ──(role=student)──► Student
                            │
                ┌───────────┼───────────┬──────────────┐
                ▼           ▼           ▼              ▼
          Application    Document    Payment          Visa
```

- **Lead** → converted to **Student** via `convertedStudentId`
- **Conversation** → has a `studentId` and `participants[]` (User refs); **Message** belongs to a Conversation
- **Notification** and **ActivityLog** are per-user/student side-effect records

### Student Journey Stages
The `StudentStage` enum drives the entire pipeline:
`inquiry → counselling → university_selection → application_submitted → offer_letter → fee_payment → cas_i20 → visa_filing → visa_approved → departure`

`Application.status` is separate: `drafting → submitted → offer_received → conditional_offer → accepted | rejected | withdrawn | deferred`

`Visa.stage`: `not_started → documents_complete → visa_filed → biometrics → interview → decision → approved | rejected | reapplied`

### Real-time (Socket.io)
The backend creates an `http.Server` wrapping Express and attaches `socket.io`. CORS is configured to allow both frontend origins. The socket setup lives in `backend/src/socket.ts`. Both frontends connect via `NEXT_PUBLIC_SOCKET_URL`. The exported `io` instance from `backend/src/index.ts` is used inside routes to emit events.

### CRM Frontend Structure
- App Router with a `(crm)` route group for authenticated pages
- Global providers in `app/layout.tsx`: `ThemeProvider` → `ToastProvider`
- Tailwind CSS v4 with a custom design token vocabulary: `bg-base`, `bg-surface`, `bg-card`, `bg-muted`, `border-line`, `text-t1/t2/t3`, `bg-accent` — defined in global CSS, not `tailwind.config`
- `useToast()` from `ToastContext` for all user-facing feedback
- `useAuthStore` from `stores/authStore.ts` for auth state
- All API calls go through the configured Axios instance at `lib/api.ts`

### Student Portal Structure
Mirrors the CRM structure but also has `ThemeContext` for light/dark switching. Auth store tracks `studentId` separately. Portal pages live under `app/(portal)/`.

## Key Conventions

- Backend routes always import `AuthRequest` (not plain `Request`) for authenticated handlers, and use `req.user!.id` for the caller's identity.
- Mongoose models export both the interface (`IStudent`, etc.) and the compiled model as the default export.
- `User.toJSON` strips the `password` field automatically — never manually omit it in routes.
- Frontend pages use `'use client'` and fetch data in `useEffect`; there is no server-side data fetching (RSC) in use.
