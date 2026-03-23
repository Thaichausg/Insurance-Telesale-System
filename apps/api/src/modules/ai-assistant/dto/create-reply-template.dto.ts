import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateReplyTemplateDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  keyword: string;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  response: string;
}
