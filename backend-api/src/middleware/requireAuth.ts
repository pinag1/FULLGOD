import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;
declare global {
  namespace Express {
    interface Request {
      user?: any; // Adiciona a propriedade 'user' ao tipo Request
    }
  }
}
export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const tokenFromHeader = authHeader && authHeader.split(' ')[1];
  const tokenFromCookie = req.cookies?.token;
  const token = tokenFromHeader || tokenFromCookie;
  if (!token) {

    res.status(401).json({ message: 'Não autenticado' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // Decodifica o token e adiciona no objeto req
    next();  // Passa para o próximo middleware ou controlador
  } catch (err) {
    res.status(401).json({ message: 'Token inválido ou expirado' });
    return;
  }
  
};
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role.toLowerCase() !== 'admin') {
    res.status(403).json({ message: 'Acesso negado (admin only)' });
    return; 
  }

  next(); // Usuário é admin, passa para o próximo middleware ou controlador
};