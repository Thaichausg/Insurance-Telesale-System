import { useCallback } from 'react';
import { useAuthStore } from '../store/auth.store';
import { AuthApi } from '../api';

export const useAuth = () => {
  const store = useAuthStore();

  const login = useCallback(async (email: string, password: string) => {
    store.setLoading(true);
    store.setError(null);

    try {
      const response = await AuthApi.login({ email, password });
      
      // Store in Zustand
      store.setAuth(response.user, response.accessToken);
      
      // Persist for API Client
      localStorage.setItem('auth_token', response.accessToken);
      
      // Persist for Middleware
      document.cookie = `auth_token=${response.accessToken}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `user_role=${response.user.role}; path=/; max-age=86400; SameSite=Lax`;
      
      return { success: true };
    } catch (e: any) {
      store.setError(e.message || 'Email hoặc mật khẩu không chính xác!');
      return { success: false };
    } finally {
      store.setLoading(false);
    }
  }, [store]);

  const logout = useCallback(async () => {
    try {
       await AuthApi.logout();
    } finally {
       localStorage.removeItem('auth_token');
       document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
       document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
       store.logout();
       window.location.href = '/login';
    }
  }, [store]);

  const checkAuth = useCallback(async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (!token) {
       store.clearAuth();
       return;
    }

    try {
      const user = await AuthApi.getCurrentUser();
      store.setAuth(user, token);
    } catch (e) {
      localStorage.removeItem('auth_token');
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      store.clearAuth();
    }
  }, [store]);

  return {
    ...store,
    login,
    logout,
    checkAuth
  };
};
