type TileProps = {
  type: ValueOf<TileTypes>;
};

export const Tile = (props: TileProps) => {
  return props.type === 'wall' ? (
    <div
      className="bg-slate-400 w-10 h-10"
    ></div>
  ) : <div></div>;
};
