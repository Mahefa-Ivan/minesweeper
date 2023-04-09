import "./board-header.css";

export default function BoardHeader({ numberOfbombs, message }) {
  return (
    <header className="board-header">
      <div className="bombs-counter">{numberOfbombs}</div>
      <div className="center">{message !== "" ? message : "On going"}</div>
      <div className="timer-wrapper">pretend this is a timer</div>
    </header>
  );
}
