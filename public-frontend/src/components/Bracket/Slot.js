import MissingImage from "../../images/missing-slot-image.jpg";
import styles from "../../styles/global.module.css"; // ✅ Import CSS Module for slot styling

const Slot = ({
  slotData = {},
  index,
  bracketSide,
  onClick = () => {},
  winningSlot,
  isSelected,
}) => {
  const isDefaultSlot = slotData.letter === "?";

  const safeSlotData = isDefaultSlot
    ? {
        slot: { name: "???", image: MissingImage },
        information: {},
        letter: "?",
        slot1: null,
      }
    : {
        slot: slotData.slot || { name: "???", image: MissingImage },
        information: slotData.information || {},
        letter: slotData.letter || "?",
        slot1: slotData.slot1 || null,
      };

  const isLoser = safeSlotData.letter !== winningSlot?.letter;

  const handleClick = () => onClick(safeSlotData.slot1, safeSlotData.slot2);

  const renderSlotContent = (side) => (
    <>
      {side === "right" ? (
        <>
          <div className={styles.infoSlotTournament}>
            <div className={styles.slotNameTournament}>
              {safeSlotData.slot.name.split("|")[0]}
            </div>
            <div className={styles.slotScoreTournament}>
              {(Number(safeSlotData.information?.score) || 0).toFixed(2)}
            </div>
          </div>
          <div className={styles.slotLetter}>
            <img
              src={safeSlotData.slot.image}
              alt={`Slot ${index + 1}`}
              className={`${styles.slotImageTournament} ${isLoser ? styles.blurred : ""}`}
            />
            <span className={styles.slotLetterOverlay}>{safeSlotData.letter}</span>
          </div>
        </>
      ) : (
        <>
          <div className={styles.slotLetter}>
            <img
              src={safeSlotData.slot.image}
              alt={`Slot ${index + 1}`}
              className={`${styles.slotImageTournament} ${isLoser ? styles.blurred : ""}`}
            />
            <span className={styles.slotLetterOverlay}>{safeSlotData.letter}</span>
          </div>
          <div className={styles.infoSlotTournament}>
            <div className={styles.slotNameTournament}>
              {safeSlotData.slot.name.split("|")[0]}
            </div>
            <div className={styles.slotScoreTournament}>
              {(Number(safeSlotData.information?.score) || 0).toFixed(2)}
            </div>
          </div>
        </>
      )}
    </>
  );

  return (
    <div
      className={`${styles.slotContainerTournament} ${styles[bracketSide]} ${
        isLoser ? styles.loser : styles.winner
      } ${isSelected ? styles.selected : ""}`}
      key={index}
      onClick={handleClick}
    >
      {renderSlotContent(bracketSide)}
    </div>
  );
};

export default Slot;
