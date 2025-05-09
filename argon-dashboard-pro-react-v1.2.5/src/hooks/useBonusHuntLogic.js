import { useAuth } from "context/AuthContext";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";
import { useUI } from "../context/UIContext"; // ✅ UI hook global
import {
  fetchBonusHunts,
  recalculateBonusHuntSummary,
  updateBonusHuntStart,
  updateBonusHuntStatus,
} from "../services/bonusHuntService";
import {
  addSlotPayment,
  removeSlotPaymentByCriteria,
  updateSlotPayment,
} from "../services/slotPaymentService";
import { fetchSlots } from "../services/slotService";

const useBonusHuntLogic = (bonusHuntId, currentBonusHunt) => {
  const { notify } = useUI(); // ✅ Notificação global
  const { user } = useAuth();

  const [entries, setEntries] = useState([]);
  const [summary, setSummary] = useState(null);
  const [slots, setSlots] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(currentBonusHunt?.status || "");

  useEffect(() => {
    if (currentBonusHunt?.status) {
      setStatus(currentBonusHunt.status);
    }
  }, [currentBonusHunt]);

  // 🔍 Função de busca com debounce
  const fetchFilteredSlots = useMemo(
    () =>
      debounce(async (term) => {
        if (term.length < 2) return setSlots([]);
        setLoading(true);
        try {
          const results = await fetchSlots(term);
          setSlots(results);
        } catch (error) {
          console.error("Erro ao buscar slots:", error);
        } finally {
          setLoading(false);
        }
      }, 500),
    []
  );

  // 📍 Muda o estado do Bonus Hunt
  const handleStatusChange = async (newStatus) => {
    const hasValidBet = entries.some((entry) => entry.bet > 0);

    if (newStatus === "HUNTING") {
      try {
        const existingHunts = await fetchBonusHunts();
        const alreadyHunting = existingHunts.some(
          (hunt) => hunt.status === "HUNTING" && hunt.madeById === user?.id
        );

        if (alreadyHunting) {
          notify("danger", "Já tens um Bonus Hunt em andamento!");
          return;
        }

        if (!hasValidBet) {
          notify("danger", "Não é possível mudar para 'HUNTING' sem aposta válida!");
          return;
        }
      } catch (error) {
        console.error("Erro ao verificar Bonus Hunt em andamento:", error);
        notify("danger", "Erro ao verificar Bonus Hunt em andamento!");
        return;
      }
    }

    if (status === "HUNTING" && newStatus !== "HUNTING") {
      if (!hasValidBet) {
        notify("danger", "Tens de ter pelo menos uma slot com aposta para sair de 'HUNTING'!");
        return;
      }
    }

    try {
      setStatus(newStatus);
      await updateBonusHuntStatus(summary.bonusHuntId, newStatus);
      notify("success", `Status alterado para ${newStatus}!`);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      notify("danger", "Erro ao atualizar status!");
      setStatus(status); // Reverter
    }
  };

  // ✏️ Altera o valor inicial
  const handleStartChange = async (newStartValue) => {
    try {
      setSummary((prev) => ({ ...prev, start: newStartValue }));
      await updateBonusHuntStart(summary.bonusHuntId, { start: newStartValue });
    } catch (error) {
      console.error("Erro ao atualizar o valor 'start':", error);
    }
  };

  // 🔍 Busca enquanto digita
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchFilteredSlots(value);
  };

  // ➕ Adiciona slot
  const handleAddSlotHelper = async (slot, currentBonusHunt) => {
    try {
      const newPayment = await addSlotPayment({
        name: slot.name,
        eventId: currentBonusHunt.id,
        slotId: slot.id,
        source: "BONUS_HUNT",
        bet: 0,
        payment: 0,
      });
      console.log("slot    ",slot)
      const newEntry = {
        id: newPayment.id,
        slotId: slot.id,
        slotName: slot.name,
        imageURL: slot.imageURL,
        bet: "",
        payment: "",
        multiplier: "",
        provider: slot.provider,
      };

      setEntries((prev) => [...prev, newEntry]);

      const newSummary = await recalculateBonusHuntSummary(currentBonusHunt.id);
      setSummary(newSummary);

      notify("success", "Slot adicionado com sucesso!");
    } catch (err) {
      console.error("Erro ao adicionar slot:", err);
      notify("danger", "Erro ao adicionar slot!");
    }
  };

  const handleAddSlot = (slot, currentBonusHunt) => {
    handleAddSlotHelper(slot, currentBonusHunt);
    setSearchTerm("");
    setSlots([]);
  };

  // ❌ Remove slot
  const handleRemoveSlot = async (index, slotId, bonusHuntId, source) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);

    try {
      await removeSlotPaymentByCriteria(slotId, bonusHuntId, source);
      const newSummary = await recalculateBonusHuntSummary(bonusHuntId);
      setSummary(newSummary);
      notify("success", "Slot removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover slot:", error);
      notify("danger", "Erro ao remover slot!");
    }
  };

  // ✏️ Atualiza valores nas entradas
  const handleInputChange = async (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;

    if (updated[index].bet && updated[index].win) {
      const multiplier = parseFloat(updated[index].win) / parseFloat(updated[index].bet);
      updated[index].multiplier = isNaN(multiplier) ? "" : multiplier.toFixed(2);
    }

    setEntries(updated);

    try {
      await updateSlotPayment(updated[index].id, {
        bet: updated[index].bet,
        payment: updated[index].win,
      });

      const newSummary = await recalculateBonusHuntSummary(bonusHuntId);
      setSummary(newSummary);
    } catch (error) {
      console.error("Erro ao atualizar pagamento:", error);
    }
  };

  return {
    entries,
    summary,
    slots,
    status,
    searchTerm,
    loading,
    setEntries,
    setSummary,
    setSearchTerm,
    setStatus,
    handleSearchChange,
    handleAddSlot,
    handleStatusChange,
    handleStartChange,
    handleRemoveSlot,
    handleInputChange,
  };
};

export default useBonusHuntLogic;
