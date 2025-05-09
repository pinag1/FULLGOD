import { NextFunction, Request, Response } from 'express';
import * as slotService from '../services/slotService';

export const createSlot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    // espera CreateSlotDto com displayName, isSuper e slotReferenceId
    const newSlot = await slotService.createSlot(data);
    res.status(201).json(newSlot);
  } catch (err: any) {
    next(err);
  }
};

export const getAllSlots = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query;
    let slots;
    if (typeof search === 'string') {
      // rota de busca por nome
      slots = await slotService.searchSlotsByName(search);
    } else {
      slots = await slotService.getAllSlots();
    }
    res.json(slots);
  } catch (err) {
    next(err);
  }
};

export const getSlotById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
    const slot = await slotService.getSlotById(id);
    res.json(slot);
  } catch (err) {
    next(err);
  }
};

export const updateSlot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
    const data = req.body;
    // espera UpdateSlotDto
    const updated = await slotService.updateSlot(id, data);
    res.json(updated);
  } catch (err: any) {
    next(err);
  }
};

export const deleteSlot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
    await slotService.deleteSlot(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
