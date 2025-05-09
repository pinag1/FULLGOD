import { useEffect, useState } from "react";
import { Table } from "reactstrap"; // Importando a Tabela do Reactstrap
import { getSlotPaymentsBySlotId, removeSlotPayment } from "../services/slotPaymentService";

const HistoryCard = ({ slotId, slotName, refreshTrigger }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!slotId) return;

    const loadPayments = async () => {
      setLoading(true);
      try {
        const data = await getSlotPaymentsBySlotId(slotId);
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPayments(sorted.slice(0, 6));  // Limitando para os últimos 6 pagamentos
      } catch (err) {
        console.error("Erro ao buscar histórico de pagamentos:", err);
      }
      setLoading(false);
    };

    loadPayments();
  }, [slotId, refreshTrigger]);

  const handleRemovePayment = async (paymentId) => {
    try {
      await removeSlotPayment(paymentId);
      setPayments(payments.filter((payment) => payment.id !== paymentId));
    } catch (err) {
      console.error("Erro ao remover pagamento:", err);
    }
  };

  return (
    <div>
      <div>
        <h3>Histórico de Pagamentos: {slotName}</h3>
      </div>

      {loading ? (
        <p>Carregando pagamentos...</p>
      ) : (
        <Table responsive className="table align-items-center table-flush">
          <thead>
            <tr>
              <th scope="col">Bet</th>
              <th scope="col">Pagamento</th>
              <th scope="col">Multiplicador</th>
              <th scope="col">Fonte</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {!loading && payments.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.bet}</td>
                <td>{entry.payment}</td>
                <td>{(entry.payment / entry.bet).toFixed(2)}</td> {/* Cálculo do multiplicador */}
                <td>{entry.source}</td>
                <td>
                  <button 
                    onClick={() => handleRemovePayment(entry.id)} 
                    className="btn btn-danger btn-sm"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default HistoryCard;
