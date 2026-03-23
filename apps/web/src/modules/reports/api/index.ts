import { api } from '@/lib/api-client';
import { 
  FullReportResponse, 
  ReportSummary, 
  PerformanceRow, 
  ReportFilterPayload,
  ExportFormat 
} from '../../../../../packages/contracts/src/reports';

export const ReportsApi = {
  getSummary: (filters?: ReportFilterPayload): Promise<ReportSummary> => 
    api.get<ReportSummary>('/reports/summary', { params: filters }),

  getPerformance: (filters?: ReportFilterPayload): Promise<PerformanceRow[]> => 
    api.get<PerformanceRow[]>('/reports/performance', { params: filters }),

  getFullReport: (filters?: ReportFilterPayload): Promise<FullReportResponse> => 
    api.get<FullReportResponse>('/reports/full', { params: filters }),

  exportCsv: async (filters?: ReportFilterPayload) => {
    // Gọi API lấy file dưới dạng Blob để xử lý Download tại Client
    const response = await api.get('/reports/export/csv', { 
      params: filters,
      responseType: 'blob' 
    });
    return response;
  }
};
