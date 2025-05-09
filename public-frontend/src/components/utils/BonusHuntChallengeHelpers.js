import BcGameIcon from "../../icons/BcGameIcon";
import CalendarIcon from "../../icons/CalendarIcon";
import CupIcon from "../../icons/CupIcon";
import GizboIcon from "../../icons/GizboIcon";
import InfoIcon from "../../icons/InfoIcon";
import MultiIcon from "../../icons/MultiIcon";
import RioAceIcon from "../../icons/RioAceIcon";
import ScaleIcon from "../../icons/ScaleIcon";
import StartIcon from "../../icons/StartIcon";
import styles from "../../styles/global.module.css"; // Import CSS module
import { capitalizeFirstLetter } from "./Utils";

export const generateDayColumns = (daysCount = 5) => {
  return Array.from({ length: daysCount }, (_, index) => ({
    key: `day${index + 1}`,
    label: `DAY ${index + 1}`,
    className: styles.tableCellDay, // Applying the CSS module class
    render: (value) => <span>{value ? `${value}€` : "-"}</span>,
  }));
};

export const transformPlayerData = (players = [], daysCount = 5) => {
  return players.map((player) => ({
    rank: player.rank,
    name: player.name,
    casino: player.casino,
    ...Array.from({ length: daysCount }, (_, index) => ({
      [`day${index + 1}`]: player[`day${index + 1}`],
    })).reduce((acc, day) => ({ ...acc, ...day }), {}),
    profitLoss: player.profit === "-" ? "-" : player.profit,
  }));
};

export const buildBonusHuntChallengeTopItems = (data) => {
  return [
    {
      label: "Status",
      value: capitalizeFirstLetter(data.status),
      icon: <InfoIcon />,
    },
    {
      label: "Day",
      value: `${data.day}`,
      icon: <CalendarIcon />,
    },
  ];
};

export const buildBonusHuntChallengeRows = (data) => {
  return [
    {
      label: "Start",
      value: data.start ? `${data.start}€` : "-",
      icon: <StartIcon />,
    },
    {
      label: "Best Day",
      value: data.bestDay ? `${data.bestDay}€` : "-",
      icon: <CupIcon />,
    },
    {
      label: "Daily average",
      value: data.dailyAverage ? `${data.dailyAverage}X` : "-",
      icon: <MultiIcon />,
    },
    {
      label: "Profit/Loss",
      value: data.profit ? `${data.profit}€` : "-",
      icon: <ScaleIcon />,
    },
  ];
};

export const casinoIconMap = {
  Gizbo: <GizboIcon />,
  BCGame: <BcGameIcon />,
  RioAce: <RioAceIcon />,
};

export const buildBonusHuntChallengeColumns = (data, dayColumns) => {
  return [
    { key: "rank", label: "#", className: styles.tableCellId }, // Using the CSS module class
    { key: "name", label: "PLAYER" },
    {
      key: "casino",
      label: "CASINO",
      className: styles.tableCellCasino, // Applying the CSS module class
      render: (casinoName) => (
        <div className={styles.casinoCell}> {/* Using the CSS module class */}
          {casinoIconMap[casinoName]} {/* Render the icon */}
          {casinoName} {/* Render the casino name */}
        </div>
      ),
    },
    ...dayColumns,
    {
      key: "profitLoss",
      label: "PROFIT/LOSS",
      render: (value) => (
        <div
          className={`${styles.profitLoss} ${
            value !== null
              ? value >= 0
                ? styles.profit
                : styles.loss
              : ""
          }`} // Applying classes from the CSS module dynamically
        >
          {value === null ? "–" : `${value}€`}
        </div>
      ),
    },
  ];
};
