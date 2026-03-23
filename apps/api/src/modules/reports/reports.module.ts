import { Module } from '@nestjs/common';
import { ReportsController } from './controllers/reports.controller';
import { ReportsService } from './services/reports.service';
import { ReportsExportService } from './services/reports-export.service';
import { ReportsRepository } from './repositories/reports.repository';

@Module({
  controllers: [ReportsController],
  providers: [
    ReportsService,
    ReportsExportService,
    ReportsRepository,
  ],
  exports: [ReportsService],
})
export class ReportsModule {}
