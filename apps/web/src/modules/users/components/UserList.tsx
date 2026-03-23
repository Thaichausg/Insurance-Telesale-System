import React from 'react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  isLoading: boolean;
  error: string | null;
  onEdit: (user: User) => void;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
}

export const UserList: React.FC<UserListProps> = ({ 
  users, 
  isLoading, 
  error, 
  onEdit, 
  onToggleStatus 
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-44 bg-slate-100 rounded-2xl border border-slate-100"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 bg-rose-50 border-2 border-rose-100 rounded-3xl text-center">
        <span className="text-4xl mb-4 block">⚠️</span>
        <h3 className="text-xl font-black text-rose-800">Lỗi dữ liệu</h3>
        <p className="text-rose-500 font-medium mt-2">{error}</p>
        <button className="mt-6 px-6 py-2 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all">Thử lại</button>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="p-20 bg-slate-100/50 border-2 border-dashed border-slate-200 rounded-3xl text-center grayscale opacity-60">
        <span className="text-5xl mb-4 block">👥</span>
        <h3 className="text-xl font-black text-slate-500">Chưa có nhân sự nào</h3>
        <p className="text-slate-400 font-medium mt-2">Danh sách trống hoặc bộ lọc không khớp dữ liệu.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <div key={user.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
             <div className="w-14 h-14 rounded-2xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-xl font-black text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                {user.name.charAt(0)}
             </div>
             <div className="flex flex-col items-end gap-2">
                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                   user.isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                }`}>
                   {user.isActive ? 'Active' : 'Disabled'}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.role}</span>
             </div>
          </div>
          
          <h4 className="text-lg font-black text-slate-800 group-hover:text-indigo-600 transition-colors truncate">{user.name}</h4>
          <p className="text-sm font-medium text-slate-500 mb-6 truncate">{user.email}</p>

          <div className="flex items-center gap-2">
             <button 
               onClick={() => onEdit(user)}
               className="flex-1 py-2.5 bg-slate-50 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-900 hover:text-white transition-all uppercase tracking-wider"
             >
               Chi tiết
             </button>
             <button 
               onClick={() => onToggleStatus(user.id, user.isActive)}
               className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 transition-all ${
                 user.isActive ? 'border-emerald-50 text-emerald-600 hover:bg-rose-600 hover:text-white hover:border-rose-600' : 'border-rose-50 text-rose-600 hover:bg-emerald-600 hover:text-white hover:border-emerald-600'
               }`}
             >
               {user.isActive ? '🔒' : '🔓'}
             </button>
          </div>
        </div>
      ))}
    </div>
  );
};
