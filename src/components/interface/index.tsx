import { MapInfo } from "./MapInfo";
import { Scoreboard } from "./Scoreboard";

export const InfoInterface = () => {
  return (
    <div className="absolute -right-52">
      <Scoreboard />
      <MapInfo />
    </div>
  );
};
