import "./board.css";
import Tile from "../tile/tile";

export default function Board({
  board,
  onTileClicked,
  onTileRightClicked,
  onTileMaintainedClick,
}) {
  const renderBoardTiles = () => {
    //map the board to the view
    const viewBoard = [];
    for (let row of board) {
      viewBoard.push(
        row.map((element, index) => {
          return (
            <Tile
              self={element}
              key={index}
              onclick={onTileClicked}
              handelRightClick={onTileRightClicked}
              handleMaintainedClick={onTileMaintainedClick}
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
