import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTenantStore } from '../store/tenant.store';
import { useTenantActions } from '../hooks/useTenantActions';
import { tenantSchema } from '../validations/tenant.schema';
import { generateTenantCode } from '../utils';

export const TenantForm: React.FC = () => {
  const { isModalOpen, closeModal, selectedTenant } = useTenantStore();
  const { handleCreate, handleUpdate } = useTenantActions();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(tenantSchema),
    defaultValues: selectedTenant || { status: 'ACTIVE' },
  });

  const nameValue = watch('name');

  useEffect(() => {
    if (selectedTenant) {
      reset(selectedTenant);
    } else {
      reset({ status: 'ACTIVE', name: '', code: '', domain: '', contactEmail: '', contactPhone: '', address: '' });
    }
  }, [selectedTenant, reset, isModalOpen]);

  useEffect(() => {
    if (!selectedTenant && nameValue) {
      setValue('code', generateTenantCode(nameValue));
    }
  }, [nameValue, setValue, selectedTenant]);

  if (!isModalOpen) return null;

  const onSubmit = async (data: any) => {
    if (selectedTenant) {
      await handleUpdate(selectedTenant.id, data);
    } else {
      await handleCreate(data);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">
            {selectedTenant ? 'Cập nhật đối tác' : 'Thêm đối tác mới'}
          </h2>
          <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Tên đối tác *</label>
              <input
                {...register('name')}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                placeholder="VD: Đại lý Miền Tây"
              />
              {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name.message as string}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Mã định danh (Slug) *</label>
              <input
                {...register('code')}
                className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                placeholder="dai-ly-mien-tay"
              />
              {errors.code && <p className="mt-1 text-xs text-rose-500">{errors.code.message as string}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Email liên hệ *</label>
                <input
                  {...register('contactEmail')}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  placeholder="email@partner.com"
                />
                {errors.contactEmail && <p className="mt-1 text-xs text-rose-500">{errors.contactEmail.message as string}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Số điện thoại *</label>
                <input
                  {...register('contactPhone')}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  placeholder="09xxx"
                />
                {errors.contactPhone && <p className="mt-1 text-xs text-rose-500">{errors.contactPhone.message as string}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Domain (Tùy chọn)</label>
              <input
                {...register('domain')}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                placeholder="https://agency.domain.com"
              />
              {errors.domain && <p className="mt-1 text-xs text-rose-500">{errors.domain.message as string}</p>}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Đang lưu...' : selectedTenant ? 'Cập nhật' : 'Lưu đối tác'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
