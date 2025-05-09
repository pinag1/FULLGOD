// src/validators/tournamentValidator.ts

import * as Yup from 'yup';
import type { CreateTournamentDto, UpdateTournamentDto } from '../dtos/tournamentDto';

// Schema para criação de torneio
const createTournamentSchema: Yup.ObjectSchema<CreateTournamentDto> = Yup.object()
  .shape({
    name: Yup.string()
      .trim()
      .required('O nome do torneio é obrigatório'),
    description: Yup.string()
      .trim()
      .optional(),
  })
  .noUnknown(true, ({ unknown }) => `Campo desconhecido: ${unknown}`);

// Schema para atualização de torneio
const updateTournamentSchema: Yup.ObjectSchema<UpdateTournamentDto> = Yup.object()
  .shape({
    name: Yup.string()
      .trim()
      .optional(),
    description: Yup.string()
      .trim()
      .optional(),
  })
  .noUnknown(true, ({ unknown }) => `Campo desconhecido: ${unknown}`)
  .test(
    'at-least-one',
    'Deve fornecer ao menos um campo para atualizar',
    (value) =>
      !!value && (value.name !== undefined || value.description !== undefined)
  );

// Helpers de validação
export async function validateCreateTournament(
  payload: any
): Promise<void> {
  try {
    await createTournamentSchema.validate(payload, {
      abortEarly: false,
      strict: true,
    });
  } catch (err: any) {
    throw Object.assign(
      new Error(err.errors.join(', ')),
      { status: 400 }
    );
  }
}

export async function validateUpdateTournament(
  payload: any
): Promise<void> {
  try {
    await updateTournamentSchema.validate(payload, {
      abortEarly: false,
      strict: true,
    });
  } catch (err: any) {
    throw Object.assign(
      new Error(err.errors.join(', ')),
      { status: 400 }
    );
  }
}
