import { Link } from "react-router-dom";
import maps from "../../../resources/maps.json";
import "./mapList.css";

type MapListProps = {
  search: string;
  className?: string;
};

export const MapList = (props: MapListProps) => {
  return (
    <div className={props.className}>
    <table className="text-left mt-5 w-[90vw] max-w-[800px]">
      <thead>
        <th>Id</th>
        <th>Map Name</th>
        <th>Author</th>
      </thead>
      <tbody>
        {maps.map(map => {
          if (
            !Object.values(map).some(value =>
              value.toString().includes(props.search.trim())
            )
          )
            return null;

          return (
            <tr>
              <td>{map.id}</td>
              <td className="text-cyan">
                <Link to={`/map/${map.id}`}>{map.name}</Link>
              </td>
              <td>{map.author}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
};
