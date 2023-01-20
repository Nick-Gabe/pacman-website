import { CSSProperties, useContext, useEffect, useState } from "react";
import { MapContext } from "../../contexts/MapContext";
import { numberToAxis } from "../../utils/numberToAxis";
import { toCapital } from "../../utils/strings";

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
      const borderRadius: Partial<
        Record<BorderDirections, CSSProperties["borderRadius"]>
      > = {};

      const createBorderRadius = (first: 'top' | 'bottom', second: 'left' | 'right') => {
        if (
          adjacentTiles?.[first] !== "wall" &&
          adjacentTiles?.[second] !== "wall"
        ) {
          const keyName = `border${toCapital(first)+toCapital(second)}Radius` as BorderDirections;
          borderRadius[keyName] = "50%";
        }
      };

      createBorderRadius('top', 'left');
      createBorderRadius('top', 'right');
      createBorderRadius('bottom', 'left');
      createBorderRadius('bottom', 'right');

      const adjacentTilesArray = Object.entries(adjacentTiles || {}).reduce(
        (acc: Record<string, string>, [key, value]) => {
          acc[`border${toCapital(key)}`] =
            value === "wall" ? "transparent" : "";
          return acc;
        },
        {}
      );

      return (
        <div
          style={{ ...adjacentTilesArray, ...borderRadius }}
          className={`bg-black border-[3px] border-blue w-7 h-7 shadow-lg shadow-blue`}
        ></div>
      );
    },
    empty: () => <div></div>,
    player: () => <div></div>,
    power: () => <div className={`m-auto bg-white rounded-full w-5 h-5`}></div>,
    points: () => <div className={`m-auto bg-white rounded-full w-1 h-1`}></div>
  };

  return tileTypes[props.type]();
};
