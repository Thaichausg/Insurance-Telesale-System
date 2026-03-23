import React from 'react';
import { useAiAssistantStore } from '../store/ai-assistant.store';
import { useReplyTemplates } from '../hooks/useReplyTemplates';

export const ReplyTemplateList: React.FC = () => {
  const { templates, openForm } = useAiAssistantStore();
  const { toggleStatus } = useReplyTemplates();

  if (templates.length === 0) {
    return <div className="p-8 text-center text-slate-400 bg-white border border-dashed rounded-xl">Chưa có kịch bản mẫu nào được tạo.</div>;
  }

  return (
    <div className="space-y-4">
      {templates.map((tpl) => (
        <div key={tpl.id} className={`p-5 bg-white border rounded-xl shadow-sm transition-opacity ${!tpl.isActive ? 'opacity-60 border-rose-200' : 'border-slate-200'}`}>
          <div className="flex justify-between items-start mb-3">
             <div className="flex gap-2 items-center">
               <span className="font-bold text-slate-800 text-lg">"{tpl.keyword}"</span>
               <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${tpl.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                 {tpl.isActive ? 'Active' : 'Disabled'}
               </span>
             </div>
             
             <div className="flex gap-2">
               <button 
                 onClick={() => openForm(tpl)}
                 className="text-xs px-3 py-1.5 font-medium border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 transition-colors"
               >
                 Sửa
               </button>
               <button 
                 onClick={() => toggleStatus(tpl.id, tpl.isActive)}
                 className={`text-xs px-3 py-1.5 font-medium border rounded-md transition-colors ${tpl.isActive ? 'text-rose-600 border-rose-200 hover:bg-rose-50' : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50'}`}
               >
                 {tpl.isActive ? 'Khóa' : 'Mở khóa'}
               </button>
             </div>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 relative">
             <span className="absolute -top-3 left-4 bg-slate-200 text-slate-600 px-2 py-0.5 text-[10px] font-bold uppercase rounded z-10">AI Reply Template</span>
             <p className="text-sm text-slate-700 leading-relaxed font-medium mt-1">
               {tpl.response}
             </p>
          </div>
        </div>
      ))}
    </div>
  );
};
