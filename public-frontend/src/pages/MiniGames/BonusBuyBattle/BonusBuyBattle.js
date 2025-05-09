import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import DetailsTable from "../../../components/DetailsTable/DetailsTable";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import ScoreBar from "../../../components/ScoreBar/ScoreBar";
import ScoreDetails from "../../../components/ScoreDetails/ScoreDetails";
import SlotStatsCard from "../../../components/SlotStatsCard/SlotStatsCard";
import {
  buildBonusBuyBattleRows,
  buildBonusBuyBattleTopItems,
} from "../../../components/utils/BonusBuyBattleHelpers";
import mockData from "../../../data/mockDataBBB.json";
import useBonusBuyBattleCalculations from "../../../hooks/useBonusBuyBattleCalculations";
import useFetchData from "../../../hooks/useFetchData";
import styles from "../../../styles/global.module.css"; // Import the CSS module

const BonusBuyBattle = () => {
  const [acarregar, setLoading] = useState(true);

  const { data, loading, error } = useFetchData(
    mockData,
    "https://overlay.godmota.com/api/v0/overlay/bonus-buy-battle"
  );
  const {
    validPaymentsCount1,
    validPaymentsCount2,
    totalScoresCount1,
    totalScoresCount2,
    start,
    endBalance1,
    endBalance2,
    totalMultiplier1,
    totalMultiplier2,
    totalMultiplier,
    totalScores,
    averageMultiplier,
    bestWin1,
    bestWin2,
    bestWin,
    bestMulti,
    profit,
    profitSlot1,
    profitSlot2,
    winCount,
    winRatio,
  } = useBonusBuyBattleCalculations(
    data?.slot1?.scores || [],
    data?.slot2?.scores || [],
    data
  );

  if (loading & acarregar)
    return (
      <div className={styles.loading}>
        <BeatLoader color="white" size={10} />
      </div>
    );

  if (!data || !data.slot1?.slot || !data.slot2?.slot) {
    return (
      <div id="Container">
        <div className={styles.kingOfTheHillContainer}>
          <div className={styles.header}>
            <div className={styles.headerCategory}>Mini Games</div>
            <div className={styles.headerPage}>Bonus Buy Battle</div>
          </div>
          <LoadingPage gameName={data?.gameName || "Game"} />
        </div>
      </div>
    );
  }

  const topItems = buildBonusBuyBattleTopItems(data, winRatio);
  const rows = buildBonusBuyBattleRows(
    data,
    start,
    endBalance1,
    endBalance2,
    averageMultiplier,
    bestWin,
    bestMulti,
    profit
  );

  return (
    <div id="Container">
      <div className={styles.bonusHuntContainer}>
        <div className={styles.header}>
          <div className={styles.headerCategory}>MiniGames</div>
          <div className={styles.headerPage}>Bonus Buy Battle</div>
        </div>
        <div className={styles.bonusBuyBattleLayout}>
          <div className={styles.scorebarContainer}>
            <div className={styles.scorebarHeader}>
              <div className={styles.scorebarHeaderText}>
                {data.slot1?.slot?.name?.split("|")[0]}
                {data.slot1?.slot && data.slot2?.slot && " vs "}
                {data.slot2?.slot?.name?.split("|")[0]}
              </div>
            </div>
            <ScoreBar slot1={data.slot1} slot2={data.slot2} />
            <ScoreDetails
              slot1={data.slot1}
              slot2={data.slot2}
              result1={`${validPaymentsCount1}/${totalScoresCount1}`}
              result2={`${validPaymentsCount2}/${totalScoresCount2}`}
              endBalance1={profitSlot1}
              endBalance2={profitSlot2}
            />
            <SlotStatsCard slot1={data.slot1} slot2={data.slot2} />
          </div>

          <div className={styles.statsContainer}>
            <DetailsTable
              gameName="BONUS BUY BATTLE"
              topItems={topItems}
              rows={rows}
              data={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonusBuyBattle;
