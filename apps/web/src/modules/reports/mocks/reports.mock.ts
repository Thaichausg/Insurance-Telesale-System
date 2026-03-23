import { ReportSummaryData, PerformanceRecord } from '../types';

export const MOCK_SUMMARY: ReportSummaryData = {
  totalLeads: 45000,
  assigned: 38500,
  success: 8500,
  rejected: 12000,
  conversionRate: 22.07 // 8500 / 38500
};

export const MOCK_PERFORMANCE_LIST: PerformanceRecord[] = [
  { id: 'emp-1', employeeName: 'Trần Nguyễn A', role: 'TELESALE', totalAssigned: 500, processed: 480, success: 120, rejected: 100, revenue: 120000000 },
  { id: 'emp-2', employeeName: 'Phạm Thị B', role: 'TELESALE', totalAssigned: 450, processed: 450, success: 150, rejected: 80, revenue: 180000000 },
  { id: 'emp-3', employeeName: 'Lê Hoàng C (TeamLead)', role: 'MANAGER', totalAssigned: 1200, processed: 1100, success: 300, rejected: 400, revenue: 450000000 },
  { id: 'emp-4', employeeName: 'Nguyễn Văn D', role: 'TELESALE', totalAssigned: 200, processed: 150, success: 10, rejected: 100, revenue: 15000000 },
];
