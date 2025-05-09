// services/authService.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface DecodedToken {
  id: string;
  role: string;
}

const generateToken = (userId: string, role: string) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
};

const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
};


export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.password) {
    throw new Error('Credenciais inválidas');
  }

  // Verifica se a senha fornecida corresponde à senha criptografada
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Credenciais inválidas');
  }

  // Gerar os tokens
  const accessToken = generateToken(user.id.toString(), user.role);
  const refreshToken = generateRefreshToken(user.id.toString());

  return { token: accessToken, refreshToken };
};

export const refreshToken = (token: string) => {
  if (!token) throw new Error('Refresh token não fornecido');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    return generateToken(decoded.id, decoded.role);
  } catch {
    throw new Error('Refresh token inválido ou expirado');
  }
};

// Função para obter dados do usuário no banco de dados
export const getUserData = async (userId: string): Promise<{ name: string | null } | null> => {
  try {
    const userIdNumber = parseInt(userId, 10);

    if (isNaN(userIdNumber)) {
      throw new Error('ID do usuário inválido');
    }

    // Selecionando apenas o nome do usuário e outras informações não sensíveis
    const user = await prisma.user.findUnique({
      where: { id: userIdNumber },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        points: true
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;  // Retorna apenas o nome ou o que você selecionou
  } catch (err) {
    throw new Error('Erro ao buscar dados do usuário: ');
  }
};