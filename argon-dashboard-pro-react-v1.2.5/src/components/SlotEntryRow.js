import { Button, Input } from "reactstrap";
import { useUI } from "../context/UIContext";

const SlotEntryRow = ({
  entry,
  index,
  onChange,
  onRemove,
  currentBonusHunt,
  isHunting,
  isStandby,
  isOpening,
  isFinished,
  isEdit
}) => {
  const { notify } = useUI(); // ✅ hook do contexto
console.log("entry    ",entry)
  const isBetEditable = isHunting || isEdit;
  const isWinEditable = isOpening || isEdit;

  const handleRemove = async () => {
    try {
      await onRemove(index, entry.slotId, currentBonusHunt.id, "BONUS_HUNT");
      notify("success", "Slot removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover slot:", error);
      notify("danger", "Erro ao remover slot.");
    }
  };

  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>
        <div className="d-flex align-items-center">
          <img
            src={entry.imageURL}
            alt={entry.slotName}
            className="avatar rounded-circle mr-3"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <span>{entry.slotName}</span>
        </div>
      </td>
      <td>{entry.provider}</td>
      <td>
        <Input
          type="number"
          value={entry.bet}
          onChange={(e) =>
            isBetEditable && onChange(index, "bet", parseFloat(e.target.value))
          }
          placeholder="Bet"
          className="input-slot"
          readOnly={!isBetEditable}
        />
      </td>
      <td>
        <Input
          type="number"
          value={entry.win}
          onChange={(e) =>
            isWinEditable && onChange(index, "win", parseFloat(e.target.value))
          }
          placeholder="Win"
          className="input-slot"
          readOnly={!isWinEditable}
        />
      </td>
      <td>{entry.multiplier ? `X${entry.multiplier}` : "-"}</td>
      <td>
        <Button
          color="danger"
          size="sm"
          onClick={handleRemove}
          className="btn-icon-only text-light"
        >
          <i className="fas fa-trash-alt" />
        </Button>
      </td>
    </tr>
  );
};

export default SlotEntryRow;