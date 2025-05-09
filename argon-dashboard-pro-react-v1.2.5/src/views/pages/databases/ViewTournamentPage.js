import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUI } from "../../../context/UIContext";
import { getUserData } from "../../../services/authService";
import { deleteTournament, getAllTournaments } from "../../../services/tournamentService";
import TournamentTable from "../tables/TournamentTable";

const ViewTournamentPage = () => {
  const navigate = useNavigate();
  const { notify, sweetAlert } = useUI();
  const [tournaments, setTournaments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const user = await getUserData();
        setIsAuthenticated(!!user);
      } catch {
        setIsAuthenticated(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getAllTournaments()
        .then((list) => {
          setTournaments(list);
          setFiltered(list);
        })
        .catch((err) => notify("danger", `Erro ao carregar torneios: ${err.message}`));
    }
  }, [isAuthenticated, notify]);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(
      tournaments.filter((t) => t.name.toLowerCase().includes(lower))
    );
  }, [search, tournaments]);

  const handleDelete = (t) => {
    sweetAlert({
      type: "warning",
      title: "Tem certeza?",
      message: "Isto vai apagar o torneio permanentemente.",
      confirmText: "Apagar",
      cancelText: "Cancelar",
      onConfirm: async () => {
        try {
          await deleteTournament(t.id);
          notify("success", "Torneio apagado com sucesso!");
          const list = await getAllTournaments();
          setTournaments(list);
          setSearch("");
        } catch (err) {
          notify("danger", `Erro ao apagar: ${err.message}`);
        }
      },
    });
  };

  const handleView = (t) => navigate(`/admin/tournaments/${t.id}/bracket`);

  if (isAuthenticated === false) return <Navigate to="/login" />;
  if (isAuthenticated === null) return <div>Carregando...</div>;

  return (
    <div className="content">

      
      <TournamentTable
        tournaments={filtered}
        onView={handleView}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ViewTournamentPage;
