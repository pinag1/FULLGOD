// ViewSlotPage.jsx
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUI } from "../../../context/UIContext";
import { getUserData } from "../../../services/authService";
import { fetchSlots, removeSlot } from "../../../services/slotService";
import ViewSlotTable from "../tables/SlotTable";

const ViewSlotPage = () => {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { notify, sweetAlert } = useUI();
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const userData = await getUserData();
        setIsAuthenticated(!!userData);
      } catch {
        setIsAuthenticated(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSlots()
        .then((data) => {
          setSlots(data);
          setFiltered(data);
        })
        .catch((err) => notify("danger", `Erro ao carregar slots: ${err.message}`));
    }
  }, [isAuthenticated, notify]);



  const handleDelete = (slot) => {
    sweetAlert({
      type: "warning",
      title: "Tens a certeza?",
      message: "Isto vai apagar o slot permanentemente.",
      confirmText: "Eliminar",
      cancelText: "Cancelar",
      onConfirm: async () => {
        try {
          await removeSlot(slot.id);
          notify("success", "Slot eliminado com sucesso!");
          const data = await fetchSlots();
          setSlots(data);
          setSearch("");
        } catch {
          notify("danger", "Erro ao apagar o slot.");
        }
      },
    });
  };

  if (isAuthenticated === false) return <Navigate to="/login" />;
  if (isAuthenticated === null) return <div>Carregando...</div>;

  return (
    <div className="content">
      


      <ViewSlotTable
        slots={filtered}
        onEdit={(slot) => navigate(`/slot-admin/create/${slot.id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ViewSlotPage;