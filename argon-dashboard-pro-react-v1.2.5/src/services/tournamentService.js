// src/services/tournamentService.js

import {
  addMatch as apiAddMatch,
  addParticipant as apiAddParticipant,
  updateMatch as apiApiUpdateMatch,
  createTournament as apiCreateTournament,
  deleteMatch as apiDeleteMatch,
  deleteTournament as apiDeleteTournament,
  fetchMatches as apiFetchMatches,
  fetchParticipants as apiFetchParticipants,
  generateBracket as apiGenerateBracket,
  getAllTournaments as apiGetAllTournaments,
  getTournamentById as apiGetTournamentById,
  removeParticipant as apiRemoveParticipant,
  updateMatchAndAdvance as apiUpdateMatchAndAdvance,
  updateTournament as apiUpdateTournament,
} from '../api/Tournament';

/**
 * Buscar todos os torneios
 */
export const getAllTournaments = async () => {
  try {
    return await apiGetAllTournaments();
  } catch (error) {
    console.error('Erro ao buscar torneios:', error);
    throw error;
  }
};

/**
 * Buscar um torneio por ID (inclui todos os detalhes)
 */
export const getTournamentById = async (tournamentId) => {
  try {
    return await apiGetTournamentById(tournamentId);
  } catch (error) {
    console.error(`Erro ao buscar torneio ${tournamentId}:`, error);
    throw error;
  }
};

/**
 * Criar novo torneio
 */
export const createTournament = async (payload) => {
  try {
    return await apiCreateTournament(payload);
  } catch (error) {
    console.error('Erro ao criar torneio:', error);
    throw error;
  }
};

/**
 * Atualizar dados do torneio (ex: name, description)
 */
export const updateTournament = async (tournamentId, payload) => {
  try {
    return await apiUpdateTournament(tournamentId, payload);
  } catch (error) {
    console.error(`Erro ao atualizar torneio ${tournamentId}:`, error);
    throw error;
  }
};

/**
 * Excluir torneio
 */
export const deleteTournament = async (tournamentId) => {
  try {
    await apiDeleteTournament(tournamentId);
  } catch (error) {
    console.error(`Erro ao excluir torneio ${tournamentId}:`, error);
    throw error;
  }
};

/**
 * Listar participantes de um torneio
 */
export const fetchParticipants = async (tournamentId) => {
  try {
    return await apiFetchParticipants(tournamentId);
  } catch (error) {
    console.error(`Erro ao buscar participantes do torneio ${tournamentId}:`, error);
    throw error;
  }
};

/**
 * Adicionar participante a um torneio
 */
export const addParticipant = async (tournamentId, payload) => {
  try {
    return await apiAddParticipant(tournamentId, payload);
  } catch (error) {
    console.error(`Erro ao adicionar participante ao torneio ${tournamentId}:`, error);
    throw error;
  }
};

/**
 * Remover participante de um torneio
 */
export const removeParticipant = async (tournamentId, participantId) => {
  try {
    await apiRemoveParticipant(tournamentId, participantId);
  } catch (error) {
    console.error(`Erro ao remover participante ${participantId} do torneio ${tournamentId}:`, error);
    throw error;
  }
};

/**
 * Gerar automaticamente o bracket de oitavas
 */
export const generateBracket = async (tournamentId) => {
  try {
    await apiGenerateBracket(tournamentId);
  } catch (error) {
    console.error(`Erro ao gerar bracket do torneio ${tournamentId}:`, error);
    throw error;
  }
};

/**
 * Listar partidas (bracket) de um torneio
 */
export const fetchMatches = async (tournamentId) => {
  try {
    return await apiFetchMatches(tournamentId);
  } catch (error) {
    console.error(`Erro ao buscar partidas do torneio ${tournamentId}:`, error);
    throw error;
  }
};

/**
 * Adicionar partidas manualmente
 */
export const addMatch = async (tournamentId, payload) => {
  try {
    return await apiAddMatch(tournamentId, payload);
  } catch (error) {
    console.error(`Erro ao adicionar partida ao torneio ${tournamentId}:`, error);
    throw error;
  }
};

/**
 * Atualizar resultado de uma partida
 */
export const updateMatchAndAdvance = async (tournamentId, matchId, scores) => {
  try {
    await apiUpdateMatchAndAdvance(tournamentId, matchId, scores);
  } catch (error) {
    console.error(`Erro ao atualizar resultado da partida ${matchId}:`, error);
    throw error;
  }
};

/**
 * Atualizar campos de uma partida (slot1BonusValue, slot2BonusValue, maxRounds)
 */
export const updateMatch = async (tournamentId, matchId, payload) => {
  
  console.log("tournamentId",tournamentId)
  console.log("matchId",matchId)

  console.log("payload",payload)

  try {
    return await apiApiUpdateMatch(tournamentId, matchId, payload);
  } catch (error) {
    console.error(`Erro ao atualizar partida ${matchId}:`, error);
    throw error;
  }
};

/**
 * Excluir uma partida
 */
export const deleteMatch = async (tournamentId, matchId) => {
  try {
    await apiDeleteMatch(tournamentId, matchId);
  } catch (error) {
    console.error(`Erro ao excluir partida ${matchId}:`, error);
    throw error;
  }
};
