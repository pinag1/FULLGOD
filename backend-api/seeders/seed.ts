import { BonusHuntStatus, ClimbResult, PrismaClient, Profile, Role, Round, SlotPaymentSource } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (dev only)
  await prisma.slotPayment.deleteMany();
  await prisma.kingOfTheHillEntry.deleteMany();
  await prisma.kingOfTheHill.deleteMany();
  await prisma.eloMaisFracoParticipant.deleteMany();
  await prisma.eloMaisFraco.deleteMany();
  await prisma.climbTheQuestLevelProgress.deleteMany();
  await prisma.climbTheQuestParticipation.deleteMany();
  await prisma.climbTheQuest.deleteMany();
  await prisma.tournamentMatch.deleteMany();
  await prisma.tournamentParticipant.deleteMany();
  await prisma.tournament.deleteMany();
  await prisma.bonusBuyBattle.deleteMany();
  await prisma.bonusHuntSummary.deleteMany();
  await prisma.bonusHunt.deleteMany();
  await prisma.slot.deleteMany();
  await prisma.user.deleteMany();

  // Users
  const alice = await prisma.user.create({ data: { name: 'Alice Admin', email: 'alice@example.com', password: 'pass', role: Role.ADMIN, profile: Profile.VIP } });
  const bob = await prisma.user.create({ data: { name: 'Bob Editor', email: 'bob@example.com', password: 'pass', role: Role.EDITOR, profile: Profile.SUBSCRITOR } });
  const carol = await prisma.user.create({ data: { name: 'Carol Viewer', email: 'carol@example.com', password: 'pass', role: Role.VIEWER, profile: Profile.NORMAL } });

  // Slots
  const slotA = await prisma.slot.create({ data: { name: 'Slot A', provider: 'Provider1', rtp: 96.5, potencial: 10, volatility: 3, bestwin: 500, bestX: 50, avgX: 20, quantidadeBonus: 5, releaseDate: new Date('2022-01-01') } });
  const slotB = await prisma.slot.create({ data: { name: 'Slot B', provider: 'Provider2', rtp: 94.3, potencial: 8, volatility: 2, bestwin: 300, bestX: 30, avgX: 15, quantidadeBonus: 4, releaseDate: new Date('2023-06-15') } });

  // Bonus Hunt
  const hunt = await prisma.bonusHunt.create({ data: { name: 'Morning Hunt', description: 'Test hunt', status: BonusHuntStatus.HUNTING, madeById: alice.id } });
  await prisma.bonusHuntSummary.create({ data: { bonusHuntId: hunt.id, bonusQuantity: 10, totalBonusValue: 100, remainingBonusQuantity: 8, remainingBonusValue: 80, bestSlot: slotA.name, worstSlot: slotB.name, madeBy: alice.name!, start: 0, startTime: new Date(), initialBreakEven: 0, currentBreakEven: 20, averageMulti: 5, totalPay: 50, nowPlaying: slotA.name } });

  // Bonus Buy Battle
  const battle = await prisma.bonusBuyBattle.create({ data: { maxRounds: 3, slot1BonusValue: 5, slot2BonusValue: 5, player1Id: bob.id, player2Id: carol.id, slot1Id: slotA.id, slot2Id: slotB.id } });

  // Tournament
  const tournament = await prisma.tournament.create({ data: { name: 'Spring Showdown', description: 'Annual dev tournament' } });
  await prisma.tournamentParticipant.createMany({ data: [
    { tournamentId: tournament.id, userId: alice.id, slotId: slotA.id, seed: 1 },
    { tournamentId: tournament.id, userId: bob.id, slotId: slotB.id, seed: 2 }
  ] });
  const match = await prisma.tournamentMatch.create({ data: { tournamentId: tournament.id, roundNumber: Round.OITAVAS, matchNumber: 1, player1Id: alice.id, player2Id: bob.id, slot1Id: slotA.id, slot2Id: slotB.id, maxRounds: 5, slot1BonusValue: 5, slot2BonusValue: 5 } });

  // Update match scores and generate payments
  await prisma.tournamentMatch.update({ where: { id: match.id }, data: { player1Score: 10, player2Score: 7, winnerId: alice.id } });
  await prisma.slotPayment.createMany({ data: [
    { name: `T${tournament.id}-R${match.roundNumber}-M${match.matchNumber}-P1`, source: SlotPaymentSource.TOURNAMENT, eventId: match.id, slotId: slotA.id, bet: 0.05, payment: 10, multi: 200 },
    { name: `T${tournament.id}-R${match.roundNumber}-M${match.matchNumber}-P2`, source: SlotPaymentSource.TOURNAMENT, eventId: match.id, slotId: slotB.id, bet: 0.05, payment: 7, multi: 140 }
  ] });

  // Climb The Quest
  const climb = await prisma.climbTheQuest.create({ data: { name: 'Daily Climb', description: 'Level challenge' } });
  const climbPart = await prisma.climbTheQuestParticipation.create({ data: { climbTheQuestId: climb.id, userId: carol.id } });
  await prisma.climbTheQuestLevelProgress.createMany({ data: [
    { participationId: climbPart.id, level: 1, attemptsLeft: 3, result: ClimbResult.COMPLETOU },
    { participationId: climbPart.id, level: 2, attemptsLeft: 0, result: ClimbResult.NAO_COMPLETOU }
  ] });

  // Elo Mais Fraco
  const eloGame = await prisma.eloMaisFraco.create({ data: { name: 'Weakest Link Round' } });
  await prisma.eloMaisFracoParticipant.createMany({ data: [
    { eloMaisFracoId: eloGame.id, userId: alice.id, score: 15 },
    { eloMaisFracoId: eloGame.id, userId: bob.id, score: 20 }
  ] });

  // King Of The Hill
  const hill = await prisma.kingOfTheHill.create({ data: {} });
  await prisma.kingOfTheHillEntry.createMany({ data: [
    { kingOfTheHillId: hill.id, slotId: slotA.id, userId: alice.id },
    { kingOfTheHillId: hill.id, slotId: slotB.id, userId: bob.id }
  ] });

  console.log('🗄️  Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
