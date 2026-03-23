import React from 'react';
import { AiSuggestionBox } from './AiSuggestionBox';
import { ReplyTemplateList } from './ReplyTemplateList';
import { ReplyTemplateForm } from './ReplyTemplateForm';
import { KeywordSearchBox } from './KeywordSearchBox';
import { useAiAssistantStore } from '../store/ai-assistant.store';

export const AiAssistantMain: React.FC = () => {
  const { openForm } = useAiAssistantStore();

  return (
    <div className="min-h-screen bg-[#F8F9FE] p-6 lg:p-12">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex flex-col xl:flex-row gap-12">
           
           {/* Left Sidebar: Templates & Rules */}
           <div className="xl:w-[450px] space-y-10">
              <div>
                 <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-lg uppercase tracking-tighter">AI Knowledge Base</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">v1.2 Stable</span>
                 </div>
                 <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kịch Bản & Mẫu Phản Hồi</h1>
                 <p className="text-slate-500 font-medium text-sm mt-1">Quản lý các quy tắc và câu trả lời mẫu cho hệ thống.</p>
              </div>

              <KeywordSearchBox />

              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm overflow-hidden">
                 <div className="flex items-center justify-between mb-6 px-2">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Danh sách mẫu</h3>
                    <button 
                      onClick={() => openForm()}
                      className="w-8 h-8 rounded-lg bg-slate-900 text-white hover:bg-indigo-600 transition-all font-black"
                    >
                      +
                    </button>
                 </div>
                 <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    <ReplyTemplateList />
                 </div>
              </div>
           </div>

           {/* Right Center: AI Creative Space */}
           <div className="flex-1 space-y-10">
              <div className="p-12 bg-indigo-900 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
                 {/* Decorative background */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                 <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
                 
                 <div className="relative z-10 max-w-lg">
                    <h2 className="text-4xl font-black mb-4 leading-tight">Nâng tầm cuộc gọi với Trí tuệ nhân tạo.</h2>
                    <p className="text-indigo-200 font-medium text-lg mb-8">AI Assistant giúp bạn tạo ra những câu phản hồi thông minh, thuyết phục và cá nhân hóa ngay lập tức.</p>
                    <div className="flex gap-4">
                       <div className="flex -space-x-2">
                          {[...Array(4)].map((_, i) => (
                             <div key={i} className="w-10 h-10 rounded-full bg-indigo-700 border-4 border-indigo-900 flex items-center justify-center text-[10px] font-black">{i+1}</div>
                          ))}
                       </div>
                       <p className="text-xs font-bold self-center text-indigo-300 tracking-widest uppercase">+2.5k Agents Active</p>
                    </div>
                 </div>
              </div>

              <AiSuggestionBox />
           </div>

        </div>

        <ReplyTemplateForm />
      </div>
    </div>
  );
};
