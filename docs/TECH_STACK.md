# StaySphere — Technology Stack & System Architecture Specification
**Document Version:** 1.0  
**Status:** Approved  
**Related PRD:** [STAYSPHERE_PRD_v3.0.md](file:///d:/Training/working/Cognivectra/Staysphere/docs/STAYSPHERE_PRD_v3.0.md)  
**Target Platform:** Web, iOS, Android, Cloud Infrastructure  

---

## Table of Contents
1. [Executive Architectural Summary](#1-executive-architectural-summary)
2. [Monorepo & Workspace Structure](#2-monorepo--workspace-structure)
3. [Frontend & Client Tier Specification](#3-frontend--client-tier-specification)
4. [Backend & API Architecture](#4-backend--api-architecture)
5. [Data Tier & Storage Specification](#5-data-tier--storage-specification)
6. [Real-Time Telemetry & Geolocation Engine (MOVE)](#6-real-time-telemetry--geolocation-engine-move)
7. [Workflow & SLA Escalation Engine (RESOLVE)](#7-workflow--sla-escalation-engine-resolve)
8. [Financial Ledger & Payment Architecture (FINANCE)](#8-financial-ledger--payment-architecture-finance)
9. [Integration & Third-Party Services](#9-integration--third-party-services)
10. [Infrastructure, DevOps & Observability](#10-infrastructure-devops--observability)
11. [Architecture Decision Records (ADR) Index](#11-architecture-decision-records-adr-index)

---

# 1. Executive Architectural Summary

StaySphere is engineered as a **High-Performance Modular Monolith** with selective event-driven worker services for heavy workloads (GPS ingestion, SLA timers, and financial batch settlements). This ensures rapid time-to-market and strict transactional consistency without the operational overhead of microservices, while preserving clean domain encapsulation for future service extraction.

```
                                    ┌───────────────────────────────────┐
                                    │      CLOUDFLARE EDGE NETWORK      │
                                    │    (DNS, Anycast CDN, WAF, SSL)   │
                                    └─────────────────┬─────────────────┘
                                                      │
                       ┌──────────────────────────────┴──────────────────────────────┐
                       ▼                                                             ▼
         ┌───────────────────────────┐                                 ┌───────────────────────────┐
         │     CLIENT WEB APPS       │                                 │     API GATEWAY / INGRESS │
         │  • Guest Web (Next.js)    │                                 │  • Fastify / Traefik      │
         │  • Extranets (React Vite) │                                 │  • JWT / OAuth2 / RBAC    │
         │  • Control Tower (Vite)   │                                 │  • Rate Limiting & CORS   │
         └───────────────────────────┘                                 └─────────────┬─────────────┘
                                                                                     │
                       ┌─────────────────────────────────────────────────────────────┴─────────────┐
                       ▼                                                                           ▼
         ┌───────────────────────────┐                                               ┌───────────────────────────┐
         │     CORE API MONOLITH     │                                               │    GPS INGESTION SERVICE  │
         │     (NestJS / TypeScript) │                                               │    (Go / Fast WebSockets) │
         │  • Stay Domain (Booking)  │                                               │  • 50k+ Driver Live Pings │
         │  • My Stay / Services     │                                               │  • Geohash / Spatial Lock │
         │  • Ticket / SLA Broker    │                                               └─────────────┬─────────────┘
         │  • Ledger & Settlement    │                                                             │
         └─────────────┬─────────────┘                                                             │
                       │                                                                           │
         ┌─────────────┴─────────────────────────────┬─────────────────────────────────────────────┘
         ▼                                           ▼                                             ▼
┌──────────────────┐                       ┌──────────────────┐                          ┌──────────────────┐
│  PostgreSQL 16+  │                       │     Redis 7+     │                          │   Temporal.io    │
│  • PostGIS       │                       │  • Redlock Sync  │                          │  • SLA Engine    │
│  • Double-Entry  │                       │  • Pub/Sub Bus   │                          │  • Escalations   │
│  • RLS & JSONB   │                       │  • Geo Indexing  │                          │  • Auto-Refunds  │
└──────────────────┘                       └──────────────────┘                          └──────────────────┘
```

---

# 2. Monorepo & Workspace Structure

The entire codebase is organized as a **Turborepo Monorepo** (pnpm workspaces) sharing TypeScript types, database schemas, validation models, and design system tokens.

```
staysphere/
├── apps/
│   ├── web-guest/              # Next.js 15 App (B2C Guest portal, SEO & booking)
│   ├── app-mobile/             # React Native (Expo) - Shared Guest & Driver application
│   ├── web-hotel-extranet/     # React 19 + Vite (Hotel partner dashboard & room grid)
│   ├── web-travel-extranet/    # React 19 + Vite (Travel partner & fleet dispatch dashboard)
│   ├── web-control-tower/      # React 19 + Vite (Operations, Resolution Desk & Audit console)
│   ├── api-core/               # NestJS Modular Monolith API
│   └── service-geo-telemetry/  # Go (Golang) Microservice for driver real-time GPS stream
├── packages/
│   ├── database/               # Prisma / Kysely schemas, PostGIS migrations & seeders
│   ├── domain-types/           # Shared TypeScript interfaces & DTOs
│   ├── validation-schemas/     # Zod validation schemas across web, mobile & API
│   ├── ui-kit/                 # Shared Tailwind / Headless UI design system components
│   ├── config-eslint/          # Unified linting rules
│   └── config-typescript/      # Shared tsconfig.json standards
├── docs/                       # Architecture documents, PRDs, and ADR records
├── turbo.json                  # Turborepo task pipeline configuration
└── pnpm-workspace.yaml         # Workspace definition
```

---

# 3. Frontend & Client Tier Specification

```
┌─────────────────────────┬──────────────────────┬──────────────────────┬──────────────────────────────┐
│ Application             │ Core Tech Stack      │ State & Data Fetch   │ Key Architectural Feature    │
├─────────────────────────┼──────────────────────┼──────────────────────┼──────────────────────────────┤
│ Guest Web Portal        │ Next.js 15 (React 19)│ Server Components +  │ ISR / SSR for SEO, Core Web  │
│                         │ TypeScript, Tailwind │ TanStack Query v5    │ Vitals < 1.2s LCP.           │
├─────────────────────────┼──────────────────────┼──────────────────────┼──────────────────────────────┤
│ Mobile App (iOS/Android)│ React Native (Expo)  │ Zustand + MMKV Cache │ Background location tracking,│
│ (Guest + Driver Modes)  │ React Native Maps    │ TanStack Query v5    │ offline vouchers, native APN │
├─────────────────────────┼──────────────────────┼──────────────────────┼──────────────────────────────┤
│ Hotel Partner Extranet  │ React 19 + Vite      │ TanStack Query +     │ High-density matrix grid,    │
│                         │ Tailwind CSS, Lucide │ WebSocket Client     │ instant room block editing.  │
├─────────────────────────┼──────────────────────┼──────────────────────┼──────────────────────────────┤
│ Control Tower / Desk    │ React 19 + Vite      │ Zustand + Socket.io  │ Live SLA countdown timers,   │
│                         │ TanStack Table / Virtual│ Web Audio API     │ split-pane ticket triage.    │
└─────────────────────────┴──────────────────────┴──────────────────────┴──────────────────────────────┘
```

---

# 4. Backend & API Architecture

### 4.1 Framework: **NestJS with Fastify HTTP Adapter**
* **Language:** TypeScript 5.5+ (Strict Mode).
* **Underlying HTTP Engine:** `fastify` (2.5x higher throughput compared to Express).
* **Validation & Serialization:** `zod` and `class-transformer`.
* **API Style:** REST (Level 3 HATEOAS where appropriate) + WebSockets for real-time dispatch and live support tickets.

### 4.2 Modular Monolith Domain Organization
Inside `apps/api-core/src/modules/`:
* `auth/` — OAuth2, JWT with rotation, RBAC role guard middleware.
* `customer/` — Profiles, guest preferences, verification badges.
* `hotel/` — Properties, room types, rate plans, seasonal tariffs, inventory.
* `booking/` — Booking orchestration, room lock state machine, cart calculation.
* `travel/` — Travel Desk products, vehicle/driver registry, route tariffs.
* `my-stay/` — In-stay service broker, front desk request routing.
* `resolution/` — Unified ticketing, multi-party mediation, service recovery.
* `finance/` — Double-entry ledger, escrow holds, payout generation.
* `trust-quality/` — Trust scores, reviews, partner quality ranking algorithms.
* `notifications/` — Omnichannel delivery broker (Push, SMS, WhatsApp, Email).

---

# 5. Data Tier & Storage Specification

```
┌────────────────────────────────────────────────────────────────────────┐
│                       DATA INFRASTRUCTURE TIER                         │
├──────────────────────┬──────────────────────┬──────────────────────────┤
│ Engine               │ Role                 │ Configuration & Plugins  │
├──────────────────────┼──────────────────────┼──────────────────────────┤
│ PostgreSQL 16+       │ Master Relational DB │ PostGIS, pgcrypto,       │
│                      │                      │ pg_stat_statements, JSONB│
├──────────────────────┼──────────────────────┼──────────────────────────┤
│ Redis 7+ (Valkey)    │ Cache, Locks & Bus   │ Redlock, Pub/Sub,        │
│                      │                      │ GEO commands, TTL store  │
├──────────────────────┼──────────────────────┼──────────────────────────┤
│ Cloudflare R2 / S3   │ Media & Evidence     │ S3-compatible, presigned │
│                      │ Object Storage       │ upload URLs, CDN backed  │
└──────────────────────┴──────────────────────┴──────────────────────────┘
```

### 5.1 ORM & Query Layer: **Kysely + Prisma (Type-Safe SQL Query Builder)**
* **Prisma:** Utilized solely for declarative schema modeling and automated migrations.
* **Kysely:** Utilized at runtime for zero-overhead, strictly type-safe SQL queries, enabling complex joins, window functions, and PostGIS queries with zero N+1 latency.

---

# 6. Real-Time Telemetry & Geolocation Engine (MOVE)

To handle continuous driver location streaming (every 3 seconds per active driver) without choking the main transactional database:

```
┌──────────────────────┐         ┌──────────────────────────────┐         ┌──────────────────────┐
│  Driver Mobile App   │───────> │  Go Telemetry Microservice   │───────> │    Redis 7 Cluster   │
│  (Background GPS)    │ WS/WSS  │  (Fiber / Gorilla WebSocket) │ Batch   │  (GEOADD live_drivers│
└──────────────────────┘         └──────────────────────────────┘         └──────────┬───────────┘
                                                                                     │
                                 ┌──────────────────────────────┐                    │ Pub/Sub
                                 │     Guest & Ops WebSockets   │ <──────────────────┘
                                 │   (Real-time Map Animation)  │
                                 └──────────────────────────────┘
```

* **Spatial Search:** `GEORADIUSBYMEMBER` / `GEOSEARCH` in Redis computes the nearest 5 available drivers to a guest's pickup point within 10 milliseconds.
* **Historical Persistence:** Completed trip coordinates are compressed into PostGIS `LINESTRING` objects upon trip completion for audit and dispute inspection.

---

# 7. Workflow & SLA Escalation Engine (RESOLVE)

The PRD defines strict SLA targets (e.g., Driver No-Show Response < 5 min; Room Denied < 10 min).

```
┌─────────────────────────────────────────────────────────────────┐
│              TEMPORAL.IO SLA WORKFLOW DEFINITION                │
├─────────────────────────────────────────────────────────────────┤
│ 1. TicketCreatedEvent triggers SLA Workflow                     │
│ 2. Workflow sets durable timer for Category SLA (e.g. 10 mins) │
│ 3. If VendorAcknowledged signal received -> Cancel Escalation   │
│ 4. If timer expires -> Trigger P0 Escalation Event             │
│    ├── Notify Ops Control Tower via WebSocket (High-priority)  │
│    ├── Send Automated WhatsApp Alert to Area Partner Manager    │
│    └── Spawn Alternative Match / Service Recovery Task          │
└─────────────────────────────────────────────────────────────────┘
```

* **Technology:** **Temporal.io** (or **BullMQ** with Redis persistence as fallback).
* **Durability:** Workflows survive server restarts and network partitions without losing timer accuracy.

---

# 8. Financial Ledger & Payment Architecture (FINANCE)

### 8.1 Double-Entry Bookkeeping Pattern
Every monetary movement is recorded as immutable balanced debit and credit entries:

```
                     ┌────────────────────────────────────────┐
                     │            BOOKING #10842              │
                     │       Guest Pays: ₹10,000 (INR)        │
                     └───────────────────┬────────────────────┘
                                         │
        ┌────────────────────────────────┴────────────────────────────────┐
        ▼                                                                 ▼
┌──────────────────────────────┐                        ┌──────────────────────────────┐
│       DEBIT ENTRIES          │                        │        CREDIT ENTRIES        │
├──────────────────────────────┤                        ├──────────────────────────────┤
│ Assets:GatewayEscrow  ₹10,000│                        │ Liabilities:HotelDue  ₹8,500 │
│                              │                        │ Revenue:StaySphereFee ₹1,500 │
└──────────────────────────────┘                        └──────────────────────────────┘
```

* **Settlement Engine:** Nightly batch processing triggers automated vendor payouts via Payment Gateway Payout APIs (Stripe Connect / Razorpay Route) after deducting penalties or SLA deductions.

---

# 9. Integration & Third-Party Services

```
┌─────────────────────────┬───────────────────────────────────┬──────────────────────────────┐
│ Service Domain          │ Selected Provider                 │ Fallback / Strategy          │
├─────────────────────────┼───────────────────────────────────┼──────────────────────────────┤
│ Payment Gateway         │ Razorpay / Stripe Connect         │ Multi-gateway failover       │
│ Geospatial & Maps       │ Google Maps Platform / Mapbox GL  │ Vector tiles + Cached Matrix │
│ Messaging / WhatsApp    │ Gupshup / Meta WhatsApp Cloud API │ Fallback to transactional SMS│
│ SMS OTP                 │ Twilio / Gupshup SMS Gateway      │ Auto-retry routing           │
│ Transactional Email     │ Resend / AWS SES                  │ High-deliverability pool     │
│ Cloud Infrastructure    │ AWS (EKS / ECS Fargate)           │ Multi-AZ high availability   │
│ CDN & DDoS Mitigation   │ Cloudflare Enterprise             │ Edge SSL & Rate Limiting     │
└─────────────────────────┴───────────────────────────────────┴──────────────────────────────┘
```

---

# 10. Infrastructure, DevOps & Observability

```
                               ┌────────────────────────┐
                               │     GITHUB ACTIONS     │
                               │  CI: Lint, Test, Build │
                               └───────────┬────────────┘
                                           │ Push Image
                                           ▼
                               ┌────────────────────────┐
                               │  AWS ECR / DOCKER REG  │
                               └───────────┬────────────┘
                                           │ Deploy
                                           ▼
        ┌──────────────────────────────────┴──────────────────────────────────┐
        ▼                                                                     ▼
┌──────────────────────────────┐                                ┌──────────────────────────────┐
│   PRODUCTION (EKS / ECS)     │                                │   OBSERVABILITY & METRICS    │
│  • Multi-AZ Node Groups      │                                │  • Sentry (Exception Tracking│
│  • Auto-scaling Groups       │                                │  • OpenTelemetry Tracing     │
│  • IAM Roles for K8s Service │                                │  • Grafana + Prometheus      │
└──────────────────────────────┘                                └──────────────────────────────┘
```

---

# 11. Architecture Decision Records (ADR) Index

The following official Architecture Decision Records govern the StaySphere technical roadmap:

| ADR ID | Title | Status | Link |
| :--- | :--- | :--- | :--- |
| **ADR-001** | Modular Monolith vs Microservices Architecture | **Accepted** | [ADR-001](file:///d:/Training/working/Cognivectra/Staysphere/docs/adr/ADR-001-modular-monolith-architecture.md) |
| **ADR-002** | Selection of PostgreSQL 16 + PostGIS for Data Tier | **Accepted** | [ADR-002](file:///d:/Training/working/Cognivectra/Staysphere/docs/adr/ADR-002-database-selection-postgres-postgis.md) |
| **ADR-003** | Temporal.io / BullMQ for SLA Engine & State Machine | **Accepted** | [ADR-003](file:///d:/Training/working/Cognivectra/Staysphere/docs/adr/ADR-003-workflow-sla-engine-temporal-bullmq.md) |
| **ADR-004** | Hybrid Client Architecture (Next.js, Vite, Expo) | **Accepted** | [ADR-004](file:///d:/Training/working/Cognivectra/Staysphere/docs/adr/ADR-004-frontend-framework-strategy.md) |
| **ADR-005** | Real-Time Driver Telemetry & Geolocation Architecture | **Accepted** | [ADR-005](file:///d:/Training/working/Cognivectra/Staysphere/docs/adr/ADR-005-realtime-driver-telemetry-geofencing.md) |
| **ADR-006** | Double-Entry Bookkeeping & Split Payment Escrow | **Accepted** | [ADR-006](file:///d:/Training/working/Cognivectra/Staysphere/docs/adr/ADR-006-financial-ledger-split-payments.md) |
