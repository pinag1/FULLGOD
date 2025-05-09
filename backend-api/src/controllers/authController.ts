import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { token, refreshToken } = await authService.login(email, password);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutos, ajusta como preferires
    });
    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    

    res.status(200).json({ message: 'Autenticado com sucesso', token });
  } catch (err) {
    const error = err as Error;
    res.status(401).json({ message: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  res.status(200).json({ message: 'Logout bem-sucedido' });
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const newAccessToken = authService.refreshToken(req.cookies.refreshToken);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    const error = err as Error;
    res.status(401).json({ message: error.message });
  }
};
export const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.id;  // Obtendo o ID do usuário do token (já está no req.user)

    if (!userId) {
      return res.status(400).json({ message: 'ID do usuário não encontrado' });
    }

    const user = await authService.getUserData(userId);  // Chamando o service para pegar os dados do usuário

    return res.status(200).json(user);  // Retornando os dados do usuário na resposta
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({ message: 'Erro ao obter dados do usuário', error: error.message });
  }
};