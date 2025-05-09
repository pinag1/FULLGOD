import { useEffect, useMemo, useRef, useState } from "react";
import useBonusHuntLogic from "../hooks/useBonusHuntLogic";
import {
  deleteBonusHunt,
  fetchBonusHuntSummary,
  fetchSlotPayments,
} from "../services/bonusHuntService";
import SlotEntryRow from "./SlotEntryRow";
import SummaryCard from "./SummaryCard";

import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";

import { useUI } from "../context/UIContext"; // ✅ Novo hook unificado

const BonusHuntForm = ({
  bonusHuntHistory,
  onCreateBonusHunt,
  errorMessage,
  onCancel,
}) => {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [start, setStart] = useState(null);
  const inputRef = useRef(null);

  const { notify, sweetAlert } = useUI(); // ✅ Hooks globais
  const currentBonusHunt = bonusHuntHistory[bonusHuntHistory.length - 1];
  const bonusHuntId = currentBonusHunt?.id;

  const {
    entries,
    summary,
    slots,
    status,
    searchTerm,
    loading,
    setEntries,
    setSummary,
    setStatus,
    handleRemoveSlot,
    handleSearchChange,
    handleAddSlot,
    handleStatusChange,
    handleStartChange,
    handleInputChange,
  } = useBonusHuntLogic(bonusHuntId, currentBonusHunt);

  const hasValidEntries = entries?.some((entry) => parseFloat(entry.bet) > 0);
  console.log("entries   ",entries)
  const statusFlags = useMemo(
    () => ({
      isHunting: status === "HUNTING",
      isStandby: status === "STANDBY",
      isOpening: status === "OPENING",
      isFinished: status === "FINISHED",
      isEdit: status === "EDIT",
    }),
    [status]
  );

  useEffect(() => {
    const loadData = async () => {
      if (!bonusHuntId) return;
      try {
        const summaryData = await fetchBonusHuntSummary(bonusHuntId);
        setSummary(summaryData);
        setStatus(currentBonusHunt.status);

        const slotPayments = await fetchSlotPayments(bonusHuntId);
        const formattedEntries = slotPayments.map((payment) => ({
          id: payment.id,
          slotId: payment.slotId,
          slotName: payment.slot?.name || "",
          imageURL: payment.slot?.imageURL || "",
          bet: payment.bet,
          win: payment.payment,
          multiplier: payment.multi,
          provider: payment.slot?.provider || "",
        }));
        setEntries(formattedEntries);
      } catch (err) {
        console.error("Erro ao carregar dados iniciais:", err);
        notify("danger", "Erro ao carregar dados iniciais.");
      }
    };

    loadData();
  }, [bonusHuntId, currentBonusHunt, setEntries, setSummary, setStatus, notify]);
  const handleBackButtonClick = () => {
    if (status === "HUNTING" && !hasValidEntries) {
      sweetAlert({
        type: "warning",
        title: "Atenção",
        message: (
          <>
            <h4 className="heading mt-4">Não tens slots preenchidos!</h4>
            <p>
              Se continuares, o Bonus Hunt vai ser apagado. Tens a certeza que
              queres voltar?
            </p>
          </>
        ),
        confirmText: "Sim, voltar",
        cancelText: "Cancelar",
        onConfirm: async () => {
          try {
            await deleteBonusHunt(currentBonusHunt.id);
            onCancel(currentBonusHunt);
          } catch (error) {
            console.error("Erro ao apagar Bonus Hunt:", error);
            notify("danger", "Erro ao apagar o Bonus Hunt.");
          }
        },
      });
    } else {
      onCancel(currentBonusHunt);
    }
  };
  

  const handleCreateBonusHunt = (startValue) => {
    if (!startValue || isNaN(startValue) || startValue <= 0) {
      notify("danger", "Por favor insira um valor válido para o start.");
      return;
    }
    onCreateBonusHunt(startValue);
    setIsCreatingNew(false);
  };

  const canAddSlot = statusFlags.isHunting || statusFlags.isEdit;

  if (!currentBonusHunt && !isCreatingNew) {
    return (
      <Container className="mt-4" fluid>
        <Card>
          <CardBody>
            <h2>Carregando Bonus Hunt...</h2>
          </CardBody>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-4" fluid>
      {errorMessage && (
        <Row className="mb-3">
          <Col>
            <Alert color="danger">{errorMessage}</Alert>
          </Col>
        </Row>
      )}

      {onCancel && (
        <Row className="mb-3">
          <Col>
            <Button color="secondary" onClick={handleBackButtonClick}>
              ← Voltar
            </Button>
          </Col>
        </Row>
      )}

      {isCreatingNew ? (
        <Card>
          <CardHeader>
            <h2>Digite o valor de início para o novo Bonus Hunt</h2>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label for="startValue">Valor de Start</Label>
              <Input
                type="number"
                id="startValue"
                value={start || ""}
                onChange={(e) => setStart(e.target.value)}
                placeholder="Valor de Start"
                readOnly={!(statusFlags.isEdit || isCreatingNew)}
              />
            </FormGroup>
            <Button color="primary" onClick={() => handleCreateBonusHunt(start)}>
              Criar Bonus Hunt
            </Button>
          </CardBody>
        </Card>
      ) : bonusHuntHistory.length === 0 ? (
        <Card>
          <CardBody>
            <h2>Nenhum Bonus Hunt encontrado</h2>
            <Button color="primary" onClick={() => setIsCreatingNew(true)}>
              Criar um novo Bonus Hunt
            </Button>
          </CardBody>
        </Card>
      ) : (
        <>
          <SummaryCard
            summary={summary}
            status={status}
            handleStatusChange={handleStatusChange}
            isClickable={true}
            handleStartChange={handleStartChange}
          />

          <Card>
            <CardHeader>
              <h3>Entradas de Slots</h3>
            </CardHeader>
            <CardBody>
              <div className="table-responsive">
                <table className="table align-items-center">
                  <thead className="thead-light">
                    <tr>
                      <th>#</th>
                      <th>Slot</th>
                      <th>Provider</th>
                      <th>Bet</th>
                      <th>Win</th>
                      <th>Multi</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="7">
                        <div style={{ position: "relative" }}>
                          <Input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Adicionar slot"
                            autoFocus
                            innerRef={inputRef}
                            readOnly={!canAddSlot}
                          />
                          {loading ? (
                            <Spinner color="primary" size="sm" />
                          ) : (
                            slots.length > 0 && (
                              <ul
                                className="dropdown-menu show"
                                style={{
                                  width: "100%",
                                  maxHeight: "200px",
                                  overflowY: "auto",
                                  paddingLeft: 0,
                                }}
                              >
                                {slots
                                  .filter(
                                    (slot) =>
                                      !entries.some(
                                        (entry) => entry.slotId === slot.id
                                      )
                                  )
                                  .map((slot) => (
                                    <li key={slot.id}>
                                      <button
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() =>
                                          handleAddSlot(slot, currentBonusHunt)
                                        }
                                      >
                                        {slot.name}
                                      </button>
                                    </li>
                                  ))}
                              </ul>
                            )
                          )}
                        </div>
                      </td>
                    </tr>

                    {entries.map((entry, index) => (
                      <SlotEntryRow
                        key={index}
                        index={index}
                        entry={entry}
                        currentBonusHunt={currentBonusHunt}
                        onChange={handleInputChange}
                        onRemove={handleRemoveSlot}
                        {...statusFlags}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </Container>
  );
};

export default BonusHuntForm;
