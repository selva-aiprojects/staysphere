# ADR-001: Modular Monolith vs Microservices Architecture

**Status:** Accepted  
**Date:** 2026-09-07  
**Deciders:** Lead Architect, Product Engineering  
**Consulted:** PRD v3.0 Authors, DevOps Team  

---

## 1. Context & Problem Statement

StaySphere is launching a multi-sided marketplace connecting Guests, Hotel Partners, Travel Partners, and Channel Partners with in-stay service request routing and a centralized Resolution Desk. 

Key challenges include:
* Developing 6 major domains (STAY, MOVE, RESOLVE, FINANCE, TRUST, NOTIFICATIONS) concurrently.
* Maintaining transactional integrity across multi-party bookings (e.g., locking room + reserving cab + escrow authorization in a single atomic flow).
* Avoiding the operational overhead, distributed transaction latency (Saga pattern), network serialization tax, and infrastructure costs of microservices during early startup phases.

## 2. Decision Drivers

* **Time-to-Market:** Deliver MVP (Phase 1) within 3–4 months.
* **Developer Velocity:** Single codebase for core domain models, shared TypeScript types, and zero inter-service contract breakage.
* **ACID Transactions:** Guarantee atomic consistency across hotel reservations and payment allocations without distributed 2-Phase Commit (2PC).
* **Future-Proofing:** Enforce clear boundaries so high-load domains (e.g., driver GPS telemetry) can be carved into microservices on demand.

## 3. Considered Options

1. **Option 1: Distributed Microservices from Day 1** (Auth Service, Hotel Service, Travel Service, Billing Service, Resolution Service).
2. **Option 2: Classical Monolith (Unstructured MVC)**.
3. **Option 3: Modular Monolith (NestJS / TypeScript Monorepo with Domain-Driven Boundaries) [Selected]**.

## 4. Decision

We choose **Option 3: Modular Monolith**.

The backend will be structured as a single deployable application using **NestJS with Fastify**, with strictly isolated domain modules (`modules/booking`, `modules/travel`, `modules/resolution`, `modules/finance`). Direct cross-domain database table joins are prohibited; communication occurs through explicit domain service interfaces and in-process event buses.

```
┌─────────────────────────────────────────────────────────────┐
│                    STAYSPHERE MODULAR MONOLITH              │
├───────────────┬───────────────┬──────────────┬──────────────┤
│  Stay Domain  │  Move Domain  │Resolve Domain│Finance Domain│
├───────────────┴───────────────┴──────────────┴──────────────┤
│               Core In-Memory Event Bus (EventEmitter)        │
├─────────────────────────────────────────────────────────────┤
│         PostgreSQL 16 (Logical Domain Schemas & RLS)        │
└─────────────────────────────────────────────────────────────┘
```

## 5. Consequences

### Positive Consequences
* **Atomic Transactions:** Can perform multi-entity updates within a single Postgres transaction block.
* **Simpler CI/CD & Testing:** Easy end-to-end integration tests without mocking 10 different network endpoints.
* **Cost Efficiency:** A single ECS Fargate / K8s service cluster handles the entire business workload.
* **Refactoring Simplicity:** Refactoring domain boundaries in TypeScript takes minutes with compiler safety.

### Negative Consequences / Risks
* **Risk of Boundary Degradation:** Developers may bypass service boundaries and query internal domain tables directly.
  * *Mitigation:* Enforce ESLint boundary rules (`eslint-plugin-import` / NX module boundary rules) preventing cross-module internal imports.
* **Single Deployment Unit:** A bug in one module requires redeploying the whole monolith.
  * *Mitigation:* High test coverage (>85%), blue-green zero-downtime rolling deployments on AWS ECS/EKS.
