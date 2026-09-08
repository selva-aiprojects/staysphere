# 08. Control Tower Operations Manual
**StaySphere Sovereign Incident & Matrix Console** | **Classification:** Internal Operations & Dispatch  
**Application:** StaySphere Control Tower Web Application (`apps/web-control-tower`)  
**URL:** `https://staysphere-control-tower.vercel.app`

---

## 1. Control Tower Architecture & Workspace Matrix

The StaySphere Operations Control Tower is an enterprise matrix providing 360° operational visibility over all active journeys, property inventory, chauffeur dispatch, and B2B channel partners across India.

```
+----------------------------------------------------------------------------------------------------+
|                                STAYSPHERE SOVEREIGN CONTROL TOWER                                  |
+----------------------------------------------------------------------------------------------------+
| 1. Live Journeys | 2. Properties | 3. Feedback | 4. SLA Triage | 5. Hotels | 6. Fleets | 7. B2B API |
+----------------------------------------------------------------------------------------------------+
```

---

## 2. Navigating the 8 Core Workspaces

### Workspace 1: Live Journeys (`JourneyCentricDashboard.tsx`)
- **Real-Time Telemetry Feed**: Tracks every active journey across its 5 stages (`FLIGHT_SYNC`, `CHAUFFEUR_TRANSIT`, `IN_STAY`, `EXCURSION`, `DEPARTURE_DROP`).
- **Status Badges**:
  - `IN_TRANSIT`: Chauffeur en route or guest aboard vehicle.
  - `IN_STAY`: Guest currently checked in at property.
  - `SLA_ALERT`: Active delay or open ticket requiring immediate triage.
- **360° Drilldown Modal**: Inspect flight number, live vehicle GPS coordinates, assigned butler, and digital key status.

### Workspace 2: Properties Master (`PropertyMasterDirectory.tsx`)
- **Centralized Master Property Directory**: Complete records for luxury resorts, clifftop villas, heritage palaces, serviced apartments, and alpine chalets.
- **PMS Sync State**:
  - `CONNECTED`: Live HostSphere direct two-way PMS sync active.
  - `EXTERNAL`: Connected via Opera/eZee cloud bridge.
  - `PENDING_AUDIT`: New estate undergoing 84-point inspection.
- **Rate Parity Health**: Visual flags for `IN_SYNC` vs `DISCREPANCY`.
- **Interactive Room Suite Inspector**: View base rates, square footage, occupancy limits, and private plunge pool specifications.

### Workspace 3: Multi-Party Feedback (`StakeholderFeedbackConsole.tsx`)
- **360° Reputation Dashboard**:
  - **Guest CSAT**: Overall traveller satisfaction (Target: $\ge 4.90/5.0$).
  - **Hotel Partner Trust**: Property operator confidence score (Target: $\ge 96.0\%$).
  - **Channel Partner NPS**: B2B agency promoter score (Target: $\ge +70$).
  - **Fleet Punctuality**: Chauffeur on-time arrival rate (Target: $\ge 99.0\%$).
- **Role-Based Review Stream**: Filter feedback by `GUEST`, `HOTEL_PARTNER`, `CHANNEL_PARTNER`, `TRAVEL_DESK`, or `RELATIONSHIP_MANAGER`.
- **Log Review Modal**: Record verbal debriefs and incident post-mortems directly into the permanent ledger.

### Workspace 4: SLA Resolution Queue (`SlaResolutionMonitoring.tsx`)
- **Real-Time Countdown Clocks**: Active 15-minute countdown timers for all open guest and partner tickets.
- **1-Click Remediation**:
  - `Dispatch Backup Vehicle` (triggers nearest standby chauffeur).
  - `Issue Goodwill Escrow Credit` (transfers funds directly to guest wallet).
  - `Escalate to MD` (alerts Managing Director if clock reaches <3 minutes).

### Workspace 5: Hotel Partner Management (`PropertyPartnersWorkflow.tsx`)
- Review monthly property earnings, occupancy rates, and upcoming contract renewals.
- Issue direct payout releases from escrow to partner bank accounts.

### Workspace 6: Chauffeur Fleets (`TravelDeskWorkflow.tsx`)
- Monitor fleet vehicle status (Maybach S680, Defender 4x4, VIP EVs).
- Track driver ratings, sanitize audits, and in-vehicle amenities stock.

### Workspace 7: B2B Channel Network (`ChannelPartnersWorkflow.tsx`)
- Generate agency API keys and track monthly gross booking value (GBV).
- Reconcile 12%–15% B2B commission payouts.

### Workspace 8: Resend Email Hub (`EmailCommunicationsCenter.tsx`)
- Monitor transactional and dispatch emails sent via the Resend API.
- Audit delivery rates, bounce logs, and manually resend confirmation vouchers.

---

## 3. Persona Switcher & Role-Based Access Control (RBAC)

The Control Tower supports simulated testing across 7 operational personas:
1. **Senior Relationship Manager** (`Vikramaditya Singh`)
2. **Hotel Property Partner** (`Anil Deshmukh`)
3. **Front Desk Lead** (`Ananya Deshmukh`)
4. **Fleet Telematics Director** (`Vikas Rathore`)
5. **Head of Luxury Concierge (Amex Centurion)** (`Priya Nambiar`)
6. **Chief Financial Officer & Escrow Custodian** (`Rajesh Khosla`)
7. **Chief Operating Officer & Central Incident Commander** (`Devraj Mukherjee`)
