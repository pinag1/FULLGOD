// Validator: slotValidator.ts
import * as Yup from 'yup';
import type { CreateSlotDto } from '../dtos/slotDto';

export const slotSchema = Yup.object<CreateSlotDto>({
  name: Yup.string().required('O campo "name" é obrigatório.'),
  displayName: Yup.string().required('O campo "displayName" é obrigatório.'),
  provider: Yup.string().required('O campo "provider" é obrigatório.'),
  rtp: Yup.number().nullable().typeError('O campo "rtp" deve ser um número.'),
  potencial: Yup.number().nullable().typeError('O campo "potencial" deve ser um número.'),
  volatility: Yup.number().nullable().typeError('O campo "volatility" deve ser um número.'),
  releaseDate: Yup.date().nullable().typeError('O campo "releaseDate" deve ser uma data válida.'),
  isSuper: Yup.boolean().required('O campo "isSuper" é obrigatório.'),
  slotReferenceId: Yup.number().nullable().integer('O campo "slotReferenceId" deve ser um inteiro.').typeError('O campo "slotReferenceId" deve ser um número.'),
  bestwin: Yup.number().nullable().typeError('O campo "bestwin" deve ser um número.'),
  bestX: Yup.number().nullable().typeError('O campo "bestX" deve ser um número.'),
  avgX: Yup.number().nullable().typeError('O campo "avgX" deve ser um número.'),
  quantidadeBonus: Yup.number().nullable().integer('O campo "quantidadeBonus" deve ser um inteiro.').typeError('O campo "quantidadeBonus" deve ser um número.'),
});

export async function validateSlotData(data: Partial<CreateSlotDto>) {
  try {
    await slotSchema.validate(data, { abortEarly: false });
  } catch (err: any) {
    const message = Array.isArray(err.errors) ? err.errors.join(', ') : err.message;
    throw new Error(`Erro de validação: ${message}`);
  }
}
