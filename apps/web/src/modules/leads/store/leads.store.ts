import { create } from 'zustand';
import { Lead, LeadFilterParams } from '../../../../../packages/contracts/src/leads';

interface LeadsState {
  leads: Lead[];
  isLoading: boolean;
  error: string | null;
  selectedLeadId: string | null;
  filterParams: LeadFilterParams;

  // Actions
  setLeads: (leads: Lead[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedLeadId: (id: string | null) => void;
  setFilterParams: (params: Partial<LeadFilterParams>) => void;
}

export const useLeadsStore = create<LeadsState>((set) => ({
  leads: [],
  isLoading: false,
  error: null,
  selectedLeadId: null,
  filterParams: { customerName: '', phoneNumber: '', status: undefined, source: undefined },
  
  setLeads: (leads) => set({ leads, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSelectedLeadId: (id) => set({ selectedLeadId: id }),
  
  setFilterParams: (params) => set((state) => ({ 
    filterParams: { ...state.filterParams, ...params } 
  })),
}));
