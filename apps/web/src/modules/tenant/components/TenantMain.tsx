import React from 'react';
import { useTenant } from '../hooks/useTenant';
import { useTenantStore } from '../store/tenant.store';
import { TenantList } from './TenantList';
import { TenantForm } from './TenantForm';

export const TenantMain: React.FC = () => {
  const { tenants, isLoading, error } = useTenant();
  const { openModal } = useTenantStore();

  return (
    <div className="min-h-screen bg-[#FDFDFF] p-6 lg:p-12">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
           <div>
              <div className="flex items-center gap-3 mb-2">
                 <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-lg uppercase tracking-tighter">Tenant Center</span>
                 <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Multi-Agency Engine</span>
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Hệ Thống Đối Tác (Tenant)</h1>
              <p className="text-slate-500 font-medium text-lg mt-1 max-w-xl">Cấ hình cơ chế hoạt động riêng biệt cho từng đại lý bảo hiểm trên cùng một nền tảng Core.</p>
           </div>

           <button 
             onClick={() => openModal()}
             className="px-10 py-5 bg-indigo-600 text-white font-black rounded-[2rem] hover:bg-indigo-700 shadow-2xl shadow-indigo-200 transition-all active:scale-[0.98] uppercase tracking-widest text-xs flex items-center gap-3"
           >
             <span className="text-2xl font-light leading-none">+</span> Thêm Đối Tác Mới
           </button>
        </div>

        <TenantList 
          tenants={tenants} 
          isLoading={isLoading} 
          error={error} 
        />

        <TenantForm />
      </div>
    </div>
  );
};
