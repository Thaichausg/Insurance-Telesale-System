import React from 'react';
import { Lead } from '../../../../../packages/contracts/src/leads';

interface Props {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  selectedLeadId?: string;
  isLoading: boolean;
  error?: string | null;
}

export const AssignedLeadsList: React.FC<Props> = ({ 
  leads, 
  onSelectLead, 
  selectedLeadId, 
  isLoading, 
  error 
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
        <h3 className="text-lg font-black text-rose-800">Lỗi kết nối dữ liệu</h3>
        <p className="text-rose-500 font-medium text-sm">{error}</p>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="p-16 border-2 border-dashed border-slate-200 rounded-[2rem] text-center opacity-40">
        <span className="text-5xl mb-4 block">📥</span>
        <h3 className="text-base font-black text-slate-500 uppercase tracking-widest">Kho lead trống</h3>
        <p className="text-slate-400 font-medium text-sm mt-1">Chưa có Lead mới được giao cho bạn hôm nay.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-4 custom-scrollbar-indigo">
      {leads.map((lead) => (
        <div
          key={lead.id}
          onClick={() => onSelectLead(lead)}
          className={`px-5 py-4 rounded-[1.5rem] border-2 transition-all cursor-pointer group ${
            selectedLeadId === lead.id
              ? 'border-indigo-600 bg-indigo-50/50 shadow-xl shadow-indigo-100'
              : 'border-slate-50 bg-white hover:border-slate-200 hover:bg-slate-50/50'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-black text-slate-800 flex items-center gap-2 tracking-tight group-hover:text-indigo-600 transition-colors">
                {lead.customerName}
                {['CALL_BACK', 'FOLLOW_UP'].includes(lead.status) && (
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse ring-4 ring-amber-50"></span>
                )}
              </h4>
              <p className="text-xs font-bold text-slate-400 font-mono mt-0.5">{lead.phoneNumber}</p>
            </div>
            <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
              lead.status === 'NEW' ? 'bg-indigo-600 text-white' :
              lead.status === 'CALL_BACK' ? 'bg-amber-100 text-amber-600 border border-amber-200' :
              lead.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' :
              'bg-slate-100 text-slate-600 border border-slate-200'
            }`}>
              {lead.status}
            </span>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lead.source}</span>
             {lead.deadlineAt && (
                <p className="text-[10px] font-black text-rose-500 flex items-center gap-1 uppercase">
                   ⌛ {new Date(lead.deadlineAt).toLocaleDateString()}
                </p>
             )}
          </div>
        </div>
      ))}
    </div>
  );
};
