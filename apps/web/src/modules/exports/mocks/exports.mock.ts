import { ExportHistoryRecord } from '../types';

export const MOCK_EXPORT_HISTORY: ExportHistoryRecord[] = [
  {
    id: 'exp-1',
    fileName: 'Bao_Cao_Hieu_Suat_Thang_10_2026.pdf',
    format: 'PDF',
    status: 'COMPLETED',
    requestedBy: 'Khương Hữu T',
    createdAt: '2026-10-15T08:30:00Z',
    completedAt: '2026-10-15T08:31:12Z',
    downloadUrl: '#mock-link-pdf',
    fileSizeKB: 2450,
    totalRowsProcessed: 420
  },
  {
    id: 'exp-2',
    fileName: 'Danh_Sach_Lead_Chua_Goi.csv',
    format: 'CSV',
    status: 'COMPLETED',
    requestedBy: 'Trần Văn A (Telesale)',
    createdAt: '2026-10-16T14:00:00Z',
    completedAt: '2026-10-16T14:00:05Z',
    downloadUrl: '#mock-link-csv',
    fileSizeKB: 120,
    totalRowsProcessed: 850
  },
  {
    id: 'exp-3',
    fileName: 'Thong_Ke_Doanh_Thu_TongTieu.xlsx',
    format: 'EXCEL',
    status: 'FAILED',
    requestedBy: 'Giám Đốc Quang',
    createdAt: '2026-10-17T09:12:00Z',
    fileSizeKB: 0,
    totalRowsProcessed: 0
  }
];
