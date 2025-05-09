import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
} from "reactstrap";
import { useUI } from "../context/UIContext"; // ✅ Import do hook global
import { getNextStatuses } from "../utils/statusTransitions";

const SummaryCard = ({
  summary,
  status,
  handleStatusChange,
  isClickable,
  handleStartChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { notify } = useUI(); // ✅ Notificações globais

  const statusOptions = getNextStatuses(status);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleStatusDropdownChange = (newStatus) => {
    handleStatusChange(newStatus);
    setDropdownOpen(false);
    notify("info", `Estado alterado para ${newStatus}`);
  };

  const isStartEditable = status === "EDIT";

  const handleStartInputChange = (e) => {
    const newStartValue = e.target.value;

    if (isNaN(newStartValue) || newStartValue < 0) {
      notify("danger", "O valor de start deve ser um número válido.");
      return;
    }

    handleStartChange(newStartValue);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <h3>
          BONUS HUNT #{summary?.bonusHuntId} - {summary?.madeBy}
        </h3>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="4">
            <label>Status</label>
            {isClickable ? (
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret>{status || "Selecione o estado"}</DropdownToggle>
                <DropdownMenu>
                  {statusOptions.map((option) => (
                    <DropdownItem
                      key={option}
                      onClick={() => handleStatusDropdownChange(option)}
                    >
                      {option}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : (
              <p>{status}</p>
            )}
          </Col>
          <Col md="4">
            <label>Start</label>
            <Input
              type="number"
              value={summary?.start || ""}
              onChange={handleStartInputChange}
              disabled={!isStartEditable}
            />
          </Col>
        </Row>

        <Row className="mt-3">
          {[
            { label: "Bonus Quantity", value: summary?.bonusQuantity },
            { label: "Total Bonus Value", value: summary?.totalBonusValue },
            { label: "Remaining Bonus Quantity", value: summary?.remainingBonusQuantity },
            { label: "Remaining Bonus Value", value: summary?.remainingBonusValue },
            { label: "Best Slot", value: summary?.bestSlot },
            { label: "Worst Slot", value: summary?.worstSlot },
            { label: "Initial Break Even", value: summary?.initialBreakEven },
            { label: "Current Break Even", value: summary?.currentBreakEven },
            { label: "Average Multi", value: summary?.averageMulti },
            { label: "Total Pay", value: summary?.totalPay },
            { label: "Now Playing", value: summary?.nowPlaying },
          ].map(({ label, value }) => (
            <Col md="3" key={label} className="mb-3">
              <strong>{label}:</strong> <br />
              {value ?? "-"}
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  );
};

export default SummaryCard;
