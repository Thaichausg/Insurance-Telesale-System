import React, { useState, useEffect } from 'react';
import { DistributionConfig } from '../types';
import { DISTRIBUTION_STRATEGIES } from '../constants';
import { useUpdateSystemConfig } from '../hooks/useUpdateSystemConfig';

interface Props {
  initialConfig: DistributionConfig;
}

export const DistributionConfigCard: React.FC<Props> = ({ initialConfig }) => {
  const [config, setConfig] = useState<DistributionConfig>(initialConfig);
  const [isEditing, setIsEditing] = useState(false);
  const { updateDist, isUpdating } = useUpdateSystemConfig();

  useEffect(() => {
    if (!isEditing) setConfig(initialConfig);
  }, [initialConfig, isEditing]);

  const handleSave = async () => {
    const success = await updateDist(config);
    if (success) setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
      <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Logic Phân Bổ (Distribution Core)</h2>
          <p className="text-sm text-slate-500">Mô hình chia nhỏ Lead thụ động cho Nhân Sự</p>
        </div>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="px-4 py-2 border border-indigo-200 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-50">Sửa đổi</button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-slate-500 rounded-lg text-sm font-medium hover:bg-slate-100">Hủy</button>
            <button disabled={isUpdating} onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50">Lưu</button>
          </div>
        )}
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Thuật Toán</label>
          <select 
            disabled={!isEditing}
            value={config.strategy}
            onChange={(e) => setConfig({ ...config, strategy: e.target.value as any })}
            className={`w-full px-4 py-2 border rounded-lg outline-none ${!isEditing ? 'bg-slate-50 text-slate-500 cursor-not-allowed border-slate-100' : 'bg-white border-slate-300 focus:ring-2 focus:ring-indigo-500'}`}
          >
            {DISTRIBUTION_STRATEGIES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Lượng Chia Mặc Định (Batch Size Limit)</label>
          <div className="flex items-center gap-3">
             <input 
              type="number" 
              disabled={!isEditing}
              value={config.batchSize}
              onChange={(e) => setConfig({ ...config, batchSize: Number(e.target.value) })}
              className={`w-full px-4 py-2 border rounded-lg outline-none ${!isEditing ? 'bg-slate-50 text-slate-500 cursor-not-allowed border-slate-100' : 'bg-white border-slate-300 focus:ring-2 focus:ring-indigo-500'}`}
            />
            <span className="text-slate-500 text-sm whitespace-nowrap">Lead / 1 Agent</span>
          </div>
        </div>
      </div>
    </div>
  );
};
