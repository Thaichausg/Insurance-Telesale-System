import React from 'react';
import { useLeadsStore } from '../store/leads.store';
import { LeadStatus, LeadSource } from '../../../../../packages/contracts/src/leads';

export const LeadFilter: React.FC = () => {
  const { filterParams, setFilterParams } = useLeadsStore();

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-wrap items-center gap-4 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Tìm kiếm khách hàng</label>
        <input
          type="text"
          placeholder="Tên khách hàng hoặc số điện thoại..."
          className="w-full px-5 py-3 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-indigo-600/20 focus:bg-white outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
          value={filterParams.customerName || filterParams.phoneNumber || ''}
          onChange={(e) => setFilterParams({ customerName: e.target.value, phoneNumber: e.target.value })}
        />
      </div>

      <div className="w-40">
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Trạng thái</label>
        <select 
          className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm text-slate-600 appearance-none"
          value={filterParams.status || ''}
          onChange={(e) => setFilterParams({ status: (e.target.value || undefined) as LeadStatus })}
        >
          <option value="">TẤT CẢ</option>
          <option value="NEW">MỚI (NEW)</option>
          <option value="ASSIGNED">ĐÃ GIAO</option>
          <option value="SUCCESS">THÀNH CÔNG</option>
          <option value="REJECTED">TỪ CHỐI</option>
        </select>
      </div>

      <div className="w-40">
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Nguồn Lead</label>
        <select 
          className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-indigo-600/20 focus:bg-white outline-none transition-all font-bold text-sm text-slate-600 appearance-none"
          value={filterParams.source || ''}
          onChange={(e) => setFilterParams({ source: (e.target.value || undefined) as LeadSource })}
        >
          <option value="">TẤT CẢ</option>
          <option value="FACEBOOK">FACEBOOK</option>
          <option value="GOOGLE">GOOGLE</option>
          <option value="ZALO">ZALO</option>
          <option value="DIRECT">TRỰC TIẾP</option>
        </select>
      </div>

      <button className="h-[46px] w-[46px] bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-black transition-colors shadow-lg shadow-slate-100 self-end">
         🔍
      </button>
    </div>
  );
};
