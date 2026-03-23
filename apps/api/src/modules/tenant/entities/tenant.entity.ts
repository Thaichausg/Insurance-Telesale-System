export class TenantEntity {
  id: string;
  name: string;
  code: string;
  domain?: string;
  status: 'ACTIVE' | 'INACTIVE';
  contactEmail: string;
  contactPhone: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}
