// src/services/eloService.ts

import {
    EloMaisFraco,
    EloMaisFracoParticipant
} from '@prisma/client';
import { InferType } from 'yup';
import { CustomError } from '../errors/customError';
import prisma from '../lib/prisma';
import {
    createEloParticipationSchema,
    createEloSchema
} from '../validators/eloValidator';
  
  type NewElo = InferType<typeof createEloSchema>;
  type NewEloParticipation = InferType<typeof createEloParticipationSchema>;
  
  // EloMaisFraco CRUD
  export const createElo = async (data: NewElo): Promise<EloMaisFraco> => {
    await createEloSchema.validate(data, { abortEarly: false });
    return prisma.eloMaisFraco.create({ data });
  };
  
  export const getAllElos = async (): Promise<EloMaisFraco[]> => {
    return prisma.eloMaisFraco.findMany({ orderBy: { createdAt: 'desc' } });
  };
  
  export const getEloById = async (id: number): Promise<EloMaisFraco | null> => {
    return prisma.eloMaisFraco.findUnique({ where: { id } });
  };
  
  export const updateElo = async (id: number, data: Partial<NewElo>): Promise<EloMaisFraco> => {
    await createEloSchema.validate(data, { abortEarly: false });
    const existing = await getEloById(id);
    if (!existing) throw new CustomError('Elo Mais Fraco não encontrado', 404);
    return prisma.eloMaisFraco.update({ where: { id }, data });
  };
  
  export const deleteElo = async (id: number): Promise<void> => {
    const existing = await getEloById(id);
    if (!existing) throw new CustomError('Elo Mais Fraco não encontrado', 404);
    await prisma.$transaction([
      prisma.eloMaisFracoParticipant.deleteMany({ where: { eloMaisFracoId: id } }),
      prisma.eloMaisFraco.delete({ where: { id } }),
    ]);
  };
  
  // Participations
  export const addEloParticipation = async (
    eloId: number,
    data: NewEloParticipation
  ): Promise<EloMaisFracoParticipant> => {
    await createEloParticipationSchema.validate(data, { abortEarly: false });
    const quest = await getEloById(eloId);
    if (!quest) throw new CustomError('Elo Mais Fraco não encontrado', 404);
    return prisma.eloMaisFracoParticipant.create({
      data: { eloMaisFracoId: eloId, userId: data.userId, score: data.score ?? 0 },
    });
  };
  
  export const listEloParticipations = async (
    eloId: number
  ): Promise<EloMaisFracoParticipant[]> => {
    return prisma.eloMaisFracoParticipant.findMany({
      where: { eloMaisFracoId: eloId },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });
  };
  
  export const removeEloParticipation = async (
    participantId: number
  ): Promise<void> => {
    await prisma.eloMaisFracoParticipant.delete({ where: { id: participantId } });
  };
  
  export const updateEloParticipationScore = async (
    participantId: number,
    score: number
  ): Promise<EloMaisFracoParticipant> => {
    const existing = await prisma.eloMaisFracoParticipant.findUnique({ where: { id: participantId } });
    if (!existing) throw new CustomError('Participante não encontrado', 404);
    return prisma.eloMaisFracoParticipant.update({
      where: { id: participantId },
      data: { score },
    });
  };
  