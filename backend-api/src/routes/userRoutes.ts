// src/routes/userRouter.ts
import { Router } from 'express';
import * as ctrl from '../controllers/userController';
import { requireAdmin, requireAuth } from '../middleware/requireAuth';

const router = Router();
const wrap = (fn: any) => (req: any, res: any, next: any) => Promise.resolve(fn(req, res, next)).catch(next);

// CRUD de Usuários
router.get('/', requireAuth, requireAdmin, wrap(ctrl.getAllUsers));
router.get('/:id', requireAuth, requireAdmin, wrap(ctrl.getUserById));
router.post('/', wrap(ctrl.createUser));                   // aberto (pode ser protegido se necessário)
router.patch('/:id', requireAuth, requireAdmin, wrap(ctrl.updateUser));
router.delete('/:id', requireAuth, requireAdmin, wrap(ctrl.deleteUser));

export default router;
