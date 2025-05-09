import { useEffect, useState } from "react";

const useMockData = false;
const useFetchData = (mockData, apiUrl) => {
  const [data, setData] = useState(useMockData ? mockData : null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (useMockData) {
          setData({ ...mockData });
        } else {
          const response = await fetch(apiUrl);

          if (!response.ok) {
            throw new Error("Erro na requisição da API");
          }
          const newData = await response.json();
          if (newData) {
            setData(newData);
            document.title = `${newData.gameName} - #${newData.gameNameNumber}`;
          } else {
            console.warn("A API não retornou dados!");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [useMockData, apiUrl]);

  return { data, loading, error };
};

export default useFetchData;
