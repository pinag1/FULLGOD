import api from '../api'; // Instância já configurada com token

// Buscar todos os pagamentos de slot
export const getSlotPayments = async (name = '') => {
  try {
    const response = await api.get(`/slot-payments`, {
      params: { name }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pagamentos:', error);
    throw error;
  }
};
export const apiGetSlotPaymentsBySlotId = async (slotId) => {
  try {
    const response = await api.get(`/slot-payments/slot/${slotId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pagamentos:', error);
    throw error;
  }
};

// Buscar pagamentos de slot por nome (adicionando esta nova função)
export const searchSlotPaymentsByName = async (name) => {
  try {
    const response = await api.get(`/slot-payments/search`, {
      params: { name }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pagamentos por nome:', error);
    throw error;
  }
};

// Criar novo pagamento de slot
export const createSlotPayment = async (paymentData) => {
  try {
    const response = await api.post(`/slot-payments`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    throw error;
  }
};

// Excluir um pagamento
export const deleteSlotPayment = async (id) => {
  try {
    await api.delete(`/slot-payments/${id}`);
  } catch (error) {
    console.error('Erro ao excluir pagamento:', error);
    throw error;
  }
};
export const apiRemoveSlotPaymentByCriteria = async (slotId, eventId, source) => {
  try {
    // Monta a URL com os parâmetros de query
    const url = `/slot-payments?slotId=${slotId}&eventId=${eventId}&source=${source}`;
    
    // Faz a requisição DELETE com os parâmetros passados
    await api.delete(url);
  } catch (error) {
    console.error('Error deleting payment by criteria:', error);
    throw error;
  }
};
// Editar um pagamento de slot
export const editSlotPayment = async (id, paymentData) => {
  try {
    const response = await api.put(`/slot-payments/${id}`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Erro ao editar pagamento:', error);
    throw error;
  }
};
