import { Injectable } from '@nestjs/common';
import { TenantRepository } from '../repositories/tenant.repository';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { UpdateTenantDto } from '../dto/update-tenant.dto';

@Injectable()
export class TenantService {
  constructor(private readonly repository: TenantRepository) {}

  async getAllTenants() {
    return this.repository.findAll();
  }

  async createTenant(dto: CreateTenantDto) {
    return this.repository.create(dto);
  }

  async updateTenant(id: string, dto: UpdateTenantDto) {
    return this.repository.update(id, dto);
  }

  async toggleStatus(id: string) {
    const tenant = await this.repository.findOne(id);
    if (!tenant) throw new Error('Tenant not found');
    return this.repository.update(id, { 
      status: tenant.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' 
    });
  }
}
