import { useState } from "react";
import AllGamesTable from "../../../components/AllGamesTable/AllGamesTable";
import DetailsTable from "../../../components/DetailsTable/DetailsTable";
import {
  buildBonusHuntRows,
  buildBonusHuntTopItems,
} from "../../../components/utils/BonusHuntHelpers";

import BeatLoader from "react-spinners/BeatLoader";
import mockData from "../../../data/mockDataBH.json";
import styles from "../../../styles/global.module.css"; // Import the CSS module
import LoadingPage from "./../../../components/LoadingPage/LoadingPage";
import useFetchData from "./../../../hooks/useFetchData";
function BonusHunt() {
  const [acarregar, setLoading] = useState(true);

  const { data, loading, error } = useFetchData(
    mockData,
    "https://overlay.godmota.com/api/v0/overlay/bonus-hunt"
  );

  if (loading && acarregar)
    return (
      <div className={styles.loading}>
        <BeatLoader color="white" size={10} />
      </div>
    );

  if (!data || !data.games || data.games.length === 0) {
    return (
      <div id="Container">
        <div className={styles.kingOfTheHillContainer}>
          <div className={styles.header}>
            <div className={styles.headerCategory}>MiniGames</div>
            <div className={styles.headerPage}>Bonus Hunt</div>
            <div className={styles.headerPage}>Bonus Hunt</div>

            <div className={styles.headerPage}>Bonus Hunt</div>
          </div>
          <LoadingPage gameName={data?.gameName || "Game"} />
        </div>
      </div>
    );
  } else {
    const winCount =
      data.games?.filter((game) => game?.win != null).length || 0;
    const winRatio = data.games ? `${winCount}/${data.games.length}` : "-";
    const gamesArray = Array.isArray(data?.games) ? data.games : [];

    const topItems = buildBonusHuntTopItems(data, winRatio);
    const rows = buildBonusHuntRows(data, winRatio);

    return (
      <div id="Container">
        <div className={styles.bonusHuntContainer}>
          <div className={styles.header}>
            <div className={styles.headerCategory}>MiniGames</div>
            <div className={styles.headerPage}>Bonus Hunt</div>
          </div>
          <div className={styles.bonusHuntLayout}>
            <div className={styles.BHCBox}>
              <AllGamesTable data={{ ...data, games: gamesArray }} index={1} />
            </div>

            <div className={styles.BHCBox}>
              <div className={styles.statsContainer}>
                <DetailsTable
                  gameName="BONUS HUNT"
                  topItems={topItems}
                  rows={rows}
                  data={data}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BonusHunt;