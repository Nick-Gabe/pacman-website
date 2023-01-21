import { Routes, Route, Outlet, Link } from "react-router-dom";
import maps from "../resources/maps.json";
import { Map } from "./environment/Map";

export const RouteManager = () => {
  return <Routes>
    <Route path="/map">
      {maps.map(map => {
        return (
          <Route key={map.id} path={map.id.toString()} element={<Map map={map.map} />} />
        );
      })}
    </Route>
  </Routes>;
};
