// src/validators/bonusHuntSummaryValidator.ts

export const validateBonusHuntSummaryData = (start: any, madeBy: string) => {
  const startValue = parseFloat(start);
  if (isNaN(startValue)) {
    throw new Error('O valor de "start" não é válido. Esperado um número.');
  }

  if (typeof madeBy !== 'string' || madeBy.trim() === '') {
    throw new Error('O campo "madeBy" não pode ser vazio.');
  }

  return { start: startValue, madeBy };
};