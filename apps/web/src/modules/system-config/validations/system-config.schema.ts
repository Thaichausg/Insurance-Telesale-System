import { z } from 'zod';
import { AI_PROVIDERS, DISTRIBUTION_STRATEGIES } from '../constants';

export const aiConfigSchema = z.object({
  provider: z.enum(AI_PROVIDERS as any),
  model: z.string().min(1, 'Model không được trống'),
  apiKey: z.string().min(1, 'API Key cấu hình không được phép rỗng'),
});

export const distributionConfigSchema = z.object({
  strategy: z.enum(DISTRIBUTION_STRATEGIES as any),
  batchSize: z.number().min(1).max(1000, 'Batch size tối đa chạy trong luồng async là 1000'),
});

export const followUpConfigSchema = z.object({
  defaultDays: z.number().min(1, 'Mặc định ít nhất ngày tới để gọi nhắc'),
  maxRetries: z.number().min(1, 'Cho phép gọi lại ít nhất 1 lần').max(10, 'Quá phiền KH'),
});
