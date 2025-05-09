// components/GlobalModal.js
import { useRef } from "react";
import { Button, Modal } from "reactstrap";

const GlobalModal = ({ isOpen, toggle, title, body, onConfirm, confirmText, cancelText }) => {
  const bodyRef = useRef();

  const handleConfirm = () => {
    if (bodyRef.current?.handleSubmit) {
      const valid = bodyRef.current.handleSubmit();
      if (valid) toggle(); // Fecha apenas se for válido
    } else {
      onConfirm?.();
      toggle();
    }
  };

  // Se o body for um componente com ref, clona-o com o ref
  const modalBody = typeof body === "object" && body?.type
    ? { ...body, ref: bodyRef }
    : body;

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <div className="modal-header">
        <h5 className="modal-title">{title}</h5>
        <button type="button" className="close" onClick={toggle}>
          <span>&times;</span>
        </button>
      </div>
      <div className="modal-body">{modalBody}</div>
      <div className="modal-footer">
        <Button color="secondary" onClick={toggle}>
          {cancelText || "Cancelar"}
        </Button>
        {confirmText !== null && (
          <Button color="primary" onClick={handleConfirm}>
            {confirmText || "Confirmar"}
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default GlobalModal;
