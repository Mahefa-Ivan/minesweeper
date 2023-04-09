import "./board-infobar.css";
import { BiBomb } from "react-icons/bi";
import Timer from "../timer/timer";
import Counter from "../counter/counter";

export default function BoardInfoBar({ numberOfbombs, gameOver }) {
  return (
    <div className="board-infobar">
      <Counter icon={<BiBomb />} count={numberOfbombs} />
      <Timer stopCondition={gameOver} />
    </div>
  );
}
