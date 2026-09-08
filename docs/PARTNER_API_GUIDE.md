# StaySphere Partner Integration & API Reference Guide

StaySphere provides enterprise REST APIs and real-time Webhooks for **Hotel Property Partners (PMS/Channel Managers)**, **Travel & Fleet Mobility Desks (GPS Telematics & Flight Radars)**, and **Channel Partners (B2B Travel Desks & Corporate Concierges)**.

---

## 🌐 1. API Architecture & Base URLs

| Environment | Base URL | Swagger / OpenAPI Docs |
| :--- | :--- | :--- |
| **Local Development** | `http://localhost:4000/api/v1` | [http://localhost:4000/docs](http://localhost:4000/docs) |
| **Production API** | `https://api.staysphere.io/api/v1` | `https://api.staysphere.io/docs` |
| **Next.js Edge API** | `http://localhost:3000/api` | Direct JSON endpoints |

### 🔑 Authentication
All partner API requests require a Bearer token or Partner API Key passed in the `Authorization` header:
```http
Authorization: Bearer ss_live_partner_key_9941a8b
Content-Type: application/json
```

---

## 🏨 2. Property Partner & PMS Channel Manager APIs

### A. Sync Inventory & Key Allocation
Sync available suite inventory directly from your Property Management System (Opera, Cloudbeds, Sirvoy, etc.):
```http
POST /api/v1/stay/properties/{propertyId}/inventory-sync
```
**Request Body:**
```json
{
  "roomTypeId": "rt-horizon-villa-goa",
  "allocatedKeys": 12,
  "blockedKeysForDirectWalkIn": 2,
  "dateRange": {
    "from": "2026-09-08",
    "to": "2026-10-31"
  }
}
```

### B. Rate Parity & Dynamic Nightly Rates
Push nightly rates and ensure 100% rate parity across direct and OTA channels:
```http
POST /api/v1/stay/properties/{propertyId}/rate-parity-sync
```
**Request Body:**
```json
{
  "roomTypeId": "rt-horizon-villa-goa",
  "baseNightlyRate": 42000,
  "currency": "INR",
  "rateParityConfirmed": true,
  "otaSyncEnabled": true
}
```

### C. Raise Operational Support Ticket to RM
Directly raise a ticket from your hotel management desk to your assigned StaySphere Relationship Manager:
```http
POST /api/v1/resolution/tickets
```
**Request Body:**
```json
{
  "category": "PROPERTY_HOST",
  "priority": "P0_CRITICAL",
  "subject": "VIP Early Check-In & Helipad Prep for Malhotra Family",
  "description": "Guest landing early on 6E-204. Need Maybach dispatch and Villa 101 lock pre-armed.",
  "assignedAgentRole": "RELATIONSHIP_MANAGER"
}
```

---

## 🚗 3. Travel Desk & Fleet Telematics APIs

### A. Live GPS Telematics & Driver Status
Send vehicle telemetry and trip progress updates:
```http
POST /api/v1/move/telematics/status
```
**Request Body:**
```json
{
  "bookingReference": "TR-SS-2026-8811",
  "driverId": "drv-gurpreet-singh",
  "licensePlate": "GA-03-MB-0001",
  "telematicsStatus": "BOARDING_TERMINAL",
  "currentCoordinates": {
    "latitude": 15.7483,
    "longitude": 73.8654
  },
  "etaMinutes": 24,
  "flightCode": "6E-204"
}
```

### B. Confirm Arrival & Claim Escrow Payout
Trigger instant release of the per-trip transit fee upon guest arrival at the villa:
```http
POST /api/v1/move/trips/{tripId}/complete-and-release
```

---

## 🤝 4. Channel Partners & Corporate Travel Desk APIs

### A. Create B2B VIP Reservation (Corporate Escrow)
Corporate travel desks (Amex Centurion, Quintessentially, McKinsey) can instantly book verified suites:
```http
POST /api/v1/stay/bookings/channel-partner
```
**Request Body:**
```json
{
  "channelPartnerId": "chan-amex-centurion",
  "propertyId": "prop-maharaja-pichola",
  "roomTypeId": "rt-royal-suite",
  "guestName": "Sunil Mittal Retinue",
  "checkInDate": "2026-09-14",
  "checkOutDate": "2026-09-18",
  "roomsCount": 4,
  "totalAmount": 480000,
  "commissionSplitPct": 15.0,
  "settlementMethod": "CORPORATE_ESCROW_CREDIT"
}
```

### B. Live Commission Ledger & Withdrawal
```http
GET /api/v1/finance/channel-partners/{partnerId}/commissions
POST /api/v1/finance/channel-partners/{partnerId}/withdraw-commission
```

---

## 🔔 5. Real-Time Webhooks

Subscribe your systems to instant event notifications:

| Webhook Event | Triggered When | Target Systems |
| :--- | :--- | :--- |
| `booking.confirmed` | High-net-worth guest confirms reservation | Hotel PMS & Frontdesk |
| `flight.radar.landed` | Guest flight touches down at airport | Maybach Chauffeur & Travel Desk |
| `escrow.released` | 2-hour post-check-in timer expires | Hotel Owner Bank & Finance ERP |
| `ticket.action_taken` | RM approves early check-in or escrow advance | Partner Portal & Mobile App |
