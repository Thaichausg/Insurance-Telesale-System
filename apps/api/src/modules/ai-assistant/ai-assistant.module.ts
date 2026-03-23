import { Module } from '@nestjs/common';
import { AiAssistantController } from './controllers/ai-assistant.controller';
import { AiAssistantService } from './services/ai-assistant.service';
import { AiProviderAdapterService } from './services/ai-provider-adapter.service';
import { AiAssistantRepository } from './repositories/ai-assistant.repository';

@Module({
  controllers: [AiAssistantController],
  providers: [
    AiAssistantService,
    AiProviderAdapterService,
    AiAssistantRepository
  ],
  exports: [AiAssistantService, AiProviderAdapterService]
})
export class AiAssistantModule {}
