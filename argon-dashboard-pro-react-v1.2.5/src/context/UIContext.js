// context/UIContext.js
import { createContext, useContext, useRef, useState } from "react";
import ReactBSAlert from "react-bootstrap-sweetalert";
import NotificationAlert from "react-notification-alert";

const UIContext = createContext();
export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const notificationRef = useRef(null);
  const [sweetAlert, setSweetAlert] = useState(null);
  const [customModal, setCustomModal] = useState(null); // futuro uso

  // Bootstrap Notify
  const notify = (type = "info", message = "Algo aconteceu!") => {
    const options = {
      place: "tc",
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {type === "danger" ? "Erro!" : "Sucesso!"}
          </span>
          <span data-notify="message">{message}</span>
        </div>
      ),
      type,
      icon: "ni ni-bell-55",
      autoDismiss: 5,
    };
    notificationRef.current?.notificationAlert(options);
  };

  // SweetAlert
  const showSweetAlert = ({
    type = "info",
    title = "Aviso",
    message = "",
    confirmText = "Ok",
    cancelText = null,
    onConfirm = () => {},
    onCancel = () => {},
  }) => {
    setSweetAlert(
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px" }}
        title={title}
        onConfirm={() => {
          setSweetAlert(null);
          onConfirm();
        }}
        onCancel={() => {
          setSweetAlert(null);
          onCancel();
        }}
        showCancel={!!cancelText}
        confirmBtnBsStyle={type}
        confirmBtnText={confirmText}
        cancelBtnText={cancelText}
        btnSize=""
        {...(type !== "custom" ? { [type]: true } : {})}
      >
        {message}
      </ReactBSAlert>
    );
  };

  return (
    <UIContext.Provider value={{ notify, sweetAlert: showSweetAlert, openModal: setCustomModal }}>
      {children}
      {sweetAlert}
      <div className="rna-wrapper">
        <NotificationAlert ref={notificationRef} />
      </div>
      {/* Placeholder para modais custom futuros */}
      {customModal}
    </UIContext.Provider>
  );
};
