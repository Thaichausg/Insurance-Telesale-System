import { Lead, LeadStatus, LeadSource } from '../../../../../packages/contracts/src/leads';

export class LeadEntity implements Omit<Lead, 'createdAt' | 'updatedAt' | 'deadlineAt' | 'followUpDate'> {
  id: string;
  customerName: string;
  phoneNumber: string;
  email?: string;
  source: LeadSource;
  groupTag?: string;
  interestProduct?: string;
  status: LeadStatus;
  assignedToId?: string;
  createdById?: string;
  ownerType?: 'TENANT' | 'USER';
  note?: string;
  
  // Storage as Date objects
  deadlineAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
