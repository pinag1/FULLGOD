// src/services/slotPaymentService.ts
import { SlotPaymentSource } from '@prisma/client';
import { CustomError } from '../errors/customError';
import prisma from '../lib/prisma';
import { slotPaymentSchema } from '../validators/slotPaymentValidator';
import { recalcBase } from './slotService';

const calculateMultiplier = (bet: number, payment: number): number => payment && bet ? payment / bet : 0;

export const recalculateSlotMetrics = async (slotId: number): Promise<void> => {
  const pagamentos = await prisma.slotPayment.findMany({ where: { slotId } });
  if (!pagamentos.length) return;
  let bestWin = 0, bestX = 0, sumX = 0, quantidadeBonus = 0;
  pagamentos.forEach(p => {
    if (p.payment > bestWin) bestWin = p.payment;
    if (p.multi > bestX) bestX = p.multi;
    sumX += p.multi;
    if (p.payment > p.bet) quantidadeBonus++;
  });
  const avgX = sumX / pagamentos.length;
  await prisma.slot.update({ where: { id: slotId }, data: { bestwin: bestWin, bestX, avgX, quantidadeBonus } });
};

export const createPayment = async (payload: any) => {
  const data = await slotPaymentSchema.validate(payload, { abortEarly: false });
  const slot = await prisma.slot.findUnique({ where: { id: data.slotId } });
  if (!slot) throw new CustomError('Slot não encontrado', 404);

  const multi = calculateMultiplier(data.bet, data.payment);
  const payment = await prisma.slotPayment.create({ data: { ...data, multi, source: data.source as SlotPaymentSource } });

  // recalcula variante
  await recalculateSlotMetrics(data.slotId);
  // se for variante, recalcular base
  if (slot.slotReferenceId) {
    await recalcBase(slot.slotReferenceId);
  }

  return payment;
};

export const getAllPayments = async () => {
  const pagamentos = await prisma.slotPayment.findMany({ include: { slot: true } });
  return pagamentos.map(p => ({
    ...p,
    multi: p.multi ?? calculateMultiplier(p.bet, p.payment)
  }));
};

export const getPaymentById = async (id: number) => {
  const p = await prisma.slotPayment.findUnique({ where: { id }, include: { slot: true } });
  if (!p) throw new CustomError('Pagamento não encontrado', 404);
  if (p.multi === undefined) p.multi = calculateMultiplier(p.bet, p.payment);
  return p;
};

export const updatePayment = async (id: number, data: any) => {
  const existing = await prisma.slotPayment.findUnique({ where: { id } });
  if (!existing) throw new CustomError('Pagamento não encontrado', 404);
  const allowed = ['name','slotId','bet','payment','source','eventId'];
  const toUpdate: any = {};
  allowed.forEach(k => { if (data[k] !== undefined) toUpdate[k] = data[k]; });
  if (toUpdate.bet !== undefined || toUpdate.payment !== undefined) {
    const bet = toUpdate.bet ?? existing.bet;
    const payment = toUpdate.payment ?? existing.payment;
    toUpdate.multi = calculateMultiplier(bet, payment);
  }
  const updated = await prisma.slotPayment.update({ where: { id }, data: toUpdate });

  // recalcula variante
  await recalculateSlotMetrics(updated.slotId);
  // se variante, recalcula pai
  const slot = await prisma.slot.findUnique({ where: { id: updated.slotId } });
  if (slot?.slotReferenceId) {
    await recalcBase(slot.slotReferenceId);
  }

  return updated;
};

export const deletePayment = async (id: number) => {
  const existing = await prisma.slotPayment.findUnique({ where: { id } });
  if (!existing) throw new CustomError('Pagamento não encontrado', 404);
  await prisma.slotPayment.delete({ where: { id } });

  // recalcula variante
  await recalculateSlotMetrics(existing.slotId);
  // se variante, recalcula pai
  const slot = await prisma.slot.findUnique({ where: { id: existing.slotId } });
  if (slot?.slotReferenceId) {
    await recalcBase(slot.slotReferenceId);
  }
};

export const deleteByCriteria = async (slotId: number, eventId: number, source: SlotPaymentSource) => {
  const existing = await prisma.slotPayment.findFirst({ where: { slotId, eventId, source } });
  if (!existing) throw new CustomError('Pagamento não encontrado', 404);
  await prisma.slotPayment.delete({ where: { id: existing.id } });

  // recalcula variante
  await recalculateSlotMetrics(slotId);
  // se variante, recalcula pai
  const slot = await prisma.slot.findUnique({ where: { id: slotId } });
  if (slot?.slotReferenceId) {
    await recalcBase(slot.slotReferenceId);
  }
};

export const getBySlotId = async (slotId: number) =>
  prisma.slotPayment.findMany({ where: { slotId }, orderBy: { createdAt: 'desc' } });

export const searchBySlotName = async (name: string) => {
  if (!name.trim()) throw new CustomError('Nome do slot obrigatório', 400);
  const pagamentos = await prisma.slotPayment.findMany({
    where: { slot: { name: { contains: name } } },
    include: { slot: true }
  });
  if (!pagamentos.length) throw new CustomError('Nenhum pagamento encontrado', 404);
  return pagamentos.map(p => ({ ...p, multi: p.multi ?? calculateMultiplier(p.bet, p.payment) }));
};
