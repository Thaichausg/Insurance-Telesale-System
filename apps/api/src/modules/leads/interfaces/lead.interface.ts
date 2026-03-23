import { Lead, LeadStatus, LeadSource } from '../../../../../packages/contracts/src/leads';

export interface ILead extends Omit<Lead, 'createdAt' | 'updatedAt' | 'followUpDate'> {
  createdAt: Date;
  updatedAt?: Date;
  followUpDate?: Date;
}

export type { LeadStatus, LeadSource };
