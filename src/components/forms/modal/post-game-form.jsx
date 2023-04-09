import "./post-game.form.css";

export default function PostGameForm({ showModal, message }) {
  return <div className={`modal ${showModal ? "show" : ""}`}>{message}</div>;
}
