import { useEffect, useState } from "react";
import { fetchBonusHuntSummary } from "../services/bonusHuntService";

const useBonusHuntSummaries = (bonusHuntList) => {
  const [summaries, setSummaries] = useState({});

  useEffect(() => {
    const loadSummaries = async () => {
      const newSummaries = {};
      for (const hunt of bonusHuntList) {
        if (!hunt?.id) continue;
        try {
          const summary = await fetchBonusHuntSummary(hunt.id);
          newSummaries[hunt.id] = summary;
        } catch (err) {
          console.error("Erro ao carregar summary do hunt:", hunt.id, err);
        }
      }
      setSummaries(newSummaries);
    };

    if (bonusHuntList.length > 0) {
      loadSummaries();
    }
  }, [bonusHuntList]);

  return summaries;
};

export default useBonusHuntSummaries;
