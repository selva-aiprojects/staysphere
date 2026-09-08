# ADR-004: Multi-Client Frontend Strategy (Next.js, Vite, React Native Expo)

**Status:** Accepted  
**Date:** 2026-09-07  
**Deciders:** Lead Frontend Architect, UI/UX Lead  

---

## 1. Context & Problem Statement

StaySphere serves heterogeneous client personas with vastly distinct technical requirements:
1. **Public Guests:** Require maximum search engine discoverability (SEO), lightning-fast Initial Page Load (< 1.2s), dynamic OpenGraph tags, and mobile web responsiveness.
2. **Hotel & Channel Partners:** Require dense, desktop-first extranets with instant grid manipulation, real-time WebSocket room calendars, and zero SEO requirements.
3. **Control Tower & Resolution Desk Agents:** Require high-density desktop dashboards with live audio chimes, split-screen ticket comparisons, and rapid keyboard shortcuts.
4. **Mobile Users (Guests & Drivers):** Require native mobile hardware capabilities (background GPS tracking for drivers, push notifications, offline vouchers).

A "one-size-fits-all" framework fails either SEO requirements (pure SPAs) or developer productivity / real-time data handling (heavy SSR overhead for internal dashboards).

## 2. Decision

We choose a **Heterogeneous React-Based Frontend Strategy** managed within a Turborepo monorepo:

```
┌─────────────────────────────────────────────────────────────┐
│                 STAYSPHERE CLIENT ECOSYSTEM                 │
├──────────────────────┬──────────────────────────────────────┤
│ Application          │ Framework & Rationale                │
├──────────────────────┼──────────────────────────────────────┤
│ Guest Web Portal     │ Next.js 15 (React 19, App Router)    │
│                      │ • Server-Side Rendering (SSR) & ISR  │
│                      │ • SEO & Dynamic Social Meta Tags     │
├──────────────────────┼──────────────────────────────────────┤
│ Hotel & Travel       │ React 19 + Vite + TanStack Query     │
│ Extranet Portals     │ • Ultra-fast SPA bundle & load       │
│                      │ • Direct WebSocket subscriptions     │
├──────────────────────┼──────────────────────────────────────┤
│ Ops Control Tower    │ React 19 + Vite + Tailwind           │
│ & Resolution Desk    │ • High-performance virtualized tables│
│                      │ • Live WebSocket triage feeds        │
├──────────────────────┼──────────────────────────────────────┤
│ Mobile App           │ React Native + Expo (TypeScript)     │
│ (Guest + Driver)     │ • Background Geolocation Services    │
│                      │ • Single shared cross-platform core  │
└──────────────────────┴──────────────────────────────────────┘
```

## 3. Shared Packages & Design System

To eliminate duplication across these 5 applications, the following code is shared in `packages/`:
* `packages/ui-kit`: Shared Tailwind tokens, color palette, buttons, modals, and typography components.
* `packages/domain-types`: TypeScript interfaces for Booking, Room, Driver, Ticket, and Ledger entities.
* `packages/validation-schemas`: Shared Zod validation schemas for all form inputs.

## 4. Consequences

### Positive Consequences
* **Optimal SEO for Guest Portal:** Full pre-rendering ensures search engines index properties and destinations effectively.
* **Peak Performance for Portals:** Hotel managers and Ops agents experience snappy, instantaneous client-side navigation without round-trip SSR overhead.
* **Shared Code Velocity:** Up to 70% of business types and validation logic are shared between Web and Mobile applications.

### Negative Consequences / Risks
* Multiple build systems (Next.js vs Vite vs Metro for React Native).
  * *Mitigation:* Centralized configuration and build caching via Turborepo.
