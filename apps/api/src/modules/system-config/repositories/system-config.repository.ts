import { Injectable } from '@nestjs/common';
import { ISystemConfigResult } from '../interfaces/system-config.interface';

// Tự mock in-memory để phục vụ Logic Model theo chuẩn
let systemConfigRaw: ISystemConfigResult = {
  ai: { provider: 'GEMINI', model: 'gemini-1.5-flash', apiKey: 'AIzaSyA_mocked_key' },
  distribution: { strategy: 'ROUND_ROBIN', batchSize: 50 },
  followUp: { defaultDays: 1, maxRetries: 3 }
};

@Injectable()
export class SystemConfigRepository {
  async getGlobalConfig(): Promise<ISystemConfigResult> {
    return systemConfigRaw;
  }

  async setAiConfig(ai: any): Promise<boolean> {
    systemConfigRaw.ai = { ...ai };
    return true;
  }

  async setDistConfig(dist: any): Promise<boolean> {
    systemConfigRaw.distribution = { ...dist };
    return true;
  }
}
