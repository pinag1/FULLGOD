import * as Yup from 'yup';
import { CreateUserDto, UpdateUserDto } from '../dtos/userDto';

export const createUserSchema: Yup.ObjectSchema<CreateUserDto> = Yup.object().shape({
  name: Yup.string().optional(),
  email: Yup.string().email('Email inválido').required('O campo "email" é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter ao menos 6 caracteres')
    .required('O campo "password" é obrigatório'),
  role: Yup.mixed<'ADMIN' | 'EDITOR' | 'VIEWER'>()
    .oneOf(['ADMIN', 'EDITOR', 'VIEWER'])
    .default('VIEWER'),
  profile: Yup.mixed<'NORMAL' | 'SUBSCRITOR' | 'VIP'>()
    .oneOf(['NORMAL', 'SUBSCRITOR', 'VIP'])
    .default('NORMAL'),
});

export const updateUserSchema: Yup.ObjectSchema<UpdateUserDto> = createUserSchema.partial();