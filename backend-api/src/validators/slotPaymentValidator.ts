// src/validators/slotPaymentValidator.ts
import * as yup from 'yup';

export const slotPaymentSchema = yup.object({
  name: yup.string().required('Nome é obrigatório').max(100, 'Nome não pode exceder 100 caracteres'),
  slotId: yup.number().required('slotId é obrigatório').integer().positive('slotId deve ser positivo'),
  bet: yup.number().required('bet é obrigatório').min(0, 'bet deve ser ≥ 0'),
  payment: yup.number().required('payment é obrigatório').min(0, 'payment deve ser ≥ 0'),
  source: yup
    .mixed()
    .oneOf([
      'MAIN_SLOT','BONUS_HUNT','TOURNAMENT','CLIMB_THE_QUEST','ELO_MAIS_FRACO','BONUS_BUY_BATTLE','KING_OF_THE_HILL'
    ], 'source inválido')
    .default('MAIN_SLOT'),
  eventId: yup.number().nullable().default(null),
});