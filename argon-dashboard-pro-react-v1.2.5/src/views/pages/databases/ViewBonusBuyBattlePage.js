import { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import BonusBuyBattleForm from "../../../components/BonusBuyBattleForm";
import { useUI } from "../../../context/UIContext";
import { deleteBonusBuyBattle, fetchBonusBuyBattles } from "../../../services/BonusBuyBattleService";
import BonusBuyBattleTable from "../tables/BonusBuyBattleTable"; // <-- TU TINHAS ESQUECIDO ISTO

const ViewBonusBuyBattle = () => {
  const [battles, setBattles] = useState([]);
  const [selectedBattle, setSelectedBattle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { sweetAlert, notify } = useUI();

  const loadBattles = async () => {
    setLoading(true);
    try {
      const data = await fetchBonusBuyBattles();
      setBattles(data);
    } catch (error) {
      console.error("Erro ao carregar batalhas:", error);
      notify("danger", "Erro ao carregar batalhas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBattles();
  }, []);

  const handleEdit = (battle) => {
    setSelectedBattle(battle);
  };

  const handleCancelEdit = () => {
    setSelectedBattle(null);
    loadBattles();
  };

  const handleDelete = (battle) => {
    sweetAlert({
      type: "warning",
      title: "Tens a certeza?",
      message: `Queres mesmo eliminar a batalha "${battle.name}"?`,
      confirmText: "Eliminar",
      cancelText: "Cancelar",
      onConfirm: async () => {
        try {
          await deleteBonusBuyBattle(battle.id);
          notify("success", "Batalha eliminada com sucesso!");
          loadBattles();
        } catch (err) {
          console.error("Erro ao eliminar batalha:", err);
          notify("danger", "Erro ao eliminar batalha.");
        }
      },
    });
  };

  return (
    <div className="content">
      {loading ? (
        <div className="text-center py-5">
          <Spinner color="primary" />
        </div>
      ) : selectedBattle ? (
        <BonusBuyBattleForm battleId={selectedBattle.id} onCancel={handleCancelEdit} />
      ) : (
        <BonusBuyBattleTable battles={battles} onView={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default ViewBonusBuyBattle;
