export interface BaseEntity {
  id: number;
  createdAt: string;    
  updatedAt?: string | null;
  deletedAt?: string | null;
}


export type Role = "DOCTOR" | "PATIENT" | string;

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
  role: Role;
}
export interface LoginUserDTO{
  email: string;
  password: string;

}


export interface AuthResponse{
  statusCode: number;
  error?: string;
  message?: string;
  token?: string;
  refreshToken?: string;
  expirationTime?: string;
  role?: Role;
  user?: OurUser;
}

