export type UserRole =
  | 'GUEST'
  | 'HOTEL_MANAGER'
  | 'HOTEL_STAFF'
  | 'TRAVEL_PARTNER'
  | 'DRIVER'
  | 'CHANNEL_PARTNER'
  | 'RESOLUTION_AGENT'
  | 'OPS_ADMIN'
  | 'SUPER_ADMIN';

export interface User {
  id: string;
  email: string;
  phone?: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}
