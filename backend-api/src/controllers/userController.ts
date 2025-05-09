// src/controllers/userController.ts
import { Request, Response } from 'express';
import { ValidationError } from 'yup';
import type { CreateUserDto, UpdateUserDto } from '../dtos/userDto';
import * as userService from '../services/userService';
import { createUserSchema, updateUserSchema } from '../validators/userValidator';

// GET /users
export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  return res.status(200).json(users);
};

// GET /users/:id
export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  const user = await userService.getUserById(id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  return res.status(200).json(user);
};

// POST /users
export const createUser = async (req: Request, res: Response) => {
  try {
    const dto: CreateUserDto = await createUserSchema.validate(req.body, { abortEarly: false });
    const user = await userService.createUser(dto);
    return res.status(201).json(user);
  } catch (err: any) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ message: err.errors.join(', ') });
    }
    return res.status(err.status || 500).json({ message: err.message });
  }
};

// PATCH /users/:id
export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    const dto: UpdateUserDto = await updateUserSchema.validate(req.body, { abortEarly: false });
    const updated = await userService.updateUser(id, dto);
    return res.status(200).json(updated);
  } catch (err: any) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ message: err.errors.join(', ') });
    }
    return res.status(err.status || 500).json({ message: err.message });
  }
};

// DELETE /users/:id
export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  await userService.deleteUser(id);
  return res.status(204).send();
};
