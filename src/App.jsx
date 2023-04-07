import { useState } from "react";
import Board from "./components/board/board";

function App() {
  const generateEmptyBoard = (numberOfRows, numberOfColumns) => {
    const board = [];
    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        row.push({
          content: " ",
          revealed: false,
          coordinates: {
            x: i,
            y: j,
          },
          numberOfBombs: 0,
          hasBeenVisited: false,
        });
      }
      board.push(row);
    }
    return board;
  };

  const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateMineCoordinates = (numberOfBombs, row, col) => {
    const bombCoordinates = [];
    const alreadyMined = new Set();

    for (let i = 0; i < numberOfBombs; i++) {
      let x = getRandomInteger(0, row - 1);
      let y = getRandomInteger(0, col - 1);

      while (alreadyMined.has(`${x}|${y}`)) {
        x = getRandomInteger(0, row - 1);
        y = getRandomInteger(0, col - 1);
      }

      alreadyMined.add(`${x}|${y}`);

      bombCoordinates.push({
        x: x,
        y: y,
      });
    }
    return bombCoordinates;
  };

  const mineTheBoard = (coordinates, boardToMine) => {
    for (let coordinate of coordinates) {
      boardToMine[coordinate.x][coordinate.y].content = "B";
    }
  };

  const getNeighbors = (i, j, myBoard) => {
    const rows = myBoard.length;
    const cols = myBoard[0].length;
    const neighbors = [];

    for (let x = i - 1; x <= i + 1; x++) {
      for (let y = j - 1; y <= j + 1; y++) {
        if (x >= 0 && x < rows && y >= 0 && y < cols && !(x === i && y === j)) {
          neighbors.push([x, y]);
        }
      }
    }
    return neighbors;
  };

  const countNearbybombs = (x, y, boardToFill) => {
    const neighbors = getNeighbors(x, y, boardToFill);

    for (let element of neighbors) {
      if (boardToFill[element[0]][element[1]].content === " ") {
        boardToFill[element[0]][element[1]].numberOfBombs += 1;
      }
    }
  };

  const prepBoard = (defaultBoard, bombsCoordinates) => {
    for (let coordinates of bombsCoordinates) {
      countNearbybombs(coordinates.x, coordinates.y, defaultBoard);
    }
  };

  const empty_board = generateEmptyBoard(10, 20);
  const bombCoordinates = generateMineCoordinates(30, 10, 20);

  mineTheBoard(bombCoordinates, empty_board);

  prepBoard(empty_board, bombCoordinates);

  const [board, setBoard] = useState(empty_board);
  const [gameOver, setGameOver] = useState(false);

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

  const revealTile = (coordinates) => {
    if (gameOver) {
      return;
    }
    if (board[coordinates.x][coordinates.y].content === "B") {
      revealAllBombs(bombCoordinates);
      setGameOver(true);
    }
    dfs(coordinates.x, coordinates.y);
    const newBoard = [...board];
    setBoard(newBoard);
  };

  const dfs = (x, y) => {
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
      dfs(coord[0], coord[1]);
    }
    return true;
  };

  return (
    <div className="container">
      <Board board={board} revealFunction={revealTile} />
    </div>
  );
}

export default App;
