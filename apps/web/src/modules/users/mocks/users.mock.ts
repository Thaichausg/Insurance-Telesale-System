import { User } from '../types';

export const MOCK_USERS: User[] = [
  { id: 'usr-1', name: 'Giám Đốc Quang', email: 'quang@congty.com', role: 'SUPER_ADMIN', isActive: true, createdAt: '2026-01-01T00:00:00Z' },
  { id: 'usr-2', name: 'Quản Lý Hà', email: 'ha@congty.com', role: 'MANAGER', isActive: true, parentId: 'usr-1', createdAt: '2026-01-05T00:00:00Z' },
  { id: 'usr-3', name: 'Nhân Sự Bảo', email: 'bao.admin@congty.com', role: 'ADMIN', isActive: true, parentId: 'usr-1', createdAt: '2026-01-10T00:00:00Z' },
  { id: 'usr-4', name: 'Telesale Nhung', email: 'nhung.ts@congty.com', role: 'TELESALE', isActive: true, parentId: 'usr-2', createdAt: '2026-02-01T00:00:00Z' },
  { id: 'usr-5', name: 'Telesale Tuấn', email: 'tuan.ts@congty.com', role: 'TELESALE', isActive: false, parentId: 'usr-2', createdAt: '2026-02-15T00:00:00Z' },
  { id: 'usr-6', name: 'Quản Lý Phong', email: 'phong@congty.com', role: 'MANAGER', isActive: true, parentId: 'usr-1', createdAt: '2026-03-01T00:00:00Z' },
  { id: 'usr-7', name: 'Telesale My', email: 'my.ts@congty.com', role: 'TELESALE', isActive: true, parentId: 'usr-6', createdAt: '2026-03-10T00:00:00Z' },
];
