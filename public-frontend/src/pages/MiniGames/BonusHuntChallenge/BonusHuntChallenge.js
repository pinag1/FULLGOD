import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import DetailsTable from "../../../components/DetailsTable/DetailsTable";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import Podium from "../../../components/Podium/Podium";
import Table from "../../../components/Table/Table";
import {
  buildBonusHuntChallengeColumns,
  buildBonusHuntChallengeRows,
  buildBonusHuntChallengeTopItems,
  generateDayColumns,
  transformPlayerData,
} from "../../../components/utils/BonusHuntChallengeHelpers";

import mockData from "../../../data/mockDataChallenge.json";
import useFetchData from "../../../hooks/useFetchData";
import styles from '../../../styles/global.module.css'; // ✅ CSS Module import

const BonusHuntChallenge = () => {
  const [acarregar, setLoading] = useState(true);

  const apiUrl = "https://api.godmota.com/api/bonushuntchallenge";
  const { data, loading, error } = useFetchData(mockData, apiUrl);

  if (loading & acarregar)
    return (
      <div className={styles.loading}>
        <BeatLoader color="white" size={10} />
      </div>
    );

  if (!data) {
    return (
      <div id="Container">
        <div className={styles.kingOfTheHillContainer}>
          <div className={styles.header}>
            <div className={styles.headerCategory}>MiniGames</div>
            <div className={styles.headerPage}>Bonus Hunt Challenge</div>
          </div>
          <LoadingPage gameName={data?.gameName || "Game"} />
        </div>
      </div>
    );
  }

  const topItems = buildBonusHuntChallengeTopItems(data);
  const rows = buildBonusHuntChallengeRows(data);
  const dayColumns = generateDayColumns(data.days || 5);
  const columns = buildBonusHuntChallengeColumns(data, dayColumns);
  const transformedPlayers = transformPlayerData(data.players, data.days);

  return (
    <div id="Container">
      <div className={styles.bonusHuntContainer}>
        <div className={styles.header}>
          <div className={styles.headerCategory}>MiniGames</div>
          <div className={styles.headerPage}>Bonus Hunt Challenge</div>
        </div>
        <Podium players={data.players} />
        <div className={styles.statsChallenge}>
          <div className={styles.bonusHuntChallengeLayout}>
            <div className={styles.BHCBox}>
              <Table columns={columns} data={transformedPlayers} />
            </div>

            <div className={styles.BHCBox}>
              <div className={styles.statsContainer}>
                <DetailsTable
                  gameName="BONUS HUNT CHALLENGE"
                  topItems={topItems}
                  rows={rows}
                  data={data}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonusHuntChallenge;
