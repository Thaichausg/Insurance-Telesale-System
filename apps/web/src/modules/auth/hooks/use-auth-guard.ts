import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/auth.store';

interface AuthGuardOptions {
  allowedRoles?: ('SUPER_ADMIN' | 'MANAGER' | 'TELESALE')[];
}

export const useAuthGuard = (options: AuthGuardOptions = {}) => {
  const { isAuthenticated, isLoading, currentUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // 1. Check basic Auth
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    // 2. Check Role Access
    if (!isLoading && isAuthenticated && currentUser && options.allowedRoles) {
      if (!options.allowedRoles.includes(currentUser.role as any)) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, currentUser, router, options.allowedRoles]);

  return { isAuthenticated, isLoading, currentUser };
};
