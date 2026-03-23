import { useEffect, useCallback } from 'react';
import { useSystemConfigStore } from '../store/system-config.store';
import { SystemConfigApi } from '../api';
import { SystemConfigModel } from '../types';

export const useSystemConfig = () => {
  const { config, setConfig, setLoading, setSaving, setError, isLoading, isSaving, error } = useSystemConfigStore();

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await SystemConfigApi.getConfig();
      setConfig(data);
    } catch (e) {
      setError('Không thể tải cấu hình hệ thống. Vui lòng kiểm tra quyền truy cập.');
    } finally {
      setLoading(false);
    }
  }, [setConfig, setLoading, setError]);

  const saveConfig = useCallback(async (newConfig: SystemConfigModel) => {
    setSaving(true);
    setError(null);
    try {
      // Simulate slow write process
      await new Promise(r => setTimeout(r, 1500));
      const result = await SystemConfigApi.updateConfig(newConfig);
      setConfig(result);
      return true;
    } catch (e) {
      setError('Lưu cấu hình thất bại. Vui lòng thử lại sau.');
      return false;
    } finally {
      setSaving(false);
    }
  }, [setConfig, setSaving, setError]);

  useEffect(() => {
    if (!config) fetchConfig();
  }, [config, fetchConfig]);

  return {
    config,
    isLoading,
    isSaving,
    error,
    saveConfig,
    refresh: fetchConfig
  };
};
