import api from "../api"; // IMPORTA a instância configurada com token

// Função para buscar slots (GET)
export const getSlots = async (searchTerm) => {
  try {
    const url = searchTerm ? `/slots?search=${searchTerm}` : "/slots"; // Se passar searchTerm, usa filtro
    const response = await api.get(url);

    return response.data; // Retorna os dados da resposta
  } catch (error) {
    console.error("Error fetching slots:", error);
    throw new Error(
      "Não foi possível carregar os slots. Tente novamente mais tarde."
    );
  }
};

// Função para criar um novo slot (POST)
export const createSlot = async (slotData) => {
  try {
    const response = await api.post("/slots", slotData);
    return response.data; // Retorna os dados do slot criado
  } catch (error) {
    console.error("Error creating slot:", error);
    throw new Error("Erro ao criar o slot. Tente novamente mais tarde.");
  }
};

// Função para editar um slot existente (PUT)
export const editSlot = async (id, slotData) => {
  try {
    const response = await api.put(`/slots/${id}`, slotData);
    return response.data; // Retorna os dados do slot atualizado
  } catch (error) {
    console.error("Error editing slot:", error);
    throw new Error("Erro ao editar o slot. Tente novamente mais tarde.");
  }
};

// Função para excluir um slot (DELETE)
export const deleteSlot = async (id) => {
  try {
    await api.delete(`/slots/${id}`);
  } catch (error) {
    console.error("Error deleting slot:", error);
    throw new Error("Erro ao deletar o slot. Tente novamente mais tarde.");
  }
};
