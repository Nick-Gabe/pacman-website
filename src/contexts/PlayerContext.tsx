import React, {
  PropsWithChildren,
  createContext,
  useReducer,
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

  const setInitialPosition: PlayerContextState['setInitialPosition'] = (map) => {
    const initialRow = map.findIndex(row => row.includes("o"));
    const initialCol = map[initialRow].indexOf("o");

    setPosition({
      row: initialRow,
      column: initialCol,
    });
  };

  return (
    <PlayerContext.Provider value={{ position, setPosition, setInitialPosition }}>
      {props.children}
    </PlayerContext.Provider>
  );
};
