import { useState } from "react";

import Board from "./components/board/board";
import BoardInfoBar from "./components/board-infobar/board-infobar";

import {
  BsEmojiSmileFill,
  BsEmojiDizzyFill,
  BsEmojiSunglassesFill,
} from "react-icons/bs";

import {
  generateEmptyBoard,
  generateMineCoordinates,
  mineTheBoard,
} from "./utils/boardCreation";

import { getNeighbors, countNearbybombs } from "./utils/boardManipulation";

function App() {
  const assignCellBombCount = (defaultBoard, bombsCoordinates) => {
    for (let coordinates of bombsCoordinates) {
      countNearbybombs(coordinates.x, coordinates.y, defaultBoard);
    }
  };

  //an object that defines how the board should look like
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
  assignCellBombCount(EMPTY_BOARD, BOMB_COORDINATES);

  const [board, setBoard] = useState(EMPTY_BOARD);
  const [gameOver, setGameOver] = useState(false);
  const [gameState, setGameState] = useState("");

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

  const allSafeSquareClicked = () => {
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

  const handleTileClicked = (coordinates) => {
    if (gameOver) {
      return;
    }
    if (board[coordinates.x][coordinates.y].content === "B") {
      setGameState("game over");
      revealAllBombs(BOMB_COORDINATES);
      setGameOver(true);
    }
    explore(coordinates.x, coordinates.y);
    const newBoard = [...board];
    setBoard(newBoard);
    if (allSafeSquareClicked()) {
      setGameState("you win");
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
    setGameState(" ");
    setNumberOfBombs(BOARD_PROPERTY_OBJECT.numberOfBombs);

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
    assignCellBombCount(NEW_BOARD, BOMB_COORDINATES);

    setGameOver(false);
    setBoard(NEW_BOARD);
  };

  const handleTileRightClicked = (coordinates) => {
    if (gameOver) {
      return;
    }
    const { x, y } = coordinates;
    if (board[x][y].marked) {
      setNumberOfBombs(numberOfBombs + 1);
    } else {
      setNumberOfBombs(numberOfBombs - 1);
    }
    board[x][y].marked = !board[x][y].marked;
    setBoard([...board]);
  };

  const handleMaintainedClick = (coordinates) => {
    const { x, y } = coordinates;
    const neighbors = getNeighbors(x, y, board);
    let counter = 0;
    for (let neighbor of neighbors) {
      if (board[neighbor[0]][neighbor[1]].marked) {
        counter += 1;
      }
    }
    if (counter === board[x][y].numberOfBombs) {
      for (let neighbor of neighbors) {
        if (board[neighbor[0]][neighbor[1]].content === "B") {
          setGameState("game over");
          revealAllBombs(BOMB_COORDINATES);
          setGameOver(true);
        }
        if (!board[neighbor[0]][neighbor[1]].marked) {
          board[neighbor[0]][neighbor[1]].revealed = true;
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="game-state-message">
          {gameState === "game over" ? (
            <BsEmojiDizzyFill />
          ) : gameState === "you win" ? (
            <BsEmojiSunglassesFill />
          ) : (
            <BsEmojiSmileFill />
          )}
        </div>
        <Board
          board={board}
          onTileClicked={handleTileClicked}
          onTileMaintainedClick={handleMaintainedClick}
          bombCountingFunction={setNumberOfBombs}
          onTileRightClicked={handleTileRightClicked}
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
