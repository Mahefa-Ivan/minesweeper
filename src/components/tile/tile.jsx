import "./tile.css";
import { GiTellerMine } from "react-icons/gi";
import { TfiFlag } from "react-icons/tfi";

export default function Tile({ self, onclick, handelRightClick }) {
  const getClassName = () => {
    let className = "";
    if (self.revealed) {
      className += " show";
    }
    if (self.content === "B") {
      className += " mined";
    }
    /*  if (self.marked) {
      className += " marked";
    } */
    return `tile ${className} tile--${self.numberOfBombs}`;
  };

  const getContent = () => {
    /* if tile has a bomb show a bomb icon else show the number of nearby bomb or nothing if no nearby bombs */
    if (self.marked) {
      return <TfiFlag />;
    }
    if (self.content === "B") {
      return <GiTellerMine />;
    }
    if (self.numberOfBombs > 0) {
      return self.numberOfBombs;
    }
    return " ";
  };

  return (
    <div
      onContextMenu={(event) => {
        event.preventDefault();
        handelRightClick(self.coordinates);
      }}
      className={getClassName()}
      onClick={() => {
        if (!self.marked) {
          onclick(self.coordinates);
        }
      }}
    >
      {getContent()}
    </div>
  );
}
