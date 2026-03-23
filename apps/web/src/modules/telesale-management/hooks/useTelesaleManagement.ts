import { useCallback, useEffect } from 'react';
import { useTelesaleStore } from '../store/telesale.store';
import { TelesaleApi } from '../api';
import { UpdateLeadStatusPayload } from '../../../../../packages/contracts/src/leads';

export const useTelesaleManagement = () => {
  const store = useTelesaleStore();

  const fetchAssignedLeads = useCallback(async () => {
    store.setLoading(true);
    store.setError(null);
    try {
      const leads = await TelesaleApi.getAssignedLeads();
      store.setAssignedLeads(leads);
    } catch (e: any) {
      store.setError(e.message || 'Không thể tải danh sách Lead được giao.');
    } finally {
      store.setLoading(false);
    }
  }, [store]);

  const updateLeadStatus = useCallback(async (id: string, payload: UpdateLeadStatusPayload) => {
    try {
      const updated = await TelesaleApi.updateLeadStatus(id, payload);
      store.updateLeadInList(updated);
      return updated;
    } catch (e: any) {
      store.setError(e.message || 'Cập nhật trạng thái thất bại.');
      return null;
    }
  }, [store]);

  const getAiSuggestion = useCallback(async (id: string) => {
    try {
      const suggestion = await TelesaleApi.getAiSuggestion(id);
      store.setAiSuggestion(suggestion);
      return suggestion;
    } catch (e: any) {
      console.error('AI Suggestion error:', e);
      return null;
    }
  }, [store]);

  useEffect(() => {
    fetchAssignedLeads();
  }, [fetchAssignedLeads]);

  return {
    ...store,
    fetchAssignedLeads,
    updateLeadStatus,
    getAiSuggestion
  };
};
