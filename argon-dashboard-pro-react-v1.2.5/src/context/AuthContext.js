import { createContext, useContext, useEffect, useState } from "react";
import { getUserData } from "../services/authService";

const AuthContext = createContext(); // Criação do contexto

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {

    try {
      const userData = await getUserData();

      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // 🔥 Novo método para ser chamado após login
  const loginUser = async () => {
    setLoading(true);
    await checkAuth();
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
