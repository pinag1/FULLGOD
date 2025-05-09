// Service: slotService.ts
import { Slot, SlotPayment } from '@prisma/client';
import type { CreateSlotDto, UpdateSlotDto } from '../dtos/slotDto';
import { CustomError } from '../errors/customError';
import prisma from '../lib/prisma';
import { validateSlotData } from '../validators/slotValidator';

function toFloat(val: string | number | null | undefined): number | null {
  if (val == null) return null;
  const n = typeof val === 'number' ? val : parseFloat(val);
  return isNaN(n) ? null : n;
}

export async function recalcVariant(id: number) {
  const payments: SlotPayment[] = await prisma.slotPayment.findMany({ where: { slotId: id } });
  if (!payments.length) return;
  const bestwin = Math.max(...payments.map(p => p.payment));
  const bestX = Math.max(...payments.map(p => p.payment / p.bet));
  const avgX = payments.reduce((s, p) => s + p.payment / p.bet, 0) / payments.length;
  const quantidadeBonus = payments.length;
  await prisma.slot.update({ where: { id }, data: { bestwin, bestX, avgX, quantidadeBonus } });
}

export async function recalcBase(id: number) {
  const variants = await prisma.slot.findMany({ where: { slotReferenceId: id } });
  if (!variants.length) return;
  const payments = await prisma.slotPayment.findMany({ where: { slotId: { in: variants.map(v => v.id) } } });
  const bestwin = Math.max(...variants.map(v => v.bestwin ?? 0));
  const bestX = Math.max(...variants.map(v => v.bestX ?? 0));
  const quantidadeBonus = variants.reduce((s, v) => s + (v.quantidadeBonus ?? 0), 0);
  const avgX = payments.length ? payments.reduce((s, p) => s + p.payment / p.bet, 0) / payments.length : 0;
  await prisma.slot.update({ where: { id }, data: { bestwin, bestX, avgX, quantidadeBonus } });
}

export const createSlot = async (data: CreateSlotDto): Promise<Slot> => {
  await validateSlotData(data);
  const slot = await prisma.slot.create({
    data: {
      name: data.name,
      displayName: data.displayName,
      provider: data.provider,
      rtp: toFloat(data.rtp),
      potencial: toFloat(data.potencial),
      volatility: toFloat(data.volatility),
      releaseDate: data.releaseDate ? new Date(data.releaseDate) : null,
      isSuper: data.isSuper ?? false,
      slotReferenceId: data.slotReferenceId || null,
      bestwin: 0,
      bestX: 0,
      avgX: 0,
      quantidadeBonus: 0,
      variants: {
        create: data.variants?.map(v => ({
          name: v.displayName,
          displayName: v.displayName,
          isSuper: v.isSuper ?? false,
          // initialize other fields
          provider: data.provider,
          rtp: toFloat(data.rtp),
          potencial: toFloat(data.potencial),
          volatility: toFloat(data.volatility),
          releaseDate: data.releaseDate ? new Date(data.releaseDate) : null,
          bestwin: 0,
          bestX: 0,
          avgX: 0,
          quantidadeBonus: 0,
        })) || [],
      },
    },
    include: { variants: true }
  });
  // Recalculate metrics for each variant
  for (const v of slot.variants) {
    await recalcVariant(v.id);
  }
  // Recalculate base slot metrics
  await recalcBase(slot.id);
  return slot;
};

export const getAllSlots = async (): Promise<Slot[]> =>
  prisma.slot.findMany({ include: { variants: true, payments: true } });

export const getSlotById = async (id: number): Promise<Slot> => {
  const slot = await prisma.slot.findUnique({ where: { id }, include: { variants: true, payments: true } });
  if (!slot) throw new CustomError('Slot não encontrado', 404);
  return slot;
};

export const updateSlot = async (id: number, data: UpdateSlotDto): Promise<Slot> => {
  await validateSlotData(data);
  const existing = await prisma.slot.findUnique({ where: { id } });
  if (!existing) throw new CustomError('Slot não encontrado', 404);
  const updated = await prisma.slot.update({
    where: { id },
    data: {
      name: data.name ?? existing.name,
      displayName: data.displayName ?? existing.displayName,
      provider: data.provider ?? existing.provider,
      rtp: data.rtp != null ? toFloat(data.rtp) : existing.rtp,
      potencial: data.potencial != null ? toFloat(data.potencial) : existing.potencial,
      volatility: data.volatility != null ? toFloat(data.volatility) : existing.volatility,
      releaseDate: data.releaseDate ? new Date(data.releaseDate) : existing.releaseDate,
      isSuper: data.isSuper ?? existing.isSuper,
      slotReferenceId: data.slotReferenceId ?? existing.slotReferenceId,
    },
  });
  // Recalc children if any
  await recalcVariant(updated.id);
  if (!updated.slotReferenceId) {
    await recalcBase(updated.id);
  } else {
    await recalcBase(updated.slotReferenceId);
  }
  return updated;
};

export const deleteSlot = async (id: number): Promise<void> => {
  if (!(await prisma.slot.findUnique({ where: { id } }))) throw new CustomError('Slot não encontrado', 404);
  await prisma.slot.delete({ where: { id } });
};

export const searchSlotsByName = async (term: string): Promise<Slot[]> => {
  return prisma.slot.findMany({
    where: { name: { contains: term } },
    orderBy: { name: 'asc' },
    include: { variants: true, payments: true },
    take: 20,
  });
};
