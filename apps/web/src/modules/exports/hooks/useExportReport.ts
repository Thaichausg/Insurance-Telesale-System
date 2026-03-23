import { useCallback } from 'react';
import { useExportsStore } from '../store/exports.store';
import { ExportApi } from '../api';
import { ExportFormat } from '../types';

export const useExportReport = () => {
  const { setRequesting, appendLog, updateLogStatus, setError } = useExportsStore();

  const requestExport = useCallback(async (format: ExportFormat) => {
    setRequesting(true);
    setError(null);

    const newId = `exp-${Math.random().toString(36).substr(2, 9)}`;
    const newLog = {
      id: newId,
      fileName: `export_report_${new Date().toISOString().split('T')[0]}.${format.toLowerCase()}`,
      format,
      status: 'PENDING' as const,
      requestedBy: 'Current User', // Real app would take from auth
      createdAt: new Date().toISOString()
    };

    appendLog(newLog);

    try {
      // Simulate backend preparation delay
      updateLogStatus(newId, { status: 'PROCESSING' });
      await new Promise(r => setTimeout(r, 3000));
      
      const result = await ExportApi.requestExport({ format });
      
      // Update with success info
      updateLogStatus(newId, { 
        status: 'COMPLETED', 
        completedAt: new Date().toISOString(),
        fileSizeKB: Math.floor(Math.random() * 500) + 50,
        downloadUrl: result.downloadUrl 
      });

      return result;
    } catch (e) {
      updateLogStatus(newId, { status: 'FAILED' });
      setError('Quá trình kết xuất file gặp lỗi kỹ thuật.');
      return null;
    } finally {
      setRequesting(false);
    }
  }, [setRequesting, appendLog, updateLogStatus, setError]);

  return { requestExport };
};
