import { useContext, useEffect } from "react";
import { Player } from "./Player";
import { Tile } from "./Tile";
import { PlayerContext } from "../contexts/PlayerContext";
import { MapContext } from "../contexts/MapContext";
import { numberToAxis } from "../utils/numberToAxis";

type MapProps = {
  map: string[];
};

export const Map = (props: MapProps) => {
  const { position, setInitialPosition } = useContext(PlayerContext);
  const { mapInfo, setMap, getTile } = useContext(MapContext);
  const { map } = props;
  
  useEffect(() => {
    setMap(map);
    setInitialPosition(map);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${mapInfo.columns}, 1fr)`,
        gridTemplateRows: `repeat(${mapInfo.rows}, 1fr)`,
      }}
    >
      {mapInfo.map
        ? new Array(mapInfo.area).fill(0).map((x, i) => {
            const { row, column } = numberToAxis(mapInfo, i);
            const tile = getTile(column, row);

            if (position.column === column && position.row === row) {
              return <Player />;
            }

            return <Tile key={'tile'+i} type={tile} />;
          })
        : null}
    </div>
  );
};