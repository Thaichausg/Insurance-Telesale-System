import { Injectable, Logger } from '@nestjs/common';
import { ExportsRepository } from '../repositories/exports.repository';
import { ExportCsvService } from './export-csv.service';
import { ExportExcelService } from './export-excel.service';
import { ExportPdfService } from './export-pdf.service';
import { RequestExportDto, ExportFormatEnum } from '../dto/export-report.dto';
import { ExportJobEntity } from '../entities/export.entity';

@Injectable()
export class ExportsService {
  private readonly logger = new Logger(ExportsService.name);

  constructor(
    private readonly repo: ExportsRepository,
    private readonly csvWorker: ExportCsvService,
    private readonly excelWorker: ExportExcelService,
    private readonly pdfWorker: ExportPdfService
  ) {}

  async getHistory(): Promise<ExportJobEntity[]> {
    return this.repo.findAll();
  }

  /**
   * Bước 1: Trả về HTTP Status 202 Nhanh (với Ticket ID).
   * Đẩy task nặng xuống Background Async Method (KHÔNG await worker ở Controller)
   */
  async triggerExportJob(dto: RequestExportDto, userRequesting: string): Promise<ExportJobEntity> {
    
    // 1. Tạo Job Status = 'PROCESSING' trong DB để Client có cái theo dõi UI
    const job = await this.repo.create({
      format: dto.format as 'CSV' | 'EXCEL' | 'PDF',
      requestedBy: userRequesting,
      fileName: `Dataset_${dto.format}_${Date.now()}`
    });

    // 2. Chạy ngầm tiến trình (Background worker)
    // Lưu ý: Trong Product Server ta dùng Queue (BullMQ, Kafka). 
    // Dưới đây là mô phỏng Async lỏng lẻo (Fire and forget).
    this.runWorkerAsync(job.id, dto).catch(err => {
       this.logger.error(`Job [${job.id}] Failed: `, err);
       this.repo.update(job.id, { status: 'FAILED', errorLog: err.message });
    });

    // 3. Trả về mã Ticket cho Web Request
    return job;
  }

  /**
   * Bước 2: Background Function tự chạy. Tách logic file theo Model Factory Pattern
   */
  private async runWorkerAsync(jobId: string, filterConfig: RequestExportDto) {
    let result: { url: string; size: number; rows: number };

    // Phân luồng cho Worker tương ứng gánh việc nặng
    switch (filterConfig.format) {
      case ExportFormatEnum.CSV:
        result = await this.csvWorker.processGeneration(jobId, filterConfig);
        break;
      case ExportFormatEnum.EXCEL:
        result = await this.excelWorker.processGeneration(jobId, filterConfig);
        break;
      case ExportFormatEnum.PDF:
        result = await this.pdfWorker.processGeneration(jobId, filterConfig);
        break;
      default:
        throw new Error('Unsupported format');
    }

    // 4. Update Database sau khi Worker làm xong
    await this.repo.update(jobId, {
      status: 'COMPLETED',
      downloadUrl: result.url,
      fileSizeKB: result.size,
      totalRowsProcessed: result.rows
    });
  }
}
