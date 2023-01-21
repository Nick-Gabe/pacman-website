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

  const [movement, setMovement] = useReducer(genericReducer<Movement>, {
    lastDirection: null,
    isMoving: false,
  });

  const [position, setPosition] = useReducer(
    (state: InitialStateType, action: Partial<InitialStateType>) => {
      const checkPlayerOutOfBorders = (pos: number, maxPos: number) => {
        if (pos !== null && pos !== undefined) {
          if (pos <= 0) pos = maxPos - 1;
          else if (pos > maxPos - 1) pos = 0;
        }
        return pos
      };

      action.column &&= checkPlayerOutOfBorders(action.column, mapInfo.columns);
      action.row &&= checkPlayerOutOfBorders(action.row, mapInfo.rows);

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

  const setInitialPosition: PlayerContextState["setInitialPosition"] = map => {
    const initialRow = map.findIndex(row => row.includes("o"));
    if(initialRow === -1) return alert('Player is missing');

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
