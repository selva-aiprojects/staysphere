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

export type SupportedCurrency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'SGD';

export interface CurrencyConfig {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  fxRateToBaseINR: number; // 1 Target Unit in INR, e.g. 1 USD = 86.5 INR
  flag: string;
}

export const SUPPORTED_CURRENCIES: Record<SupportedCurrency, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', fxRateToBaseINR: 1.0, flag: '🇮🇳' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', fxRateToBaseINR: 86.5, flag: '🇺🇸' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', fxRateToBaseINR: 91.2, flag: '🇪🇺' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', fxRateToBaseINR: 108.5, flag: '🇬🇧' },
  AED: { code: 'AED', symbol: 'AED ', name: 'UAE Dirham', fxRateToBaseINR: 23.55, flag: '🇦🇪' },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', fxRateToBaseINR: 64.2, flag: '🇸🇬' },
};

export function convertFromINR(amountInINR: number, currency: SupportedCurrency = 'INR'): number {
  if (currency === 'INR') return amountInINR;
  const rate = SUPPORTED_CURRENCIES[currency]?.fxRateToBaseINR || 1.0;
  return Math.round(amountInINR / rate);
}

export function convertToINR(amountInTarget: number, currency: SupportedCurrency = 'INR'): number {
  if (currency === 'INR') return amountInTarget;
  const rate = SUPPORTED_CURRENCIES[currency]?.fxRateToBaseINR || 1.0;
  return Math.round(amountInTarget * rate);
}

export function formatCurrencyAmount(amountInINR: number, currency: SupportedCurrency = 'INR'): string {
  const config = SUPPORTED_CURRENCIES[currency] || SUPPORTED_CURRENCIES.INR;
  const converted = convertFromINR(amountInINR, currency);
  if (currency === 'INR') {
    return `${config.symbol}${converted.toLocaleString('en-IN')}`;
  }
  return `${config.symbol}${converted.toLocaleString('en-US')}`;
}

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
