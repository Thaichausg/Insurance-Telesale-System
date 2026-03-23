import { api } from '@/lib/api-client';
import { AiSuggestionPayload, AiSuggestionResponse, ReplyTemplate } from '../../../../../packages/contracts/src/ai';

export const AiAssistantApi = {
  getTemplates: (search?: string): Promise<ReplyTemplate[]> => 
    api.get<ReplyTemplate[]>('/ai-assistant/templates', { params: { search } }),

  generateReply: (payload: AiSuggestionPayload): Promise<AiSuggestionResponse> => 
    api.post<AiSuggestionResponse>('/ai-assistant/generate', payload),
};
