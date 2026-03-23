import { api } from '@/lib/api-client';
import { User, UserQueryParams, UserPayload } from '../types';

export const UsersApi = {
  getUsers: (params?: UserQueryParams): Promise<User[]> => 
    api.get<User[]>('/users', params as any),

  getUserById: (id: string): Promise<User> => 
    api.get<User>(`/users/${id}`),

  createUser: (data: UserPayload): Promise<User> => 
    api.post<User>('/users', data),

  updateUser: (id: string, data: Partial<UserPayload>): Promise<User> => 
    api.patch<User>(`/users/${id}`, data),

  deleteUser: (id: string): Promise<void> => 
    api.delete<void>(`/users/${id}`),
};
