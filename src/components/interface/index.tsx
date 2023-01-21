import { MapInfo } from "./MapInfo";
import { Scoreboard } from "./Scoreboard";

export const InfoInterface = () => {
  return (
    <div className="fixed flex flex-col left-10 gap-10 top-10">
      <Scoreboard />
      <MapInfo />
    </div>
  );
};
