import { Injectable } from '@nestjs/common';
import { TelesaleEntity } from '../entities/telesale.entity';

@Injectable()
export class TelesaleRepository {
  private agents: TelesaleEntity[] = [];

  async findActiveAgents(): Promise<TelesaleEntity[]> {
    return this.agents.filter(a => a.isActive);
  }
}
