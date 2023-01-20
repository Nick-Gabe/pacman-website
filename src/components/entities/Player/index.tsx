import { useCallback, useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../../../contexts/PlayerContext";
import { MapContext } from "../../../contexts/MapContext";
import "./player.css";

type PlayerProps = {};

export const Player = (props: PlayerProps) => {
  const { position, setPosition, lastDirection, setDirection } =
    useContext(PlayerContext);
  const playerRef = useRef<HTMLDivElement>(null);

  const { getTile } = useContext(MapContext);

  const movePlayer = (event: KeyboardEvent) => {
    let row = position.row || 0;
    let column = position.column || 0;
    let direction: Directions = "left";

    switch (event.key) {
      case "ArrowDown":
        row++;
        direction = "bottom";
        break;
      case "ArrowUp":
        row--;
        direction = "top";
        break;
      case "ArrowLeft":
        column--;
        direction = "left";
        break;
      case "ArrowRight":
        column++;
        direction = "right";
        break;
    }

    const tileToMove = getTile(column, row);
    if (tileToMove === "wall") return;

    setDirection(direction);
    setPosition({ row, column });
  };

  useEffect(() => {
    document.onkeydown = movePlayer;
  }, []);

  return (
    <div
      ref={playerRef}
      data-direction={lastDirection}
      className="player w-10 h-10 bg-yellow rounded-full flex items-center justify-center relative rotate-[var(--angle)]"
    ></div>
  );
};
