# StaySphere — Production Deployment Guide (Vercel Monorepo)

This repository contains multiple applications managed via **Turborepo** and **pnpm workspaces**:

1. **`apps/web-guest`**: Customer Booking & Guest Marketplace (Next.js 15)
2. **`apps/web-control-tower`**: Platform Operations Suite (Vite + React) — Relationship Management, Frontdesk, Property Partner Subscriptions, Escrow Receipts, Resolution Desk & Travel Telemetry
3. **`apps/api-core`**: Core REST Backend (NestJS)

---

## 🌐 1. Deploying to Vercel (Recommended Multi-Project Monorepo)

Vercel deploys each frontend application as an independent project connected to the same GitHub repository: `https://github.com/selva-aiprojects/staysphere`.

### Project 1: Customer & Guest Portal (`apps/web-guest`)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..." → "Project"**.
2. Select repository: `selva-aiprojects/staysphere`.
3. Configure project settings:
   - **Project Name**: `staysphere-guest`
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `apps/web-guest` *(ensure "Include source files outside of Root Directory" is checked)*
   - **Build Command**: `next build` (handled automatically)
   - **Output Directory**: `.next`
4. **Environment Variables**:
   - `DATABASE_URL`: `postgres://avnadmin:***@pg-jioclinic-aiservices-selva.f.aivencloud.com:19168/staysphere?sslmode=require`
   - `NEXT_PUBLIC_API_URL`: `https://api.staysphere.io` (or your backend domain)
5. Click **Deploy**.

---

### Project 2: Platform Operations Control Tower (`apps/web-control-tower`)

1. In Vercel, click **"Add New..." → "Project"**.
2. Select the same repository: `selva-aiprojects/staysphere`.
3. Configure project settings:
   - **Project Name**: `staysphere-control-tower`
   - **Framework Preset**: `Vite`
   - **Root Directory**: `apps/web-control-tower` *(ensure "Include source files outside of Root Directory" is checked)*
   - **Build Command**: `vite build`
   - **Output Directory**: `dist`
4. **Environment Variables**:
   - `VITE_API_URL`: `https://api.staysphere.io`
5. Click **Deploy**.

---

## 🔌 2. Backend & Database Deployment

### Aiven Cloud PostgreSQL Database
The database is hosted on **Aiven Cloud**:
- **Host**: `pg-jioclinic-aiservices-selva.f.aivencloud.com`
- **Port**: `19168`
- **Database**: `staysphere`
- **SSL**: Enabled (`sslmode=require`)

### API Core (`apps/api-core`)
- **Render / Railway / AWS ECS**: Connect the same repository, set Root Directory to `apps/api-core` or use Dockerfile (`docker-compose.yml`), and set `DATABASE_URL` and `JWT_SECRET`.

---

## 🔒 3. Environment Variable Checklist

| Variable | Description | Target Applications |
| :--- | :--- | :--- |
| `DATABASE_URL` | Aiven PostgreSQL connection URI | `apps/web-guest`, `apps/api-core`, `packages/database` |
| `JWT_SECRET` | Secret key for auth token signing | `apps/api-core`, `apps/web-guest` |
| `NEXT_PUBLIC_API_URL` | Public API endpoint | `apps/web-guest` |
| `VITE_API_URL` | Public API endpoint | `apps/web-control-tower` |
| `NODE_ENV` | Environment (`production`) | All projects |
