import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Card, CardBody, Table } from "reactstrap";
import SlotForm from "../../../components/SlotForm";
import { useUI } from "../../../context/UIContext"; // ✅ UI hooks globais
import { getUserData } from "../../../services/authService";
import {
  addSlot,
  fetchSlots,
  removeSlot,
  updateSlot,
} from "../../../services/slotService";

const SlotAdmin = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const { notify, sweetAlert } = useUI(); // ✅ usar notificações globais

  const loadSlots = async () => {
    try {
      const data = await fetchSlots();
      setSlots(data);
    } catch (error) {
      notify("danger", `Erro ao carregar slots: ${error.message || error}`);
    }
  };

  const checkAuthentication = async () => {
    try {
      const userData = await getUserData();
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const handleSave = async (form) => {
    try {
      if (form.id) {
        await updateSlot(form.id, form);
        notify("success", "Slot atualizado com sucesso!");
      } else {
        await addSlot(form);
        notify("success", "Slot criado com sucesso!");
      }
      loadSlots();
      setSelectedSlot(null);
    } catch (error) {
      notify("danger", "Erro ao salvar slot.");
    }
  };

  const handleEdit = (slot) => {
    setSelectedSlot(slot);
  };

  const handleDelete = (id) => {
    sweetAlert({
      type: "warning",
      title: "Tens a certeza?",
      message: "Isto vai apagar o slot permanentemente.",
      confirmText: "Eliminar",
      cancelText: "Cancelar",
      onConfirm: async () => {
        try {
          await removeSlot(id);
          notify("success", "Slot eliminado com sucesso!");
          loadSlots();
        } catch (error) {
          notify("danger", "Erro ao apagar o slot.");
        }
      },
    });
  };

  useEffect(() => {
    checkAuthentication();
    if (isAuthenticated) {
      loadSlots();
    }
  }, [isAuthenticated]);

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated === null) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="content">
      <h2>🎰 Admin Slots</h2>

      <Card>
        <CardBody>
          <SlotForm slot={selectedSlot} onSave={handleSave} />
        </CardBody>
      </Card>

      <Card style={{ marginTop: 20 }}>
        <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Provider</th>
                <th>RTP</th>
                <th>Potencial</th>
                <th>Volatility</th>
                <th>Best Win</th>
                <th>Best X</th>
                <th>Avg X</th>
                <th>Quantidade Bonus</th>
                <th>Release Date</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot.id}>
                  <td>{slot.id}</td>
                  <td>{slot.name}</td>
                  <td>{slot.provider}</td>
                  <td>{slot.rtp}</td>
                  <td>{slot.potencial}</td>
                  <td>{slot.volatility}</td>
                  <td>{slot.bestwin}</td>
                  <td>{slot.bestX}</td>
                  <td>{slot.avgX}</td>
                  <td>{slot.quantidadeBonus}</td>
                  <td>{new Date(slot.releaseDate).toLocaleDateString()}</td>
                  <td>
                    <Button
                      color="info"
                      onClick={() => handleEdit(slot)}
                      className="mr-2"
                    >
                      ✏️ Edit
                    </Button>
                    <Button color="danger" onClick={() => handleDelete(slot.id)}>
                      ❌ Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default SlotAdmin;
