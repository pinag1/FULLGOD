import { useEffect, useState } from "react";
import {
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
} from "reactstrap";
import { useNotification } from "../context/NotificationContext";

const SlotForm = ({ slot, onSave }) => {
  const [formData, setFormData] = useState({
    id: slot?.id || "",
    name: slot?.name || "",
    displayName: slot?.displayName || "",
    provider: slot?.provider || "",
    rtp: slot?.rtp || "",
    potencial: slot?.potencial || "",
    volatility: slot?.volatility || "",
    releaseDate: slot?.releaseDate || "",
    isSuperBonus: slot?.isSuperBonus || false,
  });

  const [variants, setVariants] = useState(
    slot?.variants?.map((v) => ({
      id: v.id,
      displayName: v.displayName,
      isSuperBonus: v.isSuperBonus,
    })) || []
  );

  const { notify } = useNotification();

  useEffect(() => {
    if (slot) {
      setFormData({
        id: slot.id,
        name: slot.name,
        displayName: slot.displayName,
        provider: slot.provider,
        rtp: slot.rtp,
        potencial: slot.potencial,
        volatility: slot.volatility,
        releaseDate: slot.releaseDate,
        isSuperBonus: slot.isSuperBonus,
      });
      setVariants(
        slot.variants?.map((v) => ({
          id: v.id,
          displayName: v.displayName,
          isSuperBonus: v.isSuperBonus,
        })) || []
      );
    }
  }, [slot]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleVariantChange = (index, field, val) => {
    const copy = [...variants];
    copy[index][field] = val;
    setVariants(copy);
  };

  const addVariant = () =>
    setVariants((prev) => [...prev, { displayName: "", isSuperBonus: false }]);

  const removeVariant = (index) =>
    setVariants((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave({ ...formData, variants });
      notify(
        "success",
        `Slot ${formData.id ? "atualizado" : "criado"} com sucesso!`
      );
    } catch (err) {
      notify("danger", err.message || "Erro ao guardar slot.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3>{formData.id ? "Editar Slot" : "Novo Slot"}</h3>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Row form>
            <Col md="6">
              <FormGroup>
                <Label for="name">Nome</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label for="displayName">Display Name</Label>
                <Input
                  type="text"
                  name="displayName"
                  id="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md="6">
              <FormGroup>
                <Label for="provider">Provider</Label>
                <Input
                  type="text"
                  name="provider"
                  id="provider"
                  value={formData.provider}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md="3" className="align-self-center">
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="isSuperBonus"
                    checked={formData.isSuperBonus}
                    onChange={handleChange}
                  />{" "}
                  Super Bonus
                </Label>
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md="4">
              <FormGroup>
                <Label for="rtp">RTP</Label>
                <Input
                  type="number"
                  step="any"
                  name="rtp"
                  id="rtp"
                  value={formData.rtp}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label for="potencial">Potencial</Label>
                <Input
                  type="number"
                  step="any"
                  name="potencial"
                  id="potencial"
                  value={formData.potencial}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label for="volatility">Volatility</Label>
                <Input
                  type="number"
                  step="any"
                  name="volatility"
                  id="volatility"
                  value={formData.volatility}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md="6">
              <FormGroup>
                <Label for="releaseDate">Data de Lançamento</Label>
                <Input
                  type="date"
                  name="releaseDate"
                  id="releaseDate"
                  value={
                    formData.releaseDate
                      ? new Date(formData.releaseDate)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>

          <CardHeader>
            <h4>Variantes</h4>
            <Button size="sm" color="secondary" onClick={addVariant}>
              Adicionar Variante
            </Button>
          </CardHeader>

          {variants.map((v, idx) => (
            <Row form key={idx} className="align-items-end">
              <Col md="6">
                <FormGroup>
                  <Label for={`variant-${idx}`}>Display Name</Label>
                  <Input
                    type="text"
                    id={`variant-${idx}`}
                    value={v.displayName}
                    onChange={(e) =>
                      handleVariantChange(idx, "displayName", e.target.value)
                    }
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={v.isSuperBonus}
                      onChange={(e) =>
                        handleVariantChange(idx, "isSuperBonus", e.target.checked)
                      }
                    />{" "}
                    Super Bonus
                  </Label>
                </FormGroup>
              </Col>
              <Col md="3">
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => removeVariant(idx)}
                >
                  Remover
                </Button>
              </Col>
            </Row>
          ))}

          <Button color="primary" type="submit">
            {formData.id ? "Atualizar Slot" : "Criar Slot"}
          </Button>
        </Form>
      </CardBody>
    </Card>
);
}
export default SlotForm;
