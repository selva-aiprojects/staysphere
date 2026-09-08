# 09. API & Developer Integration Guide
**StaySphere Sovereign REST API** | **Version:** v1.0 (Build 2026.09)  
**Base URL:** `https://staysphere-api.vercel.app/api/v1` (Production) / `http://localhost:3002/api/v1` (Local Dev)  
**Protocol:** HTTPS / JSON / Webhook Telemetry

---

## 1. Authentication & Security

All API requests must include an active API Key issued via the StaySphere Control Tower (`Workspace 7: B2B Channel Network`).

```http
Authorization: Bearer ss_live_partner_xxxxxxxxxxxxxxxxxxxxxxxx
Content-Type: application/json
```

---

## 2. Core REST Endpoints

### 2.1 Properties & Master Inventory

#### `GET /api/v1/properties`
Retrieve a paginated list of verified estates with real-time rate parity pricing.

**Query Parameters:**
- `city` (string, optional): e.g. `Goa`, `Udaipur`, `Manali`, `Mumbai`.
- `category` (string, optional): `VILLA`, `HERITAGE_PALACE`, `RESORT`, `SERVICED_SUITE`, `CHALET`.
- `checkIn` (ISO Date, required): `2026-09-12`.
- `nights` (integer, required): `3`.

**Response (200 OK):**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "id": "prop-mst-01",
      "code": "SS-GOA-AZURA",
      "name": "Azura Cliff Luxury Estates & Private Ocean Villas",
      "destinationCity": "Goa",
      "starRating": 4.96,
      "basePricePerNight": 42000,
      "currency": "INR",
      "b2bCommissionPercent": 15.0,
      "netPayablePerNight": 35700,
      "hostSphereSync": "CONNECTED",
      "roomSuites": [
        {
          "id": "rm-az-1",
          "name": "Presidential Ocean Panoramic Suite",
          "maxGuests": 4,
          "inventoryAvailable": 3,
          "basePricePerNight": 42000
        }
      ]
    }
  ]
}
```

---

### 2.2 Atomic Journey Booking API

#### `POST /api/v1/journeys/create`
Executes an atomic 3-in-1 booking combining a Stay reservation, Flight-Synced Chauffeur Transfer, and optional Curated Day Tours.

**Request Payload:**
```json
{
  "partnerAgencyId": "AGY-AMEX-CENTURION-01",
  "guest": {
    "fullName": "Vikram Malhotra",
    "email": "v.malhotra@corporate.com",
    "phone": "+919811122334",
    "vipTier": "SOVEREIGN_PLATINUM"
  },
  "stay": {
    "propertyId": "prop-mst-01",
    "suiteId": "rm-az-1",
    "checkInDate": "2026-09-12",
    "checkOutDate": "2026-09-15",
    "adults": 2,
    "specialRequests": "Pre-cool suite to 20°C, fresh papaya upon arrival"
  },
  "transit": {
    "mode": "ROUNDTRIP",
    "inboundFlightNumber": "6E-204",
    "vehicleCategory": "MERCEDES_MAYBACH_S680",
    "returnFlightNumber": "AI-678"
  },
  "sightseeingPackageIds": ["goa-boat"],
  "paymentOption": "B2B_ESCROW_INVOICE"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "journeyReference": "JN-SS-2026-9041",
  "status": "CONFIRMED",
  "escrowVaultAmount": 146160,
  "b2bCommissionEarned": 18900,
  "digitalKeyPass": {
    "lockArmed": true,
    "blePassToken": "aes256_vault_token_991823a",
    "validFrom": "2026-09-12T13:00:00Z",
    "validUntil": "2026-09-15T12:00:00Z"
  },
  "timelineStages": [
    { "stage": 1, "title": "Flight Telemetry Sync", "status": "SCHEDULED" },
    { "stage": 2, "title": "Airport Chauffeur Leg", "status": "ASSIGNED" },
    { "stage": 3, "title": "Suite Check-In", "status": "PREPARED" },
    { "stage": 4, "title": "Speedboat Safari", "status": "CONFIRMED" },
    { "stage": 5, "title": "Departure Transfer", "status": "SCHEDULED" }
  ]
}
```

---

### 2.3 Proactive Resolution & SLA Intercom

#### `POST /api/v1/journeys/:journeyRef/resolve`
Triggers an immediate SLA triage ticket for an active booking.

**Request Payload:**
```json
{
  "category": "TRANSIT_DELAY",
  "urgency": "URGENT_P1",
  "description": "Flight 6E-204 delayed by 40 minutes. Requesting chauffeur adjustment.",
  "requestedAction": "ADJUST_CHAUFFEUR_PICKUP"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "ticketId": "TKT-SLA-4892",
  "assignedRM": "Vikramaditya Singh",
  "slaMinutesRemaining": 15,
  "automatedActionTaken": "Chauffeur Gurpreet Singh pickup time adjusted to 14:45 PM automatically."
}
```

---

## 3. Webhook Event Notifications

StaySphere can broadcast events to your configured HTTPS webhook URL:

- `journey.flight_landed`: Triggered when guest aircraft touches down.
- `journey.chauffeur_arrived`: Triggered when vehicle arrives at pickup location.
- `journey.guest_checked_in`: Triggered when guest enters suite (signals payout release).
- `escrow.payout_disbursed`: Settlement advice sent to property/partner.
- `sla.incident_raised`: Operational alert dispatched to RM team.
