import { api } from '@/lib/api-client';
import { ExportFilterParams, ExportHistoryRecord } from '../types';

export const ExportApi = {
  requestExport: (params: ExportFilterParams): Promise<{ downloadUrl: string }> => 
    api.post<{ downloadUrl: string }>('/exports/request', params),

  getHistory: (): Promise<ExportHistoryRecord[]> => 
    api.get<ExportHistoryRecord[]>('/exports/history'),

  deleteExportFile: (id: string): Promise<void> => 
    api.delete<void>(`/exports/${id}`),
};
