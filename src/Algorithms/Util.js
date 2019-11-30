export function getNeighbors(grid, row, col) {
  let neighbors = [];

  const getValOrUndefined = (row, col) =>
    row < 0 || row >= grid.length || col < 0 || col >= grid[0].length
      ? undefined
      : grid[row][col];

  neighbors.push(getValOrUndefined(row + 1, col));
  neighbors.push(getValOrUndefined(row - 1, col));
  neighbors.push(getValOrUndefined(row, col + 1));
  neighbors.push(getValOrUndefined(row, col - 1));

  return neighbors.filter(node => node !== undefined);
}

export function getShortestPath(grid, endNode) {
  let path = [];
  let currNode = grid[endNode.row][endNode.col];

  while (currNode.parent !== undefined) {
    path.unshift(currNode.parent);
    currNode = currNode.parent;
  }

  path.push(grid[endNode.row][endNode.col]);
  return path;
}
