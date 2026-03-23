export class LeadEntity {
  id: string;
  name: string;
  phone: string;
  status: string;
  assignedToId: string | null;
  createdAt: Date;
}
