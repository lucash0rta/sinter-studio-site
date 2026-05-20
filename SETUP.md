# Sinter Studio — dev setup

The site is moving to a two-app structure:

- `apps/web` — Astro + React, the public site.
- `apps/studio` — Sanity Studio v3, the CMS where projects are authored.

The original `index.html` + `styles.css` + `script.js` at the repo root are still live on Vercel and untouched. Migration is incremental.

## 1. Create your Sanity project (one-time)

Sanity's Content Lake (the hosted backend) needs a project ID. The Studio code is open source and lives in this repo; only the data lives on Sanity's servers.

```bash
# Install the CLI globally (optional, but handy)
npm install -g @sanity/cli

# Log in (opens a browser)
sanity login

# Create a project from the studio folder
cd apps/studio
sanity init --env
```

`sanity init --env` will:

- Prompt you to create a new project (call it "Sinter Studio") or attach to an existing one.
- Create the `production` dataset (public read by default — fine for a portfolio).
- Write a `.env` with `SANITY_STUDIO_PROJECT_ID=...` and `SANITY_STUDIO_DATASET=production`.

Alternatively, create the project at https://www.sanity.io/manage and copy the project ID into `apps/studio/.env` manually.

## 2. Mirror the project ID into the web app

```bash
cd apps/web
cp .env.example .env
# edit .env and paste the same SANITY_PROJECT_ID
```

Two env vars total:

```
SANITY_PROJECT_ID=<your-id>
SANITY_DATASET=production
```

## 3. Run both dev servers

```bash
# terminal 1 — Studio (http://localhost:3333)
cd apps/studio && npm run dev

# terminal 2 — Web (http://localhost:4321)
cd apps/web && npm run dev
```

Add a project in the Studio, save, refresh the web app — it appears under `/projects`.

## 4. Deploy the Studio (optional, but recommended)

A hosted Studio at `https://sinter.sanity.studio` so you can edit from anywhere.

```bash
cd apps/studio
sanity deploy
```

You can also embed the Studio at `/admin` on the Astro site later — the `@sanity/astro` integration is already wired to `studioBasePath: "/admin"` in `apps/web/astro.config.mjs`. Enabling that requires a server-rendered route, which we'll set up when we deploy the Astro site.

## 5. Common CLI workflows

```bash
# Pull a backup of all content as NDJSON
sanity dataset export production projects-backup.tar.gz

# Bulk-import content from a file (great for seeding from lucashorta.com)
sanity dataset import projects.ndjson production --replace

# Generate TypeScript types from the schema
npm run typegen

# Open the in-browser GROQ playground
# (Vision tool — already enabled in sanity.config.ts)
```

## Schema

The `project` document type lives in `apps/studio/schemas/project.ts`. Fields:

- `title`, `slug`, `client`, `year`
- `roles[]`, `tags[]`
- `summary` (short), `body` (rich text + inline images)
- `cover` (with hotspot), `gallery[]`, `videos[]`, `links[]`
- `featured`, `order`

Edit that file to add/rename fields — the Studio hot-reloads.

## Repo layout

```
.
├── index.html              # current live site (root)
├── styles.css
├── script.js
├── apps/
│   ├── web/                # new Astro site (work in progress)
│   └── studio/             # Sanity Studio
└── SETUP.md
```
