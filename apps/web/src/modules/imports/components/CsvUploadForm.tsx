import React, { useRef } from 'react';
import { useImportCsv } from '../hooks/useImportCsv';
import { MAX_FILE_SIZE_MB } from '../constants';

export const CsvUploadForm: React.FC = () => {
  const { handleFileUpload } = useImportCsv();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`Kích thước file vượt quá ${MAX_FILE_SIZE_MB}MB`);
        return;
      }
      if (!file.name.endsWith('.csv')) {
        alert('Chỉ chấp nhận file định dạng .csv');
        return;
      }
      handleFileUpload(file);
      // Reset input value to allow uploading same file again
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 border border-dashed border-indigo-300 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors shadow-sm cursor-pointer" onClick={() => fileInputRef.current?.click()}>
       <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-3xl mb-4 border border-indigo-100">
         📥
       </div>
       <h3 className="text-lg font-bold text-slate-800 mb-1">Click hoặc kéo thả file CSV vào đây</h3>
       <p className="text-sm text-slate-500 max-w-sm mb-6">Xin vui lòng sử dụng template file CSV tiêu chuẩn của hệ thống để Mapping cột chính xác nhất.</p>
       
       <input 
         type="file" 
         accept=".csv" 
         className="hidden" 
         ref={fileInputRef}
         onChange={onChange}
       />
       <button className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors pointer-events-none">
         Chọn File trên máy
       </button>
       <a href="#" className="text-xs font-semibold text-indigo-500 hover:text-indigo-700 mt-4 underline pointer-events-auto" onClick={(e) => e.stopPropagation()}>👉 Tải file mẫu Template (CustomerName, PhoneNumber, Source, Product, Tag)</a>
    </div>
  );
};
