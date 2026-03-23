import React, { useState, useEffect } from 'react';
import { useTelesaleManagement } from '../hooks/useTelesaleManagement';
import { AssignedLeadsList } from './AssignedLeadsList';
import { LeadStatus } from '../../../../../packages/contracts/src/leads';

export const TelesaleDashboard: React.FC = () => {
  const { 
    assignedLeads, 
    isLoading, 
    error, 
    selectedLeadId, 
    setSelectedLeadId, 
    updateLeadStatus, 
    getAiSuggestion,
    aiSuggestion,
    fetchAssignedLeads
  } = useTelesaleManagement();

  const [callDuration, setCallDuration] = useState(0);
  const [isCalling, setIsCalling] = useState(false);
  const [note, setNote] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus>('CALLING');

  const selectedLead = assignedLeads.find(l => l.id === selectedLeadId);

  useEffect(() => {
    if (selectedLead) {
      setSelectedStatus(selectedLead.status === 'NEW' ? 'CALLING' : selectedLead.status);
      setNote(selectedLead.note || '');
    }
  }, [selectedLead]);

  // Simulate Call
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCalling) {
      interval = setInterval(() => setCallDuration(d => d + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isCalling]);

  const handleStartCall = () => {
    setIsCalling(true);
    setCallDuration(0);
  };

  const handleEndCall = async () => {
    setIsCalling(false);
    if (selectedLead) {
      await updateLeadStatus(selectedLead.id, {
        status: selectedStatus,
        note: note,
        callDuration: callDuration
      });
    }
  };

  const handleGetAiSupport = () => {
    if (selectedLead) getAiSuggestion(selectedLead.id);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Dashboard */}
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase italic">
               Telesale <span className="text-indigo-600">Command</span>
            </h1>
            <p className="text-slate-400 font-bold text-sm mt-1">Hệ thống xử lý cuộc gọi và chăm sóc khách hàng tập trung.</p>
         </div>
         
         <div className="flex gap-4">
            <div className="px-6 py-3 bg-white border-2 border-slate-100 rounded-2xl flex items-center gap-4 shadow-sm">
               <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
               <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Đang trực (Online)</span>
            </div>
            <button onClick={() => fetchAssignedLeads()} className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-black transition-colors shadow-lg shadow-slate-200">
               🔄
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Sidebar: Assigned Leads */}
        <div className="xl:col-span-3 space-y-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Leads được giao</h3>
              <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-black rounded-lg">{assignedLeads.length}</span>
           </div>
           <AssignedLeadsList 
             leads={assignedLeads}
             isLoading={isLoading}
             error={error}
             selectedLeadId={selectedLeadId || undefined}
             onSelectLead={(lead) => setSelectedLeadId(lead.id)}
           />
        </div>

        {/* Main Work Area */}
        <div className="xl:col-span-9 space-y-8">
           {selectedLead ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-right-4 duration-500">
                 {/* Lead Info & Call Actions */}
                 <div className="lg:col-span-7 space-y-8">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-50 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/30 rounded-full -mr-16 -mt-16"></div>
                       
                       <div className="flex justify-between items-start mb-8 relative z-10">
                          <div>
                             <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-none mb-2">{selectedLead.customerName}</h2>
                             <p className="text-lg font-mono font-bold text-indigo-600">{selectedLead.phoneNumber}</p>
                             <div className="mt-3 flex gap-2">
                                <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-full uppercase tracking-widest">{selectedLead.source}</span>
                                <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-full uppercase tracking-widest">{selectedLead.groupTag || 'Organic'}</span>
                             </div>
                          </div>
                          
                          <div className="text-right">
                             {isCalling ? (
                                <div className="text-rose-500 animate-pulse font-mono font-black text-4xl">
                                   {Math.floor(callDuration / 60)}:{(callDuration % 60).toString().padStart(2, '0')}
                                </div>
                             ) : (
                                <button 
                                  onClick={handleStartCall}
                                  className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center text-3xl shadow-xl shadow-emerald-100 hover:scale-105 active:scale-95 transition-all"
                                >
                                   📞
                                </button>
                             )}
                          </div>
                       </div>

                       <div className="space-y-6 relative z-10">
                          <div>
                             <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Cập nhật trạng thái sau gọi</label>
                             <select 
                               className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-indigo-600/20 focus:bg-white outline-none transition-all font-black text-sm text-slate-800 appearance-none"
                               value={selectedStatus}
                               onChange={(e) => setSelectedStatus(e.target.value as LeadStatus)}
                             >
                                <option value="CALLING">ĐANG GỌI (CALLING)</option>
                                <option value="SUCCESS">THÀNH CÔNG (SUCCESS)</option>
                                <option value="CALL_BACK">HẸN GỌI LẠI (CALL BACK)</option>
                                <option value="BUSY">KHÁCH BẬN (BUSY)</option>
                                <option value="REJECTED">TỪ CHỐI (REJECTED)</option>
                             </select>
                          </div>

                          <div>
                             <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Nhật ký xử lý</label>
                             <textarea 
                               rows={6}
                               className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-50 rounded-3xl outline-none focus:border-indigo-600/20 focus:bg-white transition-all text-sm font-medium text-slate-700 resize-none"
                               placeholder="Mô tả tóm tắt nhu cầu khách hàng hoặc kết quả cuộc gọi..."
                               value={note}
                               onChange={(e) => setNote(e.target.value)}
                             />
                          </div>

                          {isCalling ? (
                             <button 
                               onClick={handleEndCall}
                               className="w-full py-5 bg-rose-500 text-white font-black rounded-3xl hover:bg-rose-600 shadow-2xl shadow-rose-100 transition-all active:scale-[0.98]"
                             >
                                KẾT THÚC & LƯU KẾT QUẢ
                             </button>
                          ) : (
                             <button 
                               onClick={handleEndCall}
                               className="w-full py-5 bg-slate-900 text-white font-black rounded-3xl hover:bg-black shadow-2xl shadow-slate-200 transition-all active:scale-[0.98]"
                             >
                                CẬP NHẬT GHI CHÚ
                             </button>
                          )}
                       </div>
                    </div>
                 </div>

                 {/* AI Assistant (Right) */}
                 <div className="lg:col-span-5 space-y-6">
                    <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200 min-h-[400px] flex flex-col group overflow-hidden relative">
                       <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-white/20 transition-all"></div>
                       
                       <div className="flex items-center gap-3 mb-6 relative z-10">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl grayscale group-hover:grayscale-0 transition-all">
                             🤖
                          </div>
                          <div>
                             <h4 className="font-black text-sm tracking-widest uppercase">AI Assistant</h4>
                             <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-tighter italic">Hỗ trợ kịch bản tư vấn</p>
                          </div>
                       </div>

                       <div className="flex-1 relative z-10">
                          {aiSuggestion ? (
                             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 animate-in zoom-in-95 duration-300">
                                <p className="text-sm font-medium leading-relaxed italic">"{aiSuggestion.replyText}"</p>
                                {aiSuggestion.suggestedActions && (
                                   <div className="mt-6 flex flex-wrap gap-2">
                                      {aiSuggestion.suggestedActions.map((action, i) => (
                                         <span key={i} className="px-3 py-1.5 bg-white text-indigo-600 text-[10px] font-black rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors uppercase">
                                            {action}
                                         </span>
                                      ))}
                                   </div>
                                )}
                             </div>
                          ) : (
                             <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                                <p className="text-xs font-bold text-indigo-100 mb-6">Chưa có kịch bản gợi ý.<br/>Nhấn nút bên dưới để phân tích nhu cầu.</p>
                                <button 
                                  onClick={handleGetAiSupport}
                                  className="px-6 py-3 bg-white text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-all shadow-lg active:scale-95"
                                >
                                   GỢI Ý KỊCH BẢN
                                </button>
                             </div>
                          )}
                       </div>
                       
                       <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                          <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Gợi ý sản phẩm</p>
                          <p className="text-sm font-bold mt-1">{selectedLead.interestProduct || 'Bảo hiểm nhân thọ FWD'}</p>
                       </div>
                    </div>

                    <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100">
                       <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-3">Lịch nhắc Follow-up</h4>
                       {selectedLead.deadlineAt ? (
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm border border-amber-100">⏰</div>
                             <div>
                                <p className="text-sm font-black text-slate-800 tracking-tight">{new Date(selectedLead.deadlineAt).toLocaleString('vi-VN')}</p>
                                <p className="text-[10px] font-bold text-amber-500 uppercase">Khách hẹn gọi lại</p>
                             </div>
                          </div>
                       ) : (
                          <p className="text-xs font-bold text-amber-500 italic">Chưa có lịch hẹn nhắc lại.</p>
                       )}
                    </div>
                 </div>
              </div>
           ) : (
              <div className="h-[60vh] flex flex-col items-center justify-center bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200 p-12 text-center">
                 <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center text-5xl mb-6 border border-slate-100">📞</div>
                 <h3 className="text-xl font-black text-slate-800 uppercase tracking-widest mb-2">Trung tâm điều hành</h3>
                 <p className="text-sm font-medium text-slate-400 max-w-[300px]">Chọn một khách hàng từ danh sách bên trái để bắt đầu cuộc gọi và ghi nhận thông tin.</p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};
