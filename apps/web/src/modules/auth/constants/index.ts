import { AuthRole } from '../types';

export const AUTH_ROLES: Record<string, AuthRole> = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  MANAGER: 'MANAGER',
  ADMIN: 'ADMIN',
  TELESALE: 'TELESALE',
};

export const AUTH_TOKEN_KEY = 'antigravity_access_token';
