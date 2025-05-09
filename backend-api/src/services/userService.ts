// src/services/userService.ts
import { hash } from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from '../dtos/userDto';
import { CustomError } from '../errors/customError';
import prisma from '../lib/prisma';

export const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      profile: true,
      createdAt: true,
    },
  });
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      profile: true,
      createdAt: true,
    },
  });
};

export const createUser = async (data: CreateUserDto) => {
  // já validado no controller
  const exists = await prisma.user.findUnique({ where: { email: data.email } });
  if (exists) throw new CustomError('Email já cadastrado', 400);
  const hashed = await hash(data.password, 10);
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashed,
      role: data.role,
      profile: data.profile,
    },
  });
};

export const updateUser = async (id: number, data: UpdateUserDto) => {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw new CustomError('Usuário não encontrado', 404);

  const payload: any = { ...data };
  if (data.password) {
    payload.password = await hash(data.password, 10);
  }

  return prisma.user.update({
    where: { id },
    data: payload,
  });
};

export const deleteUser = async (id: number) => {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw new CustomError('Usuário não encontrado', 404);
  await prisma.user.delete({ where: { id } });
};
