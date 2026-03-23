import React from 'react';
import { useAiAssistant } from '../hooks/use-ai-assistant';

export const AiSuggestionBox: React.FC = () => {
  const [input, setInput] = React.useState('');
  const { generateReply, isGenerating, lastGeneratedReply } = useAiAssistant();

  const handleGen = async () => {
    await generateReply(input);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xl shadow-indigo-100/50 overflow-hidden relative">
      {/* AI Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[80px] pointer-events-none"></div>
      
      <div className="flex items-center gap-3 mb-6">
         <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-xl shadow-lg shadow-indigo-100">✨</div>
         <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">AI Reply Assistant</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sáng tạo nội dung tư vấn dựa trên ngữ cảnh</p>
         </div>
      </div>

      <div className="space-y-6">
         <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập nội dung hoặc tình huống khách hàng phản hồi..."
              className="w-full h-32 p-5 bg-slate-50 border-2 border-slate-50 rounded-3xl outline-none focus:border-indigo-600/20 focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-300 resize-none"
            />
            <button 
              onClick={handleGen}
              disabled={isGenerating || !input}
              className="absolute bottom-4 right-4 px-6 py-2.5 bg-indigo-600 text-white font-black text-[10px] rounded-xl hover:bg-indigo-700 transition-all uppercase tracking-widest shadow-xl shadow-indigo-100 disabled:opacity-30"
            >
              {isGenerating ? 'Đang suy nghĩ...' : 'Phân tích AI'}
            </button>
         </div>

         {isGenerating && (
            <div className="p-8 bg-indigo-50/50 border-2 border-dashed border-indigo-100 rounded-3xl flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
               <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
               <p className="text-xs font-black text-indigo-600 tracking-widest uppercase">Đang phân tích kịch bản tối ưu...</p>
            </div>
         )}

         {!isGenerating && lastGeneratedReply && (
            <div className="p-8 bg-emerald-50 border-2 border-emerald-100 rounded-3xl animate-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black rounded-lg uppercase tracking-tighter">Gợi ý từ AI 🤖</span>
                  <button className="text-[10px] font-bold text-emerald-600 hover:underline">Sao chép nội dung</button>
               </div>
               <p className="text-sm font-medium text-slate-800 leading-relaxed italic">
                 "{lastGeneratedReply.message}"
               </p>
               <div className="mt-4 pt-4 border-t border-emerald-100/50 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase">Độ tin cậy: 98%</span>
                  <div className="flex gap-1">
                     <button className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all">👍</button>
                     <button className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 hover:bg-rose-600 hover:text-white transition-all">👎</button>
                  </div>
               </div>
            </div>
         )}

         {!isGenerating && !lastGeneratedReply && (
            <div className="p-12 border-2 border-dashed border-slate-100 rounded-3xl text-center grayscale opacity-30 select-none">
               <span className="text-4xl mb-3 block">💡</span>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Hãy để AI giúp bạn tư vấn khách hàng</p>
            </div>
         )}
      </div>
    </div>
  );
};
