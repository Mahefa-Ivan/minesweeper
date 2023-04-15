import "./board-infobar.css";
import { BiBomb } from "react-icons/bi";
import Timer from "../timer/timer";
import Counter from "../counter/counter";

export default function BoardInfoBar({
  numberOfbombs,
  gameOver,
  onReset,
  seconds,
  setSeconds,
}) {
  return (
    <div className="board-infobar">
      <Counter icon={<BiBomb />} count={numberOfbombs} />
      <button onClick={onReset}>Reset</button>
      <Timer
        stopCondition={gameOver}
        seconds={seconds}
        setSeconds={setSeconds}
      />
    </div>
  );
}
