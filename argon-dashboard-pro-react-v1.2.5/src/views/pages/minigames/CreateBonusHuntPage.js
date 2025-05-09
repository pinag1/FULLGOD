import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";
import BonusHuntForm from "../../../components/BonusHuntForm";
import { useAuth } from "../../../context/AuthContext";
import { useUI } from "../../../context/UIContext"; // ⬅️ Novo hook global
import {
  addBonusHunt,
  fetchBonusHunts,
  recalculateBonusHuntSummary,
} from "../../../services/bonusHuntService";

const CreateBonusHuntPage = () => {
  const { user } = useAuth();
  const { notify, sweetAlert } = useUI(); // ⬅️ Aqui usas notify e sweetAlert

  const [bonusHuntHistory, setBonusHuntHistory] = useState([]);
  const [bonusHuntId, setBonusHuntId] = useState(null);
  const [bonusHuntState, setBonusHuntState] = useState("create");
  const [loading, setLoading] = useState(false);

  const loadBonusHunts = async () => {
    setLoading(true);
    try {
      const allHunts = await fetchBonusHunts();
      setBonusHuntHistory(allHunts);
    } catch (err) {
      console.error("Erro ao buscar Bonus Hunts:", err);
      notify("danger", "Erro ao carregar Bonus Hunts.");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBonusHunts();
  }, []);

  const handleCreateBonusHunt = async (start = null) => {
    // Verifica se já existe Bonus Hunt ativo
    const existingHunt = bonusHuntHistory.find(
      (hunt) => hunt.status === "HUNTING" && hunt.madeById === user?.id
    );

    if (existingHunt) {
      sweetAlert({
        type: "warning",
        title: "Já tens um Bonus Hunt em andamento!",
        message: (
          <p>Queres continuar o Bonus Hunt que já está em progresso?</p>
        ),
        confirmText: "Sim, continuar",
        cancelText: "Não, voltar ao dashboard",
        onConfirm: () => {
          setBonusHuntState("HUNTING");
          setBonusHuntId(existingHunt.id);
        },
        onCancel: () => {
          // Aqui faz redirect para o dashboard ou homepage
          window.location.href = "/admin/dashboard"; // ou usa navigate se tiveres react-router
        },
      });
      return;
    }

    if (!start || isNaN(start) || start <= 0) {
      notify("danger", "Por favor, insira um valor válido para o start.");
      return;
    }

    const madeBy = user?.name || "Desconhecido";

    try {
      const created = await addBonusHunt(`Bonus Hunt - ${madeBy}`);
      await recalculateBonusHuntSummary(created.id, start, madeBy);

      setBonusHuntState("HUNTING");
      setBonusHuntId(created.id);

      notify("success", "Bonus Hunt criado com sucesso!");
    } catch (err) {
      console.error("Erro ao criar Bonus Hunt:", err);
      notify("danger", "Erro ao criar Bonus Hunt. Tente novamente.");
    }
  };

  const handleStartValueClick = () => {
    let tempStart = "";

    sweetAlert({
      type: "info",
      title: "Insere o valor inicial",
      message: (
        <input
          type="number"
          placeholder="Valor inicial"
          className="form-control"
          onChange={(e) => (tempStart = e.target.value)}
        />
      ),
      confirmText: "Confirmar",
      cancelText: "Cancelar",
      onConfirm: () => handleCreateBonusHunt(tempStart),
    });
  };

  return (
    <div className="content">
      {bonusHuntState === "create" && (
        <Card>
          <CardBody>
            <CardTitle tag="h4">Criar Bonus Hunt</CardTitle>
            <Button color="primary" onClick={handleStartValueClick}>
              Iniciar Bonus Hunt
            </Button>
          </CardBody>
        </Card>
      )}

      {bonusHuntState === "HUNTING" && (
        <BonusHuntForm
          bonusHuntHistory={[{ id: bonusHuntId, status: "HUNTING", userId: user?.id }]}
          onCreateBonusHunt={() => {}}
          errorMessage={""}
          onCancel={() => setBonusHuntState("create")}
        />
      )}
    </div>
  );
};

export default CreateBonusHuntPage;
