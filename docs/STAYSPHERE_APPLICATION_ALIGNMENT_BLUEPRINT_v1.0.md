# StaySphere — Application Alignment Blueprint

**Version:** 1.0  
**Status:** Product / Architecture Baseline  
**Purpose:** Master blueprint for aligning the StaySphere Customer App, Property Partner Portal, Transport Partner Portal, Control Tower, APIs and data model.

## 1. Product Definition

### StaySphere
**The Hospitality Journey Platform**  
**Stay. Move. Experience. Resolve.**

### Core Principle
> **The Booking Is Not The End.**

StaySphere is the B2C/B2B2C journey platform in the Cybelinx hospitality ecosystem. HostSphere remains the B2B property operations/PMS platform.

| Product | Positioning | Primary Purpose |
|---|---|---|
| HostSphere | B2B Hospitality Operations Platform | Run your property |
| StaySphere | B2C/B2B2C Hospitality Journey Platform | Own your journey |

StaySphere orchestrates: **Discover → Book → Prepare → Travel → Check-In → Stay → Service → Resolve → Check-Out → Feedback → Return**.

## 2. StaySphere in One Picture

```text
                         CYBELINX
                            |
             +--------------+--------------+
             |                             |
        HOSTSPHERE                     STAYSPHERE
      B2B Hotel PMS              Hospitality Journey Platform
      "Run your property"          "Own your journey"
                                           |
              +----------------------------+--------------------+
              |                            |                    |
             STAY                         MOVE             EXPERIENCE
          Hotels/Rooms                Transport              Activities
              |                            |                    |
              +----------------------------+--------------------+
                                           |
                                      +----v----+
                                      | JOURNEY |
                                      +----+----+
                                           |
                    +----------------------+----------------------+
                    |                      |                     |
                 MY JOURNEY             MY STAY               RESOLVE
                    |                      |                     |
                    +----------------------+---------------------+
                                           |
                                    CONTROL TOWER
                                           |
                  +------------------------+-----------------------+
                  |                        |                       |
               QUALITY                  FINANCE                 SUPPORT
                  |                        |                       |
             Trust Score              Payments                    SLA
             Partner Score            Commission                Tickets
             Feedback                 Settlement                 Recovery
```

## 3. Four Primary Personas

| Persona | Application | Primary Responsibility |
|---|---|---|
| Customer / Guest | StaySphere Guest | Discover, book, travel, stay, resolve and review |
| Property Partner | StaySphere Property Portal | Manage property, inventory, reservations and guest fulfilment |
| Transport Partner | StaySphere Mobility Portal | Manage fleet, drivers, assignments and transport fulfilment |
| StaySphere Operations | Control Tower | Orchestrate, monitor, govern, resolve and settle |

**Secondary ecosystem persona:** Channel / Corporate Partner. Channel Partners remain an important distribution ecosystem but should not replace the four primary operating personas.

## 4. Central Domain Concept — JOURNEY

> **Journey must be a first-class business entity.**

A booking is one component of a Journey. A Journey can contain multiple bookings and services.

```text
Account
  |
  +-- GuestProfile
          |
          +-- Journey
                 |
                 +-- HotelBooking
                 +-- TravelBooking
                 +-- ExperienceBooking
                 +-- ServiceRequest
                 +-- Ticket
                 +-- Payment
                 +-- Refund
                 +-- Commission
                 +-- Settlement
                 +-- Notification
                 +-- Feedback
                 +-- JourneyEvent
```

## 5. Customer Application

### Navigation
`Home | Stay | Move | Experience | My Journey | Resolve`

### Customer lifecycle
```text
Search → Compare → Property Details → Room → Add Move → Add Experience → Review Journey → Payment → Confirmation
```

### My Journey
My Journey is the central customer workspace and should show hotel, transport, experiences, timeline, payments, tickets and status.

### Journey Health
- **GREEN — HEALTHY:** Everything is on track.
- **YELLOW — AT RISK:** A delay or operational risk is being handled.
- **RED — CRITICAL:** Active disruption requiring Resolution Desk intervention.

### My Stay
After check-in, provide Dining, Housekeeping, Maintenance, Luggage, Transport, Experience, Concierge and Report an Issue.

## 6. RESOLVE — Journey Protection

