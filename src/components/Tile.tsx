import { useContext, useEffect, useState } from "react";
import { MapContext } from "../contexts/MapContext";
import { numberToAxis } from "../utils/numberToAxis";
import { toCapital } from "../utils/strings";

type TileProps = {
  type: ValueOf<TileTypes>;
  position: number;
};

type AdjacentTiles = {
  top: ValueOf<TileTypes>;
  bottom: ValueOf<TileTypes>;
  left: ValueOf<TileTypes>;
  right: ValueOf<TileTypes>;
};

export const Tile = (props: TileProps) => {
  const { mapInfo, getTile } = useContext(MapContext);
  const [adjacentTiles, setAdjacentTiles] = useState<AdjacentTiles | null>(
    null
  );
  const { column, row } = numberToAxis(mapInfo, props.position);

  useEffect(() => {
    const tileAbove = getTile(column, row - 1);
    const tileBelow = getTile(column, row + 1);
    const tileAtLeft = getTile(column - 1, row);
    const tileAtRight = getTile(column + 1, row);

    setAdjacentTiles({
      top: tileAbove,
      bottom: tileBelow,
      left: tileAtLeft,
      right: tileAtRight,
    });
  }, []);

  const tileTypes: Record<ValueOf<TileTypes>, () => JSX.Element> = {
    wall: () => {
      const adjacentTilesArray = Object.entries(adjacentTiles || {})
      .reduce(
        (acc: Record<string, string>, [key, value]) => {
          acc[`border${toCapital(key)}`] =
            value === "wall" ? "transparent" : "";
          return acc;
        },
        {}
      );

      return (
        <div
          style={adjacentTilesArray}
          className={`bg-black border-[3px] border-blue w-10 h-10`}
        ></div>
      );
    },
    empty: () => <div></div>,
    player: () => <div></div>,
  };

  return tileTypes[props.type]();
};
