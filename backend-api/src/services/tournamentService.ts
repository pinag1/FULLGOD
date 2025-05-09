// src/services/tournamentService.ts

import {
  Round,
  SlotPaymentSource,
  Tournament,
  TournamentMatch,
  TournamentParticipant,
} from '@prisma/client';
import { CreateTournamentDto, UpdateTournamentDto } from '../dtos/tournamentDto';
import prisma from '../lib/prisma';
import {
  validateCreateTournament,
  validateUpdateTournament,
} from '../validators/tournamentValidator';

/**
 * Gera automaticamente todo o bracket (8 → 4 → 2 → 1) para um torneio de 8 participantes.
 */
export async function generateBracket(tournamentId: number): Promise<void> {
  const participants = await prisma.tournamentParticipant.findMany({
    where: { tournamentId },
    orderBy: { seed: 'asc' },
  });
  if (participants.length !== 8) {
    throw new Error('Para gerar o bracket, devem existir exatamente 8 participantes.');
  }

  type MatchCreate = Omit<
    TournamentMatch,
    'id' | 'player1Score' | 'player2Score' | 'winnerId' | 'createdAt' | 'updatedAt'
  >;

  // 1) Quartos (4 jogos) — todos os campos não-nulos
  const quarterFinals: MatchCreate[] = participants.reduce<MatchCreate[]>((acc, _, idx, arr) => {
    if (idx % 2 === 0) {
      acc.push({
        tournamentId,
        roundNumber: Round.QUARTOS,
        matchNumber: idx / 2 + 1,
        player1Id: arr[idx].userId,
        player2Id: arr[idx + 1].userId,
        slot1Id: arr[idx].slotId,
        slot2Id: arr[idx + 1].slotId,
        maxRounds: 3,
        slot1BonusValue: 0,
        slot2BonusValue: 0,
      });
    }
    return acc;
  }, []);

  // Insere somente os Quartos de uma vez
  await prisma.tournamentMatch.createMany({ data: quarterFinals });

  // 2) Semis (2 jogos) — criados um-a-um para permitir null
  for (let n = 1; n <= 2; n++) {
    await prisma.tournamentMatch.create({
      data: {
        tournamentId,
        roundNumber: Round.SEMIS,
        matchNumber: n,
        player1Id: null as any,
        player2Id: null as any,
        slot1Id: null as any,
        slot2Id: null as any,
        maxRounds: 3,
        slot1BonusValue: 0,
        slot2BonusValue: 0,
      },
    });
  }

  // 3) Final (1 jogo) — também com null
  await prisma.tournamentMatch.create({
    data: {
      tournamentId,
      roundNumber: Round.FINAL,
      matchNumber: 1,
      player1Id: null as any,
      player2Id: null as any,
      slot1Id: null as any,
      slot2Id: null as any,
      maxRounds: 3,
      slot1BonusValue: 0,
      slot2BonusValue: 0,
    },
  });
}

/**
 * Cria um novo torneio (com validação interna).
 */
export const createTournament = async (
  data: CreateTournamentDto
): Promise<Tournament> => {
  await validateCreateTournament(data);
  return prisma.tournament.create({ data });
};

/**
 * Lista todos os torneios, com contagem de participantes.
 */
export const getAllTournaments = async (): Promise<
  (Tournament & { _count: { participants: number } })[]
> => {
  return prisma.tournament.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { participants: true } } },
  });
};

/**
 * Retorna um torneio completo, incluindo participantes, partidas e pagamentos.
 */
export const getTournamentById = async (
  id: number
): Promise<
  | (Tournament & {
      participants: (TournamentParticipant & {
        user: { id: number; name: string | null };
        slot: { id: number; name: string };
      })[];
      matches: (TournamentMatch & {
        player1: { id: number; name: string | null } | null;
        player2: { id: number; name: string | null } | null;
        slot1: { id: number; name: string } | null;
        slot2: { id: number; name: string } | null;
        winner: { id: number; name: string | null } | null;
      })[];
      payments: any[];
    })
  | null
> => {
  const tournament = await prisma.tournament.findUnique({
    where: { id },
    include: {
      participants: { include: { user: true, slot: true }, orderBy: { seed: 'asc' } },
      matches: {
        include: { player1: true, player2: true, slot1: true, slot2: true, winner: true },
        orderBy: [{ roundNumber: 'asc' }, { matchNumber: 'asc' }],
      },
    },
  });
  if (!tournament) return null;

  const matchIds = tournament.matches.map((m) => m.id);
  const payments = await prisma.slotPayment.findMany({
    where: {
      source: SlotPaymentSource.TOURNAMENT,
      eventId: { in: matchIds },
    },
    include: { slot: true },
    orderBy: { createdAt: 'asc' },
  });

  return { ...tournament, payments };
};

