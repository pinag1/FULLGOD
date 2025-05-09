export const PAYMENT_SOURCES = {
    MAIN_SLOT: "MAIN_SLOT",
    BONUS_HUNT: "BONUS_HUNT",
    TOURNAMENT: "TOURNAMENT",
    CLIMB_THE_QUEST: "CLIMB_THE_QUEST",
    ELO_MAIS_FRACO: "ELO_MAIS_FRACO",
    BONUS_BUY_BATTLE: "BONUS_BUY_BATTLE",
    KING_OF_THE_HILL: "KING_OF_THE_HILL",
  };
  
  // Caso precises para dropdowns ou selects
  export const PAYMENT_SOURCE_OPTIONS = Object.keys(PAYMENT_SOURCES).map((key) => ({
    label: key
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase()), // Formata estilo "Climb The Quest"
    value: PAYMENT_SOURCES[key],
  }));
  