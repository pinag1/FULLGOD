// components/utils/tournamentHelpers.js
import GiftIcon from "../../icons/GiftIcon";
import InfoIcon from "../../icons/InfoIcon";
import ScaleIcon from "../../icons/ScaleIcon";
import formatPayment from "../SlotStatsCard/FormatPayment";
import { capitalizeFirstLetter } from "./Utils";
export const buildTournamentTopItems = (tournaments) => [
  {
    label: "Status",
    value: capitalizeFirstLetter(tournaments.state),
    icon: <InfoIcon />,
  },
  {
    label: "Bonus",
    value: `${tournaments.information.bonus}`,
    icon: <GiftIcon />,
  },
];

export const buildTournamentRows = (tournaments, total) => [
  {
    label: "Profit/Loss",
    value: total ? `${formatPayment(total.toFixed(2))}€` : "-",
    icon: <ScaleIcon />,
  },
];
