import { Injectable, NotFoundException } from '@nestjs/common';
import { ExportJobEntity } from '../entities/export.entity';

@Injectable()
export class ExportsRepository {
  private jobs: ExportJobEntity[] = [];

  async create(job: Partial<ExportJobEntity>): Promise<ExportJobEntity> {
    const newJob: ExportJobEntity = {
      id: `exp-${Date.now()}`,
      fileName: job.fileName || `Export_${Date.now()}`,
      format: job.format || 'CSV',
      status: 'PROCESSING',
      requestedBy: job.requestedBy || 'System',
      downloadUrl: '',
      fileSizeKB: 0,
      totalRowsProcessed: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...job
    };
    this.jobs.unshift(newJob);
    return newJob;
  }

  async update(id: string, updates: Partial<ExportJobEntity>): Promise<ExportJobEntity> {
    const idx = this.jobs.findIndex(j => j.id === id);
    if (idx === -1) throw new NotFoundException('Job ID không tồn tại');
    this.jobs[idx] = { ...this.jobs[idx], ...updates, updatedAt: new Date() };
    return this.jobs[idx];
  }

  async findAll(): Promise<ExportJobEntity[]> {
    return this.jobs;
  }
}
