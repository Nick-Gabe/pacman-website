import React, {
  PropsWithChildren,
  createContext,
  useReducer,
  useState,
} from "react";
import { MapContextState } from "./MapContext";

const initialState = {
  column: null,
  row: null,
};

type InitialStateType = {
  column: number | null;
  row: number | null;
};

export type PlayerContextState = {
  position: InitialStateType;
  lastDirection: Directions;
  setDirection: (dir: Directions) => void;
  setPosition: ({
    column,
    row,
  }: Record<keyof InitialStateType, number>) => void;
  setInitialPosition: (map: MapContextState['mapInfo']['map']) => void;
};

export const PlayerContext = createContext({
  position: initialState,
} as PlayerContextState);

export const PlayerContextProvider: React.FC<PropsWithChildren> = props => {
  const [position, setPosition] = useReducer<
    React.Reducer<InitialStateType, Partial<InitialStateType>>
  >((state, action) => {
    return {
      ...state,
      ...action,
    };
  }, initialState);
  const [lastDirection, setDirection] = useState<Directions>('left');

  const setInitialPosition: PlayerContextState['setInitialPosition'] = (map) => {
    const initialRow = map.findIndex(row => row.includes("o"));
    const initialCol = map[initialRow].indexOf("o");

    setPosition({
      row: initialRow,
      column: initialCol,
    });
  };

  return (
    <PlayerContext.Provider value={{ position, setPosition, setInitialPosition, lastDirection, setDirection }}>
      {props.children}
    </PlayerContext.Provider>
  );
};
