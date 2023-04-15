import { BsClock } from "react-icons/bs";
import { useEffect } from "react";
import "./timer.css";

export default function Timer({ stopCondition, seconds, setSeconds }) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (!stopCondition) {
        setSeconds(seconds + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, stopCondition, setSeconds]);

  return (
    <div className="timer">
      {<BsClock />}
      <span className="timer__seconds">{seconds}</span>
    </div>
  );
}
