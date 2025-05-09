// CreateSlotPage.jsx
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import SlotFormModal from "../../../components/SlotFormModal";
import { useGlobalModal } from "../../../context/ModalContext";
import { useUI } from "../../../context/UIContext";
import { getUserData } from "../../../services/authService";

export default function CreateSlotPage() {
  const { showModal, hideModal } = useGlobalModal();
  const { notify } = useUI();
  const modalRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const user = await getUserData();
        setIsAuthenticated(!!user);
      } catch {
        setIsAuthenticated(false);
      }
    })();
  }, []);

  const onCreated = (slotId) => {
    notify("success", id ? "Slot atualizado!" : "Slot criado!");
    hideModal();
    navigate(`/slot-admin`);
  };

  const openModal = () => {
    showModal({
      title: id ? "✏️ Editar Slot" : "➕ Criar Slot",
      body: (
        <SlotFormModal
          ref={modalRef}
          slotId={id}
          onCreated={onCreated}
        />
      ),
      confirmText: "Salvar",
      cancelText: "Cancelar",
      onConfirm: () => modalRef.current.handleSubmit(),
      onCancel: () => modalRef.current.handleCancel(),
    });
  };

  if (isAuthenticated === false) return <Navigate to="/login" />;
  if (isAuthenticated === null) return <div>Carregando...</div>;

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h4">
          {id ? "✏️ Editar Slot" : "➕ Criar Novo Slot"}
        </CardTitle>
        <Button color="primary" onClick={openModal}>
          {id ? "Atualizar Slot" : "Criar Slot"}
        </Button>
      </CardBody>
    </Card>
  );
}
