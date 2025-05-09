// src/services/bonusBuyBattleService.ts
import { PrismaClient } from '@prisma/client';
import type { InferType } from 'yup';
import { ValidationError } from 'yup';
import { createBattleSchema, updateScoresSchema } from '../validators/bonusBuyBattleValidator';

const prisma = new PrismaClient();

type CreateBattleInput = InferType<typeof createBattleSchema>;
type UpdateScoresInput = InferType<typeof updateScoresSchema>;

export const createBonusBuyBattle = async (input: unknown) => {
  let data: CreateBattleInput;
  try {
    data = await createBattleSchema.validate(input, { stripUnknown: true });
  } catch (err) {
    if (err instanceof ValidationError) throw err;
    throw new Error('Erro de validação');
  }

  return prisma.bonusBuyBattle.create({
    data: {
      name: data.name || 'Bonus Buy Battle',
      description: data.description || '',
      player1Id: data.player1Id,
      player2Id: data.player2Id,
      slot1Id: data.slot1Id,
      slot2Id: data.slot2Id,
      maxRounds: data.maxRounds,
      slot1BonusValue: data.slot1BonusValue ?? null,
      slot2BonusValue: data.slot2BonusValue ?? null,
    },
  });
};

export const getAllBattles = () =>
  prisma.bonusBuyBattle.findMany({
    orderBy: { createdAt: 'desc' },
    include: { player1: true, player2: true, slot1: true, slot2: true, winner: true },
  });

export const getBattleById = (id: number) =>
  prisma.bonusBuyBattle.findUnique({
    where: { id },
    include: { player1: true, player2: true, slot1: true, slot2: true, winner: true },
  });

export const deleteBattle = async (id: number) => {
  const battle = await prisma.bonusBuyBattle.findUnique({ where: { id } });
  if (!battle) {
    const err = new Error('Batalha não encontrada');
    (err as any).status = 404;
    throw err;
  }

  await prisma.$transaction(async (tx) => {
    // slot_payments são tratados em outro serviço, então aqui só removemos a battle
    await tx.bonusBuyBattle.delete({ where: { id } });
  });
};

export const updateBattleScores = async (battleId: number, input: unknown) => {
  let data: UpdateScoresInput;
  try {
    data = await updateScoresSchema.validate(input, { stripUnknown: true });
  } catch (err) {
    if (err instanceof ValidationError) throw err;
    throw new Error('Erro de validação');
  }

  // Apenas atualiza os scores e o vencedor na tabela bonusBuyBattle
  return prisma.bonusBuyBattle.update({
    where: { id: battleId },
    data: {
      player1Score: data.player1Score,
      player2Score: data.player2Score,
      winnerId: data.winnerId,
    },
  });
};
