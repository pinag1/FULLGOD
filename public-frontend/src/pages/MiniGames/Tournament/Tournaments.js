// pages/Tournament/Tournament.js
import { useEffect, useRef, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import Bracket from "../../../components/Bracket/Bracket";
import DetailsTable from "../../../components/DetailsTable/DetailsTable";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import SlotStatsCard from "../../../components/SlotStatsCard/SlotStatsCard";
import {
  buildTournamentRows,
  buildTournamentTopItems,
} from "../../../components/utils/TournamentHelpers.js";

import mockData from "../../../data/mockDataTournamente.json";
import useFetchData from "../../../hooks/useFetchData";
import styles from "../../../styles/global.module.css"; // ✅ Import module styles

const apiUrl = "https://overlay.godmota.com/api/v0/overlay/tournament";

const Tournaments = () => {
  const [acarregar, setLoading] = useState(true);
  const { data, loading, error } = useFetchData(mockData, apiUrl);

  const [selectedSlots, setSelectedSlots] = useState(null);
  const prevSelectedSlots = useRef(selectedSlots);

  const calculateTotal = (data) => {
    let total = 0;
    Object.values(data.rounds || {}).forEach((round) => {
      const slots = [round?.slot1, round?.slot2];
      slots.forEach((slot) => {
        const buy = slot?.buy || 0;
        slot?.payments?.forEach(({ payment }) => {
          if (payment != null) { // skips null and undefined
            total += payment - buy;
          }
        });
      });
    });
    return total;
  };

  useEffect(() => {
    if (data?.rounds) {
      Object.values(data.rounds).forEach((round) => {
        const { slot1, slot2 } = round || {};
        if (
          slot1?.letter === prevSelectedSlots.current?.[0]?.letter &&
          slot2?.letter === prevSelectedSlots.current?.[1]?.letter
        ) {
          setSelectedSlots([
            { ...prevSelectedSlots.current[0], ...slot1 },
            { ...prevSelectedSlots.current[1], ...slot2 },
          ]);
        }
      });
    }
  }, [data]);

  useEffect(() => {
    if (selectedSlots !== prevSelectedSlots.current) {
      prevSelectedSlots.current = selectedSlots;
    }
  }, [selectedSlots]);

  if (loading & acarregar)
    return (
      <div className={styles.loading}>
        <BeatLoader color="white" size={10} />
      </div>
    );

  if (!data?.rounds?.round1?.slot1?.slot) {
    return (
      <div id="Container">
        <div className={styles.kingOfTheHillContainer}>
          <div className={styles.header}>
            <div className={styles.headerCategory}>MiniGames</div>
            <div className={styles.headerPage}>Tournament</div>
          </div>
          <LoadingPage gameName={data?.gameName || "Game"} />
        </div>
      </div>
    );
  }

  const topItems = buildTournamentTopItems(data);
  const rows = buildTournamentRows(data, calculateTotal(data));

  return (
    <div id="Container" style={{ overflow: "hidden" }}>
      <div className={styles.kingOfTheHillContainer}>
        <div className={styles.header}>
          <div className={styles.headerCategory}>MiniGames</div>
          <div className={styles.headerPage}>Tournament</div>
        </div>

        <div className={styles.tournamentLayout}>
          <Bracket
            data={data}
            setSelectedSlots={setSelectedSlots}
            selectedSlots={selectedSlots}
          />
        </div>

        <div className={styles.detailsTournament}>
          <div className={styles.detailsSlotInfoCard}>
            <DetailsTable
              gameName=""
              topItems={topItems}
              rows={rows}
              data={data}
            />
          </div>
          <div className={styles.slotInfoCard}>
            <SlotStatsCard
              slot1={selectedSlots?.[0]}
              slot2={selectedSlots?.[1]}
              isTournament={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tournaments;
