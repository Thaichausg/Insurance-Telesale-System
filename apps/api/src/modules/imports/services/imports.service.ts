import { Injectable } from '@nestjs/common';
import { ImportsRepository } from '../repositories/imports.repository';
import { ImportLeadsDto } from '../dto/import-leads.dto';
import { IImportResult } from '../interfaces/import.interface';
import { LeadEntity } from '../entities/import.entity';

@Injectable()
export class ImportsService {
  constructor(private readonly repo: ImportsRepository) {}

  async processMassImport(dto: ImportLeadsDto): Promise<IImportResult> {
    const total = dto.leads.length;
    if (total === 0) return { total: 0, success: 0, failed: 0, message: 'Dữ liệu trống' };

    // 1. Phân tách danh sách SĐT để gửi truy vấn Batch Check trùng lặp
    const reqPhones = dto.leads.map(l => l.phoneNumber);
    
    // 2. Chọc Database lấy về những số trùng (Fake)
    const existingPhones = await this.repo.checkDuplicatePhones(reqPhones);
    const existingSet = new Set(existingPhones);

    // 3. Phân mảnh Success và Failed
    const validLeads: LeadEntity[] = [];
    const batchId = `import-BATCH-${Date.now()}`;

    dto.leads.forEach(l => {
      // Nếu số điện thoại KHÔNG NẰM TRONG DB thì là lead mới
      if (!existingSet.has(l.phoneNumber)) {
        validLeads.push({
          id: `lead-${Date.now()}-${Math.random().toString(36).substring(7)}`,
          importBatchId: batchId,
          customerName: l.customerName,
          phoneNumber: l.phoneNumber,
          source: l.source || '',
          interestProduct: l.interestProduct || '',
          groupTag: l.groupTag || '',
          status: 'NEW', // Lead mới tải lên chưa ai đụng 
          createdAt: new Date(),
          updatedAt: new Date()
        });
        
        // Cập nhật lại Set để check trùng lặp NỘI BỘ file import luôn
        existingSet.add(l.phoneNumber);
      }
    });

    const success = validLeads.length;
    const failed = total - success;

    // 4. Batch lưu Database
    if (success > 0) {
      await this.repo.bulkInsert(validLeads);
    }

    return {
      total,
      success,
      failed,
      message: `Quá trình import hoàn tất. Thành công: ${success}. Thất bại (trùng số điện thoại trong file hoặc hệ thống): ${failed}.`
    };
  }
}
