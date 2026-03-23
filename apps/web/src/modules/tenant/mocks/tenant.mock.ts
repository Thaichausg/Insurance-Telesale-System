import { Tenant } from '../types';

export const MOCK_TENANTS: Tenant[] = [
  {
    id: 't-1',
    name: 'Đại lý Bảo hiểm Miền Bắc',
    code: 'dl-mien-bac',
    domain: 'mienbac.baohiem.com',
    status: 'ACTIVE',
    contactEmail: 'contact@mienbac.vn',
    contactPhone: '0243123456',
    address: 'Hà Nội',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
