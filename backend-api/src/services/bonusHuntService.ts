// src/services/bonusHuntService.ts
import { PrismaClient, SlotPaymentSource } from '@prisma/client';
import type { InferType } from 'yup';
import { ValidationError } from 'yup';
import { BonusHuntStatus } from '../utils/enums';
import {
  createBonusHuntSchema,
  updateBonusHuntSchema,
  updateStatusSchema,
} from '../validators/bonusHuntValidator';

const prisma = new PrismaClient();

type CreateInput = InferType<typeof createBonusHuntSchema>;
type UpdateInput = InferType<typeof updateBonusHuntSchema>;
type StatusInput = InferType<typeof updateStatusSchema>;

export const createBonusHunt = async (input: unknown, userId: number) => {
  let data: CreateInput;
  try {
    data = await createBonusHuntSchema.validate(input, { stripUnknown: true });
  } catch (err) {
    if (err instanceof ValidationError) {
      (err as any).status = 400;
      throw err;
    }
    throw err;
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    const e = new Error('Usuário não encontrado');
    (e as any).status = 404;
    throw e;
  }

  return prisma.bonusHunt.create({
    data: {
      name: data.name,
      description: data.description ?? '',
      madeById: userId,
      status: BonusHuntStatus.HUNTING,
    },
  });
};

export const getAllBonusHunts = () =>
  prisma.bonusHunt.findMany({
    orderBy: { createdAt: 'desc' },
    include: { madeBy: true, summary: true /* payments relation not generated? adjust if needed */ },
  });

export const getBonusHuntById = (id: number) =>
  prisma.bonusHunt.findUnique({
    where: { id },
    include: { madeBy: true, summary: true /* remove payments include or regenerate client */ },
  });

export const getSlotPaymentsByBonusHunt = (id: number) =>
  prisma.slotPayment.findMany({
    where: { eventId: id, source: SlotPaymentSource.BONUS_HUNT },
    include: { slot: true },
    orderBy: { createdAt: 'desc' },
  });

export const updateBonusHunt = async (id: number, input: unknown) => {
  let data: UpdateInput;
  try {
    data = await updateBonusHuntSchema.validate(input, { stripUnknown: true });
  } catch (err) {
    if (err instanceof ValidationError) {
      (err as any).status = 400;
      throw err;
    }
    throw err;
  }

  return prisma.bonusHunt.update({ where: { id }, data });
};

export const updateBonusHuntStatus = async (
  id: number,
  input: unknown,
  userId: number
) => {
  let payload: StatusInput;
  try {
    payload = await updateStatusSchema.validate(input, { stripUnknown: true });
  } catch (err) {
    if (err instanceof ValidationError) {
      (err as any).status = 400;
      throw err;
    }
    throw err;
  }

  const current = await prisma.bonusHunt.findUnique({ where: { id } });
  if (!current) {
    const e = new Error('Bonus Hunt não encontrado');
    (e as any).status = 404;
    throw e;
  }

  if (payload.status === BonusHuntStatus.HUNTING) {
    const exists = await prisma.bonusHunt.findFirst({
      where: {
        madeById: userId,
        status: BonusHuntStatus.HUNTING,
        NOT: { id },
      },
    });
    if (exists) {
      const e = new Error('Já existe um Bonus Hunt em Hunting');
      (e as any).status = 400;
      throw e;
    }
  }

  return prisma.bonusHunt.update({
    where: { id },
    data: { status: payload.status },
  });
};

export const deleteBonusHunt = async (id: number) => {
  const hunt = await prisma.bonusHunt.findUnique({ where: { id } });
  if (!hunt) {
    const e = new Error('Bonus Hunt não encontrado');
    (e as any).status = 404;
    throw e;
  }

  await prisma.$transaction([
    prisma.bonusHuntSummary.deleteMany({ where: { bonusHuntId: id } }),
    prisma.slotPayment.deleteMany({ where: { eventId: id, source: SlotPaymentSource.BONUS_HUNT } }),
    prisma.bonusHunt.delete({ where: { id } }),
  ]);
};