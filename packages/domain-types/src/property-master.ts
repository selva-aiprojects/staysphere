export type PropertyCategoryType =
  | 'HOTEL'
  | 'RESORT'
  | 'VILLA'
  | 'SERVICED_APARTMENT'
  | 'CHALET'
  | 'HERITAGE_PALACE';

export type PropertyOperationalStatus = 'ACTIVE' | 'UNDER_REVIEW' | 'PAUSED' | 'FEATURED';

export type HostSphereSyncState = 'CONNECTED' | 'DISCONNECTED' | 'SYNCING' | 'MANUAL_OVERRIDE';

export interface RoomSuiteCategory {
  id: string;
  name: string;
  maxGuests: number;
  basePricePerNight: number;
  inventoryCount: number;
  amenities: string[];
  description: string;
}

export interface PropertyMasterEntity {
  id: string;
  code: string;
  name: string;
  category: PropertyCategoryType;
  categoryLabel: string;
  destinationCity: string;
  locationArea: string;
  address: string;
  starRating: number;
  trustScore: number;
  reviewCount: number;
  basePricePerNight: number;
  commissionRatePercent: number;
  rateParityStatus: 'IN_SYNC' | 'DISCREPANCY' | 'PENDING_AUDIT';
  status: PropertyOperationalStatus;
  hostSphereSync: HostSphereSyncState;
  pmsConnector: string; // e.g. 'HostSphere Direct PMS', 'Opera Cloud', 'eZee Absolute', 'Direct Webhook'
  managerName: string;
  managerPhone: string;
  managerEmail: string;
  roomSuites: RoomSuiteCategory[];
  keyInclusions: string[];
  heroImageUrl: string;
  payoutBankInfo: {
    bankName: string;
    accountEnding: string;
    accountHolder: string;
  };
  createdAt: string;
  updatedAt: string;
}
