import { useCallback, useEffect } from 'react';
import { useReportsStore } from '../store/reports.store';
import { ReportsApi } from '../api';
import { ReportFilterPayload } from '../../../../../packages/contracts/src/reports';

export const useReports = () => {
  const store = useReportsStore();

  const fetchFullReport = useCallback(async (filters?: ReportFilterPayload) => {
    store.setLoading(true);
    store.setError(null);
    try {
      const data = await ReportsApi.getFullReport(filters);
      store.setSummary(data.summary);
      store.setPerformance(data.performance);
    } catch (e: any) {
      store.setError(e.message || 'Không thể tải báo cáo hệ thống.');
    } finally {
      store.setLoading(false);
    }
  }, [store]);

  const updateFilters = useCallback((newFilters: ReportFilterPayload) => {
    store.setFilters(newFilters);
    fetchFullReport(newFilters);
  }, [store, fetchFullReport]);

  useEffect(() => {
    fetchFullReport(store.filters);
  }, []);

  return {
    ...store,
    fetchFullReport,
    updateFilters
  };
};
