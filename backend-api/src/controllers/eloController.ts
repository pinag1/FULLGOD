// src/controllers/eloController.ts

import { Request, Response } from 'express';
import * as svc from '../services/eloService';

export const createElo = async (req: Request, res: Response) => {
  const created = await svc.createElo(req.body);
  return res.status(201).json(created);
};

export const getAllElos = async (_req: Request, res: Response) => {
  const list = await svc.getAllElos();
  return res.json(list);
};

export const getEloById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const e = await svc.getEloById(id);
  if (!e) return res.status(404).json({ message: 'Elo Mais Fraco não encontrado' });
  return res.json(e);
};

export const updateElo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await svc.updateElo(id, req.body);
  return res.json(updated);
};

export const deleteElo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await svc.deleteElo(id);
  return res.sendStatus(204);
};

export const addParticipation = async (req: Request, res: Response) => {
  const eloId = Number(req.params.id);
  const created = await svc.addEloParticipation(eloId, req.body);
  return res.status(201).json(created);
};

export const listParticipations = async (req: Request, res: Response) => {
  const eloId = Number(req.params.id);
  const list = await svc.listEloParticipations(eloId);
  return res.json(list);
};

export const removeParticipation = async (req: Request, res: Response) => {
  const pid = Number(req.params.pid);
  await svc.removeEloParticipation(pid);
  return res.sendStatus(204);
};

export const updateScore = async (req: Request, res: Response) => {
  const pid = Number(req.params.pid);
  const { score } = req.body;
  const updated = await svc.updateEloParticipationScore(pid, score);
  return res.json(updated);
};
