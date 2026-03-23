import { LeadStatusType } from '../types';

export const LEAD_STATUSES: Record<string, LeadStatusType> = {
  NEW: 'NEW',
  ASSIGNED: 'ASSIGNED',
  CALLING: 'CALLING',
  FOLLOW_UP: 'FOLLOW_UP',
  SUCCESS: 'SUCCESS',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED',
  BUSY: 'BUSY',
  NO_ANSWER: 'NO_ANSWER',
  CALL_BACK: 'CALL_BACK',
};
