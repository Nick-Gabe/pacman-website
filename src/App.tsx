import { RouteManager } from "./components/RouteManager";
import { Map } from "./components/environment/Map";
import { InfoInterface } from "./components/interface";
import { GameContextProvider } from "./contexts/GameContext";
import { MapContextProvider } from "./contexts/MapContext";
import { PlayerContextProvider } from "./contexts/PlayerContext";

export default () => {
  return (
    <GameContextProvider>
      <MapContextProvider>
        <PlayerContextProvider>
          <div className="flex relative">
            <RouteManager />
            <InfoInterface />
          </div>
        </PlayerContextProvider>
      </MapContextProvider>
    </GameContextProvider>
  );
};
