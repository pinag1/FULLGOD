// src/components/BonusBuyBattleForm.jsx
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Row,
  Table,
} from "reactstrap";
import useBonusBuyBattleLogic from "../hooks/useBonusBuyBattleLogic";

const BonusBuyBattleForm = ({ battleId, onCancel }) => {
  const {
    battle,
    payments1,
    payments2,
    loading,
    bonus,
    setBonus,
    handlePaymentChange,
  } = useBonusBuyBattleLogic(battleId);

  if (loading || !battle) {
    return <div className="content">A carregar...</div>;
  }

  const b1 = parseFloat(bonus.b1) || 0;
  const b2 = parseFloat(bonus.b2) || 0;

  const statsFor = (arr, b) => {
    const total = arr.reduce((s, p) => s + (p.payment || 0), 0);
    const bestWin = Math.max(0, ...arr.map((p) => p.payment || 0));
    const r = b ? total / b : 0;
    return { total, bestWin, r };
  };

  const s1 = statsFor(payments1, b1);
  const s2 = statsFor(payments2, b2);
  const totalR = s1.r + s2.r;
  const score1 = totalR ? parseFloat(((s1.r / totalR) * 100).toFixed(6)) : 0;
  const score2 = parseFloat((100 - score1).toFixed(6));

  const vencedor = score1 > score2 ? 1 : score2 > score1 ? 2 : 0;

  let needs = 0;
  if (vencedor === 1 && b2) {
    needs = b2 * s1.r - s2.total;
  } else if (vencedor === 2 && b1) {
    needs = b1 * s2.r - s1.total;
  }
  needs = Math.max(0, needs);

  return (
    <Container fluid className="mt-4">
      {onCancel && (
        <Row className="mb-3">
          <Col>
            <Button color="secondary" onClick={() => onCancel(battle)}>
              <i className="ni ni-bold-left mr-2" />
              Voltar
            </Button>
          </Col>
        </Row>
      )}

      <Card className="shadow">
        <CardHeader>
          <h3 className="mb-0">Resumo da Batalha – {battle.name}</h3>
        </CardHeader>
        <CardBody>
          {/* Bônus inputs */}
          <Row form className="mb-4">
            <Col md={6}>
              <label>Bônus {battle.slot1.name} (€)</label>
              <Input
                type="number"
                value={bonus.b1}
                onChange={(e) =>
                  setBonus((b) => ({ ...b, b1: e.target.value }))
                }
              />
            </Col>
            <Col md={6}>
              <label>Bônus {battle.slot2.name} (€)</label>
              <Input
                type="number"
                value={bonus.b2}
                onChange={(e) =>
                  setBonus((b) => ({ ...b, b2: e.target.value }))
                }
              />
            </Col>
          </Row>

          {/* tabela de pagamentos */}
          <Table responsive className="table-flush">
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>
                  {battle.slot1.name} ({b1}€)
                </th>
                <th>
                  {battle.slot2.name} ({b2}€)
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: battle.maxRounds }).map((_, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="€"
                      value={payments1[idx]?.payment ?? ""}
                      onChange={(e) => {
                        const raw = e.target.value;
                        const payment = raw === "" ? null : parseFloat(raw);
                        handlePaymentChange("slot1", idx, {
                          payment,
                          bet: b1,
                        });
                      }}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="€"
                      value={payments2[idx]?.payment ?? ""}
                      onChange={(e) => {
                        const raw = e.target.value;
                        const payment = raw === "" ? null : parseFloat(raw);
                        handlePaymentChange("slot2", idx, {
                          payment,
                          bet: b2,
                        });
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* summary */}
          <Row className="mt-4">
            <Col md={6}>
              <div className="p-3 bg-light rounded shadow-sm">
                <h5 className="text-primary">{battle.slot1.name}</h5>
                <p>Total: €{s1.total.toFixed(2)}</p>
                <p>Best Win: €{s1.bestWin.toFixed(2)}</p>
                <p>Score: {score1.toFixed(2)}x</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="p-3 bg-light rounded shadow-sm">
                <h5 className="text-primary">{battle.slot2.name}</h5>
                <p>Total: €{s2.total.toFixed(2)}</p>
                <p>Best Win: €{s2.bestWin.toFixed(2)}</p>
                <p>Score: {score2.toFixed(2)}x</p>
              </div>
            </Col>
          </Row>

          {/* vencedor e needs */}
          <hr />
          <div className="text-center mt-4">
            <h4 className="mb-2">
              🏆 Vencedor:{" "}
              {vencedor === 1
                ? battle.slot1.name
                : vencedor === 2
                ? battle.slot2.name
                : "Empate"}
            </h4>
            {vencedor !== 0 && (
              <Badge color="info" className="px-3 py-2 mt-2">
                💸{" "}
                {vencedor === 1
                  ? `${battle.slot2.name} precisa de €${needs.toFixed(
                      2
                    )} para ultrapassar`
                  : `${battle.slot1.name} precisa de €${needs.toFixed(
                      2
                    )} para ultrapassar`}
              </Badge>
            )}
          </div>
        </CardBody>
      </Card>
    </Container>
  );
};

export default BonusBuyBattleForm;
