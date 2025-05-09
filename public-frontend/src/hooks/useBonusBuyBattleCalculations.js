import { useMemo } from "react";

const useBonusBuyBattleCalculations = (scores1, scores2, data) => {
  const calculations = useMemo(() => {
    const safeData = data || {
      slot1: { buy: 0, information: { bestWin: 0 } },
      slot2: { buy: 0, information: { bestWin: 0 } },
      games: [],
    };

    const validPaymentsCount1 = scores1.filter(
      (score) => score.payment !== null
    ).length;
    const validPaymentsCount2 = scores2.filter(
      (score) => score.payment !== null
    ).length;

    const totalScoresCount1 = scores1.length;
    const totalScoresCount2 = scores2.length;

    const start1 = validPaymentsCount1 * safeData.slot1.buy;
    const start2 = validPaymentsCount2 * safeData.slot2.buy;
    const start = start1 + start2;

    const totalMultiplier1 = scores1.reduce((total, score) => {
      if (score.payment !== null) {
        const multiplier = (score.payment / safeData.slot1?.buy) * 100;
        return total + multiplier;
      }
      return total;
    }, 0);

    const totalMultiplier2 = scores2.reduce((total, score) => {
      if (score.payment !== null) {
        const multiplier = (score.payment / safeData.slot2?.buy) * 100;
        return total + multiplier;
      }
      return total;
    }, 0);

    const endBalance1 = scores1.reduce((total, score) => {
      return score.payment !== null ? total + score.payment : total;
    }, 0);

    const endBalance2 = scores2.reduce((total, score) => {
      return score.payment !== null ? total + score.payment : total;
    }, 0);

    const endBalance = endBalance1 + endBalance2;
    const totalMultiplier = totalMultiplier1 + totalMultiplier2;
    const totalScores = scores1.length + scores2.length;

    const averageMultiplier =
      totalScores > 0 ? totalMultiplier / totalScores : 0;

    const bestWin1 = safeData.slot1.information.bestWin;
    const bestWin2 = safeData.slot2.information.bestWin;
    const bestWin = Math.max(bestWin1, bestWin2);
    const bestMulti = Math.max(
      bestWin1 / safeData.slot1.buy,
      bestWin2 / safeData.slot2.buy
    );
    const winCount =
      safeData.games?.filter((game) => game.win != null).length || 0;
    const profitSlot1 = endBalance1 - start1;
    const profitSlot2 = endBalance2 - start2;
    const profit = endBalance - start;

    const winRatio = safeData.games
      ? `${winCount} / ${safeData.games.length}`
      : "-";

    return {
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
    };
  }, [scores1, scores2, data]);

  return calculations;
};

export default useBonusBuyBattleCalculations;
