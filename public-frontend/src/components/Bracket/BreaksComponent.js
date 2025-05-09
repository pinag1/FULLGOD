import ArrowHSvg from "../../icons/ArrowHSvg";
import ArrowSvg from "../../icons/ArrowSvg";
import BigArrowSvg from "../../icons/BigArrowSvg";
import styles from "../../styles/global.module.css"; // ✅ Import CSS module
import { getWinningSlot } from "../utils/Utils.js";

const COMPONENTS = {
  up: ArrowSvg,
  down: ArrowSvg,
  semi: BigArrowSvg,
  final: ArrowHSvg,
};

const BreaksComponent = ({ slot1, slot2, variant = "up" }) => {
  const winner = getWinningSlot(slot1, slot2);
  const winnerIndex = winner === slot1 ? 1 : winner === slot2 ? 2 : 0;
  const ArrowComponent = COMPONENTS[variant];
  return (
    <div className={styles[`breaks${variant}`]}>
      <ArrowComponent winner={winnerIndex} />
    </div>
  );
};

export default BreaksComponent;
