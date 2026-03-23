import { Injectable } from '@nestjs/common';
import { AiAssistantRepository } from '../repositories/ai-assistant.repository';
import { AiProviderAdapterService } from './ai-provider-adapter.service';
import { GenerateReplyDto } from '../dto/generate-reply.dto';
import { AiSuggestionResponse } from '../../../../../packages/contracts/src/ai';

@Injectable()
export class AiAssistantService {
  constructor(
    private readonly repo: AiAssistantRepository,
    private readonly aiAdapter: AiProviderAdapterService
  ) {}

  async getTemplates(search?: string) {
    return this.repo.findAll(search);
  }

  /**
   * Xử lý Phân tầng: Template Match -> Fallback LLM Generate
   */
  async generateReply(dto: GenerateReplyDto): Promise<AiSuggestionResponse> {
    const customerMsg = dto.customerMessage.toLowerCase();
    
    // Tầng 1: Rule-based template match
    const activeTemplates = await this.repo.findActive();
    for (const tpl of activeTemplates) {
      if (tpl.keywords.some(k => customerMsg.includes(k.toLowerCase()))) {
        return {
          replyText: tpl.response, // Giả định trường 'response' trong Entity
          suggestedActions: tpl.suggestedActions || ['Gọi lại sau 15p', 'Gửi tài liệu PDF'],
          confidence: 1.0
        };
      }
    }

    // Tầng 2: Fallback AI Generate
    const generatedText = await this.aiAdapter.generateCompletion(dto.customerMessage);
    
    return {
      replyText: generatedText,
      suggestedActions: ['Tư vấn chuyên sâu', 'Hẹn lịch gặp trực tiếp'],
      confidence: 0.85
    };
  }
}
