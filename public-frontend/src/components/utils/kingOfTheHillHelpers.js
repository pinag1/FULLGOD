// components/utils/kingOfTheHillHelpers.js
import CalendarIcon from "../../icons/CalendarIcon";
import GiftIcon from "../../icons/GiftIcon";
import InfoIcon from "../../icons/InfoIcon";
import NextIcon from "../../icons/NextIcon";
import { capitalizeFirstLetter } from "./Utils";

export const buildKOTHTopItems = (data) => [
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

export const buildKOTHRows = (data) => {
  const winCount = data.games?.filter((game) => game.win != null).length || 0;
  const winRatio = data.games ? `${winCount}/${data.games.length}` : "-";
  return [
    {
      label: "Playing next",
      value: data.nowAndNext.next.player || "-",
      icon: <NextIcon />,
    },
    {
      label: "Bonus",
      value: winRatio,
      icon: <GiftIcon />,
    },
  ];
};
