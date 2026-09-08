# ADR-002: Selection of PostgreSQL 16 + PostGIS for Data Tier

**Status:** Accepted  
**Date:** 2026-09-07  
**Deciders:** Lead Architect, Data Engineering Team  

---

## 1. Context & Problem Statement

StaySphere requires a primary data storage engine capable of supporting:
1. Complex relational models (properties, room tiers, seasonal tariffs, multi-party bookings, customer folios).
2. Strict ACID-compliant financial accounting with zero tolerance for dirty reads or phantom records.
3. High-performance geospatial searching (finding hotels near a landmark, calculating transit pickup zones, bounding-box queries).
4. Semi-structured metadata for room amenities, service requests, and third-party webhook payloads.

## 2. Decision Drivers

* **Geospatial Capabilities:** Native, high-performance spatial indexing (R-Tree / GiST).
* **Financial Integrity:** Full serializable and repeatable-read transaction isolation.
* **JSON/Document Support:** Native JSONB indexing for custom partner attributes.
* **Ecosystem Maturity:** Robust tooling, connection pooling (PgBouncer), point-in-time recovery (PITR), and wide ORM support.

## 3. Considered Options

1. **Option 1: Polyglot Database Cluster** (MongoDB for properties/catalog + MySQL for transactions + Neo4j/Spatial for maps).
2. **Option 2: Pure NoSQL (DynamoDB / MongoDB)**.
3. **Option 3: PostgreSQL 16+ with PostGIS Extension [Selected]**.

## 4. Decision

We choose **Option 3: PostgreSQL 16+ with PostGIS**.

PostgreSQL will serve as the single source of truth for all transactional, relational, and spatial data across StaySphere.

```
┌─────────────────────────────────────────────────────────────┐
│                      POSTGRESQL 16                          │
├──────────────────────────────┬──────────────────────────────┤
│  PostGIS Extension           │  pgcrypto & RLS              │
│  • ST_DWithin (Search Hotel) │  • Multi-tenant partner data │
│  • ST_MakeLine (Trip GPS)    │  • PCI token encryption      │
├──────────────────────────────┴──────────────────────────────┤
│  JSONB Indexing (GIN)        │  Double-Entry Ledger Engine  │
│  • Dynamic Room Amenities    │  • Strict ACID Ledger Tables │
└─────────────────────────────────────────────────────────────┘
```

## 5. Key Implementation Guidelines

* **Geospatial Indexing:** All property coordinates and travel pickup zones will use `geography(Point, 4326)` with `GiST` spatial indexes.
* **Runtime Query Builder:** Use **Kysely** for type-safe SQL query generation without ORM overhead; use **Prisma** exclusively for migration management.
* **Connection Management:** Route database traffic through **PgBouncer** / AWS RDS Proxy to support high concurrency.

## 6. Consequences

### Positive Consequences
* Eliminates multi-database synchronization lag and distributed data consistency bugs.
* Exceptional query flexibility with window functions, Common Table Expressions (CTEs), and spatial aggregations.
* Broad developer familiarity and battle-tested reliability.

### Negative Consequences / Risks
* Database scaling is primarily vertical (scale-up) until read-replicas or sharding are introduced.
  * *Mitigation:* Offload search caching to Redis and read-heavy analytics to PostgreSQL read-replicas.
