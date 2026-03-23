import { useEffect, useCallback } from 'react';
import { useTenantStore } from '../store/tenant.store';
import { TenantApi } from '../api';

export const useTenant = () => {
  const { setTenants, setLoading, setError, tenants, isLoading, error } = useTenantStore();

  const fetchTenants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await TenantApi.getTenants();
      setTenants(data);
    } catch (e) {
      setError('Hệ thống không thể truy xuất danh sách Tenant. Vui lòng kiểm tra kết nối.');
    } finally {
      setLoading(false);
    }
  }, [setTenants, setLoading, setError]);

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  return {
    tenants,
    isLoading,
    error,
    refresh: fetchTenants
  };
};
