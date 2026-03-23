import React from 'react';
import { useAiAssistantStore } from '../store/ai-assistant.store';

export const KeywordSearchBox: React.FC = () => {
  const { filterParams, setFilterParams } = useAiAssistantStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterParams({ search: e.target.value });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center mb-6">
      <div className="w-full relative">
        <label className="sr-only">Tìm kiếm keyword kịch bản</label>
        <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">🔍</span>
        <input 
          type="text" 
          placeholder="Lọc các keyword rule-based đã chặn..."
          value={filterParams.search}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors text-sm"
        />
      </div>
    </div>
  );
};
