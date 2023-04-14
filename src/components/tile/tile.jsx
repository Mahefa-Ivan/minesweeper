import "./tile.css";
import { GiTellerMine } from "react-icons/gi";
import { TfiFlag } from "react-icons/tfi";

export default function Tile({
  self,
  onclick,
  handelRightClick,
  handleMaintainedClick,
}) {
  const getClassName = () => {
    let className = "";
    if (self.revealed) {
      className += " show";
    }
    if (self.content === "B") {
      className += " mined";
    }
    if (self.marked && !self.revealed) {
      className += " marked";
    }
    return `tile ${className} tile--${self.numberOfBombs}`;
  };

  const getContent = () => {
    /* if tile has a bomb show a bomb icon else show the number of nearby bomb or nothing if no nearby bombs */
    if (self.marked && !self.revealed) {
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

  /*  clicker.mousedown(function(){
    timeout = setInterval(function(){
        clicker.text(count++);
    }, 500);

    return false;
  });

  $(document).mouseup(function(){
      clearInterval(timeout);
      return false;
  }); */

  return (
    <div
      className={getClassName()}
      onContextMenu={(event) => {
        event.preventDefault();
        handelRightClick(self.coordinates);
      }}
      onClick={(event) => {
        if (event.shiftKey && self.revealed) {
          handleMaintainedClick(self.coordinates);
        }
        if (!self.marked) {
          onclick(self.coordinates);
        }
      }}
    >
      {getContent()}
    </div>
  );
}
