import { PrismaClient, Profile, Role, Slot, SlotPayment, SlotPaymentSource } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 0) Limpa tabelas antes de semear
  await prisma.slotPayment.deleteMany();
  await prisma.slot.deleteMany();
  await prisma.user.deleteMany();

  // 1) Criar 50 slots base e variantes para os 15 primeiros
  const baseSlots: Slot[] = [];
  for (let i = 1; i <= 50; i++) {
    const base = await prisma.slot.create({
      data: {
        name: `Slot${i}`,
        displayName: `Slot${i}`,
        provider: ['Relax Gaming', 'Pragmatic Play', 'Hacksaw Gaming', 'Nolimit City'][i % 4],
        rtp: parseFloat((95 + Math.random() * 5).toFixed(2)),
        potencial: Math.floor(Math.random() * 100000) + 1000,
        volatility: Math.ceil(Math.random() * 5),
        releaseDate: new Date(2020 + (i % 3), i % 12, (i * 3) % 28 + 1),
      },
    });
    baseSlots.push(base);
    if (i <= 15) {
      for (const label of ['bonus', 'super bonus']) {
        await prisma.slot.create({
          data: {
            name: `${base.name}|${label}`,
            displayName: `${base.displayName}|${label}`,
            provider: base.provider,
            rtp: base.rtp,
            potencial: base.potencial,
            volatility: base.volatility,
            releaseDate: base.releaseDate,
            slotReferenceId: base.id,
            isSuper: label === 'super bonus',
          },
        });
      }
    }
  }

  // 2) Criar 20 usuários (somente VIEWER)
  await prisma.user.createMany({
    data: Array.from({ length: 20 }).map((_, idx) => ({
      name: `User${idx + 1}`,
      email: `user${idx + 1}@example.com`,
      password: `password${idx + 1}`,
      role: Role.VIEWER,
      profile: Profile.NORMAL,
    })),
    skipDuplicates: true,
  });

  // 3) Criar pagamentos para todas as slots
  const allSlots = await prisma.slot.findMany();
  for (const slot of allSlots) {
    const payments: SlotPayment[] = [];
    for (let k = 1; k <= 3; k++) {
      const bet = parseFloat((Math.random() * 10 + 1).toFixed(2));
      const payment = parseFloat((Math.random() * 20 + 1).toFixed(2));
      const pay = await prisma.slotPayment.create({
        data: {
          name: `${slot.displayName}`,
          bet,
          payment,
          multi: parseFloat((payment / bet).toFixed(2)),
          source: k % 2 === 0 ? SlotPaymentSource.BONUS_HUNT : SlotPaymentSource.MAIN_SLOT,
          slotId: slot.id,
        },
      });
      payments.push(pay);
    }

    // Atualizar métricas do slot (variante ou base sem variantes)
    if (slot.slotReferenceId !== null) {
      // Variante
      const bestwin = Math.max(...payments.map(p => p.payment));
      const bestX = Math.max(...payments.map(p => p.payment / p.bet));
      const avgX = payments.reduce((s, p) => s + p.payment / p.bet, 0) / payments.length;
      const quantidadeBonus = payments.length;
      await prisma.slot.update({ where: { id: slot.id }, data: { bestwin, bestX, avgX, quantidadeBonus } });
    } else {
      // Base sem variantes (essas slots não têm slotReferenceId)
      const bestwin = Math.max(...payments.map(p => p.payment));
      const bestX = Math.max(...payments.map(p => p.payment / p.bet));
      const avgX = payments.reduce((s, p) => s + p.payment / p.bet, 0) / payments.length;
      const quantidadeBonus = payments.length;
      await prisma.slot.update({ where: { id: slot.id }, data: { bestwin, bestX, avgX, quantidadeBonus } });
    }
  }

  // 4) Atualizar métricas de slots base com variantes
  for (const base of baseSlots) {
    const variants = await prisma.slot.findMany({ where: { slotReferenceId: base.id } });
    if (variants.length) {
      const variantPayments = await prisma.slotPayment.findMany({ where: { slotId: { in: variants.map(v => v.id) } } });
      // melhores métricas das variantes
      const bestwin = Math.max(...variants.map(v => v.bestwin ?? 0));
      const bestX = Math.max(...variants.map(v => v.bestX ?? 0));
      const quantidadeBonus = variants.reduce((sum, v) => sum + (v.quantidadeBonus ?? 0), 0);
      const avgX = variantPayments.reduce((s, p) => s + p.payment / p.bet, 0) / variantPayments.length;
      await prisma.slot.update({ where: { id: base.id }, data: { bestwin, bestX, avgX, quantidadeBonus } });
    }
  }

  console.log('Seed finalizado.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());