import { UserRole } from '../types';

export const USER_ROLES: UserRole[] = ['SUPER_ADMIN', 'MANAGER', 'ADMIN', 'TELESALE'];

export const ROLE_COLORS: Record<UserRole, string> = {
  SUPER_ADMIN: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  MANAGER: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  ADMIN: 'bg-amber-100 text-amber-700 border-amber-200',
  TELESALE: 'bg-blue-100 text-blue-700 border-blue-200',
};
