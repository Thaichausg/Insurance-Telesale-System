import React, { useState, useEffect } from 'react';
import { FollowUpConfig } from '../types';
import { useUpdateSystemConfig } from '../hooks/useUpdateSystemConfig';

interface Props {
  initialConfig: FollowUpConfig;
}

export const FollowUpConfigCard: React.FC<Props> = ({ initialConfig }) => {
  const [config, setConfig] = useState<FollowUpConfig>(initialConfig);
  const [isEditing, setIsEditing] = useState(false);
  const { updateFollowUp, isUpdating } = useUpdateSystemConfig();

  useEffect(() => {
    if (!isEditing) setConfig(initialConfig);
  }, [initialConfig, isEditing]);

  const handleSave = async () => {
    const success = await updateFollowUp(config);
    if (success) setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
      <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Chăm Sóc KH (Follow-Up)</h2>
          <p className="text-sm text-slate-500">Giới hạn thời gian và quy luật gọi lại khách bận</p>
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
          <label className="block text-sm font-semibold text-slate-600 mb-1">Mặc định hẹn ngày xử lý (Default Days)</label>
          <div className="flex items-center gap-3">
             <input 
              type="number" 
              disabled={!isEditing}
              value={config.defaultDays}
              onChange={(e) => setConfig({ ...config, defaultDays: Number(e.target.value) })}
              className={`w-full px-4 py-2 border rounded-lg outline-none ${!isEditing ? 'bg-slate-50 text-slate-500 cursor-not-allowed border-slate-100' : 'bg-white border-slate-300 focus:ring-2 focus:ring-indigo-500'}`}
            />
             <span className="text-slate-500 text-sm whitespace-nowrap">Ngày sau hẹn</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Giới hạn Tái Gọi (Max Retries)</label>
          <div className="flex items-center gap-3">
             <input 
              type="number" 
              disabled={!isEditing}
              value={config.maxRetries}
              onChange={(e) => setConfig({ ...config, maxRetries: Number(e.target.value) })}
              className={`w-full px-4 py-2 border rounded-lg outline-none ${!isEditing ? 'bg-slate-50 text-slate-500 cursor-not-allowed border-slate-100' : 'bg-white border-slate-300 focus:ring-2 focus:ring-indigo-500'}`}
            />
            <span className="text-slate-500 text-sm whitespace-nowrap">Lần (Đổi thành TỪ CHỐI nếu quá hạn)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
