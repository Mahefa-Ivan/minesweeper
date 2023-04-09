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

export const countNearbybombs = (x, y, boardToFill) => {
  const neighbors = getNeighbors(x, y, boardToFill);

  for (let element of neighbors) {
    if (boardToFill[element[0]][element[1]].content === " ") {
      boardToFill[element[0]][element[1]].numberOfBombs += 1;
    }
  }
};
