// SlotFormModal.jsx
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { fetchSlots } from "../services/slotService";
import SlotForm from "./SlotForm";

const SlotFormModal = forwardRef(({ slotId, onCreated }, ref) => {
  const [isOpen, setIsOpen] = useState(true);
  const [initialSlot, setInitialSlot] = useState(null);
  const formRef = useRef();

  useEffect(() => {
    if (slotId) {
      fetchSlots(slotId).then((slot) => setInitialSlot(slot));
    }
  }, [slotId]);

  useImperativeHandle(ref, () => ({
    handleSubmit: () => {
      formRef.current.submit();
    },
    handleCancel: () => {
      setIsOpen(false);
    },
  }));

  const handleSave = (savedSlot) => {
    onCreated(savedSlot.id);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} toggle={() => setIsOpen(false)}>
      <ModalHeader toggle={() => setIsOpen(false)}>
        {slotId ? "✏️ Editar Slot" : "➕ Criar Slot"}
      </ModalHeader>
      <ModalBody>
        <SlotForm
          ref={formRef}
          slot={initialSlot}
          onSave={handleSave}
        />
      </ModalBody>
    </Modal>
  );
});

export default SlotFormModal;