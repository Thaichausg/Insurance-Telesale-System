import { api } from '@/lib/api-client';
import { 
  Lead, 
  LeadFilterParams, 
  CreateLeadPayload, 
  UpdateLeadStatusPayload 
} from '../../../../../packages/contracts/src/leads';

export const LeadsApi = {
  getLeads: (params?: LeadFilterParams): Promise<Lead[]> => 
    api.get<Lead[]>('/leads', params as any),

  getLeadById: (id: string): Promise<Lead> => 
    api.get<Lead>(`/leads/${id}`),

  createLead: (data: CreateLeadPayload): Promise<Lead> => 
    api.post<Lead>('/leads', data),

  updateStatus: (id: string, data: UpdateLeadStatusPayload): Promise<Lead> => 
    api.patch<Lead>(`/leads/${id}/status`, data),
    
  updateLead: (id: string, data: Partial<Lead>): Promise<Lead> => 
    api.patch<Lead>(`/leads/${id}`, data),
};
