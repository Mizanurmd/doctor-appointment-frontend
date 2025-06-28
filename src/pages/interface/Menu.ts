import type { BaseEntity } from "./BaseEntity";

export interface Menu extends BaseEntity {
  name: string;
  path: string;
  icon?: string; 
}