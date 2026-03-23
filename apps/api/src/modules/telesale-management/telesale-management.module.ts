import { Module } from '@nestjs/common';
import { TelesaleManagementController } from './controllers/telesale-management.controller';
import { TelesaleManagementService } from './services/telesale-management.service';
import { AiSuggestionService } from './services/ai-suggestion.service';
import { LeadRepository } from './repositories/lead.repository';
import { TelesaleRepository } from './repositories/telesale.repository';

@Module({
  controllers: [TelesaleManagementController],
  providers: [
    TelesaleManagementService,
    AiSuggestionService,
    LeadRepository,
    TelesaleRepository,
  ],
  exports: [TelesaleManagementService],
})
export class TelesaleManagementModule {}
