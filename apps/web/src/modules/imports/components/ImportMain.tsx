import React from 'react';
import { useImportsStore } from '../store/imports.store';
import { useImportCsv } from '../hooks/useImportCsv';
import { CsvUploadForm } from './CsvUploadForm';
import { ImportPreviewTable } from './ImportPreviewTable';

export const ImportMain: React.FC = () => {
  const { step, isProcessing, error, result, resetAll, previewData } = useImportsStore();
  const { processImport } = useImportCsv();

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-lg uppercase tracking-tighter mb-4 shadow-lg shadow-indigo-100">
              Bulk Data Import
           </div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight">Nạp Dữ Liệu Lead Tập Trung</h1>
           <p className="text-slate-500 font-medium text-lg mt-2 max-w-2xl mx-auto">Tải lên danh sách khách hàng từ file CSV để phân phối cho đội ngũ Telesale ngay lập tức.</p>
        </div>

        {/* Steps Indicator */}
        <div className="max-w-md mx-auto mb-16 flex items-center justify-between relative">
           <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -z-10 -translate-y-1/2 rounded-full"></div>
           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${step === 'UPLOAD' ? 'bg-indigo-600 text-white scale-125 shadow-xl shadow-indigo-100' : 'bg-slate-300 text-white'}`}>1</div>
           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${step === 'PREVIEW' ? 'bg-indigo-600 text-white scale-125 shadow-xl shadow-indigo-100' : 'bg-slate-300 text-white'}`}>2</div>
           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${step === 'RESULT' ? 'bg-indigo-600 text-white scale-125 shadow-xl shadow-indigo-100' : 'bg-slate-300 text-white'}`}>3</div>
        </div>

        {error && (
           <div className="mb-8 p-6 bg-rose-50 border-2 border-rose-100 rounded-3xl flex items-center gap-4 animate-in shake duration-300">
              <span className="text-3xl">⚠️</span>
              <div>
                 <p className="text-rose-800 font-black tracking-tight">Lỗi xử lý file!</p>
                 <p className="text-rose-500 font-medium text-sm">{error}</p>
              </div>
           </div>
        )}

        <div className="space-y-10">
           {step === 'UPLOAD' && <CsvUploadForm />}
           
           {step === 'PREVIEW' && (
              <div className="space-y-8">
                 <ImportPreviewTable />
                 <div className="flex gap-4">
                    <button 
                      onClick={resetAll}
                      disabled={isProcessing}
                      className="flex-1 py-5 bg-white border border-slate-200 text-slate-600 font-black rounded-3xl hover:bg-slate-50 transition-all text-xs uppercase tracking-widest"
                    >
                      Hủy & Tải lại file
                    </button>
                    <button 
                      onClick={processImport}
                      disabled={isProcessing || previewData.filter(r => !r.isValid).length > 0}
                      className="flex-[2] py-5 bg-indigo-600 text-white font-black rounded-3xl hover:bg-indigo-700 shadow-2xl shadow-indigo-100 transition-all text-xs uppercase tracking-widest disabled:opacity-30 relative overflow-hidden"
                    >
                      {isProcessing ? (
                         <div className="flex items-center justify-center gap-3">
                            <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                            <span>ĐANG NẠP DỮ LIỆU...</span>
                         </div>
                      ) : (
                         <span>XÁC NHẬN IMPORT NGAY</span>
                      )}
                    </button>
                 </div>
              </div>
           )}

           {step === 'RESULT' && result && (
              <div className="p-16 bg-white border border-slate-100 rounded-[3rem] text-center shadow-2xl shadow-slate-100 animate-in zoom-in duration-500">
                 <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl">✅</div>
                 <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-4">Import Thành Công!</h2>
                 <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10">
                    Hệ thống đã nạp thành công <span className="text-indigo-600 font-black">{result.success}</span> Lead mới.<br/>
                    Sẵn sàng để phân phối cho đội ngũ Telesale.
                 </p>
                 <button 
                   onClick={resetAll}
                   className="px-12 py-5 bg-slate-900 text-white font-black rounded-3xl hover:bg-indigo-600 transition-all text-xs uppercase tracking-[0.2em]"
                 >
                   Tiếp tục Import File mới
                 </button>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};
