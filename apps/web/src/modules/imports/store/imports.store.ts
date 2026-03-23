import { create } from 'zustand';
import { ImportLeadRow, ImportResult } from '../types';

export type ImportStep = 'UPLOAD' | 'PREVIEW' | 'RESULT';

interface ImportsState {
  step: ImportStep;
  previewData: ImportLeadRow[];
  isProcessing: boolean;
  importResult: ImportResult | null;
  error: string | null;

  // Actions
  setStep: (step: ImportStep) => void;
  setPreviewData: (data: ImportLeadRow[]) => void;
  setProcessing: (isProcessing: boolean) => void;
  setResult: (result: ImportResult | null) => void;
  setError: (error: string | null) => void;
  removeRow: (id: string) => void;
  resetAll: () => void;
}

export const useImportsStore = create<ImportsState>((set) => ({
  step: 'UPLOAD',
  previewData: [],
  isProcessing: false,
  importResult: null,
  error: null,

  setStep: (step) => set({ step }),
  setPreviewData: (previewData) => set({ previewData, error: null, importResult: null, step: 'PREVIEW' }),
  setProcessing: (isProcessing) => set({ isProcessing }),
  setResult: (importResult) => set({ importResult, previewData: [], step: 'RESULT' }),
  setError: (error) => set({ error }),
  
  removeRow: (id) => set((state) => ({ 
    previewData: state.previewData.filter(r => r.id !== id) 
  })),

  resetAll: () => set({ 
    step: 'UPLOAD', 
    previewData: [], 
    isProcessing: false, 
    importResult: null, 
    error: null 
  }),
}));
