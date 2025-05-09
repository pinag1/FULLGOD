// src/controllers/tournamentController.ts
import { Request, Response } from 'express';
import * as svc from '../services/tournamentService';

export const createTournament = async (req: Request, res: Response) => {
  const t = await svc.createTournament(req.body);
  return res.status(201).json(t);
};

export const getAllTournaments = async (_: Request, res: Response) => {
  const list = await svc.getAllTournaments();
  return res.json(list);
};

export const getTournamentById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const t = await svc.getTournamentById(id);
  if (!t) return res.status(404).json({ message: 'Torneio não encontrado' });
  return res.json(t);
};

export const updateTournament = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const t = await svc.updateTournament(id, req.body);
  return res.json(t);
};

export const deleteTournament = async (req: Request, res: Response) => {
  await svc.deleteTournament(Number(req.params.id));
  return res.sendStatus(204);
};

export const addParticipant = async (req: Request, res: Response) => {
  const tournamentId = Number(req.params.id);
  const p = await svc.addParticipant({ tournamentId, ...req.body });
  return res.status(201).json(p);
};

export const removeParticipant = async (req: Request, res: Response) => {
  await svc.removeParticipant(Number(req.params.pid));
  return res.sendStatus(204);
};

export const generateBracket = async (req: Request, res: Response) => {
  await svc.generateBracket(Number(req.params.id));
  return res.sendStatus(204);
};

export const addMatch = async (req: Request, res: Response) => {
  const tournamentId = Number(req.params.id);
  const m = await svc.addMatch(tournamentId, req.body);
  return res.status(201).json(m);
};

export const updateMatchAndAdvance = async (req: Request, res: Response) => {
  const matchId = Number(req.params.mid);
  const { player1Score, player2Score } = req.body;
  await svc.updateMatchAndAdvance(matchId, player1Score, player2Score);
  return res.sendStatus(204);
};

export const listMatches = async (req: Request, res: Response) => {
  const tournamentId = Number(req.params.id);
  const matches = await svc.fetchMatches(tournamentId);
  return res.json(matches);
};

export const updateMatch = async (req: Request, res: Response) => {
  const matchId = Number(req.params.mid);
  const updates = req.body; // ex: { slot1BonusValue: 100 }
  const updated = await svc.updateMatch(matchId, updates);
  return res.json(updated);
};

