import "./tile.css";
import { GiTellerMine } from "react-icons/gi";

export default function Tile({ self, onclick }) {
  return (
    <div
      className={`tile ${self.revealed ? "show" : ""} ${
        self.content === "B" ? "mined" : ""
      }
  `}
      onClick={() => {
        onclick(self.coordinates);
      }}
    >
      {self.content === "B" ? (
        <GiTellerMine />
      ) : self.numberOfBombs > 0 ? (
        self.numberOfBombs
      ) : (
        " "
      )}
    </div>
  );
}
