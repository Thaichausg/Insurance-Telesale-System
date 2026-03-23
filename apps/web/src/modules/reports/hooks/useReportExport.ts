import { useState } from 'react';
import { ReportsApi } from '../api';
import { useReportsStore } from '../store/reports.store';
import { ExportFormat } from '../../../../../packages/contracts/src/reports';

export const useReportExport = () => {
  const [isExporting, setIsExporting] = useState<ExportFormat | null>(null);
  const { filters } = useReportsStore();

  const handleExport = async (format: ExportFormat) => {
    if (format !== 'CSV') {
       alert('Tính năng Export định dạng này đang được phát triển.');
       return;
    }

    setIsExporting(format);
    try {
      const blob = await ReportsApi.exportCsv(filters);
      
      // Tạo URL ảo để trình duyệt trigger download
      const url = window.URL.createObjectURL(new Blob([blob as any]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `BaoCao_HeThong_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      alert('Đã xảy ra lỗi trong quá trình xuất file. Vui lòng thử lại sau.');
    } finally {
      setIsExporting(null);
    }
  };

  return {
    handleExport,
    isExporting
  };
};
