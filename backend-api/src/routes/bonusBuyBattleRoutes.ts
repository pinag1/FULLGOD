// src/routes/bonusBuyBattleRoutes.ts
import { Router } from 'express';
import * as ctrl from '../controllers/bonusBuyBattleController';
import { requireAdmin, requireAuth } from '../middleware/requireAuth';

const wrap = (fn: any) => (req: any, res: any, next: any) => Promise.resolve(fn(req, res, next)).catch(next);

const router = Router();

// Criar e listar batalhas
router.post('/', requireAuth, requireAdmin, wrap(ctrl.createBonusBuyBattle));
router.get('/', requireAuth, wrap(ctrl.getAllBattles));

// Detalhes, apagar e atualizar scores
router.get('/:id', requireAuth, wrap(ctrl.getBattleById));
router.delete('/:id', requireAuth, requireAdmin, wrap(ctrl.deleteBonusBuyBattle));
router.patch('/:id/scores', requireAuth, requireAdmin, wrap(ctrl.updateScores));

export default router;
