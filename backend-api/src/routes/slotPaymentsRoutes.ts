// src/routes/slotPaymentsRouter.ts
import { Router } from 'express';
import * as ctrl from '../controllers/slotPaymentsController';
import { requireAdmin, requireAuth } from '../middleware/requireAuth';

const router = Router();
const wrap = (fn: any) => (req: any, res: any, next: any) => Promise.resolve(fn(req, res, next)).catch(next);

router.post('/', requireAuth, requireAdmin, wrap(ctrl.createPayment));
router.get('/search', requireAuth, wrap(ctrl.searchSlotPaymentsByName));
router.get('/', requireAuth, wrap(ctrl.getAllSlotPayments));
router.get('/:id', requireAuth, wrap(ctrl.getSlotPaymentById));
router.put('/:id', requireAuth, requireAdmin, wrap(ctrl.updateSlotPayment));
router.delete('/:id', requireAuth, requireAdmin, wrap(ctrl.deleteSlotPayment));
router.delete('/', requireAuth, requireAdmin, wrap(ctrl.deleteSlotPaymentByCriteria));
router.get('/slot/:slotId', requireAuth, wrap(ctrl.getSlotPaymentsBySlotId));

export default router;
