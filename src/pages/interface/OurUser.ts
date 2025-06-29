import type { BaseEntity } from "./BaseEntity";
import type { Role } from "./Role";



export interface OurUser extends BaseEntity {
  name: string;
  email: string;
  password?: string; 
  role: Role;
}

export interface RegisterUserDTO{
  name: string;
  email: string;
  password: string;
  role: Role | null;
}
export interface LoginUserDTO{
  email: string;
  password: string;

}


export interface AuthResponse{
  statusCode?: number;
  error?: string;
  message?: string;
  token?: string;
  refreshToken?: string;
  expirationTime?: string;
  role?: Role;
  user?: OurUser;
  menus: {
    path: string;
    role: string;
  }[];
}

