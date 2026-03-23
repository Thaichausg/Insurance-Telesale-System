import { z } from 'zod';

const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

export const csvRowSchema = z.object({
  customerName: z.string().min(2, 'Tên quá ngắn').max(100, 'Tên quá dài'),
  phoneNumber: z.string().regex(phoneRegex, 'Sai định dạng SĐT Việt Nam'),
  source: z.string().max(50).optional(),
  interestProduct: z.string().max(100).optional(),
  groupTag: z.string().max(50).optional()
});

export const importPayloadSchema = z.array(csvRowSchema);
