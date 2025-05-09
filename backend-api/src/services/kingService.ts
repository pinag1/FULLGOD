// src/services/kingService.ts

import {
  KingOfTheHill,
  KingOfTheHillEntry
} from '@prisma/client';
import prisma from '../lib/prisma';
import { CustomError } from '../errors/customError';
import { InferType } from 'yup';
import {
  createKingSchema,
  createKingEntrySchema
} from '../validators/kingValidator';

type NewKing = InferType<typeof createKingSchema>;
type NewEntry = InferType<typeof createKingEntrySchema>;

// CRUD KingOfTheHill
export const createKing = async (data: NewKing): Promise<KingOfTheHill> => {
  await createKingSchema.validate(data, { abortEarly: false });
  return prisma.kingOfTheHill.create({ data });
};

export const listKings = async (): Promise<KingOfTheHill[]> => {
  return prisma.kingOfTheHill.findMany({ orderBy: { createdAt: 'desc' } });
};

export const getKingById = async (id: number): Promise<KingOfTheHill | null> => {
  return prisma.kingOfTheHill.findUnique({ where: { id } });
};

export const updateKing = async (id: number, data: Partial<NewKing>): Promise<KingOfTheHill> => {
  await createKingSchema.validate(data, { abortEarly: false });
  const existing = await getKingById(id);
  if (!existing) throw new CustomError('King Of The Hill não encontrado', 404);
  return prisma.kingOfTheHill.update({ where: { id }, data });
};

export const deleteKing = async (id: number): Promise<void> => {
  const existing = await getKingById(id);
  if (!existing) throw new CustomError('King Of The Hill não encontrado', 404);
  await prisma.$transaction([
    prisma.kingOfTheHillEntry.deleteMany({ where: { kingOfTheHillId: id } }),
    prisma.kingOfTheHill.delete({ where: { id } }),
  ]);
};

// Entries
export const addEntry = async (
  kingId: number,
  data: NewEntry
): Promise<KingOfTheHillEntry> => {
  await createKingEntrySchema.validate(data, { abortEarly: false });
  const king = await getKingById(kingId);
  if (!king) throw new CustomError('King Of The Hill não encontrado', 404);
  return prisma.kingOfTheHillEntry.create({
    data: {
      kingOfTheHillId: kingId,
      slotId: data.slotId,
      userId: data.userId,
    },
  });
};

export const listEntries = async (kingId: number): Promise<KingOfTheHillEntry[]> => {
  return prisma.kingOfTheHillEntry.findMany({
    where: { kingOfTheHillId: kingId },
    include: { slot: true, user: true },
    orderBy: { createdAt: 'asc' },
  });
};

export const removeEntry = async (entryId: number): Promise<void> => {
  const existing = await prisma.kingOfTheHillEntry.findUnique({ where: { id: entryId } });
  if (!existing) throw new CustomError('Entry não encontrado', 404);
  await prisma.kingOfTheHillEntry.delete({ where: { id: entryId } });
};
