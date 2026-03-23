import { create } from 'zustand';
import { ReportSummary, PerformanceRow, ReportFilterPayload } from '../../../../../packages/contracts/src/reports';

interface ReportsState {
  summary: ReportSummary | null;
  performance: PerformanceRow[];
  filters: ReportFilterPayload;
  isLoading: boolean;
  error: string | null;

  // Actions
  setSummary: (summary: ReportSummary) => void;
  setPerformance: (performance: PerformanceRow[]) => void;
  setFilters: (filters: ReportFilterPayload) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  resetAll: () => void;
}

export const useReportsStore = create<ReportsState>((set) => ({
  summary: null,
  performance: [],
  filters: {},
  isLoading: false,
  error: null,

  setSummary: (summary) => set({ summary, error: null }),
  setPerformance: (performance) => set({ performance, error: null }),
  setFilters: (filters) => set({ filters }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  resetAll: () => set({ summary: null, performance: [], filters: {}, isLoading: false, error: null }),
}));
