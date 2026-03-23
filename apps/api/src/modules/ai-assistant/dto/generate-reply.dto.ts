import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';
import { AiSuggestionPayload } from '../../../../../packages/contracts/src/ai';

export class GenerateReplyDto implements AiSuggestionPayload {
  @IsString()
  @IsNotEmpty({ message: 'Nội dung tin nhắn khách hàng không được để trống' })
  customerMessage: string;

  @IsString()
  @IsOptional()
  context?: string;

  @IsString()
  @IsOptional()
  provider?: string;

  @IsString()
  @IsOptional()
  model?: string;
}
