import { Route, Routes } from "react-router";
import { MapPage } from "./pages/map";
import { HomePage } from "./pages/home";

export default () => {
  return (
    <Routes>
      <Route path="map/:id" element={<MapPage/>}/>
      <Route path="/" element={<HomePage/>}/>
    </Routes>
  );
};
