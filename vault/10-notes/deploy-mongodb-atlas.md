---
title: Deploy — MongoDB Atlas
aliases: [Atlas, Database Hosting, MongoDB Hosting]
tags: [deployment, ops]
type: note
created: 2026-07-28
updated: 2026-07-28
status: growing
summary: Step 1 of going live — the hosted database everything else needs.
---

# Deploy — MongoDB Atlas

**Do this first.** Render can't reach `mongodb://localhost`, so nothing else works
until the database has a public address.

## Steps

1. Create a free **M0** cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. **Database Access** → add a user with a generated password. Save it — Atlas
   won't show it again.
3. **Network Access** → allow `0.0.0.0/0`
4. **Connect** → *Drivers* → copy the SRV connection string
5. Substitute the real password and append the database name:
   `mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/studycrm?retryWrites=true&w=majority`

That becomes `MONGODB_URI` — see [[environment-variables]].

## About the open IP allowlist

`0.0.0.0/0` looks alarming. It's necessary because Render's egress IPs aren't
static on the free and starter plans, so there's no narrower range to whitelist.
Access still requires the database credentials.

If you later move to a Render plan with static outbound IPs, narrow this to those
addresses.

## Seeding

Point a local shell at the Atlas URI and run the seeder:

```bash
MONGODB_URI="<atlas srv string>" npm run seed
```

`backend/src/seed.ts` reads the same variable — see [[development-commands]].

## Choosing a region

Put the cluster in the same region as the Render service. Cross-region round trips
add latency to every query, and the API makes several per request.

## Free tier limits

M0 gives 512 MB storage and shared CPU. Fine for pilot use. Document *metadata*
is small, but note that uploaded files don't live here at all — see
[[file-uploads]].

## Next

→ [[deploy-backend-render]]

## Related

- [[environment-variables]]
- [[deployment-moc]]
