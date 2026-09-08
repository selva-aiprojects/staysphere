# 03. Property Partner Manual
**StaySphere Sovereign Journey Network** | **Classification:** External Partner Confidential  
**Target Audience:** General Managers, Revenue Directors, Front Office Leads, Villa Estate Hosts  
**Properties Covered:** Luxury Boutique Hotels, Beachfront Resorts, Heritage Palaces, Clifftop Private Villas, Serviced Apartments, Alpine Chalets

---

## 1. Executive Overview & Partner Value Proposition

Welcome to the **StaySphere Sovereign Journey Network**. Unlike legacy Online Travel Agencies (OTAs) that commoditize inventory and disconnect accommodation from guest logistics, StaySphere is a **Unified Journey Orchestration Platform**. 

As a StaySphere Property Partner, your property is presented not as an isolated room, but as the premier centerpiece of an orchestrated, flight-synchronized travel itinerary.

### Key Benefits for Property Partners:
- **Milestone-Protected Payments**: Net room earnings are placed into dedicated escrow custody upon guest booking and automatically disbursed to your bank account within **2 hours post-guest check-in**.
- **Rate Parity & Zero Commission Gouging**: Guaranteed strict rate parity enforcement with fair, transparent 10–12% platform fees (compared to 18–25% on legacy OTAs).
- **Synchronized Guest Intake**: Direct telemetry on guest flight landings, airport chauffeur pickup, and estimated arrival times—eliminating blind check-in queues.
- **Dual PMS Integration**: Native two-way synchronization with **HostSphere PMS** alongside zero-friction connectors for Oracle Opera, Cloudbeds, and eZee Absolute.
- **Dedicated Relationship Manager (RM)**: Direct senior human contact for multi-room buyouts, VIP retinue requests, and instant dispute resolution.

```
       [ Guest Books Journey ]
                  │
                  ▼
   [ Milestone Escrow Custody Locked ]
                  │
    ┌─────────────┴─────────────┐
    ▼                           ▼
[ Flight Telemetry Synced ] [ PMS Inventory Locked ]
    │                           │
    └─────────────┬─────────────┘
                  ▼
     [ Chauffeur Drops Guest at Lobby ]
                  │
                  ▼
       [ Guest Checks In / Taps NFC ]
                  │
                  ▼
 [ Automated Payout Released to Hotel (2 Hrs) ]
```

---

## 2. Property Onboarding & 84-Point Quality Audit

Every estate listed on StaySphere must undergo our rigorous onboarding protocol before going live:

### 2.1 The 84-Point Sovereign Quality Audit
Our regional Hospitality Quality Leads inspect:
1. **Hygiene & Sanitation (24 Checks)**: Pre-arrival deep sterilization, linen thread-count verification, bathroom water pressure & temperature consistency.
2. **Climate & Ambiance (18 Checks)**: HVAC calibration (pre-cooled to 22°C before guest arrival), ambient lighting presets, sound insulation.
3. **Safety & Privacy (20 Checks)**: Smart digital lock integrity (AES-256 / BLE pass support), 24/7 security perimeter, discrete staff protocols.
4. **Culinary & Service Standards (22 Checks)**: High tea preparation, in-suite dining turnaround times (<25 minutes), dietary customization readiness.

### 2.2 Property Master Cataloging
Upon passing the audit, your property profile is established with:
- **Unique Property Code**: e.g., `SS-GOA-AZURA`, `SS-UDR-MEWAR`.
- **Room/Suite Classifications**: Accurate square footage, maximum occupancy, private pool specifications, and included amenities.
- **Designated Relationship Manager (RM)** assigned to your property 24/7.

---

## 3. HostSphere PMS & External PMS Integration

StaySphere supports both direct native synchronization and external PMS bridges:

### 3.1 HostSphere Native Two-Way Synchronization
If your property utilizes **HostSphere PMS**:
- **Availability Sync**: Instant real-time room block lock across all channels.
- **Guest Profiles**: VIP preferences, dietary restrictions, and flight numbers automatically populate in your reservation cards.
- **Digital NFC Pass Key**: Pre-arms the room's Bluetooth/NFC lock 1 hour prior to guest arrival.

