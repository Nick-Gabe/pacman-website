import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";

type GameContextState = {
  score: number;
  setScore: Dispatch<SetStateAction<GameContextState["score"]>>;
  mapMetadata: {
    id: number;
    name: string;
    author: string;
  } | null;
  setMapMetadata: Dispatch<SetStateAction<GameContextState["mapMetadata"]>>;
};

const initialState = {
  score: 0,
};

export const GameContext = createContext(initialState as GameContextState);

export const GameContextProvider: React.FC<PropsWithChildren> = props => {
  const [score, setScore] = useState(initialState.score);
  const [mapMetadata, setMapMetadata] = useState<GameContextState['mapMetadata']>(null);

  return (
    <GameContext.Provider value={{ score, setScore, mapMetadata, setMapMetadata }}>
      {props.children}
    </GameContext.Provider>
  );
};
