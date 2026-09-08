# ADR-003: Temporal.io / BullMQ for Deterministic SLA & Escalation Engine

**Status:** Accepted  
**Date:** 2026-09-07  
**Deciders:** Lead Architect, Operations Engineering  

---

## 1. Context & Problem Statement

StaySphere differentiates itself through its **Resolution Desk & SLA Engine** (e.g., Driver No-Show must escalate in 10 minutes, Unacknowledged Housekeeping in 20 minutes, Room Denied in 15 minutes). 

Traditional asynchronous approaches (such as `setTimeout` in memory or simple database polling cron jobs) suffer from critical failure modes:
* In-flight timers are lost when server containers restart or crash during deployments.
* Cron polling introduces latency and puts excessive read load on transactional databases.
* Complex multi-step compensations (e.g., auto-cancel ride, issue ₹500 credit, notify backup fleet) turn into brittle, unmaintainable callback spaghetti.

## 2. Decision Drivers

* **Durable Execution:** Workflows and SLA timers must survive system crashes and resume precisely where they left off.
* **Deterministic Escalation:** Guaranteed triggering of escalations within milliseconds of SLA breach.
* **State Machine Visibility:** Full observability into active timers, step histories, and retry policies for the Ops Control Tower.

## 3. Considered Options

1. **Option 1: Database Polling Cron Job** (Run a scheduled query every minute looking for overdue tickets).
2. **Option 2: BullMQ (Redis-backed Delayed Queues)**.
3. **Option 3: Temporal.io (Durable Workflow Engine) [Selected for Phase 2; BullMQ for MVP]**.

## 4. Decision

We choose **BullMQ for Phase 1 MVP**, transitioning to **Temporal.io for Phase 2 (RESOLVE)**.

### Architectural Blueprint:
```
┌─────────────────────────────────────────────────────────────┐
│                    SLA WORKFLOW ENGINE                      │
├─────────────────────────────────────────────────────────────┤
│ 1. Ticket Created Event                                     │
│    └─> Dispatches SLA Timer Workflow (Category SLA = 10 min) │
│                                                             │
│ 2. Event Listener (Awaiting Signals):                       │
│    ├── IF 'PartnerAccepted' Signal -> Workflow Completes OK │
│    └── IF Timer Expires (10 min elapsed)                    │
│        ├── Step A: Mark Ticket 'ESCALATED'                  │
│        ├── Step B: Push WebSocket Alert to Control Tower    │
│        ├── Step C: Dispatch WhatsApp Alert to Area Manager  │
│        └── Step D: Trigger Automated Driver Reassignment    │
└─────────────────────────────────────────────────────────────┘
```

## 5. Consequences

### Positive Consequences
* **Zero Lost Escalations:** Every single customer ticket is backed by a durable persistent state machine.
* **Code as Workflows:** Complex multi-day escalation workflows are written in standard imperative TypeScript code with automatic retries.
* **Audit Trail:** Every timer firing, step transition, and partner acknowledgement is automatically logged with timestamps for dispute resolution.

### Negative Consequences / Risks
* Additional infrastructure component to operate (Redis for BullMQ / Temporal Server).
  * *Mitigation:* Use managed Redis (AWS ElastiCache / Upstash) and Temporal Cloud / self-hosted Docker container in early stages.
