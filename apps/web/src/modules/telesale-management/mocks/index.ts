import { Lead, TelesaleAgent } from '../types';

export const MOCK_AGENTS: TelesaleAgent[] = [
  { id: 'agent-1', name: 'Nguyễn Văn A', status: 'ACTIVE', currentLeadsCount: 5 },
  { id: 'agent-2', name: 'Trần Thị B', status: 'ACTIVE', currentLeadsCount: 3 },
];

export const MOCK_LEADS: Lead[] = [
  { 
    id: 'lead-1', 
    name: 'Phạm Hùng Dũng', 
    phone: '0901234567', 
    status: 'NEW', 
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString() 
  },
  { 
    id: 'lead-2', 
    name: 'Lê Thị Thu Thảo', 
    phone: '0987654321', 
    status: 'CALLBACK', 
    followUpDate: new Date().toISOString(), // Today
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString() 
  },
  { 
    id: 'lead-3', 
    name: 'Nguyễn Minh Tuấn', 
    phone: '0912345678', 
    status: 'INTERESTED', 
    lastCallDuration: 45,
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString() 
  },
  { 
    id: 'lead-4', 
    name: 'Vũ Hoàng Anh', 
    phone: '0933445566', 
    status: 'NOT_INTERESTED', 
    lastCallDuration: 12,
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString() 
  },
  { 
    id: 'lead-5', 
    name: 'Đặng Bảo Ngọc', 
    phone: '0966778899', 
    status: 'NEW', 
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString() 
  },
  { 
    id: 'lead-6', 
    name: 'Hoàng Quốc Việt', 
    phone: '0977889900', 
    status: 'CALLBACK', 
    followUpDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString() 
  },
];
