import { useContext, useEffect } from "react";
import { Player } from "../entities/Player";
import { Tile } from "./Tile";
import { PlayerContext } from "../../contexts/PlayerContext";
import { MapContext } from "../../contexts/MapContext";
import { numberToAxis } from "../../utils/numberToAxis";

type MapProps = {
  map: string[];
};

export const Map = (props: MapProps) => {
  const { setInitialPosition } = useContext(PlayerContext);
  const { mapInfo, setMap, getTile } = useContext(MapContext);
  const { map } = props;

  useEffect(() => {
    setMap(map);
    setInitialPosition(map);
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

              return <Tile key={"tile" + i} type={tile} position={i} />;
            })
          : null}
      </div>
    </main>
  );
};
