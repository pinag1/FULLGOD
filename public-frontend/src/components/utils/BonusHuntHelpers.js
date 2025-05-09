import useScoreAnimation from "../../hooks/useScoreAnimation";
import BagIcon from "../../icons/BagIcon";
import BarsIcon from "../../icons/BarsIcon";
import GiftIcon from "../../icons/GiftIcon";
import InfoIcon from "../../icons/InfoIcon";
import MultiIcon from "../../icons/MultiIcon";
import ScaleIcon from "../../icons/ScaleIcon";
import styles from "../../styles/global.module.css"; // Import the CSS module
import formatPayment from "../SlotStatsCard/FormatPayment";
import MissingImage from "./../../images/missing-slot-image.jpg";
import { capitalizeFirstLetter } from "./Utils";

const AnimatedValue = ({ value, reverse }) => {
  const numericValue = parseFloat(value);
  const validValue = !isNaN(numericValue) ? numericValue : 0;
  const animatedClass = useScoreAnimation(reverse ? -validValue : validValue);
  return (
    <span className={`${animatedClass} ${styles.animatedValue}`}>
      {validValue !== 0 ? `${validValue}x` : "-"}
    </span>
  );
};

export const buildBonusHuntTopItems = (data, winRatio) => [
  {
    label: "Status",
    value: capitalizeFirstLetter(data.nowPlaying?.state),
    icon: <InfoIcon />,
  },
  {
    label: "Best Slot",
    value: (
      <>
        <div className={`${styles.slotName} ${styles.slotNameBestSlot}`}>
          {data.bestSlot?.slot?.name?.split("|")[0] ?? "-"}
        </div>
        <div>
          {typeof data.bestSlot?.payment === "number"
            ? `${formatPayment(data.bestSlot.payment.toFixed(2))}€`
            : ""}
        </div>
      </>
    ),
    icon: (
      <div className={styles.imageWrapper}>
        <img
          src={data.bestSlot?.slot?.image || MissingImage}
          alt="Slot"
          className={styles.slotImageTable}
        />
      </div>
    ),
  },
];

export const buildBonusHuntRows = (data, winRatio) => [
  {
    label: "Start",
    value: data.information?.start ? `${data.information.start}€` : "-",
    icon: <ScaleIcon />,
  },
  {
    label: "Bonus",
    value: winRatio,
    icon: <GiftIcon />,
  },
  {
    label: "Total Pay",
    value: data.totals?.totalPay ? `${data.totals.totalPay}€` : "-",
    icon: <BagIcon />,
  },
  {
    label: "Initial Break-Even",
    value: (
      <AnimatedValue
        value={data.information?.initialBreakEven || "0"}
        reverse={true}
      />
    ),
    icon: <ScaleIcon />,
  },
  {
    label: "Current Break-Even",
    value: (
      <AnimatedValue
        value={data.information?.currentBreakEvent || "0"}
        reverse={true}
      />
    ),
    icon: <BarsIcon />,
  },
  {
    label: "Average Multi",
    value: <AnimatedValue value={data.information?.averageMulti} />,
    icon: <MultiIcon />,
  },
];
