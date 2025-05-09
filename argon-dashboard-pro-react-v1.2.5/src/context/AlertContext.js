// context/AlertContext.js
import { createContext, useContext, useState } from "react";
import ReactBSAlert from "react-bootstrap-sweetalert";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = ({
    type = "info", // info, success, warning, danger
    title = "",
    message = "",
    onConfirm = null,
    confirmText = "Ok",
  }) => {
    setAlert(
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px" }}
        title={title}
        onConfirm={() => {
          if (onConfirm) onConfirm();
          setAlert(null);
        }}
        confirmBtnBsStyle={type}
        confirmBtnText={confirmText}
        btnSize=""
        {...(type !== "custom" ? { [type]: true } : {})}
      >
        {message}
      </ReactBSAlert>
    );
  };

  const hideAlert = () => setAlert(null);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert}
    </AlertContext.Provider>
  );
};
