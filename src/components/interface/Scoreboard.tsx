import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";

export const Scoreboard = () => {
  const { score } = useContext(GameContext);

  return (
    <div className="text-white font-VT323 font-bold text-5xl">
      <h2>Score</h2>
      <p>{score.toString().padStart(4, "0")}</p>
    </div>
  );
};
