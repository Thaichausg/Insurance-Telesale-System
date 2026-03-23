export interface IImportResult {
  total: number;
  success: number;
  failed: number;
  message: string;
}

export interface ILeadRowData {
  customerName: string;
  phoneNumber: string;
  source?: string;
  interestProduct?: string;
  groupTag?: string;
}
