import React from 'react';
import { useReports } from '../hooks/useReports';

export const ReportSummaryCards: React.FC = () => {
  const { summary, isLoading } = useReports();

  if (isLoading && !summary) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-[2rem] border border-slate-50"></div>
        ))}
      </div>
    );
  }

  if (!summary) return null;

  const formatPercent = (val: number) => `${val.toFixed(1)}%`;

  const kpis = [
    { label: 'Tổng số Lead', value: summary.totalLeads.toLocaleString('vi-VN'), color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
    { label: 'Đã phân phối', value: summary.totalAssigned.toLocaleString('vi-VN'), color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
    { label: 'Thành Công', value: summary.totalSuccess.toLocaleString('vi-VN'), color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
    { label: 'Thất bại (Từ chối)', value: summary.totalRejected.toLocaleString('vi-VN'), color: 'text-rose-600', bg: 'bg-rose-50 border-rose-100' },
    { label: 'Tỉ lệ Chốt', value: formatPercent(summary.conversionRate), color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100', highlight: true }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
       {kpis.map((k, idx) => (
         <div key={idx} className={`${k.bg} p-6 border-2 rounded-[2rem] shadow-sm relative overflow-hidden group hover:scale-[1.03] transition-all duration-300`}>
           <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 opacity-60">{k.label}</div>
           <div className={`text-3xl lg:text-4xl font-black tracking-tighter ${k.color} ${k.highlight ? 'drop-shadow-md' : ''}`}>
              {k.value}
           </div>
           
           {/* Subtle micro-decoration */}
           <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/20 rounded-full blur-2xl group-hover:bg-white/40 transition-all"></div>
         </div>
       ))}
    </div>
  );
};
