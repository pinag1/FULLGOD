// context/ModalContext.js
import { createContext, useContext, useState } from "react";
import GlobalModal from "../components/GlobalModal";

const ModalContext = createContext();
export const useGlobalModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    body: "",
    onConfirm: null,
    confirmText: "Confirmar",
    cancelText: "Cancelar",
  });

  const showModal = ({ title, body, onConfirm, confirmText, cancelText }) => {
    setModalState({
      isOpen: true,
      title,
      body,
      onConfirm,
      confirmText,
      cancelText,
    });
  };

  const hideModal = () => setModalState((prev) => ({ ...prev, isOpen: false }));

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <GlobalModal
        isOpen={modalState.isOpen}
        toggle={hideModal}
        title={modalState.title}
        body={modalState.body}
        onConfirm={() => {
          modalState.onConfirm?.();
          hideModal();
        }}
        confirmText={modalState.confirmText}
        cancelText={modalState.cancelText}
      />
    </ModalContext.Provider>
  );
};
