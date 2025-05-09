// src/validators/bonusHuntValidator.ts
import { BonusHuntStatus } from '@prisma/client';
import * as yup from 'yup';

export const createBonusHuntSchema = yup.object({
  name: yup.string().trim().required('Nome é obrigatório').max(100, 'Máximo de 100 caracteres'),
  description: yup.string().optional().max(500, 'Máximo de 500 caracteres'),
});

export const updateBonusHuntSchema = yup.object({
  name: yup.string().trim().optional().max(100, 'Máximo de 100 caracteres'),
  description: yup.string().optional().max(500, 'Máximo de 500 caracteres'),
});

export const updateStatusSchema = yup.object({
  status: yup
    .mixed<BonusHuntStatus>()
    .oneOf(Object.values(BonusHuntStatus), 'Status inválido')
    .required('Status é obrigatório'),
});