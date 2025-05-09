import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Only run the effect if window is available (client-side)
    if (typeof window !== "undefined") {
      // Set initial state based on the current window size
      handleResize();

      // Add event listener for resize event
      window.addEventListener("resize", handleResize);

      // Clean up the event listener on component unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty dependency array to run once after initial render

  return isMobile;
};

export default useIsMobile;
