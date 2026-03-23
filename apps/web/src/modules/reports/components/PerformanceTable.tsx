import React from 'react';
import { PerformanceRow } from '../../../../../packages/contracts/src/reports';

interface PerformanceTableProps {
  data: PerformanceRow[];
  isLoading: boolean;
  error: string | null;
}

export const PerformanceTable: React.FC<PerformanceTableProps> = ({ 
  data, 
  isLoading, 
  error 
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 bg-slate-50 border border-slate-100 rounded-2xl"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-16 bg-rose-50 border-2 border-rose-100 rounded-[2.5rem] text-center max-w-2xl mx-auto shadow-2xl shadow-rose-100/50">
        <span className="text-6xl mb-6 block">🚨</span>
        <h3 className="text-2xl font-black text-rose-800 tracking-tight">Lỗi Tổng Hợp Báo Cáo</h3>
        <p className="text-rose-500 font-medium mt-3">{error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="p-24 bg-white border-2 border-dashed border-slate-200 rounded-[3rem] text-center opacity-40 select-none">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">📊</div>
        <h3 className="text-xl font-black text-slate-500 tracking-widest uppercase">Trống thông tin hiệu suất</h3>
        <p className="text-slate-400 font-medium mt-2">Dữ liệu nhân sự không khớp với bộ lọc hiện tại.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-100/50">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-900 text-white">
          <tr className="border-b border-slate-800">
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">Thành Viên</th>
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">Team</th>
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-center">Tổng Lead</th>
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-center">Thành Công</th>
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-center">Từ Chối</th>
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-center">Tỉ Lệ Chốt</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row) => (
            <tr key={row.userId} className="group hover:bg-indigo-50/30 transition-all cursor-default">
              <td className="px-8 py-6">
                 <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-slate-900 border-2 border-indigo-500/20 flex items-center justify-center text-white text-xs font-black group-hover:bg-indigo-600 transition-colors">
                       {row.userName.charAt(0)}
                    </div>
                    <div>
                       <p className="text-sm font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{row.userName}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{row.role}</p>
                    </div>
                 </div>
              </td>
              <td className="px-8 py-6">
                 <span className="text-[10px] font-black text-slate-500 uppercase bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 group-hover:bg-white transition-all">
                    {row.teamName || 'N/A'}
                 </span>
              </td>
              <td className="px-8 py-6 text-center text-sm font-bold text-slate-600">{row.totalLeads}</td>
              <td className="px-8 py-6 text-center">
                 <span className="px-4 py-1.5 bg-emerald-100 text-emerald-600 rounded-xl text-xs font-black border border-emerald-200">{row.successCount}</span>
              </td>
              <td className="px-8 py-6 text-center">
                 <span className="px-4 py-1.5 bg-rose-100 text-rose-500 rounded-xl text-xs font-black border border-rose-200">{row.rejectedCount}</span>
              </td>
              <td className="px-8 py-6 text-center">
                 <div className="flex flex-col items-center">
                    <span className="text-sm font-black text-indigo-600 tracking-tight">{row.conversionRate.toFixed(1)}%</span>
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden border border-slate-50">
                       <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${row.conversionRate}%` }}></div>
                    </div>
                 </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
