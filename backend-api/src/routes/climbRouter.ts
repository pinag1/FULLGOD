// src/routes/climbRouter.ts

import { Router } from 'express';
import * as ctrl from '../controllers/climbController';
import { requireAdmin, requireAuth } from '../middleware/requireAuth';

const wrap = (fn: any) => (req: any, res: any, next: any) => Promise.resolve(fn(req, res, next)).catch(next);

const router = Router();

// ClimbTheQuest
router.post('/', requireAuth, requireAdmin, wrap(ctrl.createClimb));
router.get('/', requireAuth, wrap(ctrl.getAllClimbs));
router.get(`/:id`, requireAuth, wrap(ctrl.getClimbById));
router.patch(`/:id`, requireAuth, requireAdmin, wrap(ctrl.updateClimb));
router.delete(`/:id`, requireAuth, requireAdmin, wrap(ctrl.deleteClimb));

// Participations
router.post(`/:id/participants`, requireAuth, wrap(ctrl.addParticipation));
router.get(`/:id/participants`, requireAuth, wrap(ctrl.listParticipations));
router.delete(`/:id/participants/:pid`, requireAuth, wrap(ctrl.removeParticipation));

// Level Progress
router.patch(
  `/:id/participants/:pid/levels/:level`,
  requireAuth,
  wrap(ctrl.updateLevelProgress),
);

export default router;
