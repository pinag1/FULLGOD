import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { push as Menu } from "react-burger-menu";
import { useCookies } from "react-cookie";
import Modal from "react-modal";
import { Rnd } from "react-rnd";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import SidebarMenu from "./components/sidebar";
import SidebarMenuMobile from "./components/sidebarMobile";
import TopBar from "./components/topbar";
import MenuImage from "./images/Menu.png";
import Betify from "./pages/Betify";
import Leaderboard from "./pages/Leaderboard";
import Live from "./pages/Live";
import BonusBuyBattle from "./pages/MiniGames/BonusBuyBattle/BonusBuyBattle";
import BonusHunt from "./pages/MiniGames/BonusHunt/BonusHunt";
import BonusHuntChallenge from "./pages/MiniGames/BonusHuntChallenge/BonusHuntChallenge";

import KingOfTheHill from "./pages/MiniGames/KingOfTheHill/KingOfTheHill";
import Tournaments from "./pages/MiniGames/Tournament/Tournaments";

import Offers from "./pages/Offers";

const App = () => {
  const location = useLocation();

  const [isOpen, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    borderRadius: "20px",
  };
  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Faz a requisição ao backend
        const result = await axios.get("https://api.godmota.com/api/twitch");
        setData(result.data.data); // Define os dados da resposta no estado
      } catch (error) {
        console.error("Erro ao buscar dados da Twitch:", error);
        setError("Erro ao buscar dados da Twitch."); // Armazena a mensagem de erro
      }
    };

    fetchData();
  }, []);

  const [showRnd, setShowRnd] = useState(true);

  // Defina a rota onde você NÃO quer que o Rnd apareça
  const hiddenOnRoute = "/Live";

  useEffect(() => {
    // Atualize o estado baseado na rota atual
    if (location.pathname === hiddenOnRoute) {
      setShowRnd(false); // Oculta o Rnd
    } else {
      setShowRnd(true); // Mostra o Rnd
    }
  }, [location.pathname]); // Esse useEffect será executado sempre que a rota mudar

  const styleLogin = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [cookies, setCookie] = useCookies(["ageVerified"]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Verificar o cookie ao carregar o componente
  useEffect(() => {
    if (!cookies.ageVerified) {
      setIsModalOpen(true); // Abrir o modal automaticamente se o cookie não existir
      document.getElementsByClassName("App")[0].style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.getElementsByClassName("App")[0].style.overflow = "auto";
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "none";
    }
  }, [cookies]);

  const handleAgeVerification = () => {
    // Definir o cookie e fechar o modal
    setCookie("ageVerified", true, { path: "/", maxAge: 30 * 24 * 60 * 60 }); // Expiração em 30 dias
    setIsModalOpen(false);
  };

  // TopBar Scroll

  const [barVisibility, setBarVisibility] = useState(false);
  const [scrollPosition, setSrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    if (position >= 5) {
      setBarVisibility(true);
      setOpen(false);
    } else {
      setBarVisibility(false);
    }
    setSrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  document.addEventListener("keydown", function (e) {
    // F12
    if (e.key === "F12") {
      e.preventDefault();
    }
    // Ctrl + Shift + I
    if (e.ctrlKey && e.shiftKey && e.key === "I") {
      e.preventDefault();
    }
    // Ctrl + Shift + J
    if (e.ctrlKey && e.shiftKey && e.key === "J") {
      e.preventDefault();
    }
    // Ctrl + U
    if (e.ctrlKey && e.key === "U") {
      e.preventDefault();
    }
  });


  return (
    <div className="App d-flex flex-column">
      <div className="background"></div>
      <div className="AbsoluteFixWidth"></div>
      <Modal
        isOpen={isModalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => setIsModalOpen(false)}
        style={styleLogin}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={false}
        id="AgeVerification"
      >
        <div class="popup-content">
          <h2>Age Verification</h2>
          <p style={{ marginTop: "16px", marginBottom: "16px" }}>
            Please confirm that you are of legal age to enter this website.
          </p>
          <Button
            variant="light"
            className="ButtonWhite"
            onClick={handleAgeVerification}
          >
            I am 18 or older - Enter
          </Button>
          <Button
            href="https://google.pt"
            variant="light"
            className="ButtonWhite Outline"
          >
            I am under 18 - Exit
          </Button>
          <p className="PopupContentSmall">
            This website offers information and access to casino games and our
            services. To ensure that you are legally allowed to participate in
            gambling activities, we need to verify your age. Please be aware
            that gambling carries financial risks and can be addictive. It is
            crucial to gamble responsibly and only use funds you can afford to
            lose. If you have concerns about your gambling behavior or suspect
            you may have a gambling problem, please visit begambleaware.org.
            Gambling is intended for entertainment purposes only and is
            restricted to adults.
          </p>
        </div>
      </Modal>
      {data === 1 && showRnd && (
        <div className="sticky top-0 z-40 right-0 DraggableBox">
          <Rnd
            style={style}
            lockAspectRatio={true}
            bounds={".AbsoluteFixWidth"}
            maxWidth={1000}
            minWidth={250}
            default={{
              x: window.innerWidth - 430, // Largura do Rnd (400px) menos a margem da tela
              y: window.innerHeight - 254, // Altura do Rnd (224px) menos a margem da tela
              width: 400,
              height: 224,
            }}
          >
            <div className="MediaPlayerTwitchWrapper">
              <div className="MediaPlayerController">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-arrows-move"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 9l3 3l-3 3" />
                  <path d="M15 12h6" />
                  <path d="M6 9l-3 3l3 3" />
                  <path d="M3 12h6" />
                  <path d="M9 18l3 3l3 -3" />
                  <path d="M12 15v6" />
                  <path d="M15 6l-3 -3l-3 3" />
                  <path d="M12 3v6" />
                </svg>
              </div>
              <div className="MediaPlayer_Player">
                <iframe
                  src="https://player.twitch.tv/?channel=GODMOTA&parent=godmota.com"
                  autoPlay
                  frameBorder="0"
                  allowFullScreen={true}
                  scrolling="no"
                  height="100%"
                  width="100%"
                ></iframe>
              </div>
            </div>
          </Rnd>
        </div>
      )}
      <div
        id="TopBarContent"
        className={barVisibility ? "AnimationMobile" : ""}
      >
        <TopBar isLive={data}></TopBar>
        <div className="Burguer">
          <Menu
            customBurgerIcon={<img src={MenuImage} />}
            pageWrapId={"PageWrap"}
            isOpen={isOpen}
            onOpen={handleIsOpen}
            onClose={handleIsOpen}
            width={"260px"}
            left
          >
            <SidebarMenuMobile onClick={closeSideBar}></SidebarMenuMobile>
          </Menu>
        </div>
      </div>
      <div id="MainContent" onClick={closeSideBar}>
        <div id="ContainerFix">
          <SidebarMenu></SidebarMenu>
          <main id="PageWrap">
            <div id="Page">
            <Routes>
              {/* Redirect root path to /Offers */}
              <Route path="/" element={<Navigate replace to="/Offers" />} />
              
              {/* Actual routes */}
              <Route path="/Offers" element={<Offers />} />
              <Route path="/Betify" element={<Betify />} />
              <Route path="/Live" element={<Live />} />
              <Route path="/BonusHunt" element={<BonusHunt />} />
              <Route path="/KingOfTheHill" element={<KingOfTheHill />} />
              <Route path="/BonusBuyBattle" element={<BonusBuyBattle />} />
              <Route path="/Tournaments" element={<Tournaments />} />
              <Route path="/Leaderboard" element={<Leaderboard />} />
              <Route path="/BonusHuntChallenge" element={<BonusHuntChallenge />} />

              {/* Catch-all wildcard route for 404 */}
              <Route path="*" element={<Navigate replace to="/Offers" />} />
            </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
