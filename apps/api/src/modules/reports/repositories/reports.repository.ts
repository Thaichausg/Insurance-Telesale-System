import { Injectable } from '@nestjs/common';
import { PerformanceEntity } from '../entities/report.entity';
import { IReportSummary } from '../interfaces/report.interface';
import { QueryReportDto } from '../dto/query-report.dto';

@Injectable()
export class ReportsRepository {
  // Hardcode MOCK Data cho Database Simulator
  private mockPerfData: PerformanceEntity[] = [
    { id: 'emp-1', employeeName: 'Trần Nguyễn A', role: 'TELESALE', totalAssigned: 500, processed: 480, success: 120, rejected: 100, revenue: 120000000 },
    { id: 'emp-2', employeeName: 'Phạm Thị B', role: 'TELESALE', totalAssigned: 450, processed: 450, success: 150, rejected: 80, revenue: 180000000 },
    { id: 'emp-3', employeeName: 'Lê Hoàng C (TeamLead)', role: 'MANAGER', totalAssigned: 1200, processed: 1100, success: 300, rejected: 400, revenue: 450000000 },
    { id: 'emp-4', employeeName: 'Nguyễn Văn D', role: 'TELESALE', totalAssigned: 200, processed: 150, success: 10, rejected: 100, revenue: 15000000 },
  ];

  async getPerformanceData(query: QueryReportDto): Promise<PerformanceEntity[]> {
    // Nếu có DB thật: SELECT * FROM performance_view WHERE role = ? AND name ILIKE ?
    let res = [...this.mockPerfData];
    if (query.role && query.role !== 'ALL') {
       res = res.filter(r => r.role === query.role);
    }
    if (query.employeeName) {
       res = res.filter(r => r.employeeName.toLowerCase().includes(query.employeeName!.toLowerCase()));
    }
    return res;
  }

  async getGlobalSummary(filteredPerfData: PerformanceEntity[]): Promise<IReportSummary> {
    // Nếu có DB SQL Gốc: SELECT COUNT(*) as totalLeads FROM leads...
    const totalLeadsRaw = 45000; 

    const assigned = filteredPerfData.reduce((acc, curr) => acc + curr.totalAssigned, 0);
    const success = filteredPerfData.reduce((acc, curr) => acc + curr.success, 0);
    const rejected = filteredPerfData.reduce((acc, curr) => acc + curr.rejected, 0);
    const conversionRate = assigned > 0 ? Number(((success / assigned) * 100).toFixed(2)) : 0;

    return {
      totalLeads: totalLeadsRaw,
      assigned,
      success,
      rejected,
      conversionRate
    };
  }
}
