import React, { useState } from 'react';
import { useLeads } from '../hooks/useLeads';
import { LeadList } from './LeadList';
import { LeadFilter } from './LeadFilter';
import { LeadDetail } from './LeadDetail';

export const LeadMain: React.FC = () => {
  const { leads, isLoading, error, refresh } = useLeads();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedLead = leads.find(l => l.id === selectedId);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase italic">
            Lead <span className="text-indigo-600">Engine</span>
          </h1>
          <p className="text-slate-400 font-bold text-sm mt-1">Hệ thống quản lý dữ liệu khách hàng tiềm năng tập trung.</p>
        </div>
        
        <div className="flex gap-3">
           <button 
             onClick={() => refresh()}
             className="px-6 py-3 bg-white border-2 border-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-50 transition-all active:scale-95 flex items-center gap-2"
           >
             🔄 LÀM MỚI
           </button>
           <button className="px-6 py-3 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95">
             ➕ TẠO THỦ CÔNG
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
           <LeadFilter />
           <LeadList 
             leads={leads}
             isLoading={isLoading}
             error={error}
             selectedId={selectedId}
             onSelect={setSelectedId}
           />
        </div>

        <div className="xl:col-span-1">
           <LeadDetail 
             lead={selectedLead || null} 
             onClose={() => setSelectedId(null)} 
           />
        </div>
      </div>
    </div>
  );
};
