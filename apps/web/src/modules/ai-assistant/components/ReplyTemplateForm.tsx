import React, { useState, useEffect } from 'react';
import { useAiAssistantStore } from '../store/ai-assistant.store';
import { useReplyTemplates } from '../hooks/useReplyTemplates';
import { templateFormSchema, TemplateFormValues } from '../validations/ai-assistant.schema';

export const ReplyTemplateForm: React.FC = () => {
  const { isFormOpen, closeForm, selectedTemplate } = useAiAssistantStore();
  const { saveTemplate, isMutating } = useReplyTemplates();
  
  const [formData, setFormData] = useState<TemplateFormValues>({ keyword: '', response: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedTemplate) setFormData({ keyword: selectedTemplate.keyword, response: selectedTemplate.response });
    else setFormData({ keyword: '', response: '' });
    setErrors({});
  }, [selectedTemplate, isFormOpen]);

  if (!isFormOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = templateFormSchema.safeParse(formData);
    if (!validation.success) {
      const errs: Record<string, string> = {};
      validation.error.issues.forEach(i => errs[i.path[0]] = i.message);
      setErrors(errs);
      return;
    }
    await saveTemplate(selectedTemplate?.id, validation.data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">
            {selectedTemplate ? 'Sửa Kịch Bản AI' : 'Thêm Kịch Bản Mới'}
          </h2>
          <button onClick={closeForm} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Từ khóa khách hàng (Keyword)</label>
            <input 
              type="text" 
              value={formData.keyword}
              onChange={e => setFormData({ ...formData, keyword: e.target.value })}
              placeholder="Vd: không quan tâm, bảo hiểm nhân thọ..."
              className={`w-full px-4 py-2 border rounded-lg text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none ${errors.keyword ? 'border-red-400' : 'border-slate-200'}`} 
            />
            {errors.keyword && <p className="text-red-500 text-xs mt-1">{errors.keyword}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Tin nhắn AI trả lời tự động</label>
            <textarea 
              value={formData.response}
              onChange={e => setFormData({ ...formData, response: e.target.value })}
              placeholder="Dạ em hiểu ạ..."
              className={`w-full px-4 py-2 min-h-[120px] resize-none border rounded-lg text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none ${errors.response ? 'border-red-400' : 'border-slate-200'}`} 
            />
            {errors.response && <p className="text-red-500 text-xs mt-1">{errors.response}</p>}
          </div>

          <div className="pt-4 flex gap-3">
             <button type="button" onClick={closeForm} className="flex-1 px-4 py-2 border border-slate-300 font-medium rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">Hủy</button>
             <button type="submit" disabled={isMutating} className="flex-1 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors">
               {isMutating ? 'Đang lưu...' : 'Lưu Kịch Bản'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};
