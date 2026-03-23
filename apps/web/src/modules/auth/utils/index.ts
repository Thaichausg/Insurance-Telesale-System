import { AuthRole } from '../types';

/**
 * Hàm kiểm tra quyền
 */
export const hasPermission = (userRole: AuthRole, requiredRoles: AuthRole[]): boolean => {
  return requiredRoles.includes(userRole);
};
