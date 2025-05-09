// src/hooks/useBracketLogic.js
import { useEffect, useState } from 'react';
import { useUI } from '../context/UIContext';
import * as tourSrv from '../services/tournamentService';

export default function useBracketLogic(tournamentId) {
  const { notify } = useUI();
  const [participants, setParticipants] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [p, m] = await Promise.all([
        tourSrv.fetchParticipants(tournamentId),
        tourSrv.fetchMatches(tournamentId),
      ]);
      setParticipants(p);
      setMatches(m);
    } catch {
      notify('danger', 'Erro ao carregar bracket');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tournamentId) load();
  }, [tournamentId]);

  const updateScore = async (matchId, score) => {
    await tourSrv.updateMatchResult(tournamentId, matchId, score);
    notify('success', 'Score atualizado');
    load();
  };

  return { participants, matches, loading, updateScore };
}
