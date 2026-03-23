export type UserRole = 'SUPER_ADMIN' | 'MANAGER' | 'ADMIN' | 'TELESALE';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  parentId?: string | null; // Cấp quản lý trực tiếp
  createdAt?: string;
}

export interface UserQueryParams {
  role?: UserRole | '';
  search?: string;
  isActive?: boolean;
}

export interface UserPayload {
  name: string;
  email: string;
  role: UserRole;
  parentId?: string | null;
  password?: string;
}
