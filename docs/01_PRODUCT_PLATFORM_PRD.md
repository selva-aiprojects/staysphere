# 01. Product / Platform PRD
# STAYSPHERE
### Hospitality Marketplace & Sovereign Journey Platform
**Document Version:** 3.5  
**Company:** Cognivectra / Cybelinx  
**Product:** StaySphere  
**Category:** Hospitality Marketplace & Journey Orchestration Platform  
**Target Ecosystem:** Guests • Hotels & Resorts • Travel & Mobility Partners • Channel Partners • Operations  
**Core Brand Promise:** *Stay. Move. Experience. Resolve. We’ve Got You Covered.*  

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Strategic Positioning & HostSphere Synergy](#2-strategic-positioning--hostsphere-synergy)
3. [Vision, Mission & Core Philosophy](#3-vision-mission--core-philosophy)
4. [Ecosystem Actors & Personas](#4-ecosystem-actors--personas)
5. [End-to-End Guest & Partner Journeys](#5-end-to-end-guest--partner-journeys)
6. [Core Functional Modules](#6-core-functional-modules)
   - 6.1 [Property Marketplace & Master Directory (STAY)](#61-property-marketplace--master-directory-stay)
   - 6.2 [Travel Desk & Mobility Marketplace (MOVE)](#62-travel-desk--mobility-marketplace-move)
   - 6.3 [Bespoke Excursions Marketplace (EXPERIENCE)](#63-bespoke-excursions-marketplace-experience)
   - 6.4 [Resolution Desk & SLA Engine (RESOLVE)](#64-resolution-desk--sla-engine-resolve)
   - 6.5 [Operations Control Tower & 360° Feedback](#65-operations-control-tower--360-feedback)
   - 6.6 [Trust, Safety & Marketplace Ranking](#66-trust-safety--marketplace-ranking)
   - 6.7 [Finance, Escrow & Settlement Engine](#67-finance-escrow--settlement-engine)
7. [Technical Architecture & Integrations](#7-technical-architecture--integrations)
8. [Phased Implementation Roadmap](#8-phased-implementation-roadmap)
9. [Metrics & Success Criteria](#9-metrics--success-criteria)

---

## 1. Executive Summary

**StaySphere** is a customer-centric journey orchestration platform connecting **Guests, Hotels, Mobility Operators, and Channel Partners** through a unified, trusted platform. 

StaySphere is not designed to replace a hotel's internal Property Management System (PMS), nor is it simply another standard Online Travel Agency (OTA). Rather, it redefines the hospitality experience by managing the complete guest journey lifecycle:
```
Better Booking + Coupled Coordination + Better In-Stay Service + Proactive 15-Min Resolution
```

### Core Value Proposition by Participant
* **Guest:** Discover and book verified accommodations coupled with flight-synchronized airport transfers, curated excursions, digital NFC room keys, and a guaranteed 15-minute resolution SLA.
* **Hotel Partner:** Capture high-intent, qualified bookings, maintain strict rate parity, automate payouts within 2 hours of check-in, and streamline guest arrivals without blind front desk queues.
* **Travel Partner:** Access predictable trip demand with transparent, automated escrow disbursements and real-time aviation telemetry synchronization.
* **Channel Partner (B2B):** Execute atomic 3-in-1 bookings (Stay + Transit + Tour) via REST APIs with guaranteed 12%–15% commission settlement.
* **StaySphere Platform:** Act as the single orchestrator of the end-to-end journey, taking accountability whenever issues arise.

---

## 2. Strategic Positioning & HostSphere Synergy

Cybelinx maintains a dual-product hospitality ecosystem where **HostSphere** and **StaySphere** serve complementary, non-overlapping functions:

```
┌─────────────────────────────────────────────────────────┐
│                        CYBELINX                         │
└────────────────────────────┬────────────────────────────┘
                             │
        ┌────────────────────┴────────────────────┐
        ▼                                         ▼
┌───────────────────────────┐         ┌───────────────────────────┐
│        HOSTSPHERE         │         │        STAYSPHERE         │
│  B2B Operations Platform  │         │ B2C/B2B2C Journey Market  │
│  "Run your property"      │         │ "Own your journey"        │
└───────────────────────────┘         └───────────────────────────┘
```

| Dimension | HostSphere (B2B) | StaySphere (B2C / B2B2C) |
| :--- | :--- | :--- |
| **Primary Audience** | Hotel Operators & Internal Staff | Guests, Hotels, Travel & Channel Partners |
| **Strategic Focus** | Internal Property Operations | Complete Customer Journey Lifecycle |
| **Core Mantra** | *"Run your property."* | *"Own your journey."* |
| **Reservations** | Manages room allocations & folio billing | Acquires demand & facilitates multi-party booking |
| **Transportation** | Non-core / External | **Core first-class module (Travel Desk)** |
| **Channel Partners** | Non-core | **Core acquisition & distribution engine** |
| **Issue Resolution** | Internal department ticketing | **Cross-party SLA-driven Resolution Desk** |
| **Financial Settlement** | Operational ledger & folio billing | **Multi-vendor milestone escrow engine** |

---

## 3. Vision, Mission & Core Philosophy

### Vision
> *To become the world's most trusted sovereign journey platform — seamlessly coupling luxury stays, executive mobility, and curated experiences with proactive resolution.*

### Mission
> *To make luxury travel transactions and journeys effortless, transparent, responsive, and mutually rewarding for every guest, property operator, driver, and channel partner.*

---

## 4. Core Ecosystem Pillars: Stay, Move, Experience, Resolve

```
                     STAYSPHERE JOURNEY ECOSYSTEM
 ┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
 │      STAY       │      MOVE       │   EXPERIENCE    │     RESOLVE     │
 ├─────────────────┼─────────────────┼─────────────────┼─────────────────┤
 │ Boutique Hotels │ Executive Cars  │ Speedboats      │ 15-Min SLA      │
 │ Luxury Resorts  │ 4x4 Mountain    │ Solar Boats     │ Auto-Escrow     │
 │ Clifftop Villas │ Airport Radar   │ Heritage Tours  │ RM Intercom     │
 │ Serviced Suites │ Zero-Delay GPS  │ Snow Safaris    │ Sentinel Alert  │
 └─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

---

## 5. Metrics & Key Performance Indicators

- **Successful Journey Rate (SJR)**: Target $\ge 97.5\%$
- **Average SLA Resolution Time**: $<15.0$ minutes
- **Hotel Partner Trust Score**: $\ge 98.0\%$
- **Channel Partner NPS**: $\ge +70$
- **On-Time Chauffeur Dispatch Rate**: $\ge 99.0\%$
