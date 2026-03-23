import { SystemConfigModel } from '../types';

export const MOCK_SYSTEM_CONFIG: SystemConfigModel = {
  ai: {
    provider: 'GEMINI',
    model: 'gemini-1.5-flash',
    apiKey: 'AIzaSyA_mocked_gemini_key_1234567890',
  },
  distribution: {
    strategy: 'ROUND_ROBIN',
    batchSize: 50,
  },
  followUp: {
    defaultDays: 1, // Mặc định gọi lại nhắc vào ngày hôm sau
    maxRetries: 3,  // Tối đa 3 lần KH không nghe máy thì huỷ
  }
};
