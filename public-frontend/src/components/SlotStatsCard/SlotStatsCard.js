import useScoreAnimation from "../../hooks/useScoreAnimation";
import MissingImage from "../../images/missing-slot-image.jpg";
import styles from "../../styles/global.module.css"; // Import the CSS module
import PaymentBreakdown from "./PaymentBreakdown";

const SlotCard = ({ slotData, slotKey, isTournament }) => {
  const animationClass = useScoreAnimation(slotData?.information?.score);

  const slotImage = slotData?.slot?.image || MissingImage;
  const slotName = slotData?.slot?.name.split("|")[0] || "-";
  const scores = slotData?.scores || [];
  const payments = slotData?.payments || [];
  const buyValue = slotData?.buy || 0;
  const bestWin = Math.max(...scores.map((score) => score.payment));
  const score = slotData?.information?.score;
  
  return (
    <div className={`${styles.slotStatsWrapper} ${styles[`slotStatsWrapper${slotKey}`]}`}>
      {slotKey === "slot1" ? (
        <>
          <div className={styles.imageWrapper}>
            <img src={slotImage} alt="Slot" className={styles.slotImageTable} />
          </div>
          <div className={styles.slotInfo}>
            <span className={styles.label}>{slotName}</span>
            <span className={`${styles.score} ${animationClass}`}>
              {score ? (Number(score) || 0).toFixed(2) : ""}
            </span>{" "}
          </div>
          <PaymentBreakdown
            scoreData={isTournament ? payments : scores}
            bestWin={bestWin}
            buy={buyValue}
            isLeft={true}
          />
        </>
      ) : (
        <>
          <PaymentBreakdown
            scoreData={isTournament ? payments : scores}
            bestWin={bestWin}
            buy={buyValue}
            isLeft={false}
          />
          <div className={styles.slotInfo}>
            <span className={styles.label}>{slotName}</span>
            <span className={`${styles.score} ${animationClass}`}>
              {score ? (Number(score) || 0).toFixed(2) : ""}
            </span>{" "}
          </div>
          <div className={styles.imageWrapper}>
            <img src={slotImage} alt="Slot" className={styles.slotImageTable} />
          </div>
        </>
      )}
    </div>
  );
};

const SlotStatsCard = ({ slot1, slot2, isTournament }) => {
  return (
    <div className={styles.scoreGridContainer}>
      <SlotCard slotData={slot1} slotKey="slot1" isTournament={isTournament} />
      <SlotCard slotData={slot2} slotKey="slot2" isTournament={isTournament} />
    </div>
  );
};

export default SlotStatsCard;
