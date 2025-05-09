import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { addSlotPayment, fetchSlotPayments } from "../services/slotPaymentService";
import { fetchSlots } from "../services/slotService";
import HistoryCard from "./HistoryCard";

const MainSlotForm = () => {
  const [slots, setSlots] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [bet, setBet] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [nextEventId, setNextEventId] = useState(null);
  const [refreshHistory, setRefreshHistory] = useState(false);

  useEffect(() => {
    const loadNextEventId = async () => {
      try {
        const allPayments = await fetchSlotPayments();
        const mainSlotPayments = allPayments.filter(p => p.source === "MAIN_SLOT");
        const maxEventId = Math.max(...mainSlotPayments.map(p => p.eventId || 0), 0);
        setNextEventId(maxEventId + 1);
      } catch (err) {
        console.error("Erro ao buscar os pagamentos:", err);
      }
    };
    loadNextEventId();
  }, []);

  useEffect(() => {
    const loadSlots = async () => {
      if (searchTerm.length < 2) return setSlots([]);
      setLoading(true);
      try {
        const all = await fetchSlots(searchTerm);
        setSlots(all.filter(s => !s.slotReferenceId));
      } catch (err) {
        console.error("Erro ao buscar slots:", err);
      } finally {
        setLoading(false);
      }
    };
    loadSlots();
  }, [searchTerm]);

  const handleSlotSelect = slot => {
    setSelectedSlot(slot);
    setSelectedVariant(null);
    setError("");
    setSuccessMessage("");
    // clear search term to close dropdown
    setSearchTerm("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if ((selectedSlot.variants.length > 0 && !selectedVariant) || !bet || !pagamento) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
    const betNum = parseFloat(bet);
    const payNum = parseFloat(pagamento);
    if (isNaN(betNum) || isNaN(payNum)) {
      setError("Apostas e pagamentos devem ser números válidos.");
      return;
    }
    const variant = selectedVariant || selectedSlot;
    await addSlotPayment({
      name: variant.displayName,
      slotId: variant.id,
      eventId: nextEventId,
      bet: betNum,
      payment: payNum,
      source: "MAIN_SLOT",
    });
    setSuccessMessage("Pagamento salvo com sucesso!");
    setBet("");
    setPagamento("");
    setSelectedVariant(null);
    setNextEventId(prev => prev + 1);
    setRefreshHistory(prev => !prev);
  };

  return (
    <Card className="shadow border-0">
      <CardHeader className="bg-transparent">
        <h3 className="mb-0 text-primary">Novo Pagamento de Slot</h3>
      </CardHeader>
      <CardBody>
        {error && <Alert color="danger">{error}</Alert>}
        {successMessage && <Alert color="success">{successMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label for="search">Pesquisar Slot</Label>
                <Input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Digite o nome do slot"
                />
                {loading && <Spinner size="sm" className="mt-2" />}
                {searchTerm.length > 1 && slots.length > 0 && !loading && (
                  <div className="border rounded mt-2">
                    {slots.map(s => (
                      <div
                        key={s.id}
                        className="p-2 border-bottom hover-bg-light"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSlotSelect(s)}
                      >
                        <strong>{s.displayName}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </FormGroup>
            </Col>
          </Row>

          {selectedSlot && (
            <>
              <Row className="align-items-center my-4">
                <Col md="2">
                  <img
                    src={selectedSlot.imageURL}
                    alt={selectedSlot.displayName}
                    className="img-fluid rounded shadow"
                  />
                </Col>
                <Col>
                  <h4 className="mb-0">{selectedSlot.displayName}</h4>
                  <Badge color="info" className="mt-2">ID: {selectedSlot.id}</Badge>
                  {selectedSlot.variants.length > 0 && (
                    <FormGroup className="mt-3">
                      <Label for="variantSelect">Variante</Label>
                      <Input
                        type="select"
                        id="variantSelect"
                        value={selectedVariant?.id || ""}
                        onChange={e => setSelectedVariant(
                          selectedSlot.variants.find(v => v.id === +e.target.value)
                        )}
                      >
                        <option value="">-- Selecione --</option>
                        {selectedSlot.variants.map(v => (
                          <option key={v.id} value={v.id}>
                            {v.displayName}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  )}
                </Col>
              </Row>

              <Row>
                <Col md="4">
                  <FormGroup>
                    <Label>Bet</Label>
                    <Input
                      type="number"
                      value={bet}
                      onChange={e => setBet(e.target.value)}
                      required
                      disabled={selectedSlot.variants.length > 0 && !selectedVariant}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label>Pagamento</Label>
                    <Input
                      type="number"
                      value={pagamento}
                      onChange={e => setPagamento(e.target.value)}
                      required
                      disabled={selectedSlot.variants.length > 0 && !selectedVariant}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label>Multi (calculado)</Label>
                    <Input
                      type="text"
                      disabled
                      value={
                        bet && pagamento
                          ? (parseFloat(pagamento) / parseFloat(bet)).toFixed(2)
                          : ""
                      }
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>

              <div className="mt-3">
                <Button color="primary" type="submit">
                  Salvar Pagamento
                </Button>
              </div>
            </>
          )}
        </Form>
      </CardBody>

      {selectedSlot && (
        <CardBody>
          <HistoryCard slotId={selectedVariant?.id || selectedSlot.id} refreshTrigger={refreshHistory} />
        </CardBody>
      )}
    </Card>
  );
};

export default MainSlotForm;
