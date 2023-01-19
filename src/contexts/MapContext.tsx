import { PropsWithChildren, createContext, useState } from "react";

export type MapContextState = {
  mapInfo: {
    rows: number;
    columns: number;
    area: number;
    map: string[];
  };
  setMap: (map: string[]) => void;
  getTile: (column: number, row: number) => ValueOf<TileTypes>;
};

export const MapContext = createContext({} as MapContextState);

export const MapContextProvider: React.FC<PropsWithChildren> = props => {
  const [mapInfo, setMapInfo] = useState({} as MapContextState['mapInfo']);

  const setMap = (map: string[]) => {
    const columns = map[0].length;
    const rows = map.length;
    const area = columns * rows;

    setMapInfo({
      columns, rows, area, map
    })
  }

  const getTile: MapContextState["getTile"] = (column, row) => {
    const entityMap: TileTypes = {
      x: "wall",
      "-": "empty",
      o: "player",
    };

    const entity = mapInfo.map?.[row]?.[column] as keyof TileTypes;

    return (entityMap?.[entity] || 'empty') as ValueOf<TileTypes>;
  };

  return <MapContext.Provider value={{ mapInfo, setMap, getTile }}>{props.children}</MapContext.Provider>;
};
