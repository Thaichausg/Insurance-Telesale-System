import { useState } from 'react';
import { LeadsApi } from '../api';
import { useLeadsStore } from '../store/leads.store';
import { LeadStatusType } from '../types';

export const useLeadActions = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { leads, setLeads, selectedLeadId } = useLeadsStore();

  const updateLeadStatus = async (leadId: string, status: LeadStatusType, notes?: string) => {
    setIsUpdating(true);
    try {
      const success = await LeadsApi.updateLeadStatus(leadId, status, notes);
      if (success) {
        // Cập nhật lại list ở store thay vì gọi API lại toàn bộ (Optimistic Update)
        const updatedLeads = leads.map(l => 
          l.id === leadId ? { ...l, status, notes: notes || l.notes } : l
        );
        setLeads(updatedLeads);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Lỗi cập nhật', error);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateLeadStatus, isUpdating };
};
