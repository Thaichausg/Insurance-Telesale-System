import React from 'react';
import { Tenant } from '../types';
import { useTenantStore } from '../store/tenant.store';
import { useTenantActions } from '../hooks/useTenantActions';

interface TenantListProps {
  tenants: Tenant[];
  isLoading: boolean;
  error: string | null;
}

export const TenantList: React.FC<TenantListProps> = ({ 
  tenants, 
  isLoading, 
  error 
}) => {
  const { openModal } = useTenantStore();
  const { handleToggle } = useTenantActions();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-64 bg-slate-100 rounded-3xl border border-slate-100"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-16 bg-rose-50 border-2 border-rose-100 rounded-[2.5rem] text-center max-w-2xl mx-auto shadow-2xl shadow-rose-100/50">
        <span className="text-6xl mb-6 block">🚧</span>
        <h3 className="text-2xl font-black text-rose-800 tracking-tight">Hệ thống đối tác đang bảo trì</h3>
        <p className="text-rose-500 font-medium mt-3">{error}</p>
        <button className="mt-8 px-10 py-4 bg-rose-600 text-white rounded-2xl font-black shadow-lg shadow-rose-200 hover:scale-105 transition-all uppercase tracking-widest text-xs">Thử lại ngay</button>
      </div>
    );
  }

  if (tenants.length === 0) {
    return (
      <div className="p-24 bg-white border-2 border-dashed border-slate-200 rounded-[3rem] text-center opacity-40 select-none">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🏢</div>
        <h3 className="text-xl font-black text-slate-500 tracking-widest uppercase">Chưa cấu hình đối tác</h3>
        <p className="text-slate-400 font-medium mt-2">Nhấn nút "Thêm Đối Tác" để bắt đầu thiết lập đa đại lý.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tenants.map((tenant) => (
        <div 
          key={tenant.id} 
          className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2 transition-all duration-300 group relative"
        >
          <div className="flex items-start justify-between mb-8">
             <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-2xl font-black text-white group-hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 uppercase">
                {tenant.name.charAt(0)}
             </div>
             <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                   tenant.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                }`}>
                   {tenant.status}
                </span>
                <span className="text-[10px] font-bold text-slate-300 uppercase font-mono">{tenant.code}</span>
             </div>
          </div>
          
          <h3 className="text-xl font-black text-slate-800 mb-2 truncate group-hover:text-indigo-600 transition-colors">{tenant.name}</h3>
          <div className="space-y-2 mb-8">
             <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <span className="opacity-50">📧</span> {tenant.contactEmail}
             </p>
             <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <span className="opacity-50">📞</span> {tenant.contactPhone}
             </p>
          </div>

          <div className="flex items-center gap-3">
             <button 
               onClick={() => openModal(tenant)}
               className="flex-1 py-3.5 bg-slate-50 text-slate-600 font-black text-[10px] rounded-2xl hover:bg-slate-900 hover:text-white transition-all uppercase tracking-widest"
             >
               Thiết lập
             </button>
             <button 
               onClick={() => handleToggle(tenant.id)}
               className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all border-2 ${
                 tenant.status === 'ACTIVE' 
                   ? 'border-emerald-50 text-emerald-600 hover:bg-rose-600 hover:text-white hover:border-rose-600' 
                   : 'border-rose-50 text-rose-600 hover:bg-emerald-600 hover:text-white hover:border-emerald-600'
               }`}
             >
               {tenant.status === 'ACTIVE' ? '🔒' : '🔓'}
             </button>
          </div>
        </div>
      ))}
    </div>
  );
};
