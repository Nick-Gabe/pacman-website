import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { MapContext } from "../../../contexts/MapContext";
import { numberToAxis } from "../../../utils/numberToAxis";
import { toCapital } from "../../../utils/strings";
import "./tile.css";
import { objFromArray } from "../../../utils/objFromArray";

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

type BorderDirections =
  | "borderBottomLeftRadius"
  | "borderBottomRightRadius"
  | "borderTopLeftRadius"
  | "borderTopRightRadius";

export const Tile = (props: TileProps) => {
  const { mapInfo, getTile } = useContext(MapContext);
  const [adjacentTiles, setAdjacentTiles] = useState<AdjacentTiles | null>(
    null
  );
  const { column, row } = numberToAxis(mapInfo, props.position);

  const createBorderRadius = useCallback((type: string) => {
    const possibleDirections = [
      ["top", "left"],
      ["top", "right"],
      ["bottom", "left"],
      ["bottom", "right"],
    ];

    const borders = possibleDirections.map(dir => {
      const [first, second] = dir as [Directions, Directions];
      const direction = toCapital(first) + toCapital(second);
      const keyName = `border${direction}Radius` as BorderDirections;

      if (
        adjacentTiles?.[first] !== type 
        && adjacentTiles?.[second] !== type) {
        return { [keyName]: "50%" };
      }
      return { [keyName]: "0%" };
    });

    return borders || [];
  }, [adjacentTiles]);

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
      const adjacentTilesArray = Object.entries(adjacentTiles || {}).reduce(
        (acc: Record<string, string>, [key, value]) => {
          acc[`border${toCapital(key)}`] =
            value === "wall" ? "transparent" : "";
          return acc;
        },
        {}
      );

      const borderRadius = objFromArray(createBorderRadius("wall"));

      return (
        <div
          style={{ ...adjacentTilesArray, ...borderRadius }}
          className={`bg-black border-[3px] border-blue w-7 h-7 shadow-lg shadow-blue z-10`}
        ></div>
      );
    },
    empty: () => <div></div>,
    player: () => <div></div>,
    power: () => (
      <div className={`power m-auto bg-white rounded-full w-5 h-5`}></div>
    ),
    points: () => (
      <div className={`point m-auto bg-white rounded-full w-1 h-1`}></div>
    ),
    ghostSpawn: () => {
      const borderRadius = objFromArray(createBorderRadius("ghostSpawn"));

      return (
        <div
          style={borderRadius}
          className={`m-auto bg-blue w-7 h-7 opacity-50 z-0`}
        ></div>
      );
    },
  };

  return tileTypes[props.type]();
};
