import { Route, Routes } from "react-router";
import { MapPage } from "./pages/map";

export default () => {
  return (
    <Routes>
      <Route path="map/:id" element={<MapPage/>}/>
    </Routes>
  );
};
