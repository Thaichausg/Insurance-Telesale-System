import { create } from 'zustand';
import { ReplyTemplate, AiSuggestionResponse } from '../../../../../packages/contracts/src/ai';

interface AiAssistantState {
  templates: ReplyTemplate[];
  lastSuggestion: AiSuggestionResponse | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setTemplates: (templates: ReplyTemplate[]) => void;
  setSuggestion: (suggestion: AiSuggestionResponse | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  resetAll: () => void;
}

export const useAiAssistantStore = create<AiAssistantState>((set) => ({
  templates: [],
  lastSuggestion: null,
  isLoading: false,
  error: null,

  setTemplates: (templates) => set({ templates, error: null }),
  setSuggestion: (lastSuggestion) => set({ lastSuggestion, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  resetAll: () => set({ templates: [], lastSuggestion: null, isLoading: false, error: null }),
}));
