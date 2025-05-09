import BestMultiIcon from "../../icons/BestMultiIcon";
import CupIcon from "../../icons/CupIcon";
import GiftIcon from "../../icons/GiftIcon";
import InfoIcon from "../../icons/InfoIcon";
import MultiIcon from "../../icons/MultiIcon";
import SafeIcon from "../../icons/SafeIcon";
import ScaleIcon from "../../icons/ScaleIcon";
import StartIcon from "../../icons/StartIcon";
import formatPayment from "../SlotStatsCard/FormatPayment";
import { capitalizeFirstLetter } from "./Utils";
export const buildBonusBuyBattleTopItems = (data, winRatio) => [
  {
    label: "Status",
    value: capitalizeFirstLetter(data.state),
    icon: <InfoIcon />,
  },
  {
    label: "Bonus",
    value: data.gameNameTotalBonus,
    icon: <GiftIcon />,
  },
];

export const buildBonusBuyBattleRows = (
  data,
  start,
  endBalance1,
  endBalance2,
  averageMultiplier,
  bestWin,
  bestMulti,
  profit
) => [
  {
    label: "Start",
    value: start ? `${start}€` : "-",
    icon: <StartIcon />,
  },
  {
    label: "End balance",
    value: endBalance1 || endBalance2 ? `${formatPayment((endBalance1 + endBalance2).toFixed(2))}€` : "-",
    icon: <SafeIcon />,
  },
  {
    label: "Average multi",
    value: averageMultiplier ? `${formatPayment((averageMultiplier).toFixed(2))}X` : "-",
    icon: <MultiIcon />,
  },
  {
    label: "Best win",
    value: bestWin ? `${formatPayment((bestWin).toFixed(2))}€` : "-",
    icon: <CupIcon />,
  },
  {
    label: "Best multi",
    value: bestMulti ? `${Math.round(bestMulti)}X` : "-",
    icon: <BestMultiIcon />,
  },
  {
    label: "Profit/Loss",
    value: endBalance1 || endBalance2 ? `${formatPayment((endBalance1 + endBalance2).toFixed(2))}€` : "-",
    icon: <ScaleIcon />,
  },
];