/**
 * Atualiza nome/descrição do torneio (com validação interna).
 */
export const updateTournament = async (
  id: number,
  data: UpdateTournamentDto
): Promise<Tournament> => {
  await validateUpdateTournament(data);
  return prisma.tournament.update({ where: { id }, data });
};

/**
 * Deleta torneio e todas entidades filhas.
 */
export const deleteTournament = async (id: number): Promise<void> => {
  await prisma.$transaction([
    prisma.slotPayment.deleteMany({
      where: { source: SlotPaymentSource.TOURNAMENT, eventId: { in: [id] } },
    }),
    prisma.tournamentMatch.deleteMany({ where: { tournamentId: id } }),
    prisma.tournamentParticipant.deleteMany({ where: { tournamentId: id } }),
    prisma.tournament.delete({ where: { id } }),
  ]);
};

/**
 * Participantes.
 */
export const addParticipant = async (data: {
  tournamentId: number;
  userId: number;
  slotId: number;
  seed: number;
}): Promise<TournamentParticipant> => {
  return prisma.tournamentParticipant.create({ data });
};

export const removeParticipant = async (participantId: number): Promise<void> => {
  await prisma.tournamentParticipant.delete({ where: { id: participantId } });
};

/**
 * Matches.
 */
export const addMatch = async (
  tournamentId: number,
  data: {
    roundNumber: Round;
    matchNumber: number;
    player1Id: number;
    player2Id: number;
    slot1Id: number;
    slot2Id: number;
    maxRounds: number;
    slot1BonusValue: number;
    slot2BonusValue: number;
  }
): Promise<TournamentMatch> => {
  return prisma.tournamentMatch.create({ data: { tournamentId, ...data } });
};

export const updateMatch = async (
  matchId: number,
  data: Partial<
    Pick<TournamentMatch, 'slot1BonusValue' | 'slot2BonusValue' | 'maxRounds'>
  >
): Promise<TournamentMatch> => {
  return prisma.tournamentMatch.update({ where: { id: matchId }, data });
};

/**
 * Atualiza só os scores e faz o vencedor avançar para o próximo jogo.
 */
export async function updateMatchAndAdvance(
  matchId: number,
  player1Score: number,
  player2Score: number
): Promise<void> {
  const existingMatch = await prisma.tournamentMatch.findUnique({ where: { id: matchId } });
  if (!existingMatch) throw new Error(`Match com id ${matchId} não encontrado.`);

  const winnerId =
    player1Score > player2Score ? existingMatch.player1Id : existingMatch.player2Id;

  // Atualiza scores e vencedor
  await prisma.tournamentMatch.update({
    where: { id: matchId },
    data: { player1Score, player2Score, winnerId },
  });

  const { tournamentId, roundNumber, matchNumber, slot1Id, slot2Id } = existingMatch;

  // Se for Quartos ou Semis, avança para o jogo já criado
  if (roundNumber === Round.QUARTOS || roundNumber === Round.SEMIS) {
    const nextRound = roundNumber === Round.QUARTOS ? Round.SEMIS : Round.FINAL;
    const nextMatchNumber =
      roundNumber === Round.QUARTOS
        ? Math.floor((matchNumber - 1) / 2) + 1
        : 1;
    const isFirstSlot =
      roundNumber === Round.QUARTOS ? matchNumber % 2 === 1 : matchNumber === 1;
  
    // aqui o pulo: escolhe o slotId de quem venceu
    const advancingSlotId =
      winnerId === existingMatch.player1Id
        ? existingMatch.slot1Id
        : existingMatch.slot2Id;
  
    await prisma.tournamentMatch.update({
      where: {
        tournamentId_roundNumber_matchNumber: {
          tournamentId,
          roundNumber: nextRound,
          matchNumber: nextMatchNumber,
        },
      },
      data: isFirstSlot
        ? { player1Id: winnerId, slot1Id: advancingSlotId }
        : { player2Id: winnerId, slot2Id: advancingSlotId },
    });
  }
}

/**
 * Lista apenas as partidas de um torneio (se precisar de endpoint separado).
 */
export const fetchMatches = async (tournamentId: number) => {
  return prisma.tournamentMatch.findMany({
    where: { tournamentId },
    include: {
      player1: true,
      player2: true,
      slot1: true,
      slot2: true,
      winner: true,
    },
    orderBy: [
      { roundNumber: 'asc' },
      { matchNumber: 'asc' },
    ],
  });
};
