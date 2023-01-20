import { Map } from "./components/environment/Map";
import { MapContextProvider } from "./contexts/MapContext";
import { PlayerContextProvider } from "./contexts/PlayerContext";
import maps from './resources/maps.json';

type AppProps = {};

export default (props: AppProps) => {
  return (
    <MapContextProvider>
      <PlayerContextProvider>
        <Map
          map={maps[1].map}
        />
      </PlayerContextProvider>
    </MapContextProvider>
  );
};
