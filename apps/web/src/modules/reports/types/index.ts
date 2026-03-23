export interface ReportSummaryData {
  totalLeads: number;
  assigned: number;
  success: number;
  rejected: number;
  conversionRate: number; // Tỷ lệ Success / Assigned (%)
}

export interface PerformanceRecord {
  id: string;
  employeeName: string;
  role: 'TELESALE' | 'MANAGER' | 'ADMIN';
  totalAssigned: number;
  processed: number;
  success: number;
  rejected: number;
  revenue: number;
}

export interface ReportFilterParams {
  role?: string;
  employeeName?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}