Resolve should not look like generic customer support.

```text
Issue Detected
      |
      v
Ticket Created
      |
      v
Priority / SLA Assigned
      |
      v
Partner Contacted
      |
      v
Action In Progress
      |
      v
Resolution Proposed
      |
      +---- Guest Accepts ----> Closed
      |
      +---- Guest Rejects ----> Escalation
```

Recovery actions may include transport reassignment, relocation, room upgrade, repair/service, partial/full refund, travel credit, goodwill credit, partner penalty and settlement hold.

## 7. Property Partner Portal

### Navigation
`Dashboard | Properties | Rooms & Inventory | Rates & Availability | Reservations | Arrivals | Guest Services | Transport | Payments | Settlements | Feedback | Support | Performance | Profile`

### Onboarding
```text
Apply → Business Verification → Documents → Property Verification → Quality Audit → Contract → PMS Integration → Test Booking → Approved → LIVE
```

Recommended trust tiers: **REGISTERED → VERIFIED → PREMIER**.

### Inventory
```text
Property
 ├── Room Types
 ├── Availability
 ├── Rates
 ├── Restrictions
 ├── Amenities
 └── Policies
```

Support native HostSphere synchronization and external PMS connectors, reservation webhooks, inventory/rate synchronization and safe-lock/buffering during integration downtime.

## 8. Transport Partner Portal

### Navigation
`Dashboard | Fleet | Drivers | Services | Pricing | Availability | Assignments | Trips | Live Tracking | Earnings | Settlements | Feedback | Support | Profile`

### Transport lifecycle
```text
Transport Request → Offer / Assignment → Accept → Driver Assigned → En Route → Arrived → Passenger Picked Up → In Transit → Arrived → Completed → Settlement → Feedback
```

### Move + Stay coupling
```text
Flight Delayed
      |
      +----> Transport Pickup Time Adjusted
      +----> Driver Notified
      +----> Property Arrival Estimate Updated
      +----> Guest Timeline Updated
```

## 9. StaySphere Control Tower

The Control Tower is the operational brain of StaySphere.

### Navigation
`Overview | Live Journeys | Bookings | Properties | Mobility | Resolution Desk | SLA Sentinel | Finance | Commission | Settlements | Partners | Trust & Safety | Feedback | Reports | Configuration | Audit`

### Control Tower KPIs
- Successful Journey Rate
- Active Journeys
- Active Stays
- Trips in Progress
- Open Tickets
- P0 Incidents
- SLA At Risk
- Pending Refunds
- Settlement Queue

### Journey Detail
Every Journey should be drillable into Flight, Transport, Hotel, Payment, Resolution and Finance components.

## 10. Finance Architecture

```text
                  CUSTOMER PAYMENT
                         |
                         v
                  PAYMENT LEDGER
                         |
             +-----------+-----------+
             |           |           |
             v           v           v
           HOTEL      TRANSPORT   EXPERIENCE
         PAYABLE       PAYABLE     PAYABLE
             |           |           |
             +-----------+-----------+
                         |
                         v
                    COMMISSION
                         |
                         v
                    SETTLEMENT
                         |
                         v
                  RECONCILIATION
```

Finance modules:
- Payments
- Refunds
- Commission
- Partner Settlement
- Reconciliation
- Invoices
- Adjustments
- Credit Holds
- Disputes

### Cancellation financial flow
```text
Cancellation Requested
        ↓
Check Cancellation Policy
        ↓
Calculate Penalty
        ↓
Calculate Refund
        ↓
Cancel Component
        ↓
Update Journey
        ↓
Refund Customer
        ↓
Reverse / Adjust Commission
        ↓
Adjust Partner Settlement
        ↓
Generate Financial Documents
```

Support cancellation of the entire Journey or individual hotel, transport or experience components.

## 11. Partner Management

Common lifecycle:
`Registered → Documents Submitted → KYC/KYB → Verification → Approved → Contracted → Sandbox/Certification → Active → Monitoring → Suspended/Offboarded`

Applicable to Property, Transport, Experience and Channel Partners.

## 12. Trust & Quality Engine

### Property
Fulfilment, guest rating, SLA adherence, quality audit and dispute frequency.

### Transport
On-time performance, trip completion, vehicle quality, safety, guest rating and SLA adherence.

