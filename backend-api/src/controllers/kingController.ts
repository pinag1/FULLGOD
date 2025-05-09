// src/controllers/kingController.ts

import { Request, Response } from 'express';
import * as svc from '../services/kingService';

export const createKing = async (req: Request, res: Response) => {
  const created = await svc.createKing(req.body);
  return res.status(201).json(created);
};

export const listKings = async (_req: Request, res: Response) => {
  const list = await svc.listKings();
  return res.json(list);
};

export const getKing = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const k = await svc.getKingById(id);
  if (!k) return res.status(404).json({ message: 'King Of The Hill não encontrado' });
  return res.json(k);
};

export const updateKing = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await svc.updateKing(id, req.body);
  return res.json(updated);
};

export const deleteKing = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await svc.deleteKing(id);
  return res.sendStatus(204);
};

// Entries
export const addEntry = async (req: Request, res: Response) => {
  const kingId = Number(req.params.id);
  const created = await svc.addEntry(kingId, req.body);
  return res.status(201).json(created);
};

export const listEntries = async (req: Request, res: Response) => {
  const kingId = Number(req.params.id);
  const list = await svc.listEntries(kingId);
  return res.json(list);
};

export const removeEntry = async (req: Request, res: Response) => {
  const entryId = Number(req.params.eid);
  await svc.removeEntry(entryId);
  return res.sendStatus(204);
};
