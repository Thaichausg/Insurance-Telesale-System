import React from 'react';
import { AiConfig } from '../types';

interface AiProviderConfigCardProps {
  data: AiConfig | undefined;
  onChange: (data: AiConfig) => void;
  isSaving: boolean;
}

export const AiProviderConfigCard: React.FC<AiProviderConfigCardProps> = ({ 
  data, 
  onChange, 
  isSaving 
}) => {
  if (!data) return null;

  return (
    <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-all group overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/30 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-indigo-100/50 transition-all"></div>
      
      <div className="flex items-center gap-4 mb-8">
         <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-100">🤖</div>
         <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">AI & LLM Integration</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cấu hình mô hình ngôn ngữ trợ lý</p>
         </div>
      </div>

      <div className="space-y-6">
         <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">AI Provider</label>
            <select 
              value={data.provider}
              disabled={isSaving}
              onChange={(e) => onChange({ ...data, provider: e.target.value as any })}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all appearance-none cursor-pointer"
            >
               <option value="OPENAI">OpenAI (GPT-4o)</option>
               <option value="GEMINI">Google Gemini Pro</option>
               <option value="CLAUDE">Anthropic Claude 3</option>
            </select>
         </div>

         <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">API Key</label>
            <input 
              type="password"
              value={data.apiKey}
              disabled={isSaving}
              onChange={(e) => onChange({ ...data, apiKey: e.target.value })}
              placeholder="sk-••••••••••••••••"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-mono font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all placeholder:text-slate-300"
            />
         </div>
      </div>
    </div>
  );
};
