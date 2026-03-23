import React from 'react';
import { useReportExport } from '../hooks/useReportExport';

export const ExportButtons: React.FC = () => {
  const { handleExport, isExporting } = useReportExport();

  return (
    <div className="flex items-center gap-3">
       <button 
         onClick={() => handleExport('CSV')}
         disabled={!!isExporting}
         className="px-4 py-2 bg-white text-slate-700 text-sm font-semibold border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm focus:outline-none cursor-pointer disabled:opacity-50"
       >
         {isExporting === 'CSV' ? 'Đang xuất...' : '📦 Export CSV'}
       </button>
       <button 
         onClick={() => handleExport('EXCEL')}
         disabled={!!isExporting}
         className="px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors shadow-sm focus:outline-none cursor-pointer disabled:opacity-50"
       >
         {isExporting === 'EXCEL' ? 'Đang tạo...' : '📊 Tải Excel Template'}
       </button>
       <button 
         onClick={() => handleExport('PDF')}
         disabled={!!isExporting}
         className="px-4 py-2 bg-teal-50 text-teal-700 text-sm font-semibold border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors shadow-sm focus:outline-none cursor-pointer disabled:opacity-50"
       >
         {isExporting === 'PDF' ? 'Đang quét...' : '📕 Báo Cáo PDF'}
       </button>
    </div>
  );
};
