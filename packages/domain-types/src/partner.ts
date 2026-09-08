export type PartnerType = 'HOTEL_OPERATOR' | 'TRAVEL_OPERATOR' | 'CHANNEL_PARTNER';

export interface PartnerProfile {
  id: string;
  userId: string;
  businessName: string;
  tradeName: string;
  partnerType: PartnerType;
  taxRegistrationNumber: string; // GSTIN / VAT
  businessLicenseNumber: string;
  bankAccountNumber: string;
  bankIfscOrSwift: string;
  commissionRatePct: number;
  trustScore: number;
  isVerified: boolean;
  isActive: boolean;
  settlementFrequencyDays: number;
  createdAt: string;
}
