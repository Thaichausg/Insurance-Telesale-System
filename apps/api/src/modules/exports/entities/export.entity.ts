export class ExportJobEntity {
  id: string; // exp-uuid
  fileName: string;
  format: 'CSV' | 'EXCEL' | 'PDF';
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  requestedBy: string; // Tên ng tạo
  downloadUrl: string; // Tóm url S3 nếu thành công
  fileSizeKB: number;
  totalRowsProcessed: number;
  errorLog?: string;
  createdAt: Date;
  updatedAt: Date;
}
