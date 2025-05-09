import { useRef } from "react";

const useNotification = () => {
  const notificationAlertRef = useRef(null); // Usando o hook useRef para o NotificationAlert

  // Função para disparar notificações
  const notify = (type, message) => {
    if (notificationAlertRef.current) {
      notificationAlertRef.current.notificationAlert({
        place: "tc", // A posição da notificação (top center)
        message: <div>{message}</div>, // A mensagem a ser exibida
        type: type, // O tipo da notificação (ex: "success", "danger")
        icon: "ni ni-bell-55", // O ícone da notificação
        autoDismiss: 7, // Tempo em que a notificação desaparecerá (em segundos)
      });
    } else {
      console.error("Notification ref is not available"); // Mensagem de erro se o ref não estiver disponível
    }
  };

  return {
    notify,
    notificationAlertRef, // Retornando a referência
  };
};

export default useNotification;
