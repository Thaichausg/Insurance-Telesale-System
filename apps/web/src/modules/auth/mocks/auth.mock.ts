import { User } from '../types';

export const MOCK_USERS: User[] = [
  { id: 'usr-1', email: 'admin@antigravity.com', name: 'Super Admin', role: 'SUPER_ADMIN', isActive: true },
  { id: 'usr-2', email: 'manager@antigravity.com', name: 'Sales Manager', role: 'MANAGER', isActive: true },
  { id: 'usr-3', email: 'telesale@antigravity.com', name: 'Agent Nguyễn', role: 'TELESALE', isActive: true },
];

export const MOCK_TOKEN = 'mock-jwt-token-123456789';
