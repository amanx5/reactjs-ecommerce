---
description: How to deploy the ecommerce monorepo to Render
---

# Deploy to Render

## Architecture

- **Single Web Service** on Render — Express serves both the API and the UI build
- **PostgreSQL** on Render — managed database, auto-provisioned
- The UI (Vite/React) builds into `server/dist/ui/`, and Express serves it in production

## Prerequisites

- Push the repo to GitHub (public or private)
- Create a [Render account](https://render.com) and connect your GitHub account

## Steps

### 1. Create a PostgreSQL Database on Render

1. Go to [Render Dashboard](https://dashboard.render.com) → **New** → **PostgreSQL**
2. Set a name like `ecommerce-db`
3. Choose the **Free** plan (or Starter for persistence beyond 90 days)
4. Click **Create Database**
5. Once created, copy the **Internal Database URL** (starts with `postgres://...`)
    - This will be used as the `DATABASE_URL` environment variable

### 2. Create a Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com) → **New** → **Web Service**
2. Connect your GitHub repo (`amanx5/ecommerce`)
3. Configure:
    - **Name**: `ecommerce`
    - **Region**: Choose the closest (e.g., Singapore for India)
    - **Runtime**: `Node`
    - **Root Directory**: _(leave blank — it's the repo root)_
    - **Build Command**: `npm run deploy`
    - **Start Command**: `pnpm run start`
    - **Plan**: Free (or Starter)
    - **Environment Variables**:
        | Key            | Value                                           |
        | -------------- | ----------------------------------------------- |
        | `NODE_ENV`     | `production`                                    |
        | `PORT`         | `10000` (Render uses 10000 by default)          |
        | `DATABASE_URL` | _(paste the Internal Database URL from step 1)_ |
4. Click Deploy Web Service

### 3. Verify

- Visit your Render URL: `https://ecommerce-xxxx.onrender.com`
- The first request may be slow on the free tier (cold start)

## Notes

- Render free tier spins down after 15 min of inactivity. The next request takes ~30s. Paid plans keep the service always-on.
- The **Internal Database URL** (not External) is used because both the web service and DB are on Render's internal network — faster and more secure.
- Sequelize auto-creates tables via `sync()` on first boot. Seed data is inserted by `seedStaticTables()` if the tables are empty.
