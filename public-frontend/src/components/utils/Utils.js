export const getWinningSlot = (slot1, slot2) => {
  if (!slot1 || !slot2) return null;

  if (slot1.information.score > slot2.information.score) return slot1;
  if (slot1.information.score < slot2.information.score) return slot2;

  return null;
};

export const isSlotSelected = (slotData, roundIndex, selectedSlots) =>
  selectedSlots?.some(
    (selectedSlot) =>
      selectedSlot.letter === slotData.letter &&
      selectedSlot.round === roundIndex
  );

export const capitalizeFirstLetter = (text) => {
  if (!text) return text;

  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
