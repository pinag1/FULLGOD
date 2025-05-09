// pages/KingOfTheHill/KingOfTheHill.js
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import DetailsTable from "../../../components/DetailsTable/DetailsTable";
import KingOfTheHillGamesTable from "../../../components/KingOfTheHillGamesTable/KingOfTheHillGamesTable";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import { buildKOTHRows } from "../../../components/utils/kingOfTheHillHelpers";
import mockData from "../../../data/mockDataKing.json";
import useFetchData from "../../../hooks/useFetchData";
import styles from '../../../styles/global.module.css'; // ✅ Module import

const KingOfTheHill = () => {
  const [acarregar, setLoading] = useState(true);

  const { data, loading, error } = useFetchData(
    mockData,
    "https://overlay.godmota.com/api/v0/overlay/king-of-the-hill"
  );

  if (loading & acarregar)
    return (
      <div className={styles.loading}>
        <BeatLoader color="white" size={10} />
      </div>
    );

  if (!data?.games?.length) {
    return (
      <div id="Container">
        <div className={styles.kingOfTheHillContainer}>
          <div className={styles.header}>
            <div className={styles.headerCategory}>MiniGames</div>
            <div className={styles.headerPage}>King of the Hill</div>
          </div>
          <LoadingPage gameName={data?.gameName || "Game"} />
        </div>
      </div>
    );
  }

  const gamesArray = Array.isArray(data?.games) ? data.games : [];
  const rows = buildKOTHRows(data);

  return (
    <div id="Container">
      <div className={styles.kingOfTheHillContainer}>
        <div className={styles.header}>
          <div className={styles.headerCategory}>MiniGames</div>
          <div className={styles.headerPage}>King of the Hill</div>
        </div>

        <div className={styles.kingOfTheHillLayout}>
          <div className={styles.BHCBox}>
            <KingOfTheHillGamesTable data={{ ...data, games: gamesArray }} />
          </div>

          <div className={styles.BHCBox}>
            <DetailsTable
              gameName="KING OF THE HILL"
              rows={rows}
              isKing={true}
              data={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KingOfTheHill;
