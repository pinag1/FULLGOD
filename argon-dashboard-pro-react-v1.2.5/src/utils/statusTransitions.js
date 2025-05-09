export const validStatusTransitions = {
    STANDBY: ["HUNTING", "OPENING", "EDIT"],
    HUNTING: ["STANDBY", "EDIT"],
    OPENING: ["STANDBY", "FINISHED", "EDIT"],
    FINISHED: ["EDIT"],
    EDIT: ["HUNTING", "STANDBY", "OPENING", "FINISHED"],
  };
  
  export const getNextStatuses = (currentStatus) => {
    if (!currentStatus) return [];
    return validStatusTransitions[currentStatus.toUpperCase()] || [];
  };
  