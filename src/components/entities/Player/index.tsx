import { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "../../../contexts/PlayerContext";
import { MapContext } from "../../../contexts/MapContext";
import "./player.css";
import { Axis } from "../../../utils/numberToAxis";

type PlayerProps = {};

export const Player = (props: PlayerProps) => {
  const { position, setPosition, movement, setMovement } =
    useContext(PlayerContext);
  const playerRef = useRef<HTMLDivElement>(null);
  const [pressedDirection, setPressedDirection] = useState<Directions | null>(
    null
  );
  const { mapInfo, getTile, eatPoint } = useContext(MapContext);

  const movePlayer = () => {
    const calculateNextPosition = (direction: Directions | null) => {
      let row = position.row || 0;
      let column = position.column || 0;

      switch (direction) {
        case "bottom":
          row++;
          break;
        case "top":
          row--;
          break;
        case "left":
          column--;
          break;
        case "right":
          column++;
          break;
      }

      return { column, row };
    };

    let nextPosition = calculateNextPosition(pressedDirection);
    const tileToMove = getTile(
      nextPosition.column,
      nextPosition.row
    );
    let nextTileIsWall = false;

    if (tileToMove === "wall") {
      nextTileIsWall = true;
      nextPosition = calculateNextPosition(movement.lastDirection);
      const tileToMove = getTile(nextPosition.column, nextPosition.row);

      if (tileToMove === "wall") {
        setMovement({
          isMoving: false,
        });
        return;
      };
    }

    setMovement({
      lastDirection: nextTileIsWall ? movement.lastDirection : pressedDirection,
      isMoving: true,
    });
    setPosition({
      row: nextPosition.row,
      column: nextPosition.column,
    });
  };

  useEffect(() => {
    document.onkeydown = (event: KeyboardEvent) => {
      let directions: Record<KeyboardEvent["key"], Directions> = {
        ArrowDown: "bottom",
        ArrowUp: "top",
        ArrowLeft: "left",
        ArrowRight: "right",
      };

      const direction = directions[event.key];
      if (!direction) return;

      setPressedDirection(direction);
    };
  }, []);

  useEffect(() => {
    const loop = setInterval(() => movePlayer(), 200);
    return () => clearInterval(loop);
  }, [movePlayer]);

  useEffect(() => {
    eatPoint(position as Axis)
  }, [position])

  return (
    <div
      ref={playerRef}
      data-direction={movement.lastDirection}
      data-moving={movement.isMoving}
      style={{
        top: (position.row || 0) * 1.75 + "rem",
        left: (position.column || 0) * 1.75 + "rem",
      }}
      className={`player w-7 h-7 bg-yellow rounded-full flex items-center justify-center absolute rotate-[var(--angle)] z-50`}
    ></div>
  );
};
