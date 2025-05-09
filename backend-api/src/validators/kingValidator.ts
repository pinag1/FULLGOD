// src/validators/kingValidator.ts

import * as Yup from 'yup';
import type { CreateKingDto, CreateKingEntryDto } from '../dtos/kingDto';

export const createKingSchema = Yup.object<CreateKingDto>().shape({
  name: Yup.string().optional(),
  description: Yup.string().optional(),
});

export const updateKingSchema = createKingSchema.partial();

export const createKingEntrySchema = Yup.object<CreateKingEntryDto>().shape({
  slotId: Yup.number().required('slotId é obrigatório').integer().positive(),
  userId: Yup.number().required('userId é obrigatório').integer().positive(),
});
