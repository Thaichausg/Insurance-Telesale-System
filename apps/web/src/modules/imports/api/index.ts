import { api } from '@/lib/api-client';

export const ImportApi = {
  importLeads: (payload: { leads: any[], tenantId?: string }) => 
    api.post<any>('/imports/leads', payload),
};
