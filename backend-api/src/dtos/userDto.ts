// src/dtos/user.dto.ts
export interface CreateUserDto {
    name?: string;
    email: string;
    password: string;
    role?: 'ADMIN' | 'EDITOR' | 'VIEWER';
    profile?: 'NORMAL' | 'SUBSCRITOR' | 'VIP';
  }
  
  export interface UpdateUserDto extends Partial<CreateUserDto> {}
  