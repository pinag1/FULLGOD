import BronzeStarIcon from "../../icons/BronzeStarIcon";
import GoldenStarIcon from "../../icons/GoldenStarIcon";
import SilverStarIcon from "../../icons/SilverStarIcon";
import styles from "../../styles/global.module.css"; // Import CSS module

const Podium = ({ players }) => {
  const sortedPlayers = [...players].sort((a, b) => {
    if (a.rank === 2) return -1;
    if (b.rank === 2) return 1;
    if (a.rank === 1) return -1;
    if (b.rank === 1) return 1;
    return a.rank - b.rank;
  });

  const renderRankIcon = (rank) => {
    const numericRank = Number(rank);

    if (numericRank === 1) {
      return <GoldenStarIcon />;
    } else if (numericRank === 2) {
      return <SilverStarIcon />;
    } else if (numericRank === 3) {
      return <BronzeStarIcon />;
    } else {
      return null;
    }
  };

  return (
    <div className={styles.podiumWrapper}>
      {sortedPlayers.map((player, index) => (
        <div key={index} className={`${styles.podiumPlayer} ${styles[`rank${player.rank}`]}`}>
          <div className={styles.rankBadge}>
            <span className={styles.rankText}>{player.rank}</span>
            {renderRankIcon(player.rank)}
          </div>
          <div className={styles.avatar}>
            <img src={player.playerImage} alt={player.name} />
          </div>
          <div className={styles.username}>{player.name}</div>
          <div className={styles.scoreBase}>{player.start}€</div>
          <div className={styles.scoreBold}>{player.currentBalance}€</div>
        </div>
      ))}
    </div>
  );
};

export default Podium;
