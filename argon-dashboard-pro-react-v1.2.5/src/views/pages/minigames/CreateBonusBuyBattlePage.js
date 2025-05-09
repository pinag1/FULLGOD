// src/views/pages/minigames/BonusBuyBattleCreate.js
import { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import BonusBuyBattleForm from "../../../components/BonusBuyBattleForm";
import CreateBattleFormModal from "../../../components/CreateBattleFormModal";
import { useGlobalModal } from "../../../context/ModalContext";
import { useUI } from "../../../context/UIContext";
import {
  addBonusBuyBattle,
  fetchBonusBuyBattles,
} from "../../../services/BonusBuyBattleService";
import { fetchSlots } from "../../../services/slotService";
import { fetchUsers } from "../../../services/userService";

const CreateBonusBuyBattlePage = () => {
  const { notify, sweetAlert } = useUI();
  const { showModal, hideModal } = useGlobalModal();
  const modalRef = useRef();

  const [existingBattles, setExistingBattles] = useState([]);
  const [battleId, setBattleId] = useState(null);
  const [battleState, setBattleState] = useState("create");

  const [users, setUsers] = useState([]);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [battles, usersData, slotsData] = await Promise.all([
          fetchBonusBuyBattles(),
          fetchUsers(),
          fetchSlots(),
        ]);
        setExistingBattles(battles);
        setUsers(usersData);
        setSlots(slotsData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        notify("danger", "Erro ao carregar dados.");
      }
    };

    loadInitialData();
  }, [notify]);

  const handleCreateBattle = async (config) => {
    // verifica existência de batalha em curso
    const alreadyPlaying = existingBattles.find(
      (b) =>
        b.winnerId === null &&
        b.player1Id === config.player1Id &&
        b.player2Id === config.player2Id
    );
    if (alreadyPlaying) {
      sweetAlert({
        type: "warning",
        title: "Já existe uma batalha em curso!",
        message: <p>Queres continuar a batalha entre esses dois jogadores?</p>,
        confirmText: "Sim, continuar",
        cancelText: "Não",
        onConfirm: () => {
          setBattleState("playing");
          setBattleId(alreadyPlaying.id);
        },
      });
      return;
    }

    // cria a batalha
    try {
      const created = await addBonusBuyBattle(config);
      notify("success", "Batalha criada com sucesso!");
      setBattleId(created.id);
      setBattleState("playing");
      hideModal();
    } catch (err) {
      console.error("Erro ao criar batalha:", err);
      notify("danger", "Erro ao criar a batalha.");
    }
  };

  return (
    <div className="content">
      {battleState === "create" && (
        <Card>
          <CardBody>
            <CardTitle tag="h4">Criar Bonus Buy Battle</CardTitle>
            <Button
              color="primary"
              onClick={() => {
                showModal({
                  title: "Criar nova batalha",
                  body: (
                    <CreateBattleFormModal
                      ref={modalRef}
                      users={users}
                      slots={slots}
                      onSubmit={handleCreateBattle}
                    />
                  ),
                  confirmText: "Criar",
                  cancelText: "Fechar",
                  onConfirm: () => {
                    // só fecha se a validação passar
                    if (modalRef.current?.handleSubmit()) {
                      hideModal();
                    }
                  },
                });
              }}
            >
              Iniciar Batalha
            </Button>
          </CardBody>
        </Card>
      )}

      {battleState === "playing" && battleId && (
        <BonusBuyBattleForm
          battleId={battleId}
          onCancel={() => setBattleState("create")}
        />
      )}
    </div>
  );
};

export default CreateBonusBuyBattlePage;
