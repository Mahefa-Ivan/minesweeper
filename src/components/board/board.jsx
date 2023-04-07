import "./board.css";
import Tile from "../tile/tile";

export default function Board({ board, revealFunction }) {
  const renderBoardTiles = () => {
    const newBoard = [];
    for (let row of board) {
      newBoard.push(
        row.map((element, index) => {
          return <Tile self={element} key={index} onclick={revealFunction} />;
        })
      );
    }
    return newBoard;
  };
  return <div className="board">{renderBoardTiles()}</div>;
}
