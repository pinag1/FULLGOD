import {
    deleteUserById,
    getAllUsers,
    getUserById,
} from '../api/Users';
  
  // Buscar todos os utilizadores
  export const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
      return users;
    } catch (error) {
      console.error('Erro ao buscar utilizadores:', error);
      throw error;
    }
  };
  
  // Buscar utilizador por ID
  export const fetchUserById = async (id) => {
    try {
      const user = await getUserById(id);
      return user;
    } catch (error) {
      console.error('Erro ao buscar utilizador:', error);
      throw error;
    }
  };
  
  // Excluir utilizador
  export const removeUser = async (id) => {
    try {
      await deleteUserById(id);
    } catch (error) {
      console.error('Erro ao excluir utilizador:', error);
      throw error;
    }
  };
  