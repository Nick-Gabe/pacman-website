import { useParams } from "react-router";
import { Map } from "../components/environment/Map";
import { InfoInterface } from "../components/interface";
import { GameContextProvider } from "../contexts/GameContext";
import { MapContextProvider } from "../contexts/MapContext";
import { PlayerContextProvider } from "../contexts/PlayerContext";
import maps from "../resources/maps.json";

export const MapPage = () => {
  const { id } = useParams();
  const selectedMap = maps.find(map => map.id == Number(id));

  return (
    <GameContextProvider>
      <MapContextProvider>
        <PlayerContextProvider>
          <div className="flex relative">
            {selectedMap ? (
              <>
                <Map map={selectedMap?.map} mapMetadata={selectedMap} />
                <InfoInterface />
              </>
            ) : (
              <h1 className="text-white text-3xl">
                Couldn't find a map matching the specified ID
              </h1>
            )}
          </div>
        </PlayerContextProvider>
      </MapContextProvider>
    </GameContextProvider>
  );
};
