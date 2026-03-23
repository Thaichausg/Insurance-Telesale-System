import { z } from 'zod';

export const tenantSchema = z.object({
  name: z.string().min(3, 'Tên đối tác phải có ít nhất 3 ký tự').max(100),
  code: z.string().min(2, 'Mã định danh quá ngắn').max(50),
  domain: z.string().url('Định dạng domain không hợp lệ').optional().or(z.literal('')),
  contactEmail: z.string().email('Email không hợp lệ'),
  contactPhone: z.string().min(10, 'Số điện thoại không hợp lệ').max(15),
  address: z.string().max(200).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
});
