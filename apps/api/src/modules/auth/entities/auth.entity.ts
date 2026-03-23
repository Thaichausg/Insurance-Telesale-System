export class UserEntity {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'SUPER_ADMIN' | 'MANAGER' | 'ADMIN' | 'TELESALE';
  isActive: boolean;
  createdAt: Date;
}
