import { useState, useEffect } from 'react';
import { AuthApi } from '../api';
import { useAuthStore } from '../store/auth.store';

export const useCurrentUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, token, setAuth, logout } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      // Nếu không có token trong store thì bỏ qua
      if (!token || currentUser) return;
      
      setIsLoading(true);
      try {
        const user = await AuthApi.getCurrentUser(token);
        setAuth(user, token);
      } catch (error) {
        // Token lỗi/hết hạn
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [token, currentUser, setAuth, logout]);

  return { currentUser, isLoading, isAuthenticated: !!currentUser };
};
