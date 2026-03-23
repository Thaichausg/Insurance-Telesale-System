import { create } from 'zustand';
import { SystemConfigModel } from '../types';

interface SystemConfigState {
  config: SystemConfigModel | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;

  // Actions
  setConfig: (config: SystemConfigModel) => void;
  setLoading: (isLoading: boolean) => void;
  setSaving: (isSaving: boolean) => void;
  setError: (error: string | null) => void;
  updateAiConfig: (ai: SystemConfigModel['ai']) => void;
  updateDistributionConfig: (dist: SystemConfigModel['distribution']) => void;
  updateFollowUpConfig: (followUp: SystemConfigModel['followUp']) => void;
}

export const useSystemConfigStore = create<SystemConfigState>((set) => ({
  config: null,
  isLoading: false,
  isSaving: false,
  error: null,

  setLoading: (isLoading) => set({ isLoading }),
  setSaving: (isSaving) => set({ isSaving }),
  setError: (error) => set({ error }),
  
  setConfig: (config) => set({ config, error: null }),
  
  updateAiConfig: (ai) => set((state) => ({
    config: state.config ? { ...state.config, ai } : null
  })),
  
  updateDistributionConfig: (distribution) => set((state) => ({
    config: state.config ? { ...state.config, distribution } : null
  })),
  
  updateFollowUpConfig: (followUp) => set((state) => ({
    config: state.config ? { ...state.config, followUp } : null
  })),
}));
