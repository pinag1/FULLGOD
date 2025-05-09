import { apiGetSlotPaymentsBySlotId, apiRemoveSlotPaymentByCriteria, createSlotPayment, deleteSlotPayment, editSlotPayment, getSlotPayments, searchSlotPaymentsByName } from '../api/SlotPayment';

// Função para buscar todos os pagamentos ou buscar por nome
export const fetchSlotPayments = async (name) => {
  try {
    // Se o nome for fornecido, busca por nome, senão, busca todos os pagamentos
    const payments = name ? await searchSlotPaymentsByName(name) : await getSlotPayments();
    return payments;
  } catch (error) {
    console.error('Error fetching slot payments:', error);
    throw error;
  }
};

// Função para adicionar novo pagamento
export const addSlotPayment = async (paymentData) => {
  console.log("Payment   ",paymentData)
  try {
    const payment = await createSlotPayment(paymentData);
    return payment;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

// Função para excluir pagamento
export const removeSlotPayment = async (id) => {
  try {
    await deleteSlotPayment(id);
  } catch (error) {
    console.error('Error deleting payment:', error);
    throw error;
  }
};
// Função para excluir pagamento por critérios
export const removeSlotPaymentByCriteria = async (slotId, eventId, source) => {
  try {
    // Monta a URL com os parâmetros de query
    await    apiRemoveSlotPaymentByCriteria(slotId, eventId, source)
  } catch (error) {
    console.error('Error deleting payment:', error);
    throw error;
  }
};
export const getSlotPaymentsBySlotId = async (slotId) => {
  try {

    const payments = await apiGetSlotPaymentsBySlotId(slotId);
    return payments;
  } catch (error) {
    console.error('Error fetching payments by slotId:', error);
    throw error;
  }
};
// Função para atualizar pagamento
export const updateSlotPayment = async (id, paymentData) => {
  try {
    const allowedFields = {
      bet: paymentData.bet,
      payment: paymentData.payment
    };

    const updatedPayment = await editSlotPayment(id, allowedFields);
    return updatedPayment;
  } catch (error) {
    console.error('Error editing payment:', error);
    throw error;
  }
};
