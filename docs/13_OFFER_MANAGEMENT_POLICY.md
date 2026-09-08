# 13. Offer Management Policy
**StaySphere Sovereign Journey Platform** | **Classification:** Platform Operations Policy  
**Effective Date:** 2026-09-08 | **Version:** v1.0  
**Applicable to:** Platform Operations, Relationship Managers, Property Partners, Channel Partners

---

## 1. Purpose & Scope

StaySphere operates a **Platform-Controlled Offer Management Engine** to drive occupancy during low-demand periods, reward loyal guests, incentivize channel partners, and remain competitive against legacy OTAs — without compromising rate parity or brand positioning.

This policy governs:
- Season definitions and naming conventions
- Offer type catalogue and eligibility
- Proposal workflow (partner → platform)
- Stackability and rate parity interaction
- Redemption caps and lifecycle management

---

## 2. Season Definitions

StaySphere recognizes three season types, which serve as the primary demand context for offer configuration:

| Season Type | Definition | Offer Strategy |
| :--- | :--- | :--- |
| **Peak Season** 🔴 | High-demand period (Festivals, holidays, long weekends) | Value-add add-ons only. Flat discounts generally not permitted. |
| **Shoulder Season** 🟡 | Moderate demand (transitional months) | Early Bird and Complimentary Add-Ons recommended. |
| **Off-Peak Season** 🔵 | Low-demand period (monsoon, non-holiday mid-weeks) | Flash Deals, Free Nights, and Flat Discounts authorized. |

### 2.1 Season Naming Convention
Format: `[DESTINATION]-[SEASON_TYPE]-[DESCRIPTOR]-[YEAR]`

Examples:
- `GOA-PEAK-XMAS-2026`
- `UDR-SHOULDER-AUTUMN-2026`
- `MNL-OFFPEAK-MONSOON-2026`

---

## 3. Offer Type Catalogue

### 3.1 Flat Percentage Discount
- Applied to base room rate before taxes and platform fee.
- **Permitted seasons**: Off-Peak (primary), Shoulder (with approval).
- **Not permitted during Peak Season** unless approved by Finance Officer.
- Maximum discount: 30% without Finance Officer co-approval; up to 45% with co-approval.

### 3.2 Free Night (Stay X, Pay Y)
- One or more nights waived from the total stay cost.
- Example: Stay 3 nights, pay for 2. Stay 7, pay 5.
- Applicable to minimum stay requirements: minimum 3 nights.
- Commission is calculated on nights paid, not nights stayed.

### 3.3 Complimentary Add-On
- A service or experience added at zero additional cost.
- Available add-on types:
  - `AIRPORT_TRANSFER`: One-way or round-trip airport chauffeur.
  - `EXPERIENCE`: Guided tour, speedboat, cultural excursion.
  - `ROOM_UPGRADE`: Upgrade to next available suite category.
- **Permitted across all seasons** (including Peak Season).
- Does not affect base room rate or trigger rate parity warnings.

### 3.4 Early Bird Offer
- Discount applied when guest books a minimum number of days before arrival.
- Standard threshold: **60 days** (configurable per offer).
- Incentivizes advance planning and improves revenue visibility.
- Discount may be combined with season-based pricing but not with other active discount offers (non-stackable by default).

### 3.5 Flash Deal (Last-Minute)
- Short-window discount (typically 12–72 hours).
- Designed to fill unsold inventory within 72 hours of check-in date.
- Maximum discount: 45% (hard cap; exceeding requires OPS_ADMIN override).
- Flash Deals are automatically expired after the validity window closes.
- **Cannot be applied to journeys already in CONFIRMED status.**

---

## 4. Offer Eligibility Rules

Each offer must define the following eligibility conditions:

| Rule Condition | Description |
| :--- | :--- |
| **Minimum Stay Nights** | Guest must book at least N nights to qualify. |
| **Minimum Advance Booking Days** | Guest must book at least N days before check-in (for Early Bird). |
| **Guest Tier Eligibility** | All guests / Gold & Above / Sovereign Tier Only. |
| **Applicable Channel** | Direct booking only / B2B Channel Partners only / Both. |
| **Max Uses Per Guest** | Limits repeat redemption by the same customer. |
| **Stackable Flag** | Whether this offer can be combined with another active offer. |

---

## 5. Rate Parity Interaction

StaySphere enforces strict rate parity to ensure property partners maintain consistent pricing across all channels.

### 5.1 Offer and Rate Parity
- Offers that reduce the **effective guest price below the published public rate** will trigger a **Rate Parity Warning Badge** on the offer card.
- This is a **soft warning** — it does not automatically block the offer.
- The RM responsible for the affected property is automatically notified.
- The offer may proceed if the Finance Officer or OPS_ADMIN acknowledges the warning.

### 5.2 Offers That Are Exempt from Rate Parity Checks
- `COMPLIMENTARY_ADDON`: Does not alter the room rate itself.
- `FREE_NIGHT` with a minimum stay of 3+ nights: Treated as a value-add, not a rate reduction.
- B2B-Channel-Only offers: Rate parity applies only to publicly visible (Direct) channel pricing.

---

## 6. Offer Lifecycle

```
DRAFT
  │
  ├─► [OPS_ADMIN or RM publishes]
  │
LIVE
  │
  ├─► [Manual Pause or Redemption Cap Reached]
  │
PAUSED ──► [Resumed by OPS_ADMIN] ──► LIVE
  │
  ├─► [Valid To date passes]
  │
EXPIRED (auto-archived)
```

---

## 7. Partner Proposal Workflow

Property Partners may propose promotional offers via the Control Tower Partner Proposal Queue.

### 7.1 Submission Requirements
- Partner must provide: Offer name, type, discount value, valid dates, reason/rationale.
- Proposals are reviewed within **24 business hours** by the assigned Relationship Manager.

### 7.2 Approval Flow
```
Partner Submits Proposal
        ↓
RM Reviews (within 24 hrs)
        ↓
RM Approves ──► Converted to DRAFT Offer (Platform configures final rules)
        ↓
OPS_ADMIN Activates ──► LIVE

OR

RM Rejects ──► Partner Notified with Reason
```

### 7.3 Partner Proposal Limitations
- Partners may not set their own redemption caps; these are set by Platform Ops.
- Partners may not propose Flash Deals. Flash Deals are Platform-initiated only.
- Partners may propose a maximum of **3 active proposals at once**.

---

## 8. Offer Code Format Standard

All offer codes must follow this format:

```
[DESTINATION_CODE]-[OFFER_TYPE_CODE]-[DESCRIPTOR]
```

| Component | Values |
| :--- | :--- |
| `DESTINATION_CODE` | `GOA`, `UDR`, `MNL`, `MUM`, `ALL` |
| `OFFER_TYPE_CODE` | `DISC`, `FN`, `ADDON`, `EB`, `FLASH` |
| `DESCRIPTOR` | Short alphanumeric, max 8 characters |

Examples:
- `GOA-DISC-MONSOON20`
- `UDR-FN-STAY3PAY2`
- `ALL-EB-60DAYS`
- `MNL-FLASH-AUG26`

---

## 9. Commission Interaction with Offers

- Discounts are applied **before** platform commission calculation.
- Platform commission is calculated on the **discounted net room rate**.
- B2B Channel Partner commissions are calculated on the net discounted price.
- Free Night offers: Commission is calculated on **nights paid**, not total nights stayed.

---

**Platform Operations Desk:**  
- **Offer Management Console:** `https://staysphere-control-tower.vercel.app` (Workspace 14)  
- **Email:** `offers@staysphere.io`  
- **Policy Owner:** Chief Operating Officer & Finance Officer
