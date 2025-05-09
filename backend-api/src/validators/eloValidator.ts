// src/validators/eloValidator.ts

import * as Yup from 'yup';
import type { CreateEloDto, CreateEloParticipationDto } from '../dtos/eloDto';

export const createEloSchema = Yup.object<CreateEloDto>().shape({
  name: Yup.string().optional(),
  description: Yup.string().optional(),
});

export const updateEloSchema = createEloSchema.partial();

export const createEloParticipationSchema = Yup.object<CreateEloParticipationDto>().shape({
  userId: Yup.number().required('userId é obrigatório').integer().positive(),
  score: Yup.number().optional(),
});
