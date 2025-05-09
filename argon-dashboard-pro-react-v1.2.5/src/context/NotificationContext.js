// context/NotificationContext.js
import { createContext, useContext, useRef } from "react";
import NotificationAlert from "react-notification-alert";

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const notificationRef = useRef(null);

  const notify = (type = "info", message = "") => {
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

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="rna-wrapper">
        <NotificationAlert ref={notificationRef} />
      </div>
    </NotificationContext.Provider>
  );
};
