import { useState } from "react";
import { MapList } from "../components/interface/MapList";
import { Credits } from "../components/interface/Credits";

export const HomePage = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="text-white text-4xl font-VT323 text-center">
      <h1 className="text-9xl">Pac-Man</h1>
      <p>A game made using React</p>
      <Credits />
      <main className="flex flex-col mt-10">
        <input
          className="text-black pl-3"
          type="text"
          name="mapSearch"
          value={search}
          onChange={x => setSearch(x.target.value)}
          placeholder="Search for a Map..."
        />
        <MapList search={search} className="h-[50vh] overflow-scroll" />
      </main>
    </div>
  );
};
