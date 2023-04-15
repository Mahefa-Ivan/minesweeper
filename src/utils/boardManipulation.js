export const revealAllBombs = (board) => {
  for (let row of board) {
    for (let element of row) {
      if (element.content === "B") {
        element.revealed = true;
      }
    }
  }
  return board;
};
