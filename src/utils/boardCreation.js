export const generateEmptyBoard = (numberOfRows, numberOfColumns) => {
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
        marked: false,
      });
    }
    board.push(row);
  }
  return board;
};

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateMineCoordinates = (numberOfBombs, row, col) => {
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

export const mineTheBoard = (coordinates, boardToMine) => {
  for (let coordinate of coordinates) {
    boardToMine[coordinate.x][coordinate.y].content = "B";
  }
};

export const getNeighbors = (i, j, myBoard) => {
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

export const assignCellBombCount = (defaultBoard, bombsCoordinates) => {
  for (let coordinates of bombsCoordinates) {
    countNearbybombs(coordinates.x, coordinates.y, defaultBoard);
  }
};

export const createNewBoard = (boardProperty) => {
  const EMPTY_BOARD = generateEmptyBoard(
    boardProperty.dimensions.row,
    boardProperty.dimensions.column
  );

  const BOMB_COORDINATES = generateMineCoordinates(
    boardProperty.numberOfBombs,
    boardProperty.dimensions.row,
    boardProperty.dimensions.column
  );

  mineTheBoard(BOMB_COORDINATES, EMPTY_BOARD);
  assignCellBombCount(EMPTY_BOARD, BOMB_COORDINATES);

  return {
    board: EMPTY_BOARD,
    bombsCoordinates: BOMB_COORDINATES,
  };
};
