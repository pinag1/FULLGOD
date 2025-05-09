// src/views/pages/TournamentCreate.js
import { useRef } from "react";
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import CreateTournamentFormModal from "../../../components/CreateTournamentFormModal";
import { useGlobalModal } from "../../../context/ModalContext";
import { useUI } from "../../../context/UIContext";

export default function CreateTournamentPage() {
  const { showModal, hideModal } = useGlobalModal();
  const { notify } = useUI();
  const modalRef = useRef();

  const onCreated = (tournamentId) => {
    notify("success", "Torneio criado!");
    hideModal();
    window.location.href = `/admin/tournaments/${tournamentId}/bracket`;
  };

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h4">Novo Torneio</CardTitle>
        <Button
          color="primary"
          onClick={() =>
            showModal({
              title: "Criar Torneio",
              body: (
                <CreateTournamentFormModal
                  ref={modalRef}
                  onCreated={onCreated}
                />
              ),
              confirmText: "Confirmar",
              cancelText: "Cancelar",
              onConfirm: () => modalRef.current.handleSubmit(),
              onCancel: () => modalRef.current.handleCancel(),
            })
          }
        >
          Criar Torneio
        </Button>
      </CardBody>
    </Card>
  );
}
