import axios from "axios";
import { useEffect, useState } from "react";

const useMockData = true;
const useLeaderboardData = (mockData) => {
  const [data, setData] = useState(useMockData ? mockData : null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refreshInterval = 60000;
  useEffect(() => {
    let intervalId;
    const fetchData = async () => {
      try {
        const startTimestamp = 1740787200;
        const endTimestamp = 1745001599;
        const result = await axios.get(`https://api.godmota.com/api/race`, {
          params: {
            start_timestamp: startTimestamp,
            end_timestamp: endTimestamp,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });

        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    intervalId = setInterval(fetchData, refreshInterval);

    return () => clearInterval(intervalId);
  }, [useMockData]);

  return { data, loading, error };
};

export default useLeaderboardData;
