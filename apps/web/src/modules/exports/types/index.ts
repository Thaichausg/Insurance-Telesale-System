export type ExportFormat = 'CSV' | 'EXCEL' | 'PDF';
export type ExportStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface ExportFilterParams {
  startDate?: string;
  endDate?: string;
  role?: string;
  keyword?: string;
  format: ExportFormat;
}

export interface ExportHistoryRecord {
  id: string;
  fileName: string;
  format: ExportFormat;
  status: ExportStatus;
  requestedBy: string; // Tên nhân sự ấn Export
  createdAt: string;
  completedAt?: string;
  downloadUrl?: string;
  fileSizeKB?: number;
  totalRowsProcessed?: number;
}
