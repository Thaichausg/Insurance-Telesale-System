export class LeadEntity {
  id: string; // Database PK
  importBatchId?: string; // Track tệp import nào tạo ra nó
  customerName: string;
  phoneNumber: string;
  source: string;
  interestProduct: string;
  groupTag: string;
  status: string; // Trạng thái sale: NEW, MOCK...
  createdAt: Date;
  updatedAt: Date;
}
