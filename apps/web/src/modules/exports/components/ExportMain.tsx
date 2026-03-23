import React from 'react';
import { useExportsStore } from '../store/exports.store';
import { useExportReport } from '../hooks/useExportReport';
import { ExportHistoryTable } from './ExportHistoryTable';
import { ExportButtons } from './ExportButtons';

export const ExportMain: React.FC = () => {
  const { historyLogs, isLoading, error } = useExportsStore();
  const { requestExport } = useExportReport();

  return (
    <div className="min-h-screen bg-[#FBFBFF] p-6 lg:p-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-20">
           <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                 <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded-lg uppercase tracking-tighter">Export Engine</span>
                 <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">Data Portability Active</span>
              </div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">Kết Xuất Dữ Liệu</h1>
              <p className="text-slate-500 font-medium text-xl leading-relaxed">Xuất toàn bộ báo cáo, danh sách khách hàng và hiệu suất nhân sự ra các định dạng chuẩn quốc tế.</p>
           </div>
           
           <div className="p-8 bg-white border border-slate-100 rounded-[3rem] shadow-2xl shadow-indigo-100/50 flex flex-col items-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Chọn định dạng xuất ngay</p>
              <div className="flex gap-4">
                 <button onClick={() => requestExport('CSV')} className="group flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg shadow-indigo-50 font-black">C</div>
                    <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">CSV</span>
                 </button>
                 <button onClick={() => requestExport('EXCEL')} className="group flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-xl group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-lg shadow-emerald-50 font-black">X</div>
                    <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Excel</span>
                 </button>
                 <button onClick={() => requestExport('PDF')} className="group flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-xl group-hover:bg-rose-600 group-hover:text-white transition-all shadow-lg shadow-rose-50 font-black">P</div>
                    <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">PDF</span>
                 </button>
              </div>
           </div>
        </div>

        <div className="space-y-10">
           <div className="flex items-center gap-4">
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest">Lịch sử kết xuất gần đây</h2>
              <div className="h-px flex-1 bg-slate-100"></div>
           </div>

           <ExportHistoryTable 
             data={historyLogs} 
             isLoading={isLoading} 
             error={error} 
           />
        </div>
      </div>
    </div>
  );
};
