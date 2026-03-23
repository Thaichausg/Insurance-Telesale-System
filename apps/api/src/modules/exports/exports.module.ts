import { Module } from '@nestjs/common';
import { ExportsController } from './controllers/exports.controller';
import { ExportsService } from './services/exports.service';
import { ExportsRepository } from './repositories/exports.repository';
import { ExportCsvService } from './services/export-csv.service';
import { ExportExcelService } from './services/export-excel.service';
import { ExportPdfService } from './services/export-pdf.service';

@Module({
  controllers: [ExportsController],
  providers: [
    ExportsService,
    ExportsRepository,
    ExportCsvService,
    ExportExcelService,
    ExportPdfService
  ],
  exports: [ExportsService]
})
export class ExportsModule {}
