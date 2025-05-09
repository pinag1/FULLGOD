import { jwtDecode } from "jwt-decode";
import api from "./../api";

const TOKEN_KEY = "token";

// Faz login e salva o token no localStorage
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    if (response.data && response.data.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      return response.data; // Retorna os dados, incluindo o token
    } else {
      throw new Error("Token não encontrado na resposta.");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao tentar login.");
  }
};

// Remove o token e faz logout
export const logout = async () => {
  await api.post("/auth/logout"); // limpa os cookies (refresh token)
  localStorage.removeItem(TOKEN_KEY); // limpa o access token
  window.location.href = "/login"; // redireciona se quiser
};

// Retorna o usuário logado com base no token
export const getUser = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (err) {
    console.error("Erro ao decodificar token:", err);
    return null;
  }
};

// Verifica se o usuário está autenticado
export const isAuthenticated = () => {
  const user = getUser();
  return !!user;
};

// Pode ser usado pra proteger páginas do frontend
export const requireAuth = () => {
  if (!isAuthenticated()) {
    window.location.href = "/login";
  }
};

export const getUserData = async () => {

  try {
    const response = await api.get("/auth/user"); // Usa a instância do Axios
    return response.data; // Retorna os dados do usuário
  } catch (error) {
    
    console.error(
      "Erro ao obter dados do usuário:",
      error.response?.data || error.message
    );
    throw new Error("Usuário não autenticado");
  }
};
