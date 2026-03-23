import React from 'react';
import { User } from '../types';
import { ROLE_COLORS } from '../constants';
import { getAvatarInitials } from '../utils';
import { useUserActions } from '../hooks/useUserActions';
import { useUsersStore } from '../store/users.store';

interface Props {
  user: User;
}

export const UserCard: React.FC<Props> = ({ user }) => {
  const { toggleStatus } = useUserActions();
  const { openForm } = useUsersStore();

  return (
    <div className={`bg-white rounded-xl border p-5 shadow-sm transition-all hover:shadow-md ${!user.isActive ? 'border-red-200 opacity-75' : 'border-slate-100'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-lg border border-slate-200 shrink-0">
            {getAvatarInitials(user.name)}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 line-clamp-1">{user.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5 max-w-[150px] truncate">{user.email}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end">
            <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md border ${ROLE_COLORS[user.role]}`}>
              {user.role.replace('_', ' ')}
            </span>
            <span className={`text-xs font-semibold ${user.isActive ? 'text-emerald-600' : 'text-rose-500'}`}>
              {user.isActive ? '● Đang hoạt động' : '○ Bị khóa'}
            </span>
        </div>
      </div>
      
      <div className="text-sm text-slate-600 mb-5 pb-5 border-b border-slate-50">
        <p><span className="text-slate-400 font-medium w-24 inline-block">Mã NV:</span> {user.id}</p>
        <p><span className="text-slate-400 font-medium w-24 inline-block">Người QL:</span> {user.parentId || 'Ban Giám Đốc'}</p>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => openForm(user)}
          className="flex-1 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-lg text-sm border border-slate-200 transition-colors"
        >
          Thông tin
        </button>
        <button 
          onClick={() => toggleStatus(user.id, user.isActive)}
          className={`px-3 py-2 font-medium rounded-lg text-sm border transition-colors ${user.isActive ? 'bg-rose-50 hover:bg-rose-100 text-rose-600 border-rose-200' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-200'}`}
        >
          {user.isActive ? 'Khóa' : 'Mở khóa'}
        </button>
      </div>
    </div>
  );
};
