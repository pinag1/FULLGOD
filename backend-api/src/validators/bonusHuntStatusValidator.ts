import { BonusHuntStatus } from '@prisma/client';

// Adicionando um mapeamento de transições válidas
export const canTransitionTo = (currentStatus: BonusHuntStatus, targetStatus: BonusHuntStatus): boolean => {
  const validTransitions: Record<BonusHuntStatus, BonusHuntStatus[]> = {
    [BonusHuntStatus.STANDBY]: [BonusHuntStatus.HUNTING, BonusHuntStatus.OPENING,BonusHuntStatus.EDIT],  // De STANDBY para HUNTING ou OPENING
    [BonusHuntStatus.HUNTING]: [BonusHuntStatus.STANDBY, BonusHuntStatus.OPENING,BonusHuntStatus.EDIT],  // De HUNTING para STANDBY ou OPENING
    [BonusHuntStatus.OPENING]: [BonusHuntStatus.STANDBY, BonusHuntStatus.FINISHED,BonusHuntStatus.EDIT],  // De OPENING para STANDBY ou FINISHED
    [BonusHuntStatus.FINISHED]: [BonusHuntStatus.EDIT], // De FINISHED para EDIT
    [BonusHuntStatus.EDIT]: [BonusHuntStatus.HUNTING, BonusHuntStatus.STANDBY, BonusHuntStatus.OPENING, BonusHuntStatus.FINISHED], // De EDIT para qualquer estado
  };

  // Verifica se a transição é válida
  return validTransitions[currentStatus]?.includes(targetStatus) ?? false;
};
