import { Injectable } from '@nestjs/common';

@Injectable()
export class AiSuggestionService {
  async getSuggestionForLead(leadId: string) {
    // Logic tương tác AI models (Llm)
    return {
      leadId,
      suggestion: '[AI] Khách hàng tiềm năng cao dòng Health Care. Hãy tập trung nhấn mạnh quyền lợi.',
      confidenceScorce: 0.95,
    };
  }
}
