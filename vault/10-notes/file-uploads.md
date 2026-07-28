---
title: File Uploads
aliases: [Multer, Uploads, Attachments]
tags: [backend, documents, ops]
type: note
created: 2026-07-28
updated: 2026-07-28
status: growing
summary: Multer disk storage — how it works locally and why it breaks on hosted platforms.
---

# File Uploads

Two routes accept files, both using the same pattern:

| Route | File | Purpose |
|---|---|---|
| `/api/documents` | `routes/documents.ts` | Student documents — [[document-workflow]] |
| `/api/messages` | `routes/messages.ts` | Chat attachments — [[chat-messaging]] |

```ts
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(process.cwd(), 'uploads')),
  // ...
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });
```

10 MB cap per file. The directory is created at boot by [[express-entry-point]]
and served back with `express.static` at `/uploads`.

## The stored path

Documents keep a `url` field pointing at the Multer path. The file itself lives on
local disk; only the pointer is in MongoDB.

## Two problems this creates in production

**Files vanish.** Render's filesystem is ephemeral. Every deploy and every restart
wipes `uploads/`, leaving database rows whose `url` now 404s. Passport scans and
chat attachments disappear with no error anywhere. This is the single most
important thing to fix before real users touch the system — see
[[deployment-blockers]].

**The path depends on the working directory.** `process.cwd()` means starting the
process from `backend/` and from the repo root give you *different* upload
directories. Keep the start command consistent — see [[deploy-backend-render]].

## Fixes, in order of effort

1. **Render persistent disk** — mount at the uploads path, paid tier, about ten
   minutes of work. Keeps all the current code.
2. **Object storage** (S3, Cloudinary, R2) — replace `diskStorage` with a stream
   upload and store the returned URL. Correct long-term, and it removes the
   `express.static` exposure noted in [[security-model]].

Option 1 is the right call for getting live; option 2 is the right call before
scaling past one instance, since a disk can't be shared across replicas.

## Access control gap

`/uploads` is static and unauthenticated — anyone holding the URL can fetch the
file without a token. Moving to signed object-storage URLs fixes this alongside
the durability problem.

## Related

- [[document-workflow]]
- [[deployment-blockers]]
- [[security-model]]
- [[model-document]]
