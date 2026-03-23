import { AuthUser, UserRole, AuthResponse as ContractAuthResponse } from '../../../../../packages/contracts/src/auth';

export type { UserRole, AuthUser as User };

export interface AuthResponse extends ContractAuthResponse {}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}
