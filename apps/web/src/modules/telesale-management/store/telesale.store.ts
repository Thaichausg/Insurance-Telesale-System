import { create } from 'zustand';
import { Lead } from '../../../../../packages/contracts/src/leads';
import { AiSuggestionResponse } from '../../../../../packages/contracts/src/ai';

interface TelesaleState {
  assignedLeads: Lead[];
  selectedLeadId: string | null;
  aiSuggestion: AiSuggestionResponse | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setAssignedLeads: (leads: Lead[]) => void;
  setSelectedLeadId: (id: string | null) => void;
  setAiSuggestion: (suggestion: AiSuggestionResponse | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  updateLeadInList: (lead: Lead) => void;
}

export const useTelesaleStore = create<TelesaleState>((set) => ({
  assignedLeads: [],
  selectedLeadId: null,
  aiSuggestion: null,
  isLoading: false,
  error: null,

  setAssignedLeads: (assignedLeads) => set({ assignedLeads, error: null }),
  setSelectedLeadId: (id) => set({ selectedLeadId: id, aiSuggestion: null }),
  setAiSuggestion: (aiSuggestion) => set({ aiSuggestion }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  updateLeadInList: (updatedLead) => set((state) => ({
    assignedLeads: state.assignedLeads.map(l => l.id === updatedLead.id ? updatedLead : l)
  })),
}));
