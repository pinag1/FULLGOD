import { useEffect, useState } from "react";
import BonusHuntForm from "../../../components/BonusHuntForm";
import { useUI } from "../../../context/UIContext"; // 👈 novo hook global
import {
  deleteBonusHunt,
  fetchBonusHunts,
} from "../../../services/bonusHuntService";
import BonusHuntTable from "../tables/BonusHuntTable";

const BonusHuntViewPage = () => {
  const [bonusHunts, setBonusHunts] = useState([]);
  const [selectedBonusHunt, setSelectedBonusHunt] = useState(null);
  const { sweetAlert, notify } = useUI(); // 👈 usar funções globais

  useEffect(() => {
    loadBonusHunts();
  }, []);

  const loadBonusHunts = async () => {
    try {
      const hunts = await fetchBonusHunts();
      setBonusHunts(hunts);
    } catch (err) {
      console.error("Erro ao carregar Bonus Hunts:", err);
      notify("danger", "Erro ao carregar os Bonus Hunts.");
    }
  };

  const handleEdit = (hunt) => {
    setSelectedBonusHunt(hunt);
  };

  const handleCancelEdit = () => {
    setSelectedBonusHunt(null);
    loadBonusHunts();
  };

  const handleDelete = (hunt) => {
    sweetAlert({
      type: "warning",
      title: "Tens a certeza?",
      message: `Queres mesmo eliminar o Bonus Hunt "${hunt.name}"?`,
      confirmText: "Eliminar",
      cancelText: "Cancelar",
      onConfirm: async () => {
        try {
          await deleteBonusHunt(hunt.id);
          notify("success", "Bonus Hunt eliminado com sucesso!");
          loadBonusHunts();
        } catch (err) {
          console.error("Erro ao eliminar:", err);
          notify("danger", "Erro ao eliminar o Bonus Hunt.");
        }
      },
    });
  };

  return (
    <div className="content">
      {selectedBonusHunt ? (
        <BonusHuntForm
          bonusHuntHistory={[selectedBonusHunt]}
          onCancel={handleCancelEdit}
        />
      ) : (
        <BonusHuntTable
          bonusHunts={bonusHunts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default BonusHuntViewPage;
