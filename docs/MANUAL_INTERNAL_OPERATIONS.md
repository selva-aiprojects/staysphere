# StaySphere Internal Operations & Control Tower Manual
**Document Version:** 3.5 | **Classification:** Internal Operations Strictly Confidential  
**Target Audience:** Relationship Managers (RMs), Fleet Dispatchers, Front Desk Concierges, Escrow Finance Custodians, Central Operations Incident Commanders  
**Operational Platform:** StaySphere Control Tower (`apps/web-control-tower`)

---

## 1. Executive Operations Architecture

The StaySphere Control Tower is an enterprise incident command matrix designed to guarantee an overall **Successful Journey Rate (SJR $\ge 97.5\%$)**. 

Unlike traditional call centers, StaySphere operates on **Proactive Sentinel Telemetry**—detecting and resolving travel disruptions before the guest or partner experiences friction.

```
+-------------------------------------------------------------------------+
|                  StaySphere Sovereign Control Matrix                    |
+-------------------------------------------------------------------------+
                                     │
      ┌───────────────┬──────────────┼──────────────┬──────────────┐
      ▼               ▼              ▼              ▼              ▼
[ Live Radar ] [ Property Master ] [ Feedback ] [ SLA Sentinel ] [ Escrow Vault ]
Flight Telemetry  PMS Sync & Rates  360° Metrics  15-Min Clocks   Milestone Payouts
```

---

## 2. Role-Based Standard Operating Procedures (SOPs)

### 2.1 Senior Relationship Manager (RM) SOP
- **Primary Workspaces**: `1. Live Journeys`, `2. Properties Master`, `3. Multi-Party Feedback`, `5. Hotel Partners`.
- **Core Duties**:
  1. **Daily Morning Briefing (08:00 IST)**: Review all arriving VIP journeys across assigned regional estates (Goa, Udaipur, Manali, Mumbai).
  2. **Rate Parity Audits**: Inspect the **Rate Parity Radar**; investigate any discrepancies flagged between HostSphere and external OTAs.
  3. **Multi-Party Feedback Governance**: Review newly submitted reviews from Hotel GMs, Chauffeur Leads, and Channel Partners; assign corrective action within 2 hours.

### 2.2 Fleet Telematics & Chauffeur Dispatcher SOP
- **Primary Workspaces**: `1. Live Journeys`, `6. Chauffeur Fleets`.
- **Core Duties**:
  1. **Flight Radar Monitoring**: Track inbound flights (`DEL → GOX`, `BOM → UDR`, etc.). Ensure chauffeurs are positioned at the airport VIP lane 15 minutes before touchdown.
  2. **Backup Vehicle Allocation**: In case of traffic gridlock or mechanical breakdown, dispatch a standby Maybach or Defender within **8 minutes**.
  3. **Transit Escrow Release**: Reconcile driver transit milestones upon passenger arrival at the property.

### 2.3 Escrow Vault & Finance Custodian SOP
- **Primary Workspaces**: `Payment & Escrow Vault`, `Resend Email Hub`.
- **Core Duties**:
  1. **Milestone Custody Verification**: Ensure 100% of guest payments are locked in the escrow ledger upon booking.
  2. **Automated 2-Hour Release**: Verify that net earnings are automatically disbursed to property bank accounts 2 hours post-guest check-in.
  3. **Dispute Holds**: In case of a P0 complaint, execute an instant 24-hour payout lock until Central Ops resolves the ticket.

---

## 3. The 15-Minute Guaranteed SLA Incident Protocol

StaySphere guarantees a maximum **15-Minute SLA Response Clock** for any operational alert:

### 3.1 Severity Matrix & Escalation Pathway

| Severity Tier | Trigger Conditions | SLA Target | Required Action | Automatic Consequence |
| :--- | :--- | :--- | :--- | :--- |
| **P0 — Critical Emergency** | Chauffeur missing at airport curb, suite AC failure, double booking | **<15 Mins** | Immediate phone intervention by RM + backup vehicle/suite allocation | Escrow payout frozen; automatic ₹3,000 credit to guest |
| **P1 — High Priority** | Flight delay >1 hour, dietary preference mismatch, early check-in request | **<30 Mins** | Re-synchronize chauffeur pickup time + coordinate with property GM | System sends updated itinerary to all parties via Resend Email API |
| **P2 — Standard Support** | Billing receipt download, extra sightseeing booking, general questions | **<60 Mins** | Respond via Collaborative Tickets modal | Resolution logged in customer journey timeline |

### 3.2 Triage Execution Steps:
1. Incident appears with flashing red banner in **`4. SLA Resolution Queue`**.
2. Incident Commander clicks **`Claim Ticket`** to halt the escalation countdown clock.
3. Commander reviews telemetry (live GPS coordinates, flight arrival status, suite audit log).
4. Commander selects resolution action:
   - `DISPATCH_BACKUP_VEHICLE`
   - `AUTHORIZE_COMPLIMENTARY_UPGRADE`
   - `RELEASE_GOODWILL_CREDIT`
5. Ticket is closed and resolution summary is logged into the **360° Reputation Engine**.

---

## 4. HostSphere PMS & Rate Parity Enforcement

### 4.1 Maintaining Rate Parity
StaySphere enforces direct pricing consistency:
- If a property partner publishes a lower rate on a public OTA, StaySphere's automated crawler flags a `RATE_DISCREPANCY`.
- The RM initiates a collaborative ticket with the Hotel GM to adjust rates or increase value-add inclusions (e.g., complimentary high tea).

---

## 5. Resend Email Communication Infrastructure

Internal teams use the **Resend Email Communications Center** (`8. Resend Email Hub`) to send automated and manual communications:

- **Template Categories**:
  - `JOURNEY_CONFIRMATION`: Sent immediately upon booking with full 5-stage timeline.
  - `PARTNER_ONBOARDING_INVITE`: Sent to newly registered hotel owners and fleet desks.
  - `ESCROW_DISBURSEMENT_ADVICE`: Automated settlement confirmation sent to property finance teams.
  - `SLA_INCIDENT_RESOLUTION`: Notification to guests detailing compensation credits and revised timings.

---

**Emergency Operations Command Desk:**  
- **Central Incident Intercom:** `ops.command@staysphere.io`  
- **Escalation Hotline:** `+91 1800 890 4000`  
- **Operational Console:** `https://staysphere-control-tower.vercel.app`
