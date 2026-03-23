import React, { useState, useEffect } from 'react';
import { useUsersStore } from '../store/users.store';
import { useUserActions } from '../hooks/useUserActions';
import { USER_ROLES } from '../constants';
import { userFormSchema, UserFormValues } from '../validations/users.schema';

export const UserForm: React.FC = () => {
  const { isFormOpen, selectedUser, closeForm, users } = useUsersStore();
  const { saveUser, isMutating } = useUserActions();
  
  const [formData, setFormData] = useState<UserFormValues>({
    name: '', email: '', role: 'TELESALE', parentId: '', password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
        parentId: selectedUser.parentId || '',
        password: ''
      });
    } else {
      setFormData({ name: '', email: '', role: 'TELESALE', parentId: '', password: '' });
    }
    setErrors({});
  }, [selectedUser, isFormOpen]);

  if (!isFormOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = userFormSchema.safeParse(formData);
    
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach(iss => errs[iss.path[0]] = iss.message);
      setErrors(errs);
      return;
    }

    const payload = { ...result.data, parentId: result.data.parentId || null };
    await saveUser(selectedUser?.id, payload);
  };

  const potentialManagers = users.filter(u => ['MANAGER', 'SUPER_ADMIN'].includes(u.role) && u.id !== selectedUser?.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">
            {selectedUser ? 'Cập nhật Nhân Sự' : 'Thêm Nhân Sự Mới'}
          </h2>
          <button onClick={closeForm} className="text-slate-400 hover:text-slate-600 transition-colors">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">Họ và Tên</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg text-sm outline-none transition-colors ${errors.name ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-indigo-500 focus:ring-2'}`} 
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">Email Đăng Nhập</label>
            <input 
              type="email" 
              disabled={!!selectedUser}
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg text-sm outline-none transition-colors ${!!selectedUser ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-white border-slate-300 focus:ring-indigo-500 focus:ring-2'} ${errors.email ? 'border-red-400' : ''}`} 
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-600 mb-1">Chức Vụ</label>
              <select 
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value as any })}
                className="w-full px-4 py-2 border border-slate-300 bg-white rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {USER_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-600 mb-1">Người QL Trực Tiếp</label>
              <select 
                value={formData.parentId || ''}
                onChange={e => setFormData({ ...formData, parentId: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 bg-white rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Không có</option>
                {potentialManagers.map(m => <option key={m.id} value={m.id}>{m.name} ({m.role})</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">Mật khẩu {selectedUser && '(Để trống nếu không đổi)'}</label>
            <input 
              type="password" 
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg text-sm outline-none transition-colors ${errors.password ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-indigo-500 focus:ring-2'}`} 
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="pt-4 flex gap-3">
             <button type="button" onClick={closeForm} className="flex-1 px-4 py-2 border border-slate-300 bg-white text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">Hủy</button>
             <button type="submit" disabled={isMutating} className="flex-1 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50">
               {isMutating ? 'Đang lưu...' : 'Lưu Thay Đổi'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};
