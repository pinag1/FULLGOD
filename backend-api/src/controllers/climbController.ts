// src/controllers/climbController.ts

import { Request, Response } from 'express';
import * as svc from '../services/climbService';

// Climb CRUD
export const createClimb = async (req: Request, res: Response) => {
  const payload = req.body;
  const created = await svc.createClimb(payload);
  return res.status(201).json(created);
};

export const getAllClimbs = async (_req: Request, res: Response) => {
  const list = await svc.getAllClimbs();
  return res.json(list);
};

export const getClimbById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const quest = await svc.getClimbById(id);
  if (!quest) return res.status(404).json({ message: 'Climb The Quest não encontrado' });
  return res.json(quest);
};

export const updateClimb = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await svc.updateClimb(id, req.body);
  return res.json(updated);
};

export const deleteClimb = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await svc.deleteClimb(id);
  return res.sendStatus(204);
};

// Participation
export const addParticipation = async (req: Request, res: Response) => {
  const climbId = Number(req.params.id);
  const created = await svc.addParticipation(climbId, req.body);
  return res.status(201).json(created);
};

export const listParticipations = async (req: Request, res: Response) => {
  const climbId = Number(req.params.id);
  const list = await svc.listParticipations(climbId);
  return res.json(list);
};

export const removeParticipation = async (req: Request, res: Response) => {
  const pid = Number(req.params.pid);
  await svc.removeParticipation(pid);
  return res.sendStatus(204);
};

// Level progress
export const updateLevelProgress = async (req: Request, res: Response) => {
  const pid = Number(req.params.pid);
  const lvl = Number(req.params.level);
  const updated = await svc.updateLevelProgress(pid, lvl, req.body);
  return res.json(updated);
};
