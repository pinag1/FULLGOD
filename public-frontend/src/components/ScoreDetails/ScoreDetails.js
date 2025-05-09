import styles from "../../styles/global.module.css"; // Import the CSS module

const ScoreDetails = ({
  slot1,
  slot2,
  result1,
  result2,
  endBalance1,
  endBalance2,
}) => {
  const renderSlotValues = (slot, result, endBalance) => {
    if (!slot) return ["-", "-", "-", "-"];

    const bonus = result ?? "-";
    const buyValue = slot.buy != null ? `${slot.buy}€` : "-";
    const bestWin = slot.information?.bestWin
      ? `${slot.information.bestWin}€`
      : "-";
    const profitLoss = endBalance ? `${endBalance}€` : "-";

    return [bonus, buyValue, bestWin, profitLoss];
  };

  const getProfitLossClass = (endBalance) =>
    endBalance > 0 ? styles.profit : endBalance < 0 ? styles.loss : "";

  const leftItems = renderSlotValues(slot1, result1, endBalance1);
  const rightItems = renderSlotValues(slot2, result2, endBalance2);
  const labels = ["Bonus", "Buy value", "Best win", "Profit/Loss"];

  const renderColumn = (items, endBalance, side) => {
    return items.map((item, idx) => {
      const isProfitLoss = idx === 3;
      const itemClass = isProfitLoss
        ? `${styles.profitLoss} ${getProfitLossClass(endBalance)}`
        : "";
      return (
        <div className={`${styles.scoreBox} ${itemClass}`} key={`${side}-${idx}`}>
          {item}
        </div>
      );
    });
  };

  return (
    <div className={styles.scoreDetailsContainer}>
      <div className={styles.scoreColumnSlot1}>
        {renderColumn(leftItems, endBalance1, "left")}
      </div>
      <div className={styles.scoreColumnCenter}>
        {labels.map((label, idx) => (
          <div className={styles.scoreLabel} key={`label-${idx}`}>
            {label}
          </div>
        ))}
      </div>
      <div className={styles.scoreColumnSlot2}>
        {renderColumn(rightItems, endBalance2, "right")}
      </div>
    </div>
  );
};

export default ScoreDetails;
