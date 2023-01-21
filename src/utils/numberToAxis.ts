import { MapContextState } from "../contexts/MapContext";

export type Axis = {
  column: number;
  row: number;
}

export const numberToAxis = (map: MapContextState['mapInfo'], number: number): Axis => {
  const row = Math.floor(number / map.columns);
  const column = number % map.columns;

  return { row, column }
}

export const axisToNumber = (map: MapContextState['mapInfo'], axis: Axis) => {
  const row = Math.floor(axis.row * map.columns);
  const column = axis.column * map.columns;

  return row + column
}
