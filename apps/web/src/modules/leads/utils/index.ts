import { LeadStatusType } from '../types';

export const getStatusColorMap = (status: LeadStatusType) => {
  const map: Record<LeadStatusType, string> = {
    NEW: 'bg-blue-100 text-blue-800',
    ASSIGNED: 'bg-indigo-100 text-indigo-800',
    CALLING: 'bg-yellow-100 text-yellow-800',
    FOLLOW_UP: 'bg-purple-100 text-purple-800',
    SUCCESS: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    EXPIRED: 'bg-gray-100 text-gray-800',
    BUSY: 'bg-orange-100 text-orange-800',
    NO_ANSWER: 'bg-rose-100 text-rose-800',
    CALL_BACK: 'bg-teal-100 text-teal-800',
  };
  return map[status] || 'bg-slate-100 text-slate-800';
};
