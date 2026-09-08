# ADR-006: Double-Entry Bookkeeping & Split Payment Escrow

**Status:** Accepted  
**Date:** 2026-09-07  
**Deciders:** Lead Architect, FinTech / Compliance Lead  

---

## 1. Context & Problem Statement

StaySphere is a multi-vendor marketplace handling complex financial flows:
* A single customer checkout of ₹12,000 may contain a ₹10,000 hotel room and a ₹2,000 airport cab.
* StaySphere deducts a platform commission (e.g., 15% on hotel = ₹1,500; 15% on travel = ₹300) and holds remaining balances in escrow.
* If a driver no-shows or a room is denied, instant partial or full refunds, penalty deductions, and voucher credits must occur without balance discrepancies or accounting corruption.

A naive single `balance` column on user/partner tables is prone to race conditions, untraceable errors, and audit failures.

## 2. Decision

We choose an **Immutable Double-Entry Bookkeeping Architecture** for all financial transactions.

```
┌─────────────────────────────────────────────────────────────────┐
│              IMMUTABLE DOUBLE-ENTRY LEDGER                      │
├─────────────────────────────────────────────────────────────────┤
│ Rule 1: Money is never created or destroyed; it moves between   │
│         accounts via balanced Debit and Credit line items.      │
│                                                                 │
│ Rule 2: SUM(debits) - SUM(credits) == 0 MUST hold for every     │
│         transaction bundle, enforced at the database level.     │
│                                                                 │
│ Rule 3: Ledger entries are append-only. Cancellations/refunds   │
│         create compensating reversing entries.                  │
└─────────────────────────────────────────────────────────────────┘
```

### Example Transaction Mapping (Booking #1042 — ₹10,000 Hotel + ₹2,000 Cab)

```sql
BEGIN;

-- 1. Create Financial Transaction Header
INSERT INTO financial_transactions (id, reference_type, reference_id, status)
VALUES ('tx_991', 'BOOKING', 'bkg_1042', 'SETTLED');

-- 2. Customer Pays via Payment Gateway
INSERT INTO ledger_entries (account_id, entry_type, amount, currency) VALUES
('account_gateway_escrow', 'DEBIT',  12000.00, 'INR'),
('account_guest_payable',  'CREDIT', 12000.00, 'INR');

-- 3. Apportion Balances into Vendor Liabilities & Platform Revenue
INSERT INTO ledger_entries (account_id, entry_type, amount, currency) VALUES
('account_guest_payable',        'DEBIT',  12000.00, 'INR'),
('account_hotel_liability_p1',   'CREDIT',  8500.00, 'INR'), -- Hotel Due
('account_travel_liability_d1',  'CREDIT',  1700.00, 'INR'), -- Driver Due
('account_platform_revenue_stay','CREDIT',  1500.00, 'INR'), -- Hotel Commission
('account_platform_revenue_move','CREDIT',   300.00, 'INR'); -- Travel Commission

COMMIT;
```

## 3. Payout & Dispute Resolution Rules

* **Settlement Payout:** Scheduled nightly via Gateway Split APIs (Stripe Connect / Razorpay Route) after deducting verified penalties.
* **Escalation Holds:** If a ticket is opened with the Resolution Desk, the vendor's liability amount is placed in `account_escrow_dispute_hold` until resolved.

## 4. Consequences

### Positive Consequences
* **100% Audit Proof:** Complete historical traceability of every rupee across all guests, hotels, drivers, and StaySphere revenue.
* **Zero Race Conditions:** Account balances are calculated dynamically from append-only ledger entries, eliminating dirty writes.
* **Streamlined Tax Reporting:** Direct compliance with marketplace GST/TDS withholding rules.

### Negative Consequences / Risks
* Higher row volume in the `ledger_entries` table.
  * *Mitigation:* Table partitioning by month/quarter and materialized snapshot views for balance summaries.
