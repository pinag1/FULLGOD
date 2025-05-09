// src/services/tournamentService.ts (frontend)

import api from '../api'; // Axios pré-configurado com token

/**
 * Buscar todos os torneios
 */
export const getAllTournaments = async () => {
  const resp = await api.get('/tournaments');
  return resp.data;
};

/**
 * Buscar um torneio por ID (inclui todos os detalhes)
 */
export const getTournamentById = async (id) => {
  const resp = await api.get(`/tournaments/${id}`);
  return resp.data;
};

/**
 * Criar novo torneio
 */
export const createTournament = async (payload) => {
  const resp = await api.post('/tournaments', payload);
  return resp.data;
};

/**
 * Atualizar dados do torneio (ex: name, description)
 */
export const updateTournament = async (id, payload) => {
  const resp = await api.patch(`/tournaments/${id}`, payload); // PATCH, não PUT
  return resp.data;
};

/**
 * Gerar automaticamente o bracket de oitavas
 */
export const generateBracket = async (tournamentId) => {
  await api.post(`/tournaments/${tournamentId}/generate-bracket`);
};

/**
 * Excluir torneio
 */
export const deleteTournament = async (id) => {
  await api.delete(`/tournaments/${id}`);
};

/**
 * Listar participantes de um torneio
 */
export const fetchParticipants = async (tournamentId) => {
  const resp = await api.get(`/tournaments/${tournamentId}/participants`);
  return resp.data;
};

/**
 * Adicionar um participante (user + slot) a um torneio
 * payload = { userId, slotId, seed }
 */
export const addParticipant = async (tournamentId, payload) => {
  const resp = await api.post(
    `/tournaments/${tournamentId}/participants`,
    payload
  );
  return resp.data;
};

/**
 * Remover um participante de um torneio
 */
export const removeParticipant = async (tournamentId, participantId) => {
  await api.delete(
    `/tournaments/${tournamentId}/participants/${participantId}`
  );
};

/**
 * Adicionar uma partida manualmente
 * payload = { roundNumber, matchNumber, player1Id, player2Id, slot1Id, slot2Id, maxRounds, slot1BonusValue, slot2BonusValue }
 */
export const addMatch = async (tournamentId, payload) => {
  const resp = await api.post(
    `/tournaments/${tournamentId}/matches`,
    payload
  );
  return resp.data;
};

/**
 * Listar partidas (bracket) de um torneio
 */
export const fetchMatches = async (tournamentId) => {
  const resp = await api.get(`/tournaments/${tournamentId}/matches`);
  return resp.data;
};

/**
 * Atualizar resultado de uma partida
 */
export const updateMatchAndAdvance = async (
  tournamentId,
  matchId,
  { player1Score, player2Score }
) => {
  await api.patch(
    `/tournaments/${tournamentId}/matches/${matchId}/scores`,
    { player1Score, player2Score }
  );
};

/**
 * Atualizar qualquer outro campo de TournamentMatch
 * (ex: slot1BonusValue, slot2BonusValue)
 */
export const updateMatch = async (tournamentId, matchId, updates) => {
  const resp = await api.patch(
    `/tournaments/${tournamentId}/matches/${matchId}`,
    updates
  );
  return resp.data;
};

/**
 * Excluir uma partida
 */
export const deleteMatch = async (tournamentId, matchId) => {
  await api.delete(
    `/tournaments/${tournamentId}/matches/${matchId}`
  );
};
