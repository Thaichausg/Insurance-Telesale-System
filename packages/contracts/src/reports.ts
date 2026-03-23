import { UserRole } from './auth';

export interface ReportSummary {
  totalLeads: number;
  totalAssigned: number;
  totalSuccess: number;
  totalRejected: number;
  conversionRate: number; // Percent %
  activeAgents: number;
}

export interface PerformanceRow {
  userId: string;
  userName: string;
  role: UserRole;
  teamName?: string;
  totalLeads: number;
  successCount: number;
  rejectedCount: number;
  conversionRate: number; // Percent %
  lastActivityAt?: string;
}

export interface ReportFilterPayload {
  role?: UserRole;
  userName?: string;
  teamName?: string;
  fromDate?: string;
  toDate?: string;
}

export type ExportFormat = 'CSV' | 'EXCEL' | 'PDF';

export interface FullReportResponse {
  summary: ReportSummary;
  performance: PerformanceRow[];
}
