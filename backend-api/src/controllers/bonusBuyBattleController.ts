// src/controllers/bonusBuyBattleController.ts
import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import * as svc from '../services/bonusBuyBattleService';

export const createBonusBuyBattle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const battle = await svc.createBonusBuyBattle(req.body);
    return res.status(201).json(battle);
  } catch (err: any) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ message: 'Dados inválidos', errors: err.errors });
    }
    next(err);
  }
};

export const getAllBattles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const battles = await svc.getAllBattles();
    return res.json(battles);
  } catch (err) {
    next(err);
  }
};

export const getBattleById = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
  try {
    const battle = await svc.getBattleById(id);
    if (!battle) return res.status(404).json({ message: 'Batalha não encontrada' });
    return res.json(battle);
  } catch (err) {
    next(err);
  }
};

export const updateScores = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
  try {
    const updated = await svc.updateBattleScores(id, req.body);
    return res.json(updated);
  } catch (err: any) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ message: 'Dados inválidos', errors: err.errors });
    }
    next(err);
  }
};

export const deleteBonusBuyBattle = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
  try {
    await svc.deleteBattle(id);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};