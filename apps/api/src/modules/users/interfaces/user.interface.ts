export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  parentId: string | null;
  createdAt: string;
}
