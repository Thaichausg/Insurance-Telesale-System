export class UserEntity {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  parentId: string | null;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}
