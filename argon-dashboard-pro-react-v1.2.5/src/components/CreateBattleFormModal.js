// components/CreateBattleFormModal.js
import { forwardRef, useImperativeHandle, useState } from "react";
import AsyncSelect from "react-select/async";
import { FormGroup, Input, Label } from "reactstrap";
import { fetchSlots } from "../services/slotService";
import { fetchUsers } from "../services/userService";

const CreateBattleFormModal = forwardRef(({ onSubmit }, ref) => {
  const [data, setData] = useState({
    name: "Batalha entre jogadores",
    description: "",
    player1Id: null,
    player2Id: null,
    slot1Id: null,
    slot2Id: null,
    slot1BonusValue: "",
    slot2BonusValue: "",
    maxRounds: 3,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  const validate = () => {
    const newErrors = {};
    if (!data.player1Id) newErrors.player1Id = "Obrigatório";
    if (!data.player2Id) newErrors.player2Id = "Obrigatório";
    if (!data.slot1Id)    newErrors.slot1Id    = "Obrigatório";
    if (!data.slot2Id)    newErrors.slot2Id    = "Obrigatório";
    if (!data.slot1BonusValue) newErrors.slot1BonusValue = "Obrigatório";
    if (!data.slot2BonusValue) newErrors.slot2BonusValue = "Obrigatório";
    if (!data.maxRounds || isNaN(data.maxRounds)) newErrors.maxRounds = "Obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({
    handleSubmit: () => {
      if (validate()) {
        onSubmit({
          ...data,
          slot1BonusValue: parseFloat(data.slot1BonusValue),
          slot2BonusValue: parseFloat(data.slot2BonusValue),
          maxRounds:    parseInt(data.maxRounds, 10),
        });
        return true;
      }
      return false;
    }
  }));

  // loaders
  const loadUserOptions = async inputValue => {
    const users = await fetchUsers(inputValue);
    const opts = users.map(u => ({ value: u.id, label: u.name || u.email }));
    // if no search term, only show first 20
    return inputValue
      ? opts
      : opts.slice(0, 20);
  };
  const loadSlotOptions = async inputValue => {
    const slots = await fetchSlots(inputValue);
    const opts = slots.map(s => ({ value: s.id, label: s.name }));
    return inputValue
      ? opts
      : opts.slice(0, 20);
  };

  const selectClass = hasError => hasError ? "is-invalid" : "";
  const inputClass  = hasError => hasError ? "form-control is-invalid" : "form-control";

  return (
    <div>
      <FormGroup>
        <Label>Player 1</Label>
        <AsyncSelect
          className={selectClass(errors.player1Id)}
          cacheOptions
          defaultOptions
          loadOptions={loadUserOptions}
          onChange={opt => handleChange("player1Id", opt?.value)}
          placeholder="Pesquisar..."
        />
        {errors.player1Id && <div className="invalid-feedback d-block">{errors.player1Id}</div>}
      </FormGroup>

      <FormGroup>
        <Label>Player 2</Label>
        <AsyncSelect
          className={selectClass(errors.player2Id)}
          cacheOptions
          defaultOptions
          loadOptions={loadUserOptions}
          onChange={opt => handleChange("player2Id", opt?.value)}
          placeholder="Pesquisar..."
        />
        {errors.player2Id && <div className="invalid-feedback d-block">{errors.player2Id}</div>}
      </FormGroup>

      <FormGroup>
        <Label>Slot 1</Label>
        <AsyncSelect
          className={selectClass(errors.slot1Id)}
          cacheOptions
          defaultOptions
          loadOptions={loadSlotOptions}
          onChange={opt => handleChange("slot1Id", opt?.value)}
          placeholder="Pesquisar..."
        />
        {errors.slot1Id && <div className="invalid-feedback d-block">{errors.slot1Id}</div>}
      </FormGroup>

      <FormGroup>
        <Label>Bonus Value Slot 1 (€)</Label>
        <Input
          type="number"
          className={inputClass(errors.slot1BonusValue)}
          value={data.slot1BonusValue}
          onChange={e => handleChange("slot1BonusValue", e.target.value)}
        />
        {errors.slot1BonusValue && <div className="invalid-feedback">{errors.slot1BonusValue}</div>}
      </FormGroup>

      <FormGroup>
        <Label>Slot 2</Label>
        <AsyncSelect
          className={selectClass(errors.slot2Id)}
          cacheOptions
          defaultOptions
          loadOptions={loadSlotOptions}
          onChange={opt => handleChange("slot2Id", opt?.value)}
          placeholder="Pesquisar..."
        />
        {errors.slot2Id && <div className="invalid-feedback d-block">{errors.slot2Id}</div>}
      </FormGroup>

      <FormGroup>
        <Label>Bonus Value Slot 2 (€)</Label>
        <Input
          type="number"
          className={inputClass(errors.slot2BonusValue)}
          value={data.slot2BonusValue}
          onChange={e => handleChange("slot2BonusValue", e.target.value)}
        />
        {errors.slot2BonusValue && <div className="invalid-feedback">{errors.slot2BonusValue}</div>}
      </FormGroup>

      <FormGroup>
        <Label>Máx de rondas</Label>
        <Input
          type="number"
          className={inputClass(errors.maxRounds)}
          value={data.maxRounds}
          onChange={e => handleChange("maxRounds", e.target.value)}
        />
        {errors.maxRounds && <div className="invalid-feedback">{errors.maxRounds}</div>}
      </FormGroup>
    </div>
  );
});

export default CreateBattleFormModal;
