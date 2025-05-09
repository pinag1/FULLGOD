import { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import Table from "../components/Table/Table";
import useLeaderboardData from "../hooks/useLeaderboardData";
import useIsMobile from "../hooks/useMobile";
import styles from "../styles/global.module.css"; // Import the CSS module
import mockData from "./../data/mockDataLeaderboard.json";
import MissingImage from "./../images/missing-slot-image.jpg";

const Leaderboard = () => {
  const [acarregar, setLoading] = useState(true);
  const { data, loading, error } = useLeaderboardData(mockData);
  const rankings = data?.ranking || [];
  const targetDate = new Date("2025-04-18T00:00:00Z").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());

  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (loading && acarregar)
    return (
      <div className={styles.Loading}>
        <BeatLoader color="white" size={10} />
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const prizeDistribution = [
    3500, 2000, 1500, 900, 600, 500, 400, 300, 200, 100,
  ];

  const topThree = [
    rankings[1]
      ? { ...rankings[1], prize: prizeDistribution[1] }
      : {
          rank: 2,
          name: "-",
          image: "https://cdn.empiredrop.com/avatars/default_25.webp",
          wagered: "-",
          prize: prizeDistribution[1],
        },
    rankings[0]
      ? { ...rankings[0], prize: prizeDistribution[0] }
      : {
          rank: 1,
          name: "-",
          image: "https://cdn.empiredrop.com/avatars/default_26.webp",
          wagered: "-",
          prize: prizeDistribution[0],
        },
    rankings[2]
      ? { ...rankings[2], prize: prizeDistribution[2] }
      : {
          rank: 3,
          name: "-",
          image: "https://cdn.empiredrop.com/avatars/default_27.webp",
          wagered: "-",
          prize: prizeDistribution[2],
        },
  ];

  const others = rankings.slice(3).map((entry, index) => ({
    ...entry,
    prize: prizeDistribution[entry.rank - 1] || 0,
  }));

  const columns = [
    { key: "index", label: "#", className: styles["table-cell-id"] },
    {
      key: "slot",
      label: "PLAYER",
      className: styles["table-cell-slot"],
      render: (value, row) => (
        <div className={styles["slotContainer"]}>
          <div className={styles["imageWrapper"]}>
            <img
              src={value.image || MissingImage}
              alt="Slot"
              className={styles["slotImageTable"]}
            />
          </div>
          <span className={styles["slotName"]}>{value.slotName}</span>
        </div>
      ),
    },
    {
      key: "wager",
      label: "WAGER",
      className: styles["tableCellProvider"],
    },
    {
      key: "prize",
      label: "Prize",
      className: styles["tableCellBet"],
    },
  ];

  const customRender = {
    win: (value) => <span className={value ? styles["winBold"] : ""}>{value}</span>,
  };

  const tableData = others.map((entry, i) => {
    return {
      index: entry.rank,
      slot: {
        slotName: entry.name,
        image: entry.image || MissingImage,
      },
      wager: `${entry.wagered}€` || "-",
      prize: entry.prize ? `${entry.prize}€` : "-",
    };
  });

  const formatEuro = (value) => {
    const num = Number(value);
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "€";
  };

  return (
    <div id="Container">
      <div id="Ofertas">
        <div className={styles.header}>
          <div className={styles.headerCategory}>Casinos</div>
          <div className={styles.headerPage}>Empire Drop</div>
          <div className={styles.HeaderSubTitle}>Current Empire Drop Leaderboard</div>
        </div>
        <div className={styles.ranking}>
          <div className={styles["topThree"]}>
            {topThree.map((entry, index) => {
              const positionClass = ["second", "first", "third"][index];
              return (
                <div
                  key={entry.rank}
                  className={`${styles["topCard"]} ${styles[positionClass]}`}
                  style={{ position: "relative", paddingBottom: "50px" }}
                >
                  <div className={styles.profile}>
                    {entry.crown && <span className={styles.crown}>👑</span>}
                    <img src={entry.image} alt={entry.name} />
                    <span className={styles.rank}>{entry.rank}</span>
                  </div>
                  <div className={styles.infoRank}>
                  <p className={styles.name}>{entry.name}</p>
                  <p className={styles.wagered}>
                    Wager <span className={styles.boxWagerAmount}>{entry.wagered}€</span>
                  </p> </div>
                  <p className={styles.amount}>{formatEuro(entry.prize)}</p>
                </div>
              );
            })}
          </div>
          <div className={styles["countdownContainer"]}>
            <div className={styles["countdownBox"]}>
              <span className={styles["countdownValue"]}>{days}</span>
              <span className={styles["countdownLabel"]}>Days</span>
            </div>
            <div className={styles["countdownBox"]}>
              <span className={styles["countdownValue"]}>{hours}</span>
              <span className={styles["countdownLabel"]}>Hours</span>
            </div>
            <div className={styles["countdownBox"]}>
              <span className={styles["countdownValue"]}>{minutes}</span>
              <span className={styles["countdownLabel"]}>Minutes</span>
            </div>
            <div className={styles["countdownBox"]}>
              <span className={styles["countdownValue"]}>{seconds}</span>
              <span className={styles["countdownLabel"]}>Seconds</span>
            </div>
          </div>
          <div className={styles["statsChallenge"]}>
            <div className={styles["bonusHuntChallengeLayout"]}>
              <div className={styles.BHCBox}>
                <Table
                  columns={columns}
                  data={tableData}
                  customRender={customRender}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
