import { Injectable } from '@nestjs/common';
import { QueryReportDto } from '../dto/query-report.dto';
import { ReportsRepository } from '../repositories/reports.repository';

@Injectable()
export class ReportsExportService {
  constructor(private readonly repo: ReportsRepository) {}

  async generateCsv(filter: QueryReportDto): Promise<string> {
    const data = await this.repo.getPerformanceData(filter);
    
    // Header
    const headers = ['User ID', 'User Name', 'Role', 'Team', 'Total Leads', 'Success Count', 'Rejected Count', 'Conversion Rate (%)'];
    const rows = data.map(row => [
      row.userId,
      row.userName,
      row.role,
      row.teamName || 'N/A',
      row.totalLeads,
      row.successCount,
      row.rejectedCount,
      row.conversionRate.toFixed(1)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    return csvContent;
  }

  // Placeholder for future Excel/PDF
  async generateExcel(filter: QueryReportDto): Promise<Buffer> {
    throw new Error('Tính năng Export Excel đang được phát triển.');
  }

  async generatePdf(filter: QueryReportDto): Promise<Buffer> {
    throw new Error('Tính năng Export PDF đang được phát triển.');
  }
}
