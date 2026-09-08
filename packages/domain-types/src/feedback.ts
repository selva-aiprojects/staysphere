export type ReviewerRole =
  | 'GUEST'
  | 'HOTEL_PARTNER'
  | 'CHANNEL_PARTNER'
  | 'TRAVEL_DESK'
  | 'RELATIONSHIP_MANAGER';

export type FeedbackCategory =
  | 'STAY_QUALITY'
  | 'TRANSIT_PUNCTUALITY'
  | 'EXCURSION_EXPERIENCE'
  | 'RESOLVE_SLA'
  | 'COMMISSION_SETTLEMENT'
  | 'GUEST_CONDUCT'
  | 'PLATFORM_SUPPORT';

export type FeedbackSentiment = 'POSITIVE' | 'NEUTRAL' | 'CRITICAL';

export type FeedbackStatus = 'PUBLISHED' | 'FLAGGED' | 'ACTIONED_BY_RM' | 'RESOLVED_WITH_GUEST';

export interface StakeholderFeedbackRecord {
  id: string;
  journeyReference: string;
  reviewerRole: ReviewerRole;
  reviewerName: string;
  reviewerOrganization?: string;
  targetEntity: string;
  category: FeedbackCategory;
  overallRating: number; // 1 to 5
  subRatings?: {
    stayScore?: number;
    transitScore?: number;
    resolutionScore?: number;
    platformSupportScore?: number;
    payoutSpeedScore?: number;
  };
  sentiment: FeedbackSentiment;
  comment: string;
  status: FeedbackStatus;
  createdAt: string;
  actionTaken?: string;
  actionedBy?: string;
  actionedAt?: string;
}

export interface FeedbackSummaryKPIs {
  guestCsatScore: number;
  hotelPartnerSatisfaction: number;
  channelPartnerNps: number;
  transitPunctualityRating: number;
  totalFeedbackCount: number;
  positiveSentimentPercent: number;
}
