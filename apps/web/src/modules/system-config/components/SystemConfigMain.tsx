import React from 'react';
import { useSystemConfig } from '../hooks/useSystemConfig';
import { AiProviderConfigCard } from './AiProviderConfigCard';
import { DistributionConfigCard } from './DistributionConfigCard';
import { FollowUpConfigCard } from './FollowUpConfigCard';
import { useSystemConfigStore } from '../store/system-config.store';

export const SystemConfigMain: React.FC = () => {
  const { config, isLoading, isSaving, error, saveConfig } = useSystemConfig();
  const { updateAiConfig, updateDistributionConfig, updateFollowUpConfig } = useSystemConfigStore();

  const handleSave = async () => {
    if (!config) return;
    const success = await saveConfig(config);
    if (success) {
       alert('Cấu hình hệ thống đã được cập nhật thành công!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
           <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
           <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Đang nạp cấu hình bộ não hệ thống...</p>
        </div>
      </div>
    );
  }

  if (error) {
     return (
        <div className="min-h-screen bg-rose-50 p-12 flex items-center justify-center">
           <div className="max-w-md text-center">
              <span className="text-6xl mb-6 block">🚧</span>
              <h2 className="text-2xl font-black text-rose-800 tracking-tight">Lỗi Truy Cập Cấu Hình</h2>
              <p className="text-rose-500 font-medium mt-3 mb-8">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-10 py-4 bg-rose-600 text-white rounded-2xl font-black shadow-xl shadow-rose-200 uppercase text-[10px] tracking-widest"
              >
                Thử tải lại
              </button>
           </div>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FF] p-6 lg:p-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-16">
           <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                 <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-lg uppercase tracking-tighter shadow-lg shadow-indigo-100">Super Admin Only</span>
                 <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">Core Engine Parameters</span>
              </div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">Cấu Hình Hệ Thống</h1>
              <p className="text-slate-500 font-medium text-lg">Điều chỉnh các thông số cốt lõi vận hành toàn bộ nền tảng ANTIGRAVITY.</p>
           </div>
           
           <button 
             onClick={handleSave}
             disabled={isSaving}
             className="px-12 py-5 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-emerald-600 transition-all text-xs uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 disabled:opacity-30 flex items-center gap-3"
           >
             {isSaving ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  ĐANG LƯU...
                </>
             ) : (
                <>LƯU CẤU HÌNH NGAY ✨</>
             )}
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
           <AiProviderConfigCard 
             data={config?.ai} 
             onChange={updateAiConfig} 
             isSaving={isSaving}
           />
           <DistributionConfigCard 
             data={config?.distribution} 
             onChange={updateDistributionConfig} 
             isSaving={isSaving}
           />
           <FollowUpConfigCard 
             data={config?.followUp} 
             onChange={updateFollowUpConfig} 
             isSaving={isSaving}
           />
        </div>

        <div className="p-12 bg-white border border-slate-100 rounded-[3rem] text-center opacity-40 grayscale pointer-events-none select-none">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 underline decoration-indigo-200 underline-offset-8">Advanced Security Zones</p>
           <h3 className="text-lg font-black text-slate-800 tracking-tight">Webhooks, SMTP & SSL Configuration</h3>
           <p className="text-slate-400 font-medium mt-1 uppercase text-[10px] tracking-widest italic">Modules coming in version 2.0</p>
        </div>
      </div>
    </div>
  );
};
