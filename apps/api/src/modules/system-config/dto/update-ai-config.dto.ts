import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export enum AiProviderEnum {
  OPENAI = 'OPENAI',
  GEMINI = 'GEMINI',
  CLAUDE = 'CLAUDE',
}

export class UpdateAiConfigDto {
  @IsEnum(AiProviderEnum)
  provider: AiProviderEnum;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  apiKey: string;
}
