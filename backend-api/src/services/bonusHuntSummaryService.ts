// src/services/bonusHuntSummaryService.ts
import { PrismaClient, SlotPaymentSource } from '@prisma/client';
import { validateBonusHuntSummaryData } from '../validators/bonusHuntSummaryValidator';

const prisma = new PrismaClient();

export async function calculateBonusHuntSummary(
  bonusHuntId: number,
  start?: any,
  madeBy?: string
) {
  // fetch defaults if missing
  if (start === undefined || madeBy === undefined) {
    const existing = await prisma.bonusHuntSummary.findUnique({
      where: { bonusHuntId }
    });
    if (!existing) throw Object.assign(new Error('Resumo não encontrado'), { status: 404 });
    start = existing.start;
    madeBy = existing.madeBy;
  }

  // validate input
  let payload;
  try {
    payload = validateBonusHuntSummaryData(start, madeBy!);
  } catch (err: any) {
    throw Object.assign(err, { status: 400 });
  }

  // gather payments
  const payments = await prisma.slotPayment.findMany({
    where: { eventId: bonusHuntId, source: SlotPaymentSource.BONUS_HUNT },
    include: { slot: true }
  });

  const bonusQuantity = payments.length;
  const totalBonusValue = payments.reduce((sum, p) => sum + p.bet, 0) * 100;
  const remaining = payments.filter(p => p.payment === 0);
  const remainingQuantity = remaining.length;
  const remainingValue = remaining.reduce((sum, p) => sum + p.bet, 0);
  const totalPay = payments.reduce((sum, p) => sum + p.payment, 0);
  const weightedSum = payments.reduce((sum, p) => sum + p.bet * p.multi, 0);
  const averageMulti = totalBonusValue > 0
    ? (weightedSum / totalBonusValue) * 100
    : 0;
  const initialBreakEven = totalBonusValue ? (payload.start / totalBonusValue) * 100 : 0;
  const currentBreakEven = remainingValue && payload.start - totalPay > 0
    ? (payload.start - totalPay) / remainingValue
    : 0;
  const bestSlot = payments.reduce((best, p) => p.multi > (best.multi || 0) ? p : best, {} as any).slot?.name || '';
  const worstSlot = payments.reduce((worst, p) => p.multi < (worst.multi || Infinity) ? p : worst, {} as any).slot?.name || '';

  // upsert summary
  return prisma.bonusHuntSummary.upsert({
    where: { bonusHuntId },
    create: {
      bonusQuantity,
      totalBonusValue,
      remainingBonusQuantity: remainingQuantity,
      remainingBonusValue: remainingValue,
      bestSlot,
      worstSlot,
      averageMulti,
      totalPay,
      start: payload.start,
      madeBy: payload.madeBy,
      startTime: new Date(),
      initialBreakEven,
      currentBreakEven,
      nowPlaying: '',
      bonusHunt: {
        connect: { id: bonusHuntId }   // <–– só o nested connect
      }
    },
    update: {
      bonusQuantity,
      totalBonusValue,
      remainingBonusQuantity: remainingQuantity,
      remainingBonusValue: remainingValue,
      bestSlot,
      worstSlot,
      averageMulti,
      totalPay,
      start: payload.start,
      madeBy: payload.madeBy,
      initialBreakEven,
      currentBreakEven
    }
  });
}

export function getBonusHuntSummary(bonusHuntId: number) {
  return prisma.bonusHuntSummary.findUnique({ where: { bonusHuntId } });
}

export function updateBonusHuntSummaryStart(bonusHuntId: number, start: any) {
  const startValue = parseFloat(start);
  if (isNaN(startValue)) throw Object.assign(new Error('Start inválido'), { status: 400 });
  return prisma.bonusHuntSummary.update({
    where: { bonusHuntId },
    data: { start: startValue, updatedAt: new Date() }
  });
}
