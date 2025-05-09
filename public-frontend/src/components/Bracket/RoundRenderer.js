import styles from "../../styles/global.module.css"; // ✅ Import CSS module
import { getWinningSlot, isSlotSelected } from "../utils/Utils.js";
import Slot from "./Slot";

const RoundRenderer = ({
  rounds,
  roundIndexes,
  bracketSide,
  selectedSlots,
  handleGameClick,
}) =>
  roundIndexes.map((roundIndex, i) => {
    const round = rounds[`round${roundIndex}`];
    if (!round) return null;

    const isFinal = roundIndex === 7;
    const isSemi = roundIndex === 5 || roundIndex === 6;

    const roundWrapperStyle = {
      marginTop: isFinal ? "152px" : isSemi ? "38px" : undefined,
      marginBottom: i === 0 ? "74px" : undefined,
      display: isSemi ? "flex" : "block",
      flexDirection: isSemi ? "column" : "row",
      alignItems: isSemi ? "center" : undefined,
    };

    return (
      <div
        key={`round${roundIndex}`}
        style={roundWrapperStyle}
        className={styles[`round-${roundIndex}`]} // ✅ Apply CSS module for specific rounds
      >
        {isFinal ? (
          <div className={`${styles.playoffs} ${styles[bracketSide]}`}>
            <Slot
              slotData={round[bracketSide === "left" ? "slot1" : "slot2"]}
              index={0}
              bracketSide={bracketSide}
              onClick={() =>
                handleGameClick(round.slot1, round.slot2, roundIndex)
              }
              winningSlot={getWinningSlot(round.slot1, round.slot2)}
              isSelected={selectedSlots?.some(
                (selectedSlot) =>
                  selectedSlot.letter ===
                    round[bracketSide === "left" ? "slot1" : "slot2"]?.letter &&
                  selectedSlot.round === roundIndex
              )}
            />
          </div>
        ) : (
          Object.entries(round).map(([slotKey, slotData], slotIndex) => {
            if (!slotData || !slotData.letter) return null;
            const slotWrapperStyle = {
              marginBottom: isSemi && slotIndex === 1 ? "148px" : undefined,
            };

            return (
              <div
                key={slotKey}
                style={slotWrapperStyle}
                className={styles[`slot-wrapper${slotKey}`]} // ✅ Apply CSS module for slots
              >
                <Slot
                  slotData={slotData}
                  index={slotIndex}
                  bracketSide={bracketSide}
                  onClick={() =>
                    handleGameClick(round.slot1, round.slot2, roundIndex)
                  }
                  winningSlot={getWinningSlot(round.slot1, round.slot2)}
                  isSelected={isSlotSelected(
                    slotData,
                    roundIndex,
                    selectedSlots
                  )}
                />
              </div>
            );
          })
        )}
      </div>
    );
  });

export default RoundRenderer;
