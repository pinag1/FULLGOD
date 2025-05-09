import api from '../api'; // IMPORTA a instância configurada com token

// Função para criar um Bonus Hunt
export const createBonusHunt = async (data) => {

  try {
    const response = await api.post('/bonus-hunts', data);
    
    return response.data;
  } catch (error) {
    console.error('Falha ao criar Bonus Hunt:', error);
    throw new Error('Falha ao criar Bonus Hunt');
  }
};

// Função para obter todos os Bonus Hunts
export const getBonusHunts = async () => {
  try {
    const response = await api.get('/bonus-hunts');
    return response.data;
  } catch (error) {
    console.error('Falha ao obter Bonus Hunts:', error);
    throw new Error('Falha ao obter Bonus Hunts');
  }
};

// Função para obter Slot Payments de um Bonus Hunt específico
export const getSlotPaymentsByBonusHunt = async (bonusHuntId) => {
  try {
    const response = await api.get(`/bonus-hunts/${bonusHuntId}/slot-payments`);
    return response.data;
  } catch (error) {
    console.error('Falha ao obter Slot Payments:', error);
    throw new Error('Falha ao obter Slot Payments');
  }
};
export const getBonusHuntSummary = (id) => {
  return api.get(`/bonus-hunt-summary/${id}`);
};

export const calculateBonusHuntSummary = (id, start, madeBy) => {

  return api.post(`/bonus-hunt-summary/${id}/calculate`, {
    start,
    madeBy,
  });
};
export const apiUpdateBonusHuntStatus = async (bonusHuntId, status) => {
  try {
    const response = await api.patch(`/bonus-hunts/${bonusHuntId}/status`, {
      status,  // Enviando o status no corpo da requisição
    });
    return response;
  } catch (error) {
    console.error("Erro ao atualizar status do Bonus Hunt:", error);
    throw error;  // Lançando o erro para ser tratado onde a função é chamada
  }
};
export const apiUpdateBonusHuntStart = async (bonusHuntId, start) => {
  try {
    const response = await api.patch(`/bonus-hunt-summary/${bonusHuntId}/start`, { start });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o campo 'start' do Bonus Hunt:", error);
    throw error;
  }
};
export const apiDeleteBonusHunt = async (id) => {
  try {
    const res = await api.delete(`/bonus-hunts/${id}`);
    return res.data;
  } catch (error) {
    console.error("Erro ao deletar Bonus Hunt:", error);
    throw error;
  }
};