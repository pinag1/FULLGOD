// src/controllers/bonusHuntController.ts
import { Request, Response } from 'express';
import * as svc from '../services/bonusHuntService';

export async function createBonusHunt(req: Request, res: Response): Promise<Response> {
  const userId = (req as any).user.id;
  try {
    const hunt = await svc.createBonusHunt(req.body, Number(userId));
    return res.status(201).json(hunt);
  } catch (error: any) {
    console.error('Erro ao criar Bonus Hunt:', error);
    const status = error.status || 500;
    return res.status(status).json({ message: error.message || 'Erro desconhecido' });
  }
}

export async function getAllBonusHunts(_req: Request, res: Response): Promise<Response> {
  try {
    const hunts = await svc.getAllBonusHunts();
    return res.json(hunts);
  } catch (error: any) {
    console.error('Erro ao obter Bonus Hunts:', error);
    return res.status(500).json({ message: 'Erro ao obter Bonus Hunts' });
  }
}

export async function getBonusHuntById(req: Request, res: Response): Promise<Response> {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
  try {
    const hunt = await svc.getBonusHuntById(id);
    if (!hunt) return res.status(404).json({ message: 'Bonus Hunt não encontrado' });
    return res.json(hunt);
  } catch (error: any) {
    console.error('Erro ao obter Bonus Hunt:', error);
    return res.status(500).json({ message: 'Erro ao obter Bonus Hunt' });
  }
}

export async function getSlotPaymentsByBonusHunt(req: Request, res: Response): Promise<Response> {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
  try {
    const payments = await svc.getSlotPaymentsByBonusHunt(id);
    return res.json(payments);
  } catch (error: any) {
    console.error('Erro ao obter pagamentos:', error);
    return res.status(500).json({ message: 'Erro ao obter pagamentos' });
  }
}

export async function updateBonusHunt(req: Request, res: Response): Promise<Response> {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
  try {
    const updated = await svc.updateBonusHunt(id, req.body);
    return res.json(updated);
  } catch (error: any) {
    console.error('Erro ao atualizar Bonus Hunt:', error);
    const status = error.status || 500;
    return res.status(status).json({ message: error.message || 'Erro ao atualizar' });
  }
}

export async function updateBonusHuntStatus(req: Request, res: Response): Promise<Response> {
  const id = Number(req.params.id);
  const userId = (req as any).user.id;
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
  try {
    const updated = await svc.updateBonusHuntStatus(id, req.body, userId);
    return res.json(updated);
  } catch (error: any) {
    console.error('Erro ao atualizar status:', error);
    const status = error.status || 500;
    return res.status(status).json({ message: error.message || 'Erro ao atualizar status' });
  }
}

export async function deleteBonusHunt(req: Request, res: Response): Promise<Response> {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
  try {
    await svc.deleteBonusHunt(id);
    return res.sendStatus(204);
  } catch (error: any) {
    console.error('Erro ao excluir Bonus Hunt:', error);
    const status = error.status || 500;
    return res.status(status).json({ message: error.message || 'Erro ao excluir' });
  }
}
