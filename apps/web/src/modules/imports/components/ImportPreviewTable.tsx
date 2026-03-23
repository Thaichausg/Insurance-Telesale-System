import React from 'react';
import { useImportsStore } from '../store/imports.store';

export const ImportPreviewTable: React.FC = () => {
  const { previewData, removeRow, isProcessing } = useImportsStore();

  if (previewData.length === 0) return null;

  return (
    <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
        <div>
           <h3 className="text-lg font-black text-slate-800 tracking-tight">Xem trước dữ liệu ({previewData.length} dòng)</h3>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Vui lòng kiểm tra kỹ thông tin trước khi xác nhận vào hệ thống</p>
        </div>
        <div className="flex gap-2 text-[10px] font-black uppercase overflow-hidden rounded-lg">
           <span className="bg-emerald-100 text-emerald-600 px-3 py-1.5">{previewData.filter(r => r.isValid).length} Hợp lệ</span>
           <span className="bg-rose-100 text-rose-600 px-3 py-1.5">{previewData.filter(r => !r.isValid).length} Lỗi</span>
        </div>
      </div>

      <div className="max-h-[500px] overflow-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white shadow-sm z-10">
            <tr className="border-b border-slate-100">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Khách Hàng</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">SĐT</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nguồn</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sản Phẩm</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {previewData.map((row) => (
              <tr key={row.id} className={`group hover:bg-slate-50/50 transition-all ${!row.isValid ? 'bg-rose-50/30' : ''}`}>
                <td className="px-8 py-5">
                   <p className="text-sm font-black text-slate-800">{row.customerName}</p>
                   {!row.isValid && <p className="text-[10px] font-bold text-rose-500 mt-1 uppercase">Định dạng tên sai</p>}
                </td>
                <td className="px-8 py-5 font-mono text-xs font-bold text-slate-500">{row.phoneNumber}</td>
                <td className="px-8 py-5">
                   <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md uppercase">{row.source}</span>
                </td>
                <td className="px-8 py-5 text-sm font-medium text-slate-600">{row.interestProduct}</td>
                <td className="px-8 py-5 text-right">
                   <button 
                     onClick={() => removeRow(row.id)}
                     disabled={isProcessing}
                     className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-600 hover:text-white transition-all font-black text-xs disabled:opacity-30"
                   >
                     ×
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
