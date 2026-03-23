import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExportsService } from '../services/exports.service';
import { RequestExportDto } from '../dto/export-report.dto';

@Controller('exports')
export class ExportsController {
  constructor(private readonly service: ExportsService) {}

  @Get('history')
  async getHistoryLogs() {
    return this.service.getHistory();
  }

  @Post('request')
  async requestExport(@Body() body: RequestExportDto) {
    // Hardcode userRequesting là 'SysAdmin' cho Mock Demo
    return this.service.triggerExportJob(body, 'SysAdmin (Tài Khoản Tổng)');
  }
}
