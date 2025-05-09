// src/hooks/useTournamentMatchLogic.js
import { useEffect, useState } from 'react';
import { useUI } from '../context/UIContext';
import {
  addSlotPayment,
  fetchSlotPayments,
  removeSlotPayment,
  updateSlotPayment,
} from '../services/slotPaymentService';
import {
  getTournamentById,
  updateMatch,
  updateMatchAndAdvance,
} from '../services/tournamentService';
import { PAYMENT_SOURCES } from '../utils/paymentSources';

/**
 * Hook para gerenciar lógica de bônus, pagamento, score e edição em um torneio
 */
export default function useTournamentMatchLogic(tournamentId) {
  const { notify } = useUI();
  const [matches, setMatches] = useState([]);
  const [payments, setPayments] = useState({});   // { matchId: { slot1: [], slot2: [] } }
  const [bonus, setBonus] = useState({});        // { matchId: { b1: '', b2: '' } }
  const [completed, setCompleted] = useState({}); // { matchId: boolean }
  const [loading, setLoading] = useState(true);

  // 1) Carrega torneio, partidas e pagamentos
  useEffect(() => {
    if (!tournamentId) return;
    (async () => {
      setLoading(true);
      try {
        const tourney = await getTournamentById(tournamentId);
        setMatches(tourney.matches);

        const allPayments = await fetchSlotPayments();
        const initPayments = {};
        const initBonus = {};
        const initCompleted = {};

        tourney.matches.forEach((m) => {
          initBonus[m.id] = {
            b1: m.slot1BonusValue?.toString() || '',
            b2: m.slot2BonusValue?.toString() || '',
          };
          initPayments[m.id] = {
            slot1: allPayments.filter(
              (p) =>
                p.source === PAYMENT_SOURCES.TOURNAMENT &&
                p.eventId === m.id &&
                p.slotId === m.slot1.id
            ),
            slot2: allPayments.filter(
              (p) =>
                p.source === PAYMENT_SOURCES.TOURNAMENT &&
                p.eventId === m.id &&
                p.slotId === m.slot2.id
            ),
          };
          initCompleted[m.id] = false;
        });

        setBonus(initBonus);
        setPayments(initPayments);
        setCompleted(initCompleted);
      } catch (err) {
        console.error(err);
        notify('danger', 'Erro ao carregar torneio e pagamentos');
      } finally {
        setLoading(false);
      }
    })();
  }, [tournamentId, notify]);

  // 2) Persiste bônus
  const handleBonusChange = async (matchId, key, value) => {
    if (completed[matchId]) return;
    setBonus((prev) => ({
      ...prev,
      [matchId]: { ...prev[matchId], [key]: value },
    }));
    try {
      const payload = {};
      if (key === 'b1') payload.slot1BonusValue = Number(value);
      if (key === 'b2') payload.slot2BonusValue = Number(value);
      await updateMatch(tournamentId, matchId, payload);
    } catch {
      notify('danger', 'Erro ao gravar bónus');
    }
  };

  // 3) Recalcula scores e avança vencedor
  const recalcAndPersist = async (matchId, updatedPayments) => {
    const b1 = parseFloat(bonus[matchId].b1) || 0;
    const b2 = parseFloat(bonus[matchId].b2) || 0;
    const sum1 = updatedPayments.slot1.reduce((s, p) => s + (p.payment || 0), 0);
    const sum2 = updatedPayments.slot2.reduce((s, p) => s + (p.payment || 0), 0);
    const r1 = b1 ? sum1 / b1 : 0;
    const r2 = b2 ? sum2 / b2 : 0;
    const total = r1 + r2;
    const player1Score = total
      ? parseFloat(((r1 / total) * 100).toFixed(6))
      : 0;
    const player2Score = parseFloat((100 - player1Score).toFixed(6));

    await updateMatchAndAdvance(
      tournamentId,
      matchId,
      { player1Score, player2Score }
    );
    const t = await getTournamentById(tournamentId);
    setMatches(t.matches);
  };

  // 4) Insere / atualiza / remove pagamentos
  const handlePaymentChange = async (matchId, slotKey, idx, { payment }) => {
    if (completed[matchId]) return;
    try {
      const current = payments[matchId][slotKey] || [];
      let updated = [...current];

      if (payment === null) {
        // remove
        const toDel = current[idx];
        if (toDel?.id) await removeSlotPayment(toDel.id);
        updated.splice(idx, 1);
      } else {
        const betValue =
          (parseFloat(bonus[matchId][slotKey === 'slot1' ? 'b1' : 'b2']) || 0) /
          100;
        if (current[idx]) {
          // update
          const rec = await updateSlotPayment(current[idx].id, {
            name: matches.find((m) => m.id === matchId)[slotKey].name,
            bet: betValue,
            payment,
          });
          updated[idx] = rec;
        } else {
          // create
          const base = matches.find((m) => m.id === matchId);
          const rec = await addSlotPayment({
            name: base[slotKey].name,
            eventId: matchId,
            slotId: base[slotKey].id,
            source: PAYMENT_SOURCES.TOURNAMENT,
            bet: betValue,
            payment,
          });
          updated[idx] = rec;
        }
      }

      const newPayments = {
        ...payments,
        [matchId]: { ...payments[matchId], [slotKey]: updated },
      };
      setPayments(newPayments);

      // atualização imediata de score
      await recalcAndPersist(matchId, newPayments[matchId]);
    } catch (err) {
      console.error(err);
      notify('danger', 'Erro ao atualizar pagamento ou score');
    }
  };

  // 5) Finalizar / marcar como concluído
  const finalizeMatch = async (matchId) => {
    try {
      await recalcAndPersist(matchId, payments[matchId]);
      setCompleted((c) => ({ ...c, [matchId]: true }));
    } catch {
      notify('danger', 'Erro ao finalizar partida');
    }
  };

  // 6) Voltar a editar
  const editMatch = (matchId) => {
    setCompleted((c) => ({ ...c, [matchId]: false }));
  };

  return {
    matches,
    payments,
    bonus,
    completed,
    loading,
    handleBonusChange,
    handlePaymentChange,
    finalizeMatch,
    editMatch,
  };
}
