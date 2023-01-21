import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";

export const MapInfo = () => {
  const { mapMetadata } = useContext(GameContext);

  return (
    <div className="text-white font-VT323 font-bold text-3xl">
      <h2>Map Info</h2>
      <ul className="text-2xl">
        <li>- Id: {mapMetadata?.id}</li>
        <li>- Name: {mapMetadata?.name}</li>
        <li>- Author: {mapMetadata?.author}</li>
      </ul>
    </div>
  );
};
