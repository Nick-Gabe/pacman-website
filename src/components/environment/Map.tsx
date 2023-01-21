import { useContext, useEffect } from "react";
import { Player } from "../entities/Player";
import { Tile } from "./Tile";
import { PlayerContext } from "../../contexts/PlayerContext";
import { MapContext } from "../../contexts/MapContext";
import { numberToAxis } from "../../utils/numberToAxis";
import { GameContext } from "../../contexts/GameContext";

type MapProps = {
  map: string[];
  mapMetadata: {
    id: number;
    name: string;
    author: string;
  }
};

export const Map = (props: MapProps) => {
  const { setMapMetadata } = useContext(GameContext);
  const { setInitialPosition } = useContext(PlayerContext);
  const { mapInfo, setMap, getTile, pointsEaten } = useContext(MapContext);
  const { map, mapMetadata } = props;

  useEffect(() => {
    setMap(map);
    setInitialPosition(map);
    setMapMetadata(mapMetadata);
  }, []);

  return (
    <main className="relative">
      <Player />
      <div
        style={{
          gridTemplateColumns: `repeat(${mapInfo.columns}, 1fr)`,
          gridTemplateRows: `repeat(${mapInfo.rows}, 1fr)`,
        }}
        className="grid"
      >
        {mapInfo.map
          ? new Array(mapInfo.area).fill(0).map((x, i) => {
              const { row, column } = numberToAxis(mapInfo, i);
              const tile = getTile(column, row);

              const hasBeenEaten = pointsEaten.some(point => {
                return point.row === row && point.column === column
              })

              return !hasBeenEaten ? (
                <Tile key={"tile" + i} type={tile} position={i} />
              ) : (
                <div key={"tile" + i}></div>
              );
            })
          : null}
      </div>
    </main>
  );
};
