import { z } from 'zod';
import { USER_ROLES } from '../constants';

export const userFormSchema = z.object({
  name: z.string().min(2, 'Tên nhân sự phải từ 2 ký tự trở lên').max(100),
  email: z.string().email('Định dạng email sai, vd abc@email.com'),
  role: z.enum(USER_ROLES as any, { errorMap: () => ({ message: 'Vai trò (Role) không hợp lệ' }) }),
  parentId: z.string().nullable().optional(),
  password: z.string().min(6, 'Mật khẩu phải từ 6 ký tự').optional()
    .or(z.literal('')), // Rỗng = Không đổi mật khẩu
});

export type UserFormValues = z.infer<typeof userFormSchema>;
