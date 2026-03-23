import { useEffect, useCallback } from 'react';
import { useUsersStore } from '../store/users.store';
import { UsersApi } from '../api';

export const useUsers = () => {
  const { filterParams, setUsers, setLoading, setError, users, isLoading, error } = useUsersStore();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await UsersApi.getUsers(filterParams);
      setUsers(data);
    } catch (e) {
      setError('Hệ thống không thể truy xuất danh sách nhân sự. Vui lòng kiểm tra lại kết nối.');
    } finally {
      setLoading(false);
    }
  }, [filterParams, setUsers, setLoading, setError]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    isLoading,
    error,
    filterParams,
    refresh: fetchUsers
  };
};
