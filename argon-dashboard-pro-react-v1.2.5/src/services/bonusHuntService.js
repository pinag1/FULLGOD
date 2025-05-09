import {
  apiDeleteBonusHunt,
  apiUpdateBonusHuntStart,
  apiUpdateBonusHuntStatus,
  calculateBonusHuntSummary,
  createBonusHunt,
  getBonusHunts,
  getBonusHuntSummary,
  getSlotPaymentsByBonusHunt,
} from "../api/BonusHunt";
  
  // Função para criar um novo Bonus Hunt
  export const addBonusHunt = async (name) => {
    try {
      const result = await createBonusHunt({ name });
      return result;
    } catch (error) {
      console.error("Erro ao criar o Bonus Hunt:", error);
      throw error;
    }
  };
  
  // Função para buscar todos os Bonus Hunts
  export const fetchBonusHunts = async () => {
    try {
      const result = await getBonusHunts();
      return result;
    } catch (error) {
      console.error("Erro ao buscar Bonus Hunts:", error);
      throw error;
    }
  };
  
  // Função para buscar Slot Payments de um Bonus Hunt específico
  export const fetchSlotPayments = async (bonusHuntId) => {
    try {
      const result = await getSlotPaymentsByBonusHunt(bonusHuntId);
      return result;
    } catch (error) {
      console.error("Erro ao buscar Slot Payments do Bonus Hunt:", error);
      throw error;
    }
  };
  
  export const fetchBonusHuntSummary = async (bonusHuntId) => {
    try {
      const res = await getBonusHuntSummary(bonusHuntId);
      return res.data;
    } catch (err) {
      console.error("Erro ao buscar resumo:", err);
      throw err;
    }
  };
  
  export const recalculateBonusHuntSummary = async (
    bonusHuntId,
    start,
    madeBy
  ) => {
    try {
      const res = await calculateBonusHuntSummary(bonusHuntId, start, madeBy);
      return res.data;
    } catch (err) {
      console.error("Erro ao recalcular resumo:", err);
      throw err;
    }
  };
  
  export const updateBonusHuntStatus = async (bonusHuntId, status) => {
    try {
      const res = await apiUpdateBonusHuntStatus(bonusHuntId, status);
      return res.data;
    } catch (error) {
      console.error("Erro ao atualizar status do Bonus Hunt:", error);
      throw error;
    }
  };

// Função para atualizar o campo 'start' de um Bonus Hunt
export const updateBonusHuntStart = async (bonusHuntId, start) => {
  try {
    const result = await apiUpdateBonusHuntStart(bonusHuntId, start);
    return result;
  } catch (error) {
    console.error("Erro ao atualizar o 'start' do Bonus Hunt:", error);
    throw error;
  }
};
  export const deleteBonusHunt = async (id) => {
    try {
      const res = await apiDeleteBonusHunt(id);
      return res.data;
    } catch (error) {
      console.error("Erro ao deletar Bonus Hunt:", error);
      throw error;
    }
  };
  