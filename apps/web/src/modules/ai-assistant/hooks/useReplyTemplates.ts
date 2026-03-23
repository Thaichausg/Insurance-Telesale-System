import { useState, useEffect } from 'react';
import { AiAssistantApi } from '../api';
import { useAiAssistantStore } from '../store/ai-assistant.store';
import { ReplyTemplate } from '../types';

export const useReplyTemplates = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  
  const { filterParams, setTemplates, closeForm } = useAiAssistantStore();

  const fetchList = async () => {
    setIsLoading(true);
    try {
      const data = await AiAssistantApi.getTemplates(filterParams.search);
      setTemplates(data);
    } catch(e) { console.error('Error fetching rules', e); }
    finally { setIsLoading(false); }
  };

  useEffect(() => {
    fetchList();
  }, [filterParams.search]);

  const saveTemplate = async (id: string | undefined, payload: { keyword: string; response: string }) => {
    setIsMutating(true);
    try {
      if (id) await AiAssistantApi.updateTemplate(id, payload);
      else await AiAssistantApi.createTemplate(payload);
      closeForm();
      fetchList();
    } catch(e) {} finally { setIsMutating(false); }
  };

  const toggleStatus = async (id: string, current: boolean) => {
    await AiAssistantApi.toggleTemplateStatus(id, !current);
    fetchList();
  };

  return { isLoading, isMutating, saveTemplate, toggleStatus, refresh: fetchList };
};
