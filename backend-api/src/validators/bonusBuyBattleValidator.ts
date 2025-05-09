// src/validators/bonusBuyBattleValidator.ts
import * as yup from 'yup';

export const createBattleSchema = yup.object({
  name: yup.string().optional(),
  description: yup.string().optional(),
  player1Id: yup.number().integer().positive().required(),
  player2Id: yup.number().integer().positive().required(),
  slot1Id: yup.number().integer().positive().required(),
  slot2Id: yup.number().integer().positive().required(),
  maxRounds: yup.number().integer().positive().required(),
  slot1BonusValue: yup.number().positive().optional().nullable(),
  slot2BonusValue: yup.number().positive().optional().nullable(),
});

export const updateScoresSchema = yup.object({
  player1Score: yup.number().min(0).required(),
  player2Score: yup.number().min(0).required(),
  winnerId: yup.number().integer().positive().nullable().optional(),
});
