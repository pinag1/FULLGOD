// src/components/CreateTournamentFormModal.js
import { forwardRef, useImperativeHandle, useState } from "react";
import AsyncSelect from "react-select/async";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import { fetchSlots } from "../services/slotService";
import {
    addParticipant as apiAddParticipant,
    createTournament as apiCreateTournament,
    deleteTournament as apiDeleteTournament,
    generateBracket as apiGenerateBracket, // 🔥 importa aqui
} from "../services/tournamentService";
import { fetchUsers } from "../services/userService";

const CreateTournamentFormModal = forwardRef(({ onCreated }, ref) => {
  const [meta, setMeta] = useState({ name: "", description: "" });
  const [participants, setParticipants] = useState(
    Array(8).fill({ userId: null, slotId: null })
  );
  const [errors, setErrors] = useState({});
  const [savedTournamentId, setSavedTournamentId] = useState(null);

  useImperativeHandle(ref, () => ({
    handleSubmit: async () => {
      // 1) Validação básica
      const newErr = {};
      participants.forEach((p, i) => {
        if (!p.userId) newErr[`user-${i}`] = "Obrigatório";
        if (!p.slotId) newErr[`slot-${i}`] = "Obrigatório";
      });
      setErrors(newErr);
      if (Object.keys(newErr).length) return false;

      try {
        // 2) Cria torneio se ainda não existir
        let tournamentId = savedTournamentId;
        if (!tournamentId) {
          const created = await apiCreateTournament({
            name: meta.name,
            description: meta.description,
          });
          tournamentId = created.id;
          setSavedTournamentId(tournamentId);
        }

        // 3) Adiciona os 8 participantes
        await Promise.all(
          participants.map((p, idx) =>
            apiAddParticipant(tournamentId, {
              userId: p.userId,
              slotId: p.slotId,
              seed: idx + 1,
            })
          )
        );

        // 4) Gera automaticamente o bracket de OITAVAS
        await apiGenerateBracket(tournamentId);

        // 5) Dispara callback de criado
        onCreated(tournamentId);
        return true;
      } catch (err) {
        console.error("Erro ao criar torneio/participantes:", err);
        return false;
      }
    },
    handleCancel: async () => {
      if (savedTournamentId) {
        await apiDeleteTournament(savedTournamentId);
        setSavedTournamentId(null);
      }
    },
  }));

  // Loaders para os selects
  const loadUserOptions = async (q) => {
    const users = await fetchUsers();
    return users
      .filter((u) => !q || u.name?.toLowerCase().includes(q.toLowerCase()))
      .slice(0, 20)
      .map((u) => ({ value: u.id, label: u.name || u.email }));
  };
  const loadSlotOptions = async (q) => {
    const slots = await fetchSlots(q);
    return slots.map((s) => ({ value: s.id, label: s.name }));
  };

  const onChangeMeta = (field) => (e) =>
    setMeta((m) => ({ ...m, [field]: e.target.value }));

  const onChangePart = (idx, field, value) => {
    setParticipants((ps) => {
      const cp = [...ps];
      cp[idx] = { ...cp[idx], [field]: value };
      return cp;
    });
    setErrors((e) => ({ ...e, [`${field}-${idx}`]: false }));
  };

  return (
    <div>
      <FormGroup>
        <Label>Nome do Torneio</Label>
        <Input
          value={meta.name}
          onChange={onChangeMeta("name")}
          placeholder="Opcional"
        />
      </FormGroup>
      <FormGroup>
        <Label>Descrição</Label>
        <Input
          type="textarea"
          value={meta.description}
          onChange={onChangeMeta("description")}
          placeholder="Opcional"
        />
      </FormGroup>
      <hr />
      <h5>Participantes (8 seeds)</h5>
      {participants.map((p, idx) => (
        <Row key={idx}>
          <Col md={6}>
            <FormGroup>
              <Label>Seed #{idx + 1} — Usuário</Label>
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={loadUserOptions}
                className={errors[`user-${idx}`] ? "is-invalid" : ""}
                onChange={(opt) => onChangePart(idx, "userId", opt?.value)}
              />
              {errors[`user-${idx}`] && (
                <div className="invalid-feedback d-block">
                  {errors[`user-${idx}`]}
                </div>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Seed #{idx + 1} — Slot</Label>
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={loadSlotOptions}
                className={errors[`slot-${idx}`] ? "is-invalid" : ""}
                onChange={(opt) => onChangePart(idx, "slotId", opt?.value)}
              />
              {errors[`slot-${idx}`] && (
                <div className="invalid-feedback d-block">
                  {errors[`slot-${idx}`]}
                </div>
              )}
            </FormGroup>
          </Col>
        </Row>
      ))}
    </div>
  );
});

export default CreateTournamentFormModal;
