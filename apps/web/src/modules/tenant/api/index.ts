import { api } from '@/lib/api-client';
import { Tenant, TenantPayload } from '../types';

export const TenantApi = {
  getTenants: (): Promise<Tenant[]> => 
    api.get<Tenant[]>('/tenants'),

  getTenantById: (id: string): Promise<Tenant> => 
    api.get<Tenant>(`/tenants/${id}`),

  createTenant: (data: TenantPayload): Promise<Tenant> => 
    api.post<Tenant>('/tenants', data),

  updateTenant: (id: string, data: Partial<TenantPayload>): Promise<Tenant> => 
    api.patch<Tenant>(`/tenants/${id}`, data),

  toggleTenant: (id: string): Promise<Tenant> => 
    api.post<Tenant>(`/tenants/${id}/toggle`, {}),
};
