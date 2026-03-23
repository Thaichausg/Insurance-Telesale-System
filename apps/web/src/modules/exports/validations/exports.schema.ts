import { z } from 'zod';
import { EXPORT_FORMATS } from '../constants';

export const exportRequestSchema = z.object({
  format: z.enum(EXPORT_FORMATS as any, { errorMap: () => ({ message: 'Định dạng file không hỗ trợ' }) }),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  role: z.string().optional(),
  keyword: z.string().optional(),
});
