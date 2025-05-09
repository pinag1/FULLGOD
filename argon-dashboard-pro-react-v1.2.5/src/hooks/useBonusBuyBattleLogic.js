// src/hooks/useBonusBuyBattleLogic.js
import { useEffect, useState } from "react";
import { useUI } from "../context/UIContext";
import {
  fetchBonusBuyBattleById,
  updateBonusBuyBattleScores,
} from "../services/BonusBuyBattleService";
import {
  addSlotPayment,
  fetchSlotPayments,
  removeSlotPayment,
  updateSlotPayment,
} from "../services/slotPaymentService";
import { PAYMENT_SOURCES } from "../utils/paymentSources";

export default function useBonusBuyBattleLogic(battleId) {
  const { notify } = useUI();

  const [battle, setBattle] = useState(null);
  const [payments1, setPayments1] = useState([]);
  const [payments2, setPayments2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bonus, setBonus] = useState({ b1: "", b2: "" });

  useEffect(() => {
    if (!battleId) return;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchBonusBuyBattleById(battleId);
        setBattle(data);
        setBonus({
          b1: (data.slot1BonusValue ?? "").toString(),
          b2: (data.slot2BonusValue ?? "").toString(),
        });

        const all = await fetchSlotPayments();
        const relevant = all.filter(
          (p) =>
            p.source === PAYMENT_SOURCES.BONUS_BUY_BATTLE &&
            p.eventId === battleId
        );
        setPayments1(relevant.filter((p) => p.slotId === data.slot1.id));
        setPayments2(relevant.filter((p) => p.slotId === data.slot2.id));
      } catch (err) {
        console.error(err);
        notify("danger", "Erro ao carregar dados da batalha");
      } finally {
        setLoading(false);
      }
    })();
  }, [battleId, notify]);

  const recalcAndPersist = async (arr1, arr2) => {
    const b1 = parseFloat(bonus.b1) || 0;
    const b2 = parseFloat(bonus.b2) || 0;
    const sum1 = arr1.reduce((s, p) => s + (p.payment || 0), 0);
    const sum2 = arr2.reduce((s, p) => s + (p.payment || 0), 0);
    const r1 = b1 ? sum1 / b1 : 0;
    const r2 = b2 ? sum2 / b2 : 0;
    const total = r1 + r2;
    const player1Score = total ? parseFloat(((r1 / total) * 100).toFixed(6)) : 0;
    const player2Score = parseFloat((100 - player1Score).toFixed(6));
    const winnerId =
      player1Score > player2Score
        ? battle.player1Id
        : player2Score > player1Score
        ? battle.player2Id
        : null;

    await updateBonusBuyBattleScores(battleId, {
      player1Score,
      player2Score,
      winnerId,
    });
  };

  const handlePaymentChange = async (whichSlot, idx, { payment, bet }) => {
    try {
      const is1 = whichSlot === "slot1";
      const current = is1 ? payments1 : payments2;
      const arr = [...current];
      const item = arr[idx];

      // força usar sempre displayName como "slotName"
      const slotObj = is1 ? battle.slot1 : battle.slot2;
      const slotName = slotObj.displayName;

      if (payment == null) {
        // remover
        if (item?.id) {
          await removeSlotPayment(item.id);
        }
        arr.splice(idx, 1);
      } else if (item?.id) {
        // atualizar
        const updated = await updateSlotPayment(item.id, {
          name: slotName,
          bet,
          payment,
        });
        arr[idx] = updated;
      } else {
        // criar
        const created = await addSlotPayment({
          name: slotName,
          eventId: battleId,
          slotId: slotObj.id,
          source: PAYMENT_SOURCES.BONUS_BUY_BATTLE,
          bet,
          payment,
        });
        arr[idx] = created;
      }

      is1 ? setPayments1(arr) : setPayments2(arr);

      // recalcula score no banco
      await recalcAndPersist(
        is1 ? arr : payments1,
        is1 ? payments2 : arr
      );
    } catch (err) {
      console.error(err);
      notify("danger", "Erro ao atualizar pagamento ou score");
    }
  };

  return {
    battle,
    payments1,
    payments2,
    loading,
    bonus,
    setBonus,
    handlePaymentChange,
  };
}
