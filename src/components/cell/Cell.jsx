import cn from "classnames";

export const Cell = (props) => {
  const cellClass = cn("cell", { "cell-snake": props.isSnake, "bonus": props.isBonus });
  return <div className={cellClass}></div>;
};
