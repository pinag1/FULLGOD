// src/routes/eloRouter.ts

import { Router } from 'express';
import * as ctrl from '../controllers/eloController';
import { requireAdmin, requireAuth } from '../middleware/requireAuth';

const wrap = (fn: any) => (req: any, res: any, next: any) => Promise.resolve(fn(req, res, next)).catch(next);

const router = Router();
const base = '/elos';

// CRUD EloMaisFraco
router.post('/', requireAuth, requireAdmin, wrap(ctrl.createElo))
router.get('/', requireAuth, wrap(ctrl.getAllElos))
router.get('/:id', requireAuth, wrap(ctrl.getEloById))
router.patch('/:id', requireAuth, requireAdmin, wrap(ctrl.updateElo))
router.delete('/:id', requireAuth, requireAdmin, wrap(ctrl.deleteElo))

// Participations
router.post('/:id/participants', requireAuth, wrap(ctrl.addParticipation))
router.get('/:id/participants', requireAuth, wrap(ctrl.listParticipations))
router.delete('/:id/participants/:pid', requireAuth, wrap(ctrl.removeParticipation))
router.patch(
  '/:id/participants/:pid/score',
  requireAuth,
  requireAdmin,
  wrap(ctrl.updateScore),
)

export default router