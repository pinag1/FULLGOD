// components/CardSlot.jsx
import CrownIcon from "../../icons/CrownIcon";
import StartIcon from "../../icons/StartIcon";
import MissingImage from "../../images/missing-slot-image.jpg";
import styles from '../../styles/global.module.css'; // Import CSS Modules

const CardSlot = ({ data, isKing }) => {
  const slotName = data.slot?.name ? data.slot.name.split("|")[0] : "-";
  const slotImage = data.slot?.image || "";
  const playerName = data.player || "-";
  const multiValue = data.multi ? `x${Math.round(data.multi)}x` : "-";

  return (
    <div className={styles.cardSlot}> 
      <div className={styles.summaryRow}>  
        <div className={styles.iconWrapper}>
          {isKing ? <CrownIcon /> : <StartIcon />}
        </div>
        <span className={styles.label}>{isKing ? "King" : "Playing now"}</span>
        <span className={styles.value}>{playerName}</span>
      </div>

      <div className={styles.cardSlotBody}> 
        <div className={styles.imageWrapper}>
          <img
            src={slotImage || MissingImage}
            alt="Slot"
            className={styles.slotImageTable}  
          />
        </div>
        <span className={styles.label}>{slotName}</span>
        <span className={styles.value}>{multiValue}</span>
      </div>
    </div>
  );
};

export default CardSlot;
