// src/routes/bonusHuntSummaryRouter.ts
import { Router } from 'express'
import * as ctrl from '../controllers/bonusHuntSummaryController'
import { requireAdmin, requireAuth } from '../middleware/requireAuth'

const wrap = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next)

const router = Router()

// GET    /api/bonus-hunt-summary/:id
router.get('/:id', requireAuth, requireAdmin, wrap(ctrl.fetch))

// POST   /api/bonus-hunt-summary/:id/calculate
router.post('/:id/calculate', requireAuth, requireAdmin, wrap(ctrl.calculate))

// PATCH  /api/bonus-hunt-summary/:id/start
router.patch('/:id/start', requireAuth, requireAdmin, wrap(ctrl.updateStart))

export default router
