import React from 'react';
import { useUsers } from '../hooks/useUsers';
import { useUsersStore } from '../store/users.store';
import { UserList } from './UserList';
import { UserFilter } from './UserFilter';
import { UserForm } from './UserForm';

export const UserMain: React.FC = () => {
  const { users, isLoading, error } = useUsers();
  const { openForm, updateUserStatus } = useUsersStore();

  const handleToggleStatus = (id: string, current: boolean) => {
    // Simulate API toggle
    updateUserStatus(id, !current);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
           <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">Quản Lý Nhân Sự</h1>
              <p className="text-slate-500 font-medium mt-1">Quản lý tài khoản, phân quyền và giám sát đội ngũ Telesale.</p>
           </div>
           <button 
             onClick={() => openForm()}
             className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] flex items-center gap-3 uppercase tracking-wider"
           >
             <span className="text-2xl">+</span> Thêm Nhân Sự Mới
           </button>
        </div>

        <div className="mb-10">
           <UserFilter />
        </div>

        <UserList 
          users={users} 
          isLoading={isLoading} 
          error={error} 
          onEdit={openForm} 
          onToggleStatus={handleToggleStatus}
        />

        <UserForm />
      </div>
    </div>
  );
};
