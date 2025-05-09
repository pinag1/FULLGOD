import SwordIcon from "../../icons/SwordIcon";
import styles from "../../styles/global.module.css"; // Import the CSS module

const ScoreBar = ({ slot1, slot2 }) => {
  const slot1Score = slot1.information.score;
  const slot2Score = slot2.information.score;

  const totalScore = slot1Score + slot2Score;
  const slot1Width = (slot1Score / totalScore) * 100;
  const slot2Width = (slot2Score / totalScore) * 100;

  return (
    <div className={styles.scorebar}>
      <div className={styles.BBBImage}>
        <SwordIcon />
      </div>

      <div
        className={`${styles.scorebarSlot} ${styles.slot1}`}
        style={{ width: `${slot1Width}%` }}
      >
        <div className={styles.scorebarText}>
          <div className={styles.scorebarPlayer}>{slot1?.player}</div>
          <div className={styles.scorebarSlotName}>
            {slot1.slot?.name.split("|")[0]}
          </div>
          <div className={styles.scorebarProvider}>{slot1?.slot?.provider.name}</div>
        </div>
      </div>

      <div
        className={`${styles.scorebarSlot} ${styles.slot2}`}
        style={{ width: `${slot2Width}%` }}
      >
        <div className={styles.scorebarText}>
          <div className={styles.scorebarPlayer}>{slot2.player}</div>
          <div className={styles.scorebarSlotName}>
            {slot2.slot?.name.split("|")[0]}
          </div>
          <div className={styles.scorebarProvider}>{slot2?.slot?.provider.name}</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBar;
