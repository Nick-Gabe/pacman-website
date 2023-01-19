import { MapContextState } from "../contexts/MapContext";

export const numberToAxis = (map: MapContextState['mapInfo'], number: number) => {
  const row = Math.floor(number / map.columns);
  const column = number % map.columns;

  return { row, column }
}
