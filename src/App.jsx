import { useState } from "react";

import Board from "./components/board/board";
import BoardInfoBar from "./components/board-infobar/board-infobar";

import {
  BsEmojiSmileFill,
  BsEmojiDizzyFill,
  BsEmojiSunglassesFill,
} from "react-icons/bs";

import { getNeighbors, createNewBoard } from "./utils/boardCreation";

import { revealAllBombs } from "./utils/boardManipulation";

function App() {
  //an object that defines how the board should look like
  const BOARD_PROPERTY_OBJECT = {
    dimensions: {
      row: 15,
      column: 30,
    },
    numberOfBombs: 80,
  };

  const [seconds, setSeconds] = useState(0);
  const [numberOfBombs, setNumberOfBombs] = useState(
    BOARD_PROPERTY_OBJECT.numberOfBombs
  );

  const BOARD_OBJECT = createNewBoard(BOARD_PROPERTY_OBJECT);

  const [board, setBoard] = useState(BOARD_OBJECT.board);
  const [gameOver, setGameOver] = useState(false);
  const [gameState, setGameState] = useState("");

  const allSafeSquareRevealed = () => {
    let counter = 0;
    for (let row of board) {
      for (let element of row) {
        //add 1 if the tile is revealed and doesnt have any bomb in it
        counter += element.revealed && element.content === " ";
      }
    }

    //number of safe square = total number of square - number of bombs
    return (
      counter ===
      BOARD_PROPERTY_OBJECT.dimensions.row *
        BOARD_PROPERTY_OBJECT.dimensions.column -
        BOARD_PROPERTY_OBJECT.numberOfBombs
    );
  };

  const endGame = () => {
    setGameState("game over");
    setBoard(revealAllBombs(board));
    setGameOver(true);
  };

  const handleTileClicked = (coordinates) => {
    if (!gameOver) {
      if (board[coordinates.x][coordinates.y].revealed) {
        chord(coordinates);
      }

      //user got blown up?
      if (board[coordinates.x][coordinates.y].content === "B") {
        endGame();
      }

      //reveal all empty tiles up to the closest one with numberOfBomb > 0
      explore(coordinates.x, coordinates.y);
      setBoard([...board]);

      if (allSafeSquareRevealed()) {
        setGameState("you win");
        setGameOver(true);
      }
    }
  };

  /*chording in minesweeper is the act of clicking on an uncovered square to
  uncover all eight adjacent squares if it has the correct number of flags (marked cells).*/
  const chord = (coordinates) => {
    const { x, y } = coordinates;
    const neighbors = getNeighbors(x, y, board);
    let counter = 0;

    for (let neighbor of neighbors) {
      if (
        board[neighbor[0]][neighbor[1]].marked &&
        !board[neighbor[0]][neighbor[1]].revealed
      ) {
        counter += 1;
      }
    }

    if (counter === board[x][y].numberOfBombs) {
      for (let neighbor of neighbors) {
        if (
          board[neighbor[0]][neighbor[1]].content === "B" &&
          !board[neighbor[0]][neighbor[1]].marked
        ) {
          endGame();
        }
        if (!board[neighbor[0]][neighbor[1]].marked) {
          board[neighbor[0]][neighbor[1]].revealed = true;
        }
      }
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
    //reveal the clicked square and every other square up to the nearest one with a number of bombs > 0
    for (let coord of not_visited) {
      explore(coord[0], coord[1]);
    }
    return true;
  };

  const resetFunction = () => {
    //everything goes back to default
    const BOARD_OBJECT = createNewBoard(BOARD_PROPERTY_OBJECT);
    setGameState(" ");
    setNumberOfBombs(BOARD_PROPERTY_OBJECT.numberOfBombs);
    setGameOver(false);
    setBoard(BOARD_OBJECT.board);
    setSeconds(0);
  };

  const handleTileRightClicked = (coordinates) => {
    //flag the square if its not revealed
    if (!gameOver && !board[coordinates.x][coordinates.y].revealed) {
      const { x, y } = coordinates;
      if (board[x][y].marked) {
        setNumberOfBombs(numberOfBombs + 1);
      } else {
        setNumberOfBombs(numberOfBombs - 1);
      }
      board[x][y].marked = !board[x][y].marked;
      setBoard([...board]);
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
          bombCountingFunction={setNumberOfBombs}
          onTileRightClicked={handleTileRightClicked}
          numberOfbombs={numberOfBombs}
        />
        <BoardInfoBar
          numberOfbombs={numberOfBombs}
          gameOver={gameOver}
          onReset={resetFunction}
          seconds={seconds}
          setSeconds={setSeconds}
        />
      </div>
    </div>
  );
}

export default App;
