import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantEntity } from '../entities/tenant.entity';

@Injectable()
export class TenantRepository {
  private tenants: TenantEntity[] = [
    {
      id: 't-1',
      name: 'Đại lý Bảo hiểm Miền Bắc',
      code: 'dl-mien-bac',
      domain: 'mienbac.baohiem.com',
      status: 'ACTIVE',
      contactEmail: 'contact@mienbac.vn',
      contactPhone: '0243123456',
      address: 'Hà Nội',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 't-2',
      name: 'Tổng kho Bảo hiểm Sài Gòn',
      code: 'sg-insurance',
      domain: 'saigon.ins.vn',
      status: 'ACTIVE',
      contactEmail: 'admin@saigonins.com',
      contactPhone: '0283987654',
      address: 'TP. Hồ Chí Minh',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findAll(): Promise<TenantEntity[]> {
    return this.tenants;
  }

  async findOne(id: string): Promise<TenantEntity | undefined> {
    return this.tenants.find(t => t.id === id);
  }

  async create(data: Partial<TenantEntity>): Promise<TenantEntity> {
    const newTenant: TenantEntity = {
      ...data,
      id: `t-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as TenantEntity;
    this.tenants.push(newTenant);
    return newTenant;
  }

  async update(id: string, data: Partial<TenantEntity>): Promise<TenantEntity> {
    const index = this.tenants.findIndex(t => t.id === id);
    if (index === -1) throw new NotFoundException('Partner not found');
    this.tenants[index] = { ...this.tenants[index], ...data, updatedAt: new Date() };
    return this.tenants[index];
  }
}
