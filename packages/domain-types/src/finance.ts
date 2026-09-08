export type EntryType = 'DEBIT' | 'CREDIT';

export type AccountType =
  | 'GATEWAY_ESCROW'
  | 'GUEST_PAYABLE'
  | 'HOTEL_LIABILITY'
  | 'TRAVEL_LIABILITY'
  | 'PLATFORM_REVENUE_STAY'
  | 'PLATFORM_REVENUE_MOVE'
  | 'DISPUTE_HOLD_ESCROW'
  | 'REFUND_SETTLEMENT';

export type TransactionStatus = 'PENDING' | 'SETTLED' | 'HELD' | 'REFUNDED' | 'DISPUTED';

export interface LedgerEntry {
  id: string;
  transactionId: string;
  accountId: string;
  accountType: AccountType;
  entryType: EntryType;
  amount: number;
  currency: string;
  description: string;
  createdAt: string;
}

export interface FinancialTransaction {
  id: string;
  referenceType: 'STAY_BOOKING' | 'TRANSIT_BOOKING' | 'REFUND' | 'PARTNER_PAYOUT';
  referenceId: string;
  totalAmount: number;
  currency: string;
  status: TransactionStatus;
  gatewayTransactionId?: string;
  entries: LedgerEntry[];
  createdAt: string;
}
