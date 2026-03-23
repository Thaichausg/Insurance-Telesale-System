import { useEffect, useCallback } from 'react';
import { useTelesaleStore } from '../store/telesale.store';
import { TelesaleApi } from '../api';

export const useTelesaleManagement = () => {
  const { 
    setLeads, 
    setLoading, 
    setError, 
    setProcessing,
    assignedLeads, 
    isLoading, 
    error,
    updateLeadStatus
  } = useTelesaleStore();

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await TelesaleApi.getAssignedLeads();
      setLeads(data);
    } catch (e) {
      setError('Không thể lấy danh sách lead được phân bổ. Vui lòng kiểm tra kết nối.');
    } finally {
      setLoading(false);
    }
  }, [setLeads, setLoading, setError]);

  const recordCall = useCallback(async (leadId: string, status: string, note?: string) => {
    setProcessing(true);
    try {
      // Gọi API cập nhật trạng thái thực tế
      const updatedLead = await TelesaleApi.updateLeadStatus(leadId, { 
        status: status as any, 
        note 
      });
      
      updateLeadStatus(leadId, updatedLead.status, updatedLead.followUpDate);
      return true;
    } catch (e) {
      alert('Không thể lưu kết quả cuộc gọi. Vui lòng thử lại.');
      return false;
    } finally {
      setProcessing(false);
    }
  }, [setProcessing, updateLeadStatus]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return {
    assignedLeads,
    isLoading,
    error,
    recordCall,
    refresh: fetchLeads
  };
};
