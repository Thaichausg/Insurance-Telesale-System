import React from 'react';
import { useExportReport } from '../hooks/useExportReport';

export const ExportButtons: React.FC = () => {
  const { triggerExport, isRequesting } = useExportReport();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
       <h2 className="text-lg font-bold text-slate-800 mb-2">Trung Tâm Kết Xuất Báo Cáo & Danh Sách Lead</h2>
       <p className="text-sm text-slate-500 mb-6">Bạn có thể ấn tạo báo cáo dưới nhiều định dạng. Hãy chờ từ 10s - 1 phút nếu File có lượng dữ liệu lớn.</p>
       
       <div className="flex flex-wrap gap-4">
          <button 
             disabled={isRequesting}
             onClick={() => triggerExport('EXCEL')}
             className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 shadow flex-col md:flex-row disabled:opacity-50 transition-all"
          >
             <span className="text-xl">📊</span> Xuất báo cáo EXCEL
          </button>
          
          <button 
             disabled={isRequesting}
             onClick={() => triggerExport('CSV')}
             className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 shadow flex-col md:flex-row disabled:opacity-50 transition-all"
          >
             <span className="text-xl">📄</span> Export Raw CSV 
          </button>
          
          <button 
             disabled={isRequesting}
             onClick={() => triggerExport('PDF')}
             className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 shadow flex-col md:flex-row disabled:opacity-50 transition-all"
          >
             <span className="text-xl">📕</span> Tải tệp PDF Ký tên
          </button>
       </div>
    </div>
  );
};
