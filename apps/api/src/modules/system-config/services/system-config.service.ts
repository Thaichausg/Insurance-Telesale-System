import { Injectable } from '@nestjs/common';
import { SystemConfigRepository } from '../repositories/system-config.repository';
import { UpdateAiConfigDto } from '../dto/update-ai-config.dto';
import { UpdateDistributionDto } from '../dto/update-distribution-config.dto';

@Injectable()
export class SystemConfigService {
  constructor(private readonly configRepo: SystemConfigRepository) {}

  async getMasterConfig() {
    return this.configRepo.getGlobalConfig();
  }

  async modifyAiConfig(dto: UpdateAiConfigDto) {
    await this.configRepo.setAiConfig(dto);
    return { success: true, updatedConfig: dto };
  }

  async modifyDistribution(dto: UpdateDistributionDto) {
    await this.configRepo.setDistConfig(dto);
    return { success: true, updatedConfig: dto };
  }
}
