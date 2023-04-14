import { BsClock } from "react-icons/bs";
import { useState, useEffect } from "react";
import "./timer.css";

export default function Timer({ stopCondition, time }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!stopCondition) {
        setSeconds(seconds + 1);
      } else {
        setSeconds(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, stopCondition]);

  return (
    <div className="timer">
      {<BsClock />}
      <span className="timer__seconds">{seconds}</span>
    </div>
  );
}
