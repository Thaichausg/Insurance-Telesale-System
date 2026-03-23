import React from 'react';
import { ExportHistoryRecord } from '../types';

interface ExportHistoryTableProps {
  data: ExportHistoryRecord[];
  isLoading: boolean;
  error: string | null;
}

export const ExportHistoryTable: React.FC<ExportHistoryTableProps> = ({ 
  data, 
  isLoading, 
  error 
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 bg-slate-50 border border-slate-100 rounded-2xl"></div>
        ))}
      </div>
    );
  }

  if (error) {
     return (
        <div className="p-12 bg-rose-50 border-2 border-rose-100 rounded-3xl text-center">
           <span className="text-4xl mb-3 block">📡</span>
           <p className="text-rose-600 font-bold">{error}</p>
        </div>
     );
  }

  if (data.length === 0) {
    return (
      <div className="p-20 bg-white border-2 border-dashed border-slate-100 rounded-[3rem] text-center opacity-30 select-none">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">📂</div>
        <h3 className="text-lg font-black text-slate-500 uppercase tracking-widest">Chưa có lịch sử kết xuất</h3>
        <p className="text-slate-400 font-medium mt-1">Các file được xuất sẽ xuất hiện tại đây.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100">
            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tên File</th>
            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Định Dạng</th>
            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng Thái</th>
            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ngày Xuất</th>
            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Tải Về</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.map((record) => (
            <tr key={record.id} className="group hover:bg-slate-50/30 transition-all">
              <td className="px-8 py-6">
                 <div>
                    <p className="text-sm font-black text-slate-800">{record.fileName}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Size: {record.fileSizeKB ? `${record.fileSizeKB}KB` : '---'}</p>
                 </div>
              </td>
              <td className="px-8 py-6">
                 <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                    record.format === 'PDF' ? 'bg-rose-100 text-rose-600' :
                    record.format === 'EXCEL' ? 'bg-emerald-100 text-emerald-600' :
                    'bg-indigo-100 text-indigo-600'
                 }`}>
                    {record.format}
                 </span>
              </td>
              <td className="px-8 py-6">
                 <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full animate-pulse ${
                       record.status === 'COMPLETED' ? 'bg-emerald-500 animate-none' :
                       record.status === 'PROCESSING' ? 'bg-amber-500' :
                       record.status === 'FAILED' ? 'bg-rose-500 animate-none' :
                       'bg-slate-300'
                    }`}></span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{record.status}</span>
                 </div>
              </td>
              <td className="px-8 py-6 text-sm font-bold text-slate-400">
                 {new Date(record.createdAt).toLocaleString()}
              </td>
              <td className="px-8 py-6 text-right">
                 {record.status === 'COMPLETED' ? (
                    <button className="px-5 py-2.5 bg-slate-900 text-white font-black text-[10px] rounded-xl hover:bg-indigo-600 transition-all uppercase tracking-widest shadow-xl shadow-slate-200">
                       Download ⬇️
                    </button>
                 ) : (
                    <span className="text-[10px] font-black text-slate-300 uppercase italic">Chờ xử lý</span>
                 )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
