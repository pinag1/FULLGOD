import { NextFunction, Request, Response, Router } from 'express';
import * as authController from '../controllers/authController';
import { requireAuth } from '../middleware/requireAuth'; // Middleware para verificar se o usuário está autenticado

const router = Router();

// Rota para login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authController.login(req, res); // Chama o controlador para login
  } catch (error) {
    next(error); // Passa o erro para o middleware de erro
  }
});

// Rota para logout (somente usuários autenticados)
router.post('/logout', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authController.logout(req, res); // Chama o controlador para logout
  } catch (error) {
    next(error); // Passa o erro para o middleware de erro
  }
});

// Rota para obter novo token (refresh token)
router.post('/refresh-token', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authController.refreshToken(req, res); // Chama o controlador para refresh token
  } catch (error) {
    next(error); // Passa o erro para o middleware de erro
  }
});
// authRoutes.ts

// Rota para obter informações do usuário autenticado
router.get('/user', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authController.getUser(req, res); // Chama o controlador para obter o usuário autenticado
  } catch (error) {
    next(error); // Passa o erro para o middleware de erro
  }
});

export default router;
