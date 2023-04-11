import "./post-game.form.css";
import { useState } from "react";

export default function PostGameForm({ showModal, message }) {
  const [show, setShow] = useState(showModal);
  return (
    <>
      <div className="overlay"></div>
      <div className={`modal ${show ? "show" : ""}`}>
        <button
          className="modal__close-button"
          onClick={() => {
            setShow(false);
          }}
        >
          close
        </button>
        <div className="modal__header">
          <h3>{message}</h3>
        </div>
        <div className="modal__row">
          <span className="modal__row__label">Time: 0</span>
          <span className="modal__row__label">3BV: 0</span>
          <span className="modal__row__label">3BV/s: 0</span>
          <span className="modal__row__label">Date: 3rd july, 2023</span>
          <span className="modal__row__label">Player: Mahefa</span>
        </div>
        <div className="modal__buttons">
          <button>New game</button>
        </div>
      </div>
    </>
  );
}
