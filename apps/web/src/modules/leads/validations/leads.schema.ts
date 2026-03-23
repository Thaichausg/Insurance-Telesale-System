import { z } from 'zod';
import { LEAD_STATUSES } from '../constants';

export const updateLeadSchema = z.object({
  status: z.enum([
    'NEW', 'ASSIGNED', 'CALLING', 'FOLLOW_UP', 
    'SUCCESS', 'REJECTED', 'EXPIRED', 'BUSY', 
    'NO_ANSWER', 'CALL_BACK'
  ]),
  notes: z.string().optional(),
});

export type UpdateLeadDto = z.infer<typeof updateLeadSchema>;
