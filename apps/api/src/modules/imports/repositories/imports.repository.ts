import { Injectable } from '@nestjs/common';
import { LeadEntity } from '../entities/import.entity';

@Injectable()
export class ImportsRepository {
  private leadsDatabase: LeadEntity[] = [];

  /**
   * Giả lập check Duplicate số điện thoại trong Database 
   * @param phoneNumbers Mảng số cần check 
   * @returns Mảng số đã tồn tại trong DB 
   */
  async checkDuplicatePhones(phoneNumbers: string[]): Promise<string[]> {
    const existingPhones = this.leadsDatabase.map(l => l.phoneNumber);
    return phoneNumbers.filter(phone => existingPhones.includes(phone));
  }

  /**
   * Thực thi lệnh BATCH INSERT SQL để lưu cực nhanh
   */
  async bulkInsert(leads: LeadEntity[]): Promise<void> {
    this.leadsDatabase.push(...leads);
  }

  async getTotalRecords(): Promise<number> {
    return this.leadsDatabase.length;
  }
}
