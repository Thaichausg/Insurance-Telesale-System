import { Injectable } from '@nestjs/common';
import { LeadEntity } from '../entities/lead.entity';

@Injectable()
export class LeadRepository {
  private leads: LeadEntity[] = [];

  async findAll(): Promise<LeadEntity[]> {
    return this.leads;
  }

  async save(lead: LeadEntity): Promise<LeadEntity> {
    const index = this.leads.findIndex(l => l.id === lead.id);
    if (index > -1) {
      this.leads[index] = lead;
    } else {
      this.leads.push(lead);
    }
    return lead;
  }
}
