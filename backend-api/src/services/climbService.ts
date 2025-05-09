// src/services/climbService.ts

import { ClimbTheQuest, ClimbTheQuestLevelProgress, ClimbTheQuestParticipation } from '@prisma/client';
import { InferType } from 'yup';
import { CustomError } from '../errors/customError';
import prisma from '../lib/prisma';
import { createClimbSchema, createParticipationSchema, updateLevelProgressSchema } from '../validators/climbValidator';

type NewClimb = InferType<typeof createClimbSchema>;
type NewParticipation = InferType<typeof createParticipationSchema>;
type LevelUpdate = InferType<typeof updateLevelProgressSchema>;

/**
 * ClimbTheQuest CRUD
 */
export const createClimb = async (data: NewClimb): Promise<ClimbTheQuest> => {
  await createClimbSchema.validate(data, { abortEarly: false });
  return prisma.climbTheQuest.create({ data });
};

export const getAllClimbs = async (): Promise<ClimbTheQuest[]> => {
  return prisma.climbTheQuest.findMany({ orderBy: { createdAt: 'desc' } });
};

export const getClimbById = async (id: number): Promise<ClimbTheQuest | null> => {
  return prisma.climbTheQuest.findUnique({ where: { id } });
};

export const updateClimb = async (id: number, data: Partial<NewClimb>): Promise<ClimbTheQuest> => {
  await createClimbSchema.validate(data, { abortEarly: false });
  const existing = await getClimbById(id);
  if (!existing) throw new CustomError('Climb The Quest não encontrado', 404);
  return prisma.climbTheQuest.update({ where: { id }, data });
};

export const deleteClimb = async (id: number): Promise<void> => {
  const existing = await getClimbById(id);
  if (!existing) throw new CustomError('Climb The Quest não encontrado', 404);
  await prisma.$transaction([
    prisma.climbTheQuestLevelProgress.deleteMany({ where: { participationId: { in: await prisma.climbTheQuestParticipation.findMany({ where: { climbTheQuestId: id }, select: { id: true } }).then(ps => ps.map(p => p.id)) } } }),
    prisma.climbTheQuestParticipation.deleteMany({ where: { climbTheQuestId: id } }),
    prisma.climbTheQuest.delete({ where: { id } }),
  ]);
};

/**
 * Participation CRUD
 */
export const addParticipation = async (climbId: number, data: NewParticipation): Promise<ClimbTheQuestParticipation> => {
  await createParticipationSchema.validate(data, { abortEarly: false });
  const quest = await getClimbById(climbId);
  if (!quest) throw new CustomError('Climb The Quest não encontrado', 404);
  return prisma.climbTheQuestParticipation.create({ data: { climbTheQuestId: climbId, userId: data.userId } });
};

export const listParticipations = async (climbId: number): Promise<ClimbTheQuestParticipation[]> => {
  return prisma.climbTheQuestParticipation.findMany({ where: { climbTheQuestId: climbId }, orderBy: { startedAt: 'asc' } });
};

export const removeParticipation = async (participationId: number): Promise<void> => {
  await prisma.climbTheQuestParticipation.delete({ where: { id: participationId } });
};

/**
 * Level progress
 */
export const updateLevelProgress = async (
  participationId: number,
  level: number,
  data: LevelUpdate
): Promise<ClimbTheQuestLevelProgress> => {
  await updateLevelProgressSchema.validate(data, { abortEarly: false });
  // upsert progress record
  return prisma.climbTheQuestLevelProgress.upsert({
    where: { participationId_level: { participationId, level } },
    create: { participationId, level, attemptsLeft: data.attemptsLeft ?? 5, result: data.result ?? 'NAO_COMPLETOU' },
    update: { ...data },
  });
};
