import { useState } from 'react';
import { AiAssistantApi } from '../api';
import { GeneratedReplyResult } from '../types';

export const useAiAssistant = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [replyInfo, setReplyInfo] = useState<GeneratedReplyResult | null>(null);

  const requestReply = async (message: string) => {
    if (!message.trim()) return;
    setIsGenerating(true);
    setReplyInfo(null);
    try {
      const data = await AiAssistantApi.generateReply({ customerMessage: message });
      setReplyInfo(data);
    } catch (e) {
      console.error('Lỗi khi gợi ý câu trả lời AI', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const clearSuggest = () => {
    setReplyInfo(null);
  };

  return { requestReply, isGenerating, replyInfo, clearSuggest };
};
