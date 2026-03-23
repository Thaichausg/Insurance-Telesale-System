import { create } from 'zustand';
import { User } from '../types';

interface AuthStoreState {
  currentUser: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setAuth: (user: User, accessToken: string) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  currentUser: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setAuth: (user, accessToken) => {
    set({ currentUser: user, accessToken, isAuthenticated: true, error: null });
  },

  logout: () => {
    set({ currentUser: null, accessToken: null, isAuthenticated: false, error: null });
  },

  clearAuth: () => {
    set({ currentUser: null, accessToken: null, isAuthenticated: false, error: null });
  },

  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
}));
