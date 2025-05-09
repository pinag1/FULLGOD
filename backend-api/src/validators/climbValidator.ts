// src/validators/climbValidator.ts

import * as Yup from 'yup';
import type { CreateClimbDto, CreateParticipationDto, UpdateLevelProgressDto } from '../dtos/climbDto';

export const createClimbSchema = Yup.object<CreateClimbDto>().shape({
  name: Yup.string().optional(),
  description: Yup.string().optional(),
});

export const updateClimbSchema = createClimbSchema.partial();

export const createParticipationSchema = Yup.object<CreateParticipationDto>().shape({
  userId: Yup.number().required('userId é obrigatório').positive().integer(),
});

export const updateLevelProgressSchema = Yup.object<UpdateLevelProgressDto>().shape({
  attemptsLeft: Yup.number().integer().min(0).optional(),
  result: Yup.mixed<'NAO_COMPLETOU' | 'COMPLETOU'>()
    .oneOf(['NAO_COMPLETOU', 'COMPLETOU'])
    .optional(),
});
