export interface ImportLeadRow {
  id: string; // Fake ID for preview UI key
  customerName: string;
  phoneNumber: string;
  source: string;
  interestProduct: string;
  groupTag: string;
  isValid: boolean;  // Local check validation
  errors?: string[]; // Errors list for a row
}

export interface ImportResult {
  total: number;
  success: number;
  failed: number;
  message: string;
}

export interface ImportPayload {
  leads: Omit<ImportLeadRow, 'id' | 'isValid' | 'errors'>[];
}
