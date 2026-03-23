import { useState } from 'react';
import { UsersApi } from '../api';
import { UserPayload } from '../types';
import { useUsersStore } from '../store/users.store';
import { useUsers } from './useUsers';

export const useUserActions = () => {
  const [isMutating, setIsMutating] = useState(false);
  const { closeForm } = useUsersStore();
  const { refresh } = useUsers();

  const saveUser = async (id: string | undefined, payload: UserPayload) => {
    setIsMutating(true);
    try {
      if (id) {
        await UsersApi.updateUser(id, payload);
      } else {
        await UsersApi.createUser(payload);
      }
      closeForm();
      await refresh();
      return true;
    } catch (e) {
      alert('Thay đổi thông tin User thất bại.');
      return false;
    } finally {
      setIsMutating(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await UsersApi.toggleUserStatus(id, !currentStatus);
      await refresh();
    } catch (e) {}
  };

  return { saveUser, toggleStatus, isMutating };
};
