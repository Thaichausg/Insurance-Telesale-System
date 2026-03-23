import { api } from '@/lib/api-client';
import { AuthResponse, LoginPayload, AuthUser } from '../../../../../packages/contracts/src/auth';

export const AuthApi = {
  login: (credentials: LoginPayload): Promise<AuthResponse> => 
    api.post<AuthResponse>('/auth/login', credentials),

  getCurrentUser: (): Promise<AuthUser> => 
    api.get<AuthUser>('/auth/me'),
    
  logout: (): Promise<void> => 
    api.post<void>('/auth/logout', {}),
};
