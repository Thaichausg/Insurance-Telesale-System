import React from 'react';
import { useAuthStore } from '../store/auth.store';

interface CanAccessProps {
  roles: ('SUPER_ADMIN' | 'MANAGER' | 'TELESALE')[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const CanAccess: React.FC<CanAccessProps> = ({ 
  roles, 
  children, 
  fallback = null 
}) => {
  const { currentUser, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !currentUser) return <>{fallback}</>;

  const hasAccess = roles.includes(currentUser.role as any);

  if (!hasAccess) return <>{fallback}</>;

  return <>{children}</>;
};
