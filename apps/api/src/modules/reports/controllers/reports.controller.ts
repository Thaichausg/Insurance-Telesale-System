import { Controller, Get, Query, UseGuards, Res } from '@nestjs/common';
import { ReportsService } from '../services/reports.service';
import { QueryReportDto } from '../dto/query-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('summary')
  async getSummary(@Query() query: QueryReportDto) {
    return this.reportsService.getSummary(query);
  }

  @Get('performance')
  async getPerformance(@Query() query: QueryReportDto) {
    return this.reportsService.getPerformance(query);
  }

  @Get('export/csv')
  async exportCsv(@Query() query: QueryReportDto, @Res() res: any) {
    const csvContent = await this.reportsService.exportCsv(query);
    const filename = `report_${Date.now()}.csv`;
    
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    return res.send(csvContent);
  }

  @Get('full')
  async getFullReport(@Query() query: QueryReportDto) {
    return this.reportsService.getFullReport(query);
  }
}
