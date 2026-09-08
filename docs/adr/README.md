# Architecture Decision Records (ADR)
## StaySphere Platform

This directory contains the formal records of architectural and technical decisions made during the design and engineering of the StaySphere platform.

### ADR Format
All records follow the standardized Architecture Decision Record format:
* **Status:** Draft / Proposed / Accepted / Rejected / Superseded
* **Context:** The technical problem and business drivers.
* **Decision:** The chosen path and architecture.
* **Consequences:** Trade-offs, positive benefits, and mitigation strategies.

---

### Master ADR Registry

| ADR Number | Title | Status | Date |
| :--- | :--- | :--- | :--- |
| [**ADR-001**](file:///d:/Training/working/Cognivectra/Staysphere/docs/adr/ADR-001-modular-monolith-architecture.md) | Modular Monolith vs Microservices Architecture | **Accepted** | 2026-09-07 |
| [**ADR-002**](file:///d:/Training/working/Cognivectra/Staysphere/docs/adr/ADR-002-database-selection-postgres-postgis.md) | PostgreSQL 16 + PostGIS for Unified Data Tier | **Accepted** | 2026-09-07 |
| [**ADR-003**](file:///d:/Training/working/Cognivectra/Staysphere/docs/adr/ADR-003-workflow-sla-engine-temporal-bullmq.md) | Temporal.io / BullMQ for Deterministic SLA & Escalation Engine | **Accepted** | 2026-09-07 |
| [**ADR-004**](file:///d:/Training/working/Cognivectra/Staysphere/docs/adr/ADR-004-frontend-framework-strategy.md) | Multi-Client Strategy (Next.js, Vite, React Native Expo) | **Accepted** | 2026-09-07 |
| [**ADR-005**](file:///d:/Training/working/Cognivectra/Staysphere/docs/adr/ADR-005-realtime-driver-telemetry-geofencing.md) | Real-Time Driver Telemetry & Geolocation Architecture | **Accepted** | 2026-09-07 |
| [**ADR-006**](file:///d:/Training/working/Cognivectra/Staysphere/docs/adr/ADR-006-financial-ledger-split-payments.md) | Double-Entry Bookkeeping & Escrow Payout Engine | **Accepted** | 2026-09-07 |
