import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";
import { MapContext, MapContextState } from "./MapContext";
import { genericReducer } from "../utils/genericReducer";

type InitialStateType = {
  column: number | null;
  row: number | null;
};

type Movement = {
  lastDirection: Directions | null;
  isMoving: boolean;
};

export type PlayerContextState = {
  position: InitialStateType;
  movement: Movement;
  setMovement: (dir: Partial<Movement>) => void;
  setPosition: ({
    column,
    row,
  }: Record<keyof InitialStateType, number>) => void;
  setInitialPosition: (map: MapContextState["mapInfo"]["map"]) => void;
};

export const PlayerContext = createContext({} as PlayerContextState);

export const PlayerContextProvider: React.FC<PropsWithChildren> = props => {
  const { mapInfo } = useContext(MapContext);

  const [position, setPosition] = useReducer(
    (state: InitialStateType, action: Partial<InitialStateType>) => {
      if (action.column) {
        if (action.column <= 0) action.column = mapInfo.columns;
        else if (action.column === mapInfo.columns) action.column = 0;
      }
      if (action.row) {
        if (action.row <= 0) action.row = mapInfo.rows;
        else if (action.row === mapInfo.rows) action.row = 0;
      }

      return {
        ...state,
        ...action,
      };
    },
    {
      column: 0,
      row: 0,
    }
  );

  const [movement, setMovement] = useReducer(genericReducer<Movement>, {
    lastDirection: null,
    isMoving: false,
  });

  const setInitialPosition: PlayerContextState["setInitialPosition"] = map => {
    const initialRow = map.findIndex(row => row.includes("o"));
    const initialCol = map[initialRow].indexOf("o");

    setPosition({
      row: initialRow,
      column: initialCol,
    });
  };

  return (
    <PlayerContext.Provider
      value={{
        position,
        setPosition,
        setInitialPosition,
        movement,
        setMovement,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};