### 3.2 External PMS Integration (Opera / Cloudbeds / eZee)
If you operate an independent PMS:
- **API Webhooks**: StaySphere pushes reservations directly to your PMS via REST webhooks.
- **Fallback Safe-Lock**: If your external PMS connection experiences downtime, StaySphere buffers inventory changes and notifies your front desk via SMS and email.

---

## 4. Daily Front Desk Operations & Guest Intake

### 4.1 Pre-Arrival Telemetry Screen
Log in to the **StaySphere Control Tower** under `4. Stay Bookings` to monitor arriving guests:

| Telemetry Column | Meaning | Front Desk Action Required |
| :--- | :--- | :--- |
| **Flight Status** | Live flight tracker (e.g., `6E-204 Landed`) | Alert housekeeping that guest has touched down. |
| **Chauffeur ETA** | GPS live radar (e.g., `Maybach ETA 14 Mins`) | Prepare welcome high tea and station concierge at portico. |
| **Digital Keycard** | `ARMED & READY` | Confirm suite door lock is active. No plastic key encoding needed. |
| **VIP Retinue Tier** | `Sovereign Platinum` / `Diplomatic Pass` | Assign dedicated butler to meet guest at arrival bay. |

### 4.2 Seamless Check-in Workflow
1. **Guest Arrival**: Guest steps out of the StaySphere chauffeur vehicle.
2. **Identity Verification**: Guest presents their StaySphere Digital Pass on mobile (or government ID).
3. **Room Entry**: Guest taps their mobile pass against the suite lock, or front desk provides a physical backup keycard.
4. **Mark as Checked-In**: Click `Mark Checked-In` on your front desk dashboard to trigger the automated payout countdown clock.

---

## 5. Financial Settlement & Escrow Payouts

### 5.1 Escrow Payout Timeline
StaySphere eliminates 30–60 day OTA payment lag:

```
[ Day 0: Booking Confirmed ] ──► Funds held in StaySphere Sovereign Escrow Vault
[ Day of Arrival: 14:00 ]   ──► Guest Checks In
[ Day of Arrival: 16:00 ]   ──► Automated Payout Release Triggered (2 hrs post check-in)
[ Day of Arrival: 16:05 ]   ──► Direct NEFT/RTGS Settlement to Hotel Bank Account
```

### 5.2 Banking & Invoice Reconciliation
- **Platform Fee**: Strictly 10%–12% deducted at source.
- **Tax Invoices**: GST-compliant tax invoices with breakdown of room rate, luxury tax, and service fee are generated automatically and available under `Finance & Receipts`.

---

## 6. Proactive Resolution & Collaborative Tickets

If an operational issue arises during a guest stay:
1. **Open a Collaborative Ticket**: Click `Partner Support & Tickets` in your dashboard.
2. **Select Priority**:
   - `P0_CRITICAL` (15-min SLA response): AC breakdown, suite mismatch, medical emergency.
   - `P1_HIGH` (30-min SLA response): Early check-in authorization, extra bed request.
   - `P2_STANDARD` (60-min SLA response): Special dining menu approval, billing queries.
3. **Direct RM Collaboration**: Your assigned RM joins the ticket chat in real time to coordinate chauffeur adjustments, compensation credits, or guest relocation if required.

---

## 7. 360° Reputation & Feedback System

- **Guest Ratings**: Guests rate stay quality, hygiene, and hospitality on a 1–5 star scale upon departure.
- **Hotel Partner Voice**: Property managers can also review guest conduct and platform support directly in the dashboard.
- **Trust Score Maintenance**: Properties maintaining a Trust Score above **98.0%** receive the **"Sovereign Premier"** badge and prioritized recommendation in search rankings.

---

**Partner Support Desk:**  
- **24/7 Operations Hotline:** `+91 1800 890 4001`  
- **Email:** `partnerships@staysphere.io`  
- **Portal:** `https://staysphere-control-tower.vercel.app`
