import { create } from 'zustand';
import { Tenant } from '../types';

interface TenantState {
  tenants: Tenant[];
  isLoading: boolean;
  error: string | null;
  selectedTenant: Tenant | null;
  isModalOpen: boolean;

  // Actions
  setTenants: (tenants: Tenant[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  openModal: (tenant?: Tenant | null) => void;
  closeModal: () => void;
  updateTenantInList: (tenant: Tenant) => void;
}

export const useTenantStore = create<TenantState>((set) => ({
  tenants: [],
  isLoading: false,
  error: null,
  selectedTenant: null,
  isModalOpen: false,

  setTenants: (tenants) => set({ tenants, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  openModal: (tenant = null) => set({ isModalOpen: true, selectedTenant: tenant }),
  closeModal: () => set({ isModalOpen: false, selectedTenant: null }),

  updateTenantInList: (tenant) => set((state) => ({
    tenants: state.tenants.map((t) => (t.id === tenant.id ? tenant : t)),
    selectedTenant: state.selectedTenant?.id === tenant.id ? tenant : state.selectedTenant
  }))
}));
