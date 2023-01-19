import { Map } from "./components/Map";
import { MapContextProvider } from "./contexts/MapContext";
import { PlayerContextProvider } from "./contexts/PlayerContext";

type AppProps = {};

export default (props: AppProps) => {
  return (
    <MapContextProvider>
      <PlayerContextProvider>
        <Map
          map={[
            "xxxxxxxxxxx",
            "x-x----xxxx",
            "x-x-xx----x",
            "x-xxx-xxx-x",
            "x-xxx-xxx-x",
            "x----o----x",
            "x-xxx-xxx-x",
            "x-xxx-xxx-x",
            "x---------x",
            "xx-------xx",
            "-xxxxxxxxx-",
          ]}
        />
      </PlayerContextProvider>
    </MapContextProvider>
  );
};
