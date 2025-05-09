// src/controllers/bonusHuntSummaryController.ts
import { NextFunction, Request, Response } from 'express';
import * as svc from '../services/bonusHuntSummaryService';

export async function fetch(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ message: 'ID inválido' });
  try {
    const summary = await svc.getBonusHuntSummary(id);
    if (!summary) return res.status(404).json({ message: 'Resumo não encontrado' });
    return res.json(summary);
  } catch (err) { next(err); }
}

export async function calculate(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  try {
    const { start, madeBy } = req.body;
    const summary = await svc.calculateBonusHuntSummary(id, start, madeBy);
    return res.json(summary);
  } catch (err) { next(err); }
}

export async function updateStart(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  try {
    const { start } = req.body;
    const updated = await svc.updateBonusHuntSummaryStart(id, Number(start));
    return res.json(updated);
  } catch (err) { next(err); }
}