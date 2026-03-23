export class PerformanceEntity {
  id: string; // User ID / Employee ID
  employeeName: string;
  role: 'TELESALE' | 'MANAGER' | 'ADMIN';
  totalAssigned: number;
  processed: number;
  success: number;
  rejected: number;
  revenue: number;
  // NOTE: Đáng lý Performance không phai Entity Vật lý mà là VIEW SQL hoặc GroupBy result.
}
