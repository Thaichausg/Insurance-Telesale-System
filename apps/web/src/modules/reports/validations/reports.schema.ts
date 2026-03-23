import { z } from 'zod';

export const reportFilterSchema = z.object({
  role: z.string().optional(),
  employeeName: z.string().max(100).optional(),
  status: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
