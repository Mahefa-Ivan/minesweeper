import { useState } from "react";
import Board from "./components/board/board";
import BoardInfoBar from "./components/board-infobar/board-infobar";
import {
  generateEmptyBoard,
  generateMineCoordinates,
  mineTheBoard,
} from "./utils/boardCreation";

import { getNeighbors, countNearbybombs } from "./utils/boardManipulation";

function App() {
  const prepBoard = (defaultBoard, bombsCoordinates) => {
    for (let coordinates of bombsCoordinates) {
      countNearbybombs(coordinates.x, coordinates.y, defaultBoard);
    }
  };

  const BOARD_OJECT = {
    dimensions: {
      row: 15,
      column: 30,
    },
    numberOfBombs: 50,
  };

  const EMPTY_BOARD = generateEmptyBoard(
    BOARD_OJECT.dimensions.row,
    BOARD_OJECT.dimensions.column
  );
  const BOMB_COORDINATES = generateMineCoordinates(
    BOARD_OJECT.numberOfBombs,
    BOARD_OJECT.dimensions.row,
    BOARD_OJECT.dimensions.column
  );

  mineTheBoard(BOMB_COORDINATES, EMPTY_BOARD);
  prepBoard(EMPTY_BOARD, BOMB_COORDINATES);

  const [board, setBoard] = useState(EMPTY_BOARD);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("");

  const revealAllBombs = () => {
    for (let row of board) {
      for (let element of row) {
        if (element.content === "B") {
          element.revealed = true;
        }
      }
    }
    setBoard(...board);
  };

  const isAllSafeSquareRevealed = () => {
    let counter = 0;
    for (let row of board) {
      for (let element of row) {
        counter += element.revealed && element.content === " ";
      }
    }
    return (
      counter ===
      BOARD_OJECT.dimensions.row * BOARD_OJECT.dimensions.column -
        BOARD_OJECT.numberOfBombs
    );
  };

  const revealTile = (coordinates) => {
    if (gameOver) {
      return;
    }
    if (board[coordinates.x][coordinates.y].content === "B") {
      setGameOverMessage("Game over");
      revealAllBombs(BOMB_COORDINATES);
      setGameOver(true);
    }
    explore(coordinates.x, coordinates.y);
    const newBoard = [...board];
    setBoard(newBoard);
    if (isAllSafeSquareRevealed()) {
      setGameOverMessage("You win");
      setGameOver(true);
      return;
    }
  };

  //it's a dfs function that handles the way tiles and their neighbor are revealed when clicked on
  const explore = (x, y) => {
    let not_visited = getNeighbors(x, y, board);
    board[x][y].revealed = true;
    if (board[x][y].content === "B") {
      return false;
    }
    if (board[x][y].numberOfBombs > 0 || board[x][y].hasBeenVisited) {
      return true;
    }
    board[x][y].hasBeenVisited = true;
    for (let coord of not_visited) {
      explore(coord[0], coord[1]);
    }
    return true;
  };

  return (
    <div className="container">
      <div className="wrapper">
        <Board board={board} revealFunction={revealTile} />
        <BoardInfoBar
          numberOfbombs={BOARD_OJECT.numberOfBombs}
          gameOver={gameOver}
        />
        {/* <footer className="board-footer">
          <button
            className="regenerate-button"
            onClick={() => {
              setGameOver(false);
              setGameOverMessage("");
              const EMPTY_BOARD = generateEmptyBoard(
                BOARD_OJECT.dimensions.row,
                BOARD_OJECT.dimensions.column
              );
              const BOMB_COORDINATES = generateMineCoordinates(
                BOARD_OJECT.numberOfBombs,
                BOARD_OJECT.dimensions.row,
                BOARD_OJECT.dimensions.column
              );
              mineTheBoard(BOMB_COORDINATES, EMPTY_BOARD);
              prepBoard(EMPTY_BOARD, BOMB_COORDINATES);
              setBoard(EMPTY_BOARD);
            }}
          >
            Regenerate
          </button>
        </footer> */}
      </div>
    </div>
  );
}

export default App;
