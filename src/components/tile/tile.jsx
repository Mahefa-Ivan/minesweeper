import "./tile.css";
import { GiTellerMine } from "react-icons/gi";

export default function Tile({ self, onclick }) {
  const handleClick = (event) => {
    event.preventDefault();
    console.log(`right cliked: ${self}`);
  };

  const getClassName = () => {
    let className = "";
    if (self.revealed) {
      className += " show";
    }
    if (self.content === "B") {
      className += " mined";
    }
    return `tile ${className}`;
  };

  const getContent = () => {
    /* if tile has a bomb show a bomb icon else show the number of nearby bomb or nothing if no nearby bombs */
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
      onContextMenu={handleClick}
      className={getClassName()}
      onClick={() => {
        onclick(self.coordinates);
      }}
    >
      {getContent()}
    </div>
  );
}
