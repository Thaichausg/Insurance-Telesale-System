import { create } from 'zustand';
import { ExportHistoryRecord } from '../types';

interface ExportsState {
  historyLogs: ExportHistoryRecord[];
  isLoading: boolean;
  isRequesting: boolean;
  error: string | null;

  // Actions
  setHistoryLogs: (logs: ExportHistoryRecord[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setRequesting: (isRequesting: boolean) => void;
  appendLog: (log: ExportHistoryRecord) => void;
  updateLogStatus: (id: string, updates: Partial<ExportHistoryRecord>) => void;
}

export const useExportsStore = create<ExportsState>((set) => ({
  historyLogs: [],
  isLoading: false,
  isRequesting: false,
  error: null,

  setHistoryLogs: (logs) => set({ historyLogs: logs, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setRequesting: (isRequesting) => set({ isRequesting }),
  
  appendLog: (log) => set((state) => ({ 
    historyLogs: [log, ...state.historyLogs] 
  })),
  
  updateLogStatus: (id, updates) => set((state) => ({ 
    historyLogs: state.historyLogs.map(l => l.id === id ? { ...l, ...updates } : l) 
  })),
}));
