import { Injectable } from '@nestjs/common';
import { ReportsRepository } from '../repositories/reports.repository';
import { ReportsExportService } from './reports-export.service';
import { QueryReportDto } from '../dto/query-report.dto';
import { IReportSummary, IPerformanceRow, IFullReportResponse } from '../interfaces/report.interface';

@Injectable()
export class ReportsService {
  constructor(
    private readonly repo: ReportsRepository,
    private readonly exportService: ReportsExportService,
  ) {}

  async getSummary(query: QueryReportDto): Promise<IReportSummary> {
    const performanceData = await this.repo.getPerformanceData(query);
    return this.repo.getGlobalSummary(performanceData);
  }

  async getPerformance(query: QueryReportDto): Promise<IPerformanceRow[]> {
    return this.repo.getPerformanceData(query);
  }

  async getFullReport(query: QueryReportDto): Promise<IFullReportResponse> {
    const performance = await this.getPerformance(query);
    const summary = await this.repo.getGlobalSummary(performance);
    return { summary, performance };
  }

  async exportCsv(query: QueryReportDto): Promise<string> {
    return this.exportService.generateCsv(query);
  }
}
