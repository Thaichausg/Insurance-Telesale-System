export type LeadStatus = 
  | 'NEW'
  | 'ASSIGNED'
  | 'CALLING'
  | 'FOLLOW_UP'
  | 'SUCCESS'
  | 'REJECTED'
  | 'EXPIRED'
  | 'BUSY'
  | 'NO_ANSWER'
  | 'CALL_BACK';

export type LeadSource = 'FACEBOOK' | 'GOOGLE' | 'ZALO' | 'REFERRAL' | 'DIRECT';

export interface Lead {
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
  deadlineAt?: string;
  createdAt: string; 
  updatedAt: string;
}

export interface LeadFilterParams {
  customerName?: string;
  phoneNumber?: string;
  status?: LeadStatus;
  source?: LeadSource;
  fromDate?: string;
  toDate?: string;
}

export interface CreateLeadPayload {
  customerName: string;
  phoneNumber: string;
  email?: string;
  source: LeadSource;
  groupTag?: string;
  interestProduct?: string;
  status?: LeadStatus;
  note?: string;
}

export interface AssignLeadPayload {
  leadId: string;
  agentId: string;
}

export interface UpdateLeadStatusPayload {
  status: LeadStatus;
  note?: string;
  followUpDate?: string;
  callDuration?: number;
}
