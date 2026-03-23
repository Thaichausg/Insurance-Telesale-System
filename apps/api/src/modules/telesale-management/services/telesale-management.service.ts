import { Injectable } from '@nestjs/common';
import { LeadRepository } from '../repositories/lead.repository';
import { TelesaleRepository } from '../repositories/telesale.repository';
import { AiSuggestionService } from './ai-suggestion.service';

@Injectable()
export class TelesaleManagementService {
  constructor(
    private readonly leadRepo: LeadRepository,
    private readonly agentRepo: TelesaleRepository,
    private readonly aiService: AiSuggestionService,
  ) {}

  async assignLeadsRoundRobin(leadIds: string[], agentIds: string[]) {
    // Thuật toán Round Robin chạy phía backend
    return { success: true, assignedCount: Math.min(leadIds.length, agentIds.length) };
  }

  async updateLeadStatus(leadId: string, status: string, notes?: string) {
    return { success: true, leadId, status, updated: new Date() };
  }

  async getAiSuggestion(leadId: string) {
    return this.aiService.getSuggestionForLead(leadId);
  }
}
