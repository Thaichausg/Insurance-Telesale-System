import React from 'react';
import { useReports } from '../hooks/useReports';
import { ReportSummaryCards } from './ReportSummaryCards';
import { PerformanceTable } from './PerformanceTable';
import { ReportFilter } from './ReportFilter';
import { ExportButtons } from './ExportButtons';

export const ReportsMain: React.FC = () => {
  const { summary, performanceList, isLoading, error } = useReports();

  return (
    <div className="min-h-screen bg-[#FDFDFF] p-6 lg:p-12">
      <div className="max-w-[1700px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
           <div>
              <div className="flex items-center gap-3 mb-3">
                 <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-lg uppercase tracking-tighter shadow-lg shadow-indigo-100">BI Analytics</span>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Realtime Performance Tracking</span>
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Báo Cáo Hiệu Suất</h1>
              <p className="text-slate-500 font-medium text-lg mt-1">Phân tích chuyên sâu về tỷ lệ chuyển đổi, doanh thu và hiệu suất của đội ngũ nhân sự.</p>
           </div>

           <div className="flex items-center gap-4 bg-white p-2 rounded-3xl border border-slate-100 shadow-sm">
              <ExportButtons />
           </div>
        </div>

        <div className="mb-12">
           <ReportFilter />
        </div>

        <div className="mb-16">
           <ReportSummaryCards data={summary} isLoading={isLoading} />
        </div>

        <div>
           <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest">Bảng xếp hạng hiệu suất</h2>
              <div className="h-px flex-1 bg-slate-100"></div>
           </div>
           
           <PerformanceTable 
             data={performanceList} 
             isLoading={isLoading} 
             error={error} 
           />
        </div>
      </div>
    </div>
  );
};
