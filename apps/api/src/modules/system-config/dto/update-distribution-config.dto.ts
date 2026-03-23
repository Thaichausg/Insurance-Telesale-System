import { IsEnum, IsNumber, Min, Max } from 'class-validator';

export enum StrategyEnum {
  ROUND_ROBIN = 'ROUND_ROBIN',
  KPI_BASED = 'KPI_BASED',
  MANUAL = 'MANUAL'
}

export class UpdateDistributionDto {
  @IsEnum(StrategyEnum)
  strategy: StrategyEnum;

  @IsNumber()
  @Min(1)
  @Max(1000)
  batchSize: number;
}
