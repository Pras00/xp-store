export interface User {
  id: string;
  email: string;
  fullname: string;
  phone: string;
  password?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: string | Date | undefined;
} 