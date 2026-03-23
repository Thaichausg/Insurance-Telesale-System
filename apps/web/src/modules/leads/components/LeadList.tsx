import React from 'react';
import { Lead } from '../../../../../packages/contracts/src/leads';

interface LeadListProps {
  leads: Lead[];
  isLoading: boolean;
  error: string | null;
  onSelect: (id: string) => void;
  selectedId: string | null;
}

export const LeadList: React.FC<LeadListProps> = ({ 
  leads, 
  isLoading, 
  error, 
  onSelect, 
  selectedId 
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-slate-50 border border-slate-100 rounded-2xl"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 bg-rose-50 border-2 border-rose-100 rounded-3xl text-center">
        <span className="text-4xl mb-3 block">🚨</span>
        <h3 className="text-lg font-black text-rose-800">Lỗi truy xuất dữ liệu</h3>
        <p className="text-rose-500 font-medium text-sm">{error}</p>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="p-16 border-2 border-dashed border-slate-200 rounded-[2rem] text-center opacity-40">
        <span className="text-5xl mb-4 block">📥</span>
        <h3 className="text-base font-black text-slate-500 uppercase tracking-widest">Kho lead trống</h3>
        <p className="text-slate-400 font-medium text-sm mt-1">Hệ thống hiện tại chưa ghi nhận Lead nào thỏa mãn điều kiện.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white border border-slate-100 rounded-[2rem] shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100">
            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Khách Hàng</th>
            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Chiến Dịch</th>
            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nguồn</th>
            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng Thái</th>
            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Giao Cho</th>
            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ngày Tạo</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {leads.map((lead) => (
            <tr 
              key={lead.id} 
              onClick={() => onSelect(lead.id)}
              className={`group cursor-pointer transition-all hover:bg-slate-50/80 ${selectedId === lead.id ? 'bg-indigo-50/50' : ''}`}
            >
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{lead.customerName}</span>
                  <span className="text-xs font-bold text-slate-400 font-mono tracking-tight">{lead.phoneNumber}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-xs font-bold text-indigo-500">{lead.groupTag || 'Organic'}</span>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-black rounded-lg uppercase tracking-tighter">
                  {lead.source}
                </span>
              </td>
              <td className="px-6 py-4">
                 <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                       lead.status === 'NEW' ? 'bg-indigo-500 ring-4 ring-indigo-50' :
                       lead.status === 'ASSIGNED' ? 'bg-blue-500 ring-4 ring-blue-50' :
                       lead.status === 'SUCCESS' ? 'bg-emerald-500 ring-4 ring-emerald-50' :
                       'bg-slate-300 ring-4 ring-slate-50'
                    }`}></span>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{lead.status}</span>
                 </div>
              </td>
              <td className="px-6 py-4">
                 {lead.assignedToId ? (
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center text-[10px] text-white font-black">A</div>
                       <span className="text-xs font-bold text-slate-500 truncate max-w-[100px]">{lead.assignedToId}</span>
                    </div>
                 ) : (
                    <span className="text-xs font-bold text-slate-300 italic">Chưa giao</span>
                 )}
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-xs font-bold text-slate-400">{new Date(lead.createdAt).toLocaleDateString('vi-VN')}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
