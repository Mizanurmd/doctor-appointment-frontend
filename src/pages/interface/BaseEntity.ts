export interface BaseEntity {
  id: number;
  createdAt: string;    
  updatedAt?: string | null;
  deletedAt?: string | null;
}
