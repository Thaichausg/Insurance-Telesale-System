import { create } from 'zustand';
import { User, UserQueryParams } from '../types';

interface UsersState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  filterParams: UserQueryParams;
  selectedUser: User | null;
  isFormOpen: boolean;

  // Actions
  setUsers: (users: User[]) => void;
  setFilterParams: (params: Partial<UserQueryParams>) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  selectUser: (user: User | null) => void;
  openForm: (user?: User | null) => void;
  closeForm: () => void;
  updateUserStatus: (id: string, isActive: boolean) => void;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  isLoading: false,
  error: null,
  filterParams: { role: '', search: '', isActive: undefined },
  selectedUser: null,
  isFormOpen: false,

  setUsers: (users) => set({ users, error: null }),
  
  setFilterParams: (params) => set((state) => ({ 
    filterParams: { ...state.filterParams, ...params } 
  })),

  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),

  selectUser: (user) => set({ selectedUser: user }),

  openForm: (user = null) => set({ isFormOpen: true, selectedUser: user }),
  
  closeForm: () => set({ isFormOpen: false, selectedUser: null }),

  updateUserStatus: (id, isActive) => set((state) => ({
    users: state.users.map((u) => 
      u.id === id ? { ...u, isActive } : u
    ),
    selectedUser: state.selectedUser?.id === id 
      ? { ...state.selectedUser, isActive } 
      : state.selectedUser
  })),
}));
