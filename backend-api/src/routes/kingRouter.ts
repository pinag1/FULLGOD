// src/routes/kingRouter.ts

import { Router } from 'express';
import * as ctrl from '../controllers/kingController';
import { requireAdmin, requireAuth } from '../middleware/requireAuth';

const wrap = (fn: any) => (req: any, res: any, next: any) => Promise.resolve(fn(req, res, next)).catch(next);

const router = Router()

// CRUD KingOfTheHill
router.post('/',          requireAuth, requireAdmin, wrap(ctrl.createKing))
router.get('/',           requireAuth, wrap(ctrl.listKings))
router.get('/:id',        requireAuth, wrap(ctrl.getKing))
router.patch('/:id',      requireAuth, requireAdmin, wrap(ctrl.updateKing))
router.delete('/:id',     requireAuth, requireAdmin, wrap(ctrl.deleteKing))

// Entries
router.post('/:id/entries',                requireAuth,           wrap(ctrl.addEntry))
router.get('/:id/entries',                 requireAuth,           wrap(ctrl.listEntries))
router.delete('/:id/entries/:entryId',     requireAuth, requireAdmin, wrap(ctrl.removeEntry))

export default router