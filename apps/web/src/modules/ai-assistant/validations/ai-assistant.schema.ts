import { z } from 'zod';
import { MAX_KEYWORD_LENGTH, MAX_RESPONSE_LENGTH } from '../constants';

export const templateFormSchema = z.object({
  keyword: z.string().min(2, 'Từ khóa phải có ít nhất 2 ký tự').max(MAX_KEYWORD_LENGTH, 'Quá dài'),
  response: z.string().min(10, 'Câu trả lời mẫu phải đủ ý').max(MAX_RESPONSE_LENGTH, 'Nội dung vượt giới hạn'),
});

export type TemplateFormValues = z.infer<typeof templateFormSchema>;
