import { api } from '@/lib/api-client';
import { Lead, UpdateLeadStatusPayload } from '../../../../../packages/contracts/src/leads';
import { AiSuggestionResponse } from '../../../../../packages/contracts/src/ai';

export const TelesaleApi = {
  getAssignedLeads: (): Promise<Lead[]> => 
    api.get<Lead[]>('/telesale-management/assigned'),

  updateLeadStatus: (id: string, data: UpdateLeadStatusPayload): Promise<Lead> => 
    api.patch<Lead>(`/telesale-management/leads/${id}/status`, data),

  getAiSuggestion: (id: string): Promise<AiSuggestionResponse> => 
    api.get<AiSuggestionResponse>(`/telesale-management/leads/${id}/ai-suggestion`),
};
