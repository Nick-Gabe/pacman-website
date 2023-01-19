import React, { useContext, useEffect } from "react";
import { PlayerContext } from "../contexts/PlayerContext";
import { MapContext } from "../contexts/MapContext";

type PlayerProps = {};

export const Player = (props: PlayerProps) => {
  const { position, setPosition } = useContext(PlayerContext);
  const { getTile } = useContext(MapContext);

  const movePlayer = (event: KeyboardEvent) => {
      let row = position.row || 0;
      let column = position.column || 0;
      
      switch (event.key) {
        case "ArrowDown":
          row++;
          break;
        case "ArrowUp":
          row--;
          break;
        case "ArrowLeft":
          column--;
          break;
        case "ArrowRight":
          column++;
          break;
      }

      const tileToMove = getTile(column, row);
      if(tileToMove === 'wall') return;

      setPosition({ row, column });
    };

    useEffect(() => {
      document.onkeydown = movePlayer
    }, [])

  return <div className="w-10 h-10 bg-red-300"></div>;
};
