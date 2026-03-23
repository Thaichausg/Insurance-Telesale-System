import { Controller, Get, Put, Body } from '@nestjs/common';
import { SystemConfigService } from '../services/system-config.service';
import { UpdateAiConfigDto } from '../dto/update-ai-config.dto';
import { UpdateDistributionDto } from '../dto/update-distribution-config.dto';

@Controller('system-config')
export class SystemConfigController {
  constructor(private readonly configService: SystemConfigService) {}

  @Get()
  async getGlobalConfig() {
    return this.configService.getMasterConfig();
  }

  @Put('ai')
  async updateAiConfig(@Body() body: UpdateAiConfigDto) {
    return this.configService.modifyAiConfig(body);
  }

  @Put('distribution')
  async updateDistributionConfig(@Body() body: UpdateDistributionDto) {
    return this.configService.modifyDistribution(body);
  }
}
