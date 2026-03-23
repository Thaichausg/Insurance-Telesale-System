import { Injectable, NotFoundException } from '@nestjs/common';
import { ReplyTemplateEntity } from '../entities/ai-assistant.entity';

@Injectable()
export class AiAssistantRepository {
  private templates: ReplyTemplateEntity[] = [
    {
      id: 'tpl-1',
      keyword: 'không quan tâm',
      response: 'Dạ em cám ơn anh chị, em gửi Zalo sau lỡ cần sẽ có ạ.',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  async findAll(search?: string): Promise<ReplyTemplateEntity[]> {
    if (!search) return this.templates;
    return this.templates.filter(t => t.keyword.toLowerCase().includes(search.toLowerCase()));
  }

  async findActive(): Promise<ReplyTemplateEntity[]> {
    return this.templates.filter(t => t.isActive);
  }

  async create(data: Partial<ReplyTemplateEntity>): Promise<ReplyTemplateEntity> {
    const newTpl: ReplyTemplateEntity = {
      id: `tpl-${Date.now()}`,
      keyword: data.keyword!,
      response: data.response!,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.templates.unshift(newTpl);
    return newTpl;
  }

  async update(id: string, updates: Partial<ReplyTemplateEntity>): Promise<ReplyTemplateEntity> {
    const idx = this.templates.findIndex(t => t.id === id);
    if (idx === -1) throw new NotFoundException('Template not found');
    this.templates[idx] = { ...this.templates[idx], ...updates, updatedAt: new Date() };
    return this.templates[idx];
  }
}
