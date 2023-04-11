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

  const BOARD_PROPERTY_OBJECT = {
    dimensions: {
      row: 15,
      column: 30,
    },
    numberOfBombs: 50,
  };

  const [numberOfBombs, setNumberOfBombs] = useState(
    BOARD_PROPERTY_OBJECT.numberOfBombs
  );

  const EMPTY_BOARD = generateEmptyBoard(
    BOARD_PROPERTY_OBJECT.dimensions.row,
    BOARD_PROPERTY_OBJECT.dimensions.column
  );
  const BOMB_COORDINATES = generateMineCoordinates(
    BOARD_PROPERTY_OBJECT.numberOfBombs,
    BOARD_PROPERTY_OBJECT.dimensions.row,
    BOARD_PROPERTY_OBJECT.dimensions.column
  );

  mineTheBoard(BOMB_COORDINATES, EMPTY_BOARD);
  //this is the function that handles the way nearby bombs are counted
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
      BOARD_PROPERTY_OBJECT.dimensions.row *
        BOARD_PROPERTY_OBJECT.dimensions.column -
        BOARD_PROPERTY_OBJECT.numberOfBombs
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

  const resetFunction = () => {
    const NEW_BOARD = generateEmptyBoard(
      BOARD_PROPERTY_OBJECT.dimensions.row,
      BOARD_PROPERTY_OBJECT.dimensions.column
    );
    const BOMB_COORDINATES = generateMineCoordinates(
      BOARD_PROPERTY_OBJECT.numberOfBombs,
      BOARD_PROPERTY_OBJECT.dimensions.row,
      BOARD_PROPERTY_OBJECT.dimensions.column
    );
    mineTheBoard(BOMB_COORDINATES, NEW_BOARD);
    prepBoard(NEW_BOARD, BOMB_COORDINATES);
    console.log("infinite loop?");
    setGameOver(false);
    setBoard(NEW_BOARD);
  };

  const markFunction = (coordinates) => {
    const { x, y } = coordinates;
    board[x][y].marked = !board[x][y].marked;
    setBoard([...board]);
  };

  return (
    <div className="container">
      {/* <PostGameForm showModal={gameOver} message={"modal test"} /> */}
      <div className="wrapper">
        <Board
          board={board}
          revealFunction={revealTile}
          bombCountingFunction={setNumberOfBombs}
          markingFunction={markFunction}
          numberOfbombs={numberOfBombs}
        />
        <BoardInfoBar
          numberOfbombs={numberOfBombs}
          gameOver={gameOver}
          onReset={resetFunction}
        />
      </div>
    </div>
  );
}

export default App;
