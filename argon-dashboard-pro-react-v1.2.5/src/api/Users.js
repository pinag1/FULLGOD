import api from '../api'; // Axios configurado com token

// Buscar todos os utilizadores
export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar utilizadores:', error);
    throw error;
  }
};

// Buscar utilizador por ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar utilizador:', error);
    throw error;
  }
};

// Excluir utilizador por ID
export const deleteUserById = async (id) => {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    console.error('Erro ao excluir utilizador:', error);
    throw error;
  }
};
