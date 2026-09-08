# StaySphere Channel Partners (B2B) Integration & User Manual
**Document Version:** 3.5 | **Classification:** B2B Commercial & Technical Confidential  
**Target Audience:** Corporate Travel Managers, Luxury Concierge Desks, B2B Travel Agencies, Platinum/Black Card Services (e.g., Amex Centurion)  
**Access Modalities:** Partner Web Console, REST API Endpoints, Webhook Telemetry, White-Label Itinerary Bridges

---

## 1. Executive Summary: Why Partner with StaySphere?

StaySphere is the premier B2B travel infrastructure for high-net-worth individual (HNWI) and corporate travel bookings in India. We eliminate the friction of booking hotels and transport separately through disconnected vendors.

### Core B2B Advantages:
- **Atomic Booking API**: Bundle a 5-star clifftop villa, private airport Maybach transit, and chartered speedboat tour in a single API call.
- **Guaranteed Rate Parity**: Live direct-connect inventory with zero markup discrepancies against hotel direct rates.
- **12%–15% Instant B2B Commission**: Automatic net-rate settlement or weekly commission payouts directly credited to your corporate agency account.
- **Whitelabel Itinerary Generator**: Download branded, luxury PDF/web itineraries with your agency logo and dedicated RM contact details.
- **Dedicated Concierge Liaison**: Senior Relationship Managers on standby for high-profile buyouts, diplomatic security retinue, and custom dining setups.

```
+-------------------------------------------------------------------------+
|                       StaySphere Partner REST API                       |
+-------------------------------------------------------------------------+
                                     │
      ┌──────────────────────────────┼──────────────────────────────┐
      ▼                              ▼                              ▼
 [ GET /properties ]         [ POST /journeys ]          [ GET /commissions ]
 Live Suite Inventory        Atomic 3-in-1 Booking        Real-Time B2B Ledger
 & Verified Rates            (Stay + Transit + Tour)      & Instant Payouts
```

---

## 2. Commercial Terms & Commission Structure

| Tier Category | Monthly Volume | Commission Rate | Payout Schedule | Key Privileges |
| :--- | :--- | :--- | :--- | :--- |
| **Silver Partner** | Up to ₹10 Lakhs | **10.0%** | Bi-weekly (1st & 15th) | Standard API Access & Email Support |
| **Gold Prestige** | ₹10L – ₹50 Lakhs | **12.5%** | Weekly (Every Monday) | Dedicated RM + Complimentary Chauffeur Upgrades |
| **Centurion / Black Tier** | ₹50 Lakhs+ | **15.0%** | Instant Escrow Release | Executive VIP Concierge Desk + Custom Helipad Transfers |

---

## 3. Booking Channels & Workflows

Channel Partners can execute bookings through two primary methods:

### Method A: The StaySphere Partner Web Console
1. Log in to the **StaySphere Partner Console** (`https://staysphere-control-tower.vercel.app`).
2. Navigate to **`7. B2B Channel Network`**.
3. Search for available estates by destination (Goa, Udaipur, Manali, Mumbai).
4. Select room category, select vehicle tier (Mercedes-Maybach, Defender 4x4, VIP EV), and add optional curated sightseeing.
5. Enter guest details and payment method (Corporate Credit Card / Agency Credit Line / Direct Wire).
6. Click **`Generate B2B Journey Voucher`** to download a customized, co-branded guest itinerary.

### Method B: REST API Integration
For high-volume OTAs, TMCs, and banking concierge platforms:

#### 1. Authentication
Include your Bearer API Key in the HTTP header:
```http
Authorization: Bearer ss_live_partner_key_xxxxxxxxxxxxx
Content-Type: application/json
```

#### 2. Search Available Properties & Rates
```http
GET /api/v1/partners/properties?city=Goa&checkIn=2026-09-12&nights=3
```
*Sample Response:*
```json
{
  "success": true,
  "data": [
    {
      "propertyId": "prop-mst-01",
      "name": "Azura Cliff Luxury Estates",
      "category": "VILLA",
      "basePricePerNight": 42000,
      "currency": "INR",
      "b2bCommissionPct": 15.0,
      "netPayablePerNight": 35700,
      "hostSphereSyncStatus": "LIVE_SYNCED",
      "availableSuites": [
        { "id": "rm-az-1", "name": "Presidential Ocean Panoramic Suite", "inventory": 4 }
      ]
    }
  ]
}
```

#### 3. Atomic Journey Creation (Stay + Transit + Experience)
```http
POST /api/v1/partners/journeys/create
```
*Request Payload:*
```json
{
  "partnerAgencyId": "AGY-AMEX-CENTURION",
  "guest": {
    "name": "Vikram Malhotra",
    "email": "v.malhotra@corporate.com",
    "phone": "+919811122334"
  },
  "stay": {
    "propertyId": "prop-mst-01",
    "suiteId": "rm-az-1",
    "checkInDate": "2026-09-12",
    "nights": 3
  },
  "transit": {
    "flightNumber": "6E-204",
    "vehicleCategory": "MERCEDES_MAYBACH",
    "mode": "ROUNDTRIP"
  },
  "sightseeingIds": ["goa-boat"],
  "billingMode": "NET_AGENCY_INVOICE"
}
```

---

## 4. Multi-Suite Buyouts & VIP Retinue Management

For large group travel, celebrity buyouts, or corporate executive offsites:
1. Contact your assigned **Senior Relationship Manager** via the **Collaborative Tickets Console**.
2. Request a **Hold Voucher** (valid for 48 hours without upfront payment).
3. Custom requests (such as private chef menus, helipad arrival coordination, or dedicated security retinue) are locked under a single unified master booking reference (`JN-SS-YYYY-XXXX`).

---

## 5. Support & Emergency Escalation

Channel Partners enjoy prioritized 24/7 access to our Central Operations Desk:
- **B2B VIP Hotline:** `+91 1800 890 4003`
- **Partner Email:** `channel.b2b@staysphere.io`
- **Guaranteed Ticket SLA:** <15 minutes response for all active corporate bookings.
