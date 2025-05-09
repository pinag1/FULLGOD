// src/controllers/slotPaymentsController.ts
import { Request, Response } from 'express';
import * as svc from '../services/slotPaymentService';

export const createPayment = async (req: Request, res: Response) => {
  try {
    const payment = await svc.createPayment(req.body);
    return res.status(201).json(payment);
  } catch (err: any) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

export const getAllSlotPayments = async (_req: Request, res: Response) => {
  const payments = await svc.getAllPayments();
  return res.status(200).json(payments);
};

export const getSlotPaymentById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
    const p = await svc.getPaymentById(id);
    return res.status(200).json(p);
  } catch (err: any) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

export const updateSlotPayment = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
    const updated = await svc.updatePayment(id, req.body);
    return res.status(200).json(updated);
  } catch (err: any) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

export const deleteSlotPayment = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
    await svc.deletePayment(id);
    return res.sendStatus(204);
  } catch (err: any) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

export const deleteSlotPaymentByCriteria = async (req: Request, res: Response) => {
  try {
    const slotId = parseInt(req.query.slotId as string);
    const eventId = parseInt(req.query.eventId as string);
    const source = req.query.source as any;
    await svc.deleteByCriteria(slotId, eventId, source);
    return res.sendStatus(204);
  } catch (err: any) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

export const getSlotPaymentsBySlotId = async (req: Request, res: Response) => {
  const slotId = parseInt(req.params.slotId);
  const payments = await svc.getBySlotId(slotId);
  return res.status(200).json(payments);
};

export const searchSlotPaymentsByName = async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;
    const pagamentos = await svc.searchBySlotName(name);
    return res.status(200).json(pagamentos);
  } catch (err: any) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};