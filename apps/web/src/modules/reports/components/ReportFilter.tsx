import React from 'react';
import { useReports } from '../hooks/useReports';
import { UserRole } from '../../../../../packages/contracts/src/auth';

export const ReportFilter: React.FC = () => {
  const { filters, updateFilters, isLoading } = useReports();

  const handleFilterChange = (field: string, value: string) => {
    updateFilters({ ...filters, [field]: value });
  };

  return (
    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-100/50 mb-10 flex flex-wrap items-end gap-8 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50"></div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Bộ phận / Vai trò</label>
        <select 
          className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-600/20 focus:bg-white transition-all text-sm font-black text-slate-800 appearance-none cursor-pointer"
          value={filters.role || ''}
          onChange={(e) => handleFilterChange('role', e.target.value)}
          disabled={isLoading}
        >
          <option value="">TẤT CẢ PHÒNG BAN</option>
          <option value="TELESALE">TELESALE AGENT</option>
          <option value="MANAGER">MANAGER</option>
          <option value="ADMIN">ADMINISTRATOR</option>
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Từ ngày</label>
        <input 
          type="date" 
          className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-600/20 focus:bg-white transition-all text-sm font-black text-slate-800 appearance-none cursor-text"
          value={filters.fromDate || ''}
          onChange={(e) => handleFilterChange('fromDate', e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Đến ngày</label>
        <input 
          type="date" 
          className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-600/20 focus:bg-white transition-all text-sm font-black text-slate-800 appearance-none cursor-text"
          value={filters.toDate || ''}
          onChange={(e) => handleFilterChange('toDate', e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="w-16 h-16 bg-slate-900 border-4 border-white shadow-xl rounded-2xl flex items-center justify-center text-white text-xl cursor-not-allowed opacity-30 select-none">
         🔍
      </div>
    </div>
  );
};
