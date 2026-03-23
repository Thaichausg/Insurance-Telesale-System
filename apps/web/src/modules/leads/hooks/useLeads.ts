import { useEffect, useCallback } from 'react';
import { useLeadsStore } from '../store/leads.store';
import { LeadsApi } from '../api';
import { CreateLeadPayload, UpdateLeadStatusPayload } from '../../../../../packages/contracts/src/leads';

export const useLeads = () => {
  const { 
    filterParams, 
    setLeads, 
    setLoading, 
    setError, 
    leads, 
    isLoading, 
    error 
  } = useLeadsStore();

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await LeadsApi.getLeads(filterParams);
      setLeads(data);
    } catch (e: any) {
      setError(e.message || 'Không thể truy xuất danh sách khách hàng từ hệ thống.');
    } finally {
      setLoading(false);
    }
  }, [filterParams, setLeads, setLoading, setError]);

  const createLead = useCallback(async (payload: CreateLeadPayload) => {
    setLoading(true);
    try {
      const newLead = await LeadsApi.createLead(payload);
      fetchLeads(); // Refresh list
      return newLead;
    } catch (e: any) {
      setError(e.message || 'Lỗi khi tạo Lead mới.');
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchLeads, setLoading, setError]);

  const updateStatus = useCallback(async (id: string, payload: UpdateLeadStatusPayload) => {
    try {
      const updated = await LeadsApi.updateStatus(id, payload);
      fetchLeads(); // Refresh list
      return updated;
    } catch (e: any) {
      setError(e.message || 'Lỗi khi cập nhật trạng thái.');
      return null;
    }
  }, [fetchLeads, setError]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return {
    leads,
    isLoading,
    error,
    createLead,
    updateStatus,
    refresh: fetchLeads
  };
};
