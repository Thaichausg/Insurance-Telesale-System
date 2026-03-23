import { create } from 'zustand';
import { Lead, LeadStatus } from '../types';

interface TelesaleStoreState {
  assignedLeads: Lead[]; // Rename to assignedLeads for clarity
  selectedLead: Lead | null;
  isLoading: boolean;
  isProcessing: boolean;
  error: string | null;

  // Actions
  setLeads: (leads: Lead[]) => void;
  selectLead: (lead: Lead | null) => void;
  updateLeadStatus: (id: string, status: LeadStatus, followUpDate?: string) => void;
  setLoading: (isLoading: boolean) => void;
  setProcessing: (isProcessing: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTelesaleStore = create<TelesaleStoreState>((set) => ({
  assignedLeads: [],
  selectedLead: null,
  isLoading: false,
  isProcessing: false,
  error: null,

  setLeads: (leads) => set({ assignedLeads: leads, error: null }),
  
  selectLead: (lead) => set({ selectedLead: lead }),

  updateLeadStatus: (id, status, followUpDate) => set((state) => {
    const updatedLeads = state.assignedLeads.map((l) => 
      l.id === id ? { ...l, status, followUpDate, updatedAt: new Date().toISOString() } : l
    );
    
    return {
      assignedLeads: updatedLeads,
      selectedLead: state.selectedLead?.id === id 
        ? { ...state.selectedLead, status, followUpDate, updatedAt: new Date().toISOString() } 
        : state.selectedLead
    };
  }),

  setLoading: (isLoading) => set({ isLoading }),
  
  setProcessing: (isProcessing) => set({ isProcessing }),
  
  setError: (error) => set({ error }),
}));
