import { useCallback } from 'react';
import { useAiAssistantStore } from '../store/ai-assistant.store';
import { AiAssistantApi } from '../api';
import { AiSuggestionPayload } from '../../../../../packages/contracts/src/ai';

export const useAiAssistant = () => {
  const store = useAiAssistantStore();

  const fetchTemplates = useCallback(async (search?: string) => {
    store.setLoading(true);
    store.setError(null);
    try {
      const templates = await AiAssistantApi.getTemplates(search);
      store.setTemplates(templates);
    } catch (e: any) {
      store.setError(e.message || 'Không thể tải danh sách câu trả lời mẫu.');
    } finally {
      store.setLoading(false);
    }
  }, [store]);

  const generateReply = useCallback(async (payload: AiSuggestionPayload) => {
    store.setLoading(true);
    store.setError(null);
    try {
      const suggestion = await AiAssistantApi.generateReply(payload);
      store.setSuggestion(suggestion);
      return suggestion;
    } catch (e: any) {
      store.setError(e.message || 'Hệ thống AI đang bận hoặc gặp sự cố.');
      return null;
    } finally {
      store.setLoading(false);
    }
  }, [store]);

  return {
    ...store,
    fetchTemplates,
    generateReply
  };
};