### Guest
Verified identity, booking history, no-show rate and dispute validity.

Trust scores can influence marketplace ranking, alerts, partner visibility, retention and service recovery.

## 13. 360° Feedback

```text
Guest ------> Property
Guest ------> Transport
Guest ------> Experience
Guest ------> StaySphere
Property ---> Guest
Transport --> Guest
StaySphere -> Partner
```

Feedback feeds the Trust Engine and Control Tower.

## 14. Core Database Blueprint

### Identity
`Account, GuestProfile, User, Role, Permission`

### Journey
`Journey, JourneyEvent, JourneyStatus, JourneyHealth`

### Stay
`Property, RoomType, Room, Inventory, RatePlan, Availability, HotelBooking`

### Move
`TransportPartner, Fleet, Vehicle, Driver, TransportService, TravelBooking, Trip, TripEvent`

### Experience
`ExperienceProvider, Experience, ExperienceAvailability, ExperienceBooking`

### Support
`ServiceRequest, Ticket, SLA, Incident, Resolution, Compensation`

### Finance
`Payment, PaymentTransaction, Refund, Commission, PartnerPayable, Settlement, SettlementItem, FinancialAdjustment, Reconciliation, Invoice, CreditNote, DebitNote`

### Trust
`Feedback, Review, PartnerScore, TrustScore, QualityAudit`

### Governance
`Partner, PartnerVerification, PartnerContract, AuditLog, Notification, WebhookEvent`

## 15. Event Architecture

Recommended domain events:

```text
journey.created
journey.confirmed
journey.modified
journey.cancelled
payment.authorized
payment.completed
refund.requested
refund.completed
hotel.booking.confirmed
hotel.checkin.completed
hotel.checkout.completed
flight.updated
flight.landed
transport.assigned
transport.driver_arrived
transport.pickup_completed
transport.completed
ticket.created
ticket.escalated
ticket.resolved
settlement.eligible
settlement.released
settlement.adjusted
feedback.submitted
```

Webhook events should include `event_id`, `event_type`, `timestamp`, `journey_id`, `booking_id`, `partner_id`, `payload` and `signature`, with retries, idempotency, replay protection and delivery logs.

## 16. API Blueprint

```text
/api/v1

/auth

/journeys
/journeys/{journeyId}
/journeys/{journeyId}/timeline
/journeys/{journeyId}/financials
/journeys/{journeyId}/tickets
/journeys/{journeyId}/feedback
/journeys/{journeyId}/cancel
/journeys/{journeyId}/modify

/stay
/properties
/rooms
/inventory
/rates
/bookings

/move
/providers
/fleets
/drivers
/trips

/experience

/payments
/refunds
/commissions
/settlements
/reconciliation

/tickets
/resolution
/sla

/partners
/verification
/trust

/feedback

/notifications

/webhooks
```

## 17. RBAC

### Customer
Discover, Book, Pay, Manage Journey, Cancel, Request Service, Create Ticket, View Resolution, Review.

### Property Partner
Manage Property, Inventory, Rates, Reservations, Arrivals, Services, Tickets, Settlement, Feedback.

### Transport Partner
Manage Fleet, Drivers, Services, Availability, Assignments, Trips, Earnings, Settlement, Tickets.

### StaySphere Operations
View Journeys, Manage Partners, Monitor SLA, Pricing, Payments, Commission, Settlement, Refunds, Disputes, Trust, Quality and Audit.

Recommended internal roles:
`Platform Admin, Operations Manager, Relationship Manager, Reservation Agent, Finance Officer, Settlement Officer, Support Agent, Incident Commander, Quality Manager, Partner Manager`.

## 18. End-to-End Business Flow

```text
                    CUSTOMER
                       |
                       v
                  DISCOVERY
                       |
                       v
                     STAY
                       |
                       v
                  ADD MOVE
                       |
                       v
              ADD EXPERIENCE
                       |
                       v
                 CREATE JOURNEY
                       |
                       v
                    PAYMENT
                       |
                       v
                 CONFIRMATION
                       |
             +---------+---------+
             |                   |
             v                   v
          PROPERTY           TRANSPORT
             |                   |
             +---------+---------+
                       |
                       v
                    TRAVEL
                       |
                       v
                   CHECK-IN
                       |
                       v
                    MY STAY
                       |
                  +----+----+
                  |         |
                 OK       ISSUE
                  |         |
                  |         v
                  |      RESOLVE
                  |         |
                  +----+----+
                       |
                       v
                  CHECK-OUT
                       |
                       v
                   FEEDBACK
                       |
                       v
                TRUST / RANKING
                       |
                       v
                  REBOOK / RETURN
```

