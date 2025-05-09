import styles from "../../styles/global.module.css"; // Import the CSS module
import formatPayment from "./FormatPayment";

const PaymentBreakdown = ({ scoreData, bestWin, buy }) => {
  return (
    <div className={styles.slotMainInfoPayment}>
      <div className={styles.scoresGrid}>
        {scoreData?.map(({ id, payment }) => {
          if (payment === null) {
            return (
              <div key={id} className={`${styles.scoreBoxGrid} ${styles.neutralScore}`}>
                <div className={styles.gridBox}>-</div>
              </div>
            );
          }

          let scoreClass =
            payment === bestWin
              ? styles.bestScore
              : payment > buy
              ? styles.greenScore
              : payment < buy
              ? styles.redScore
              : "";

          return (
            <div key={id} className={`${styles.scoreBoxGrid} ${scoreClass}`}>
              <div className={styles.gridBox}>
                {formatPayment(payment)}{" "}
                {/* Formatting payment using your formatPayment function */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentBreakdown;
