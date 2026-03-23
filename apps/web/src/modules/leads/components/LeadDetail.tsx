import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus } from '../../../../../packages/contracts/src/leads';
import { useLeads } from '../hooks/useLeads';

interface LeadDetailProps {
  lead: Lead | null;
  onClose?: () => void;
}

export const LeadDetail: React.FC<LeadDetailProps> = ({ lead, onClose }) => {
  const { updateStatus, isLoading } = useLeads();
  
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus>('NEW');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (lead) {
      setSelectedStatus(lead.status);
      setNote(lead.note || '');
    }
  }, [lead]);

  if (!lead) return (
    <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200 p-12 text-center opacity-60">
      <span className="text-5xl mb-4">🧊</span>
      <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Chi tiết khách hàng</h3>
      <p className="text-xs font-medium text-slate-400 mt-1 max-w-[200px]">Chọn một bản ghi để xem thông tin chi tiết và lịch sử chăm sóc.</p>
    </div>
  );

  const handleUpdate = async () => {
    const success = await updateStatus(lead.id, { 
      status: selectedStatus, 
      note 
    });
    if (success && onClose) {
       // Optional: onClose();
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-100 border border-slate-100 h-full animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-start mb-8">
         <div>
            <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg uppercase tracking-widest mb-2 inline-block">ID: {lead.id}</span>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">{lead.customerName}</h2>
            <p className="text-indigo-600 font-mono font-bold text-sm">{lead.phoneNumber}</p>
         </div>
         {onClose && (
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-colors">✕</button>
         )}
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
           <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nguồn</label>
              <span className="text-xs font-bold text-slate-700">{lead.source}</span>
           </div>
           <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Dịch vụ quan tâm</label>
              <span className="text-xs font-bold text-slate-700">{lead.interestProduct || 'Chưa xác định'}</span>
           </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Trạng thái hiện tại</label>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as LeadStatus)}
            className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-indigo-600/20 focus:bg-white outline-none transition-all font-black text-sm text-slate-800 appearance-none"
          >
            <option value="NEW">MỚI (NEW)</option>
            <option value="ASSIGNED">ĐÃ GIAO (ASSIGNED)</option>
            <option value="CALLING">ĐANG GỌI (CALLING)</option>
            <option value="SUCCESS">THÀNH CÔNG (SUCCESS)</option>
            <option value="REJECTED">TỪ CHỐI (REJECTED)</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Nhật ký chăm sóc</label>
          <textarea 
            rows={5}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Ghi chú nội dung trao đổi với khách hàng..."
            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-indigo-600/20 focus:bg-white transition-all text-sm font-medium text-slate-700 resize-none"
          />
        </div>

        <div className="pt-4 flex gap-3">
          <button 
            disabled={isLoading || lead.status === selectedStatus && lead.note === note}
            onClick={handleUpdate}
            className="flex-1 bg-indigo-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale group"
          >
            {isLoading ? 'ĐANG LƯU...' : 'CẬP NHẬT THÔNG TIN'}
          </button>
        </div>
      </div>
    </div>
  );
};
