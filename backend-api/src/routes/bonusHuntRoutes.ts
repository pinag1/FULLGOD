// src/routes/bonusHuntRouter.ts
import { Router } from 'express'
import * as ctrl from '../controllers/bonusHuntController'
import { requireAdmin, requireAuth } from '../middleware/requireAuth'

const wrap = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next)

const router = Router()

router
  .route('/')
  .post(requireAuth, requireAdmin, wrap(ctrl.createBonusHunt))
  .get(requireAuth, wrap(ctrl.getAllBonusHunts))

router
  .route('/:id')
  .get(requireAuth, wrap(ctrl.getBonusHuntById))
  .patch(requireAuth, requireAdmin, wrap(ctrl.updateBonusHunt))
  .delete(requireAuth, requireAdmin, wrap(ctrl.deleteBonusHunt))

router.get('/:id/slot-payments', requireAuth, wrap(ctrl.getSlotPaymentsByBonusHunt))

router.patch('/:id/status', requireAuth, requireAdmin, wrap(ctrl.updateBonusHuntStatus))

export default router
