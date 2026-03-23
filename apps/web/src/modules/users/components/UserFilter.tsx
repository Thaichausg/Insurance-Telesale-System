import React from 'react';
import { useUsersStore } from '../store/users.store';
import { USER_ROLES } from '../constants';

export const UserFilter: React.FC = () => {
  const { filterParams, setFilterParams } = useUsersStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilterParams({ [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-wrap gap-4 items-end mb-6">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Tên nhân sự</label>
        <input 
          type="text" 
          name="search" 
          placeholder="Nhập tên nhân sự..."
          value={filterParams.search || ''} 
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <div className="w-48">
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Phân quyền (Role)</label>
        <select 
          name="role" 
          value={filterParams.role || ''} 
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="">Tất cả vai trò</option>
          {USER_ROLES.map(role => (
            <option key={role} value={role}>{role.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      <div className="w-32">
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Trạng thái</label>
        <select 
          name="isActive" 
          value={filterParams.isActive === undefined ? '' : filterParams.isActive ? 'true' : 'false'} 
          onChange={(e) => {
            const val = e.target.value;
            setFilterParams({ isActive: val === '' ? undefined : val === 'true' });
          }}
          className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="">Tất cả</option>
          <option value="true">Hoạt động</option>
          <option value="false">Đã khóa</option>
        </select>
      </div>
    </div>
  );
};
