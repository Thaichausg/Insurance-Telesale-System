export interface Tenant {
  id: string;
  name: string;
  code: string; // Unique slug for the tenant
  domain?: string;
  status: 'ACTIVE' | 'INACTIVE';
  contactEmail: string;
  contactPhone: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTenantInput extends Omit<Tenant, 'id' | 'createdAt' | 'updatedAt'> {}
export interface UpdateTenantInput extends Partial<CreateTenantInput> {}
