import { useState } from 'react';
import { AuthApi } from '../api';
import { useAuthStore } from '../store/auth.store';
import { LoginDto } from '../validations/auth.schema';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const setAuth = useAuthStore(state => state.setAuth);

  const login = async (credentials: LoginDto) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await AuthApi.login(credentials);
      setAuth(response.user, response.accessToken);
      return true;
    } catch (err: any) {
      setError(err.message || 'Lỗi đăng nhập');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
