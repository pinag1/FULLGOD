// src/routes/tournamentRoutes.ts
import { Router } from 'express';
import * as ctrl from '../controllers/tournamentController';
import { requireAdmin, requireAuth } from '../middleware/requireAuth';

const wrap = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const router = Router();

// CRUD Torneio
router.post('/', requireAuth, requireAdmin, wrap(ctrl.createTournament));
router.get('/', requireAuth, wrap(ctrl.getAllTournaments));
router.get('/:id', requireAuth, wrap(ctrl.getTournamentById));
router.patch('/:id', requireAuth, requireAdmin, wrap(ctrl.updateTournament));
router.delete('/:id', requireAuth, requireAdmin, wrap(ctrl.deleteTournament));

// Participantes
router.post('/:id/participants', requireAuth, requireAdmin, wrap(ctrl.addParticipant));
router.delete('/:id/participants/:pid', requireAuth, requireAdmin, wrap(ctrl.removeParticipant));

// Gera bracket de OITAVAS
router.post('/:id/generate-bracket', requireAuth, requireAdmin, wrap(ctrl.generateBracket));

// Confrontos
router.post('/:id/matches', requireAuth, requireAdmin, wrap(ctrl.addMatch));
router.patch('/:id/matches/:mid/scores', requireAuth, requireAdmin, wrap(ctrl.updateMatchAndAdvance));
router.get(
    '/:id/matches',
    requireAuth,
    wrap(ctrl.listMatches)   // vamos criar esse controlador
  );
  router.patch(
    '/:id/matches/:mid',
    requireAuth, requireAdmin,
    wrap(ctrl.updateMatch)
  );
export default router;
