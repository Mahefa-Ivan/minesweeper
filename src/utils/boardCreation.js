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
