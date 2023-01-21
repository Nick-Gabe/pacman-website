import { PropsWithChildren, createContext, useContext, useReducer, useState } from "react";
import { entityMap } from "../resources/entities";
import { Axis } from "../utils/numberToAxis";
import { GameContext } from "./GameContext";

export type MapContextState = {
  mapInfo: {
    rows: number;
    columns: number;
    area: number;
    map: string[];
  };
  pointsEaten: Axis[];
  eatPoint: (position: Axis) => void;
  setMap: (map: string[]) => void;
  getTile: (column: number, row: number) => ValueOf<TileTypes>;
};

export const MapContext = createContext({} as MapContextState);

export const MapContextProvider: React.FC<PropsWithChildren> = props => {
  const { setScore } = useContext(GameContext);

  const [mapInfo, setMapInfo] = useState({} as MapContextState["mapInfo"]);
  const [pointsEaten, addPointEaten] = useReducer(
    (state: MapContextState["pointsEaten"], action: Axis) => {
      state.push(action);
      return state;
    },
    []
  );

  const setMap = (map: string[]) => {
    const sortByBiggestStr = (a: string, b: string) => a.length <= b.length ? 1 : -1;
    const columns = map.sort(sortByBiggestStr)[0].length;
    map = map.map(x => x.padEnd(columns, '-'));
    
    const rows = map.length;
    const area = columns * rows;

    setMapInfo({
      columns,
      rows,
      area,
      map,
    });
  };

  const getTile: MapContextState["getTile"] = (column, row) => {
    const entity = mapInfo.map?.[row]?.[column] as keyof TileTypes;

    return (entityMap?.[entity] || "empty") as ValueOf<TileTypes>;
  };

  const eatPoint = (position: Axis) => {
    const hasBeenEaten = pointsEaten.some(point => {
      return point.row === position.row && point.column === position.column
    })

    if(hasBeenEaten) return;
    
    const tile = getTile(position.column, position.row);

    const tilePointsList: Record<ValueOf<TileTypes>, number> = {
      points: 10,
      power: 50
    }

    const tilePoints = tilePointsList?.[tile];
    if(tilePoints) {
      addPointEaten(position);
      setScore((score) => score + tilePoints)
    }
  };

  return (
    <MapContext.Provider
      value={{ mapInfo, setMap, getTile, pointsEaten, eatPoint }}
    >
      {props.children}
    </MapContext.Provider>
  );
};
