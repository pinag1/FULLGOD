import WinnerLeaderboardIcon from "../../icons/WinnerLeaderboardIcon";
import styles from "../../styles/global.module.css"; // ✅ Import CSS Module
import BreaksComponent from "./BreaksComponent";

const WinnerBox = ({ winnerSlot, finalSlot1, finalSlot2 }) => {
  return (
    <div className={styles.winnerBox}>
      {winnerSlot && (
        <>
          <div className={styles.firework}></div>
          <div className={styles.firework}></div>
          <div className={styles.firework}></div>
        </>
      )}
      <WinnerLeaderboardIcon />
      <BreaksComponent slot1={finalSlot1} slot2={finalSlot2} variant="final" />
    </div>
  );
};

export default WinnerBox;
