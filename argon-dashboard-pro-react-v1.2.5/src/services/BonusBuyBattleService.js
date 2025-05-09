import {
  createBattle as apiCreateBattle,
  deleteBattle as apiDeleteBattle,
  getAllBattles as apiGetAllBattles,
  getBattleById as apiGetBattleById,
  updateBattleScores as apiUpdateBattleScores, // ✅ import do update
} from '../api/BonusBuyBattle';

// Criar uma nova Bonus Buy Battle
export const addBonusBuyBattle = async (data) => {
  try {
    const result = await apiCreateBattle(data);
    return result;
  } catch (error) {
    console.error("Erro ao criar a Bonus Buy Battle:", error);
    throw error;
  }
};

// Buscar todas as batalhas
export const fetchBonusBuyBattles = async () => {
  try {
    const result = await apiGetAllBattles();
    return result;
  } catch (error) {
    console.error("Erro ao buscar batalhas:", error);
    throw error;
  }
};

// Buscar uma batalha específica por ID
export const fetchBonusBuyBattleById = async (id) => {
  try {
    const result = await apiGetBattleById(id);
    return result;
  } catch (error) {
    console.error("Erro ao buscar a batalha:", error);
    throw error;
  }
};

// Deletar uma batalha
export const deleteBonusBuyBattle = async (id) => {
  try {
    const result = await apiDeleteBattle(id);
    return result;
  } catch (error) {
    console.error('Erro ao deletar batalha:', error);
    throw error;
  }
};

// Atualizar os scores e vencedor da batalha
export const updateBonusBuyBattleScores = async (battleId, data) => {
  try {
    const result = await apiUpdateBattleScores(battleId, data);
    return result;
  } catch (error) {
    console.error('Erro ao atualizar scores da batalha:', error);
    throw error;
  }
};
