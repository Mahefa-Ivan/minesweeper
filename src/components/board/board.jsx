import "./board.css";
import Tile from "../tile/tile";

export default function Board({ board, revealFunction, markingFunction }) {
  const renderBoardTiles = () => {
    //map the board matrix to the view
    const viewBoard = [];
    console.log(board);
    for (let row of board) {
      viewBoard.push(
        row.map((element, index) => {
          return (
            <Tile
              self={element}
              key={index}
              onclick={revealFunction}
              handelRightClick={markingFunction}
            />
          );
        })
      );
    }
    return viewBoard;
  };

  return (
    <div
      className="board"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${board[0].length}, 2rem)`,
        gridTemplateRows: `repeat(${board.length}, 2rem)`,
      }}
    >
      {renderBoardTiles()}
    </div>
  );
}
