# ADR-005: Real-Time Driver Telemetry & Geolocation Architecture

**Status:** Accepted  
**Date:** 2026-09-07  
**Deciders:** Lead Architect, Mobility & Real-Time Engineering  

---

## 1. Context & Problem Statement

The **Travel Desk (MOVE)** module coordinates on-demand airport transfers, full-day cabs, and outstation rides. 

Key technical requirements:
* Ingest high-frequency GPS pings from thousands of active drivers every 3–5 seconds.
* Low-latency (< 50ms) lookup of nearest available drivers to a guest's pickup point (`GEOSEARCH`).
* Broadcast live vehicle location updates to the Guest's `My Trip` map and Ops Control Tower.
* Avoid writing raw 3-second coordinate pings to the primary PostgreSQL database, which would cause severe I/O exhaustion.

## 2. Decision

We choose a **Decoupled Real-Time Telemetry Pipeline** utilizing **Go (Golang)** for WebSocket ingestion and **Redis 7** for geospatial memory indexing.

```
┌─────────────────────────────────────────────────────────────────┐
│              DRIVER TELEMETRY INGESTION PIPELINE                │
├─────────────────────────────────────────────────────────────────┤
│ 1. Driver App emits GPS {lat, lng, bearing, speed, driver_id}   │
│    via WebSocket to Go Ingestion Service                        │
│                                                                 │
│ 2. Go Ingestion Service writes to Redis:                        │
│    • GEOADD live_drivers <lng> <lat> <driver_id>                │
│    • HSET driver_meta:<id> {heading, status, vehicle_type}      │
│    • PUBLISH trip:<trip_id>:location {lat, lng, eta}            │
│                                                                 │
│ 3. Guest & Ops WebSockets receive published updates from Redis  │
│                                                                 │
│ 4. Trip Completed Event:                                        │
│    • Full route polyline compressed into PostGIS LINESTRING     │
│    • Saved to PostgreSQL for historical route verification      │
└─────────────────────────────────────────────────────────────────┘
```

## 3. Technology Choices

| Role | Technology | Rationale |
| :--- | :--- | :--- |
| **Ingestion Gateway** | Go (Golang) + Gorilla / FastWS | High concurrency, handles 50,000+ persistent WS connections with minimal memory footprint (~15MB RAM). |
| **Live Spatial Index**| Redis 7 `GEO` commands | Sub-millisecond `GEOSEARCH` within radius; native TTL expiration if driver goes offline. |
| **Historical Route** | PostgreSQL 16 + PostGIS | Encoded polyline stored once at trip completion for audit & invoice generation. |

## 4. Consequences

### Positive Consequences
* Primary PostgreSQL instance is completely shielded from high-frequency write churn.
* Guests experience ultra-smooth vehicle movement animations on mobile maps.
* Driver dispatch matching algorithm executes in under 10ms.

### Negative Consequences / Risks
* Introduces a Go service alongside the main TypeScript backend.
  * *Mitigation:* The Go service is intentionally stateless, small (< 300 lines of code), and communicates purely via Redis.