## 19. MVP Roadmap

### Phase 1 — STAY
Customer: search, property details, room selection, booking, payment, confirmation.  
Property: registration, verification, property management, inventory, rates, reservations.  
Operations: booking dashboard, partner management, payments, basic support.

### Phase 1.5 — MOVE
Airport transfer, transport onboarding, driver assignment, trip lifecycle, basic tracking and settlement.

### Phase 2 — RESOLVE
My Journey, My Stay, tickets, SLA, Resolution Desk, cancellation, refund, compensation and Journey Health.

### Phase 3 — EXPERIENCE
Sightseeing, activities, tours, experience providers and bookings.

### Phase 4 — INTELLIGENCE
AI Concierge, predictive Journey Health, predictive SLA, smart recommendations and automated recovery.

## 20. Priority Implementation Backlog

### P0 — Critical
1. Journey master entity
2. Journey-to-booking relationships
3. Journey lifecycle/state machine
4. Cancellation engine
5. Refund engine
6. Commission calculation/reversal
7. Financial ledger
8. Partner settlement
9. Financial reconciliation
10. Journey Health
11. Journey-centric APIs
12. My Journey
13. Customer/Partner role separation
14. Remove internal operational access from public customer UI

### P1 — High
15. Partner onboarding/KYB  
16. Property Partner Portal  
17. Transport Partner Portal  
18. 360° feedback  
19. Trust Score  
20. Ticket-to-Journey association  
21. SLA engine  
22. Partner lifecycle  
23. Pricing/commercial engine  
24. Control Tower Journey Detail

### P2 — Later
25. Experience marketplace  
26. Advanced flight telemetry  
27. AI Concierge  
28. Predictive SLA  
29. Advanced personalization  
30. Automated recovery intelligence

## 21. What StaySphere Should Not Become

### Not another OTA
`Search → Cheap Hotel → Book`

### Not Uber
Transport is a Journey component.

### Not another PMS
HostSphere owns property operations.

### Not an Experience-first marketplace
Experience is a later extension.

### Not an AI product
AI should enhance the Journey Engine.

## 22. Strategic Positioning

> **StaySphere is the Hospitality Journey Platform that connects stays, mobility, experiences and issue resolution into one accountable customer journey.**

### Customer
> **One journey. One platform. We've got you covered.**

### Property
> **Don't just fill rooms. Own the guest journey.**

### Transport Partner
> **Turn every transport assignment into a reliable journey experience.**

### StaySphere
> **Orchestrate the journey. Protect the experience.**

## 23. Final Architecture Principle

```text
                         STAYSPHERE
                              |
                     +--------v--------+
                     |  JOURNEY ENGINE |
                     +--------+--------+
                              |
        +---------------------+---------------------+
        |                     |                     |
       STAY                  MOVE              EXPERIENCE
        |                     |                     |
        +---------------------+---------------------+
                              |
                       +------v------+
                       | MY JOURNEY  |
                       +------+------+
                              |
             +----------------+----------------+
             |                |                |
          MY STAY          RESOLVE          FINANCE
             |                |                |
             +----------------+----------------+
                              |
                       CONTROL TOWER
                              |
       +----------------------+----------------------+
       |                      |                      |
    PARTNERS               QUALITY                TRUST
       |                      |                      |
    Property             SLA / Service          Feedback
    Transport             Audits                Ranking
    Experience            Recovery              Scores
```

## StaySphere Master Principle

> **One Customer. One Journey. Multiple Services. Multiple Partners. One Accountable Platform.**

---

## Source Alignment

This blueprint is based primarily on the current StaySphere PRD v3.0 and the existing Property Partner, Travel/Mobility Partner, Channel Partner and Internal Operations/Control Tower manuals. It is intended as an application-alignment baseline rather than a requirement to rebuild StaySphere from scratch.
