import { IsArray, IsString } from 'class-validator';

export class AssignLeadDto {
  @IsArray()
  @IsString({ each: true })
  leadIds: string[];

  @IsArray()
  @IsString({ each: true })
  agentIds: string[];
}
