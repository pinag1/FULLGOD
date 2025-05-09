import styles from '../../styles/global.module.css'; // Import CSS Modules
import CardSlot from "../CardSlot/CardSlot";

const DetailsTable = ({ gameName, topItems, rows, isKing, data }) => {
  return (
    <div className={styles.summaryCard}> {/* Use CSS Modules */}
      <div className={styles.title}>
        {gameName}
        {data.information?.madeBy && (
          <span className={styles.madeBy}> | {data.information.madeBy}</span>
        )}
      </div>{" "}
      <div className={styles.summaryTop}>
        {isKing ? (
          <>
            <div className={styles.cardSlotWrapper}>
              <CardSlot data={data.currentKing} isKing={isKing} />
            </div>

            <div className={styles.cardSlotWrapper}>
              <CardSlot data={data.nowAndNext.now} />
            </div>
          </>
        ) : (
          topItems.map((item, idx) => (
            <div className={styles.summaryBox} key={idx}>
              <div
                className={`${styles.icon} ${
                  item.iconType === "image" ? styles.imageWrapper : styles.iconWrapper
                }`}
              >
                {item.icon}
              </div>
              <div className={styles.labelValue}>
                <div className={styles.label}>{item.label}</div>
                <div
                  className={`${styles.value} ${
                    item.label === "Profit/Loss" ? styles.profitLossColor : ""
                  }`}
                >
                  {item.value || "-"}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {rows.map((row, idx) => (
        <div
          className={`${styles.summaryRow} ${
            gameName === "BONUS HUNT" ? styles.bonusHunt : ""
          }`}
          key={idx}
        >
          <div
            className={`${styles.icon} ${
              row.iconType === "image" ? styles.imageWrapper : styles.iconWrapper
            }`}
          >
            {row.icon}
          </div>
          <span className={styles.label}>{row.label}</span>
          <span
            className={`${styles.value} ${
              row.label === "Profit/Loss"
                ? parseFloat(row.value.replace(/[^\d.-]/g, "")) >= 0
                  ? styles.profitColor
                  : styles.lossColor
                : ""
            }`}
          >
            {row.label === "Profit/Loss" ? row.value : row.value || "-"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DetailsTable;
