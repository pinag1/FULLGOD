import api from '../api';

// Criar nova batalha
export const createBattle = async (battleData) => {
  const response = await api.post('/bonus-buy-battles', battleData);
  return response.data;
};

// Buscar todas as batalhas
export const getAllBattles = async () => {
  const response = await api.get('/bonus-buy-battles');
  return response.data;
};

// Buscar batalha por ID
export const getBattleById = async (id) => {
  const response = await api.get(`/bonus-buy-battles/${id}`);
  return response.data;
};

// Deletar uma batalha
export const deleteBattle = async (id) => {
  const response = await api.delete(`/bonus-buy-battles/${id}`);
  return response.data;
};

// Atualizar scores e vencedor
export const updateBattleScores = async (id, data) => {
  const response = await api.patch(`/bonus-buy-battles/${id}/scores`, data);
  return response.data;
};
