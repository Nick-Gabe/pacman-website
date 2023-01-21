import { Map } from "./components/environment/Map";
import { InfoInterface } from "./components/interface";
import { Scoreboard } from "./components/interface/Scoreboard";
import { GameContextProvider } from "./contexts/GameContext";
import { MapContextProvider } from "./contexts/MapContext";
import { PlayerContextProvider } from "./contexts/PlayerContext";
import maps from "./resources/maps.json";

export default () => {
  return (
    <GameContextProvider>
      <MapContextProvider>
        <PlayerContextProvider>
          <div className="flex relative">
            <Map map={maps[1].map} />
            <InfoInterface/>
          </div>
        </PlayerContextProvider>
      </MapContextProvider>
    </GameContextProvider>
  );
};
