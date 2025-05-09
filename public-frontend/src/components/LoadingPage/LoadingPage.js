import styles from "../../styles/global.module.css"; // Import the CSS module
import { capitalizeFirstLetter } from "../utils/Utils";
import BBB from "./../../images/No-active-BBB.png";
import BH from "./../../images/No-active-BH.png";
import KOT from "./../../images/No-active-KOTH.png";
import TOURNAMENT from "./../../images/No-active-Torneio.png";

const LoadingPage = ({ gameName }) => {
  const getGameImage = (gameName) => {
    switch (gameName.toLowerCase()) {
      case "game":
        return BH;
      case "king of the hill":
        return KOT;
      case "bonus buy battle":
        return BBB;
      case "tournament":
        return TOURNAMENT;
      case "bonus hunt":
        return BH;
      default:
        return null;
    }
  };

  const noActiveGameText = (
    <div className={styles.noActiveGameText}>
      <p className={styles.mainText}>No active</p>
      <p className={styles.mainText}>
        {gameName === "BONUS BUY BATTLE"
          ? "BB Battle"
          : capitalizeFirstLetter(gameName) || "GAME NAME"}
      </p>
      <p className={styles.subText}>
        Don’t worry, action is coming soon! <br />
        Join us on <span className={styles.highlightText}>Twitch</span> to catch the
        next one! <br />
      </p>
      <a
        href="https://www.twitch.tv/godmota"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.twitchButton}
      >
        Our Twitch
      </a>
    </div>
  );

  return (
    <div className={styles.loadingContent}>
      <img
        src={getGameImage(gameName)}
        alt={`Game Image for ${gameName}`}
        className={styles.gameImage}
      />
      <div>{noActiveGameText}</div>
    </div>
  );
};

export default LoadingPage;
