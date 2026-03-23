export interface IExportJob {
  id: string;
  format: string;
  status: string;
  fileName: string;
  downloadUrl?: string;
  totalRowsProcessed?: number;
  fileSizeKB?: number;
}
