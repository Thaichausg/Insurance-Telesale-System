export type UserRole = 'SUPER_ADMIN' | 'MANAGER' | 'ADMIN' | 'TELESALE';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  avatar?: string;
  lastLoginAt?: string;
}

export interface TelesaleAgent {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'TELESALE';
  isActive: boolean;
  isOnline?: boolean;
  teamName?: string;
  assignedLeadsCount?: number;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
