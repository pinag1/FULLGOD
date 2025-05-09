import { Router } from 'express';
import * as ctrl from '../controllers/slotController';
import { requireAdmin, requireAuth } from '../middleware/requireAuth';

const wrap = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const router = Router();

router
  .route('/')
  .post(requireAuth, requireAdmin, wrap(ctrl.createSlot))
  .get(requireAuth, wrap(ctrl.getAllSlots));

router
  .route('/:id')
  .get(requireAuth, wrap(ctrl.getSlotById))
  .put(requireAuth, requireAdmin, wrap(ctrl.updateSlot))
  .delete(requireAuth, requireAdmin, wrap(ctrl.deleteSlot));

export default router;
