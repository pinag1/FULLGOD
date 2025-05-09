import { useEffect, useState } from "react";

const useScoreAnimation = (score) => {
  const [previousScore, setPreviousScore] = useState(score);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (score > previousScore) {
      setAnimationClass("increase");
    } else if (score < previousScore) {
      setAnimationClass("decrease");
    } else {
      setAnimationClass("none");
    }

    setPreviousScore(score);
  }, [score]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationClass("");
    }, 500);

    return () => clearTimeout(timeout);
  }, [animationClass]);

  return animationClass;
};

export default useScoreAnimation;
