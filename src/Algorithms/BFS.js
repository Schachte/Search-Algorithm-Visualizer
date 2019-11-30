import { getNeighbors, getShortestPath } from './Util';

export function bfsPath(startNode, endNode, grid) {
  let start = grid[startNode.row][startNode.col];

  let visited = [];
  let end = grid[endNode.row][endNode.col];
  let queue = [];
  queue.push(start);

  while (queue.length > 0) {
    let currNode = queue.shift();
    currNode.visited = true;
    visited.push(currNode);

    if (currNode.isWall) continue;
    if (currNode.row == end.row && currNode.col == end.col) break;

    const neighbors = getNeighbors(grid, currNode.row, currNode.col);

    neighbors.forEach(neighbor => {
      if (!neighbor.visited && !neighbor.isWall) {
        neighbor.parent = currNode;
        queue.push(neighbor);
      }
    });
  }

  return {
    path: getShortestPath(grid, endNode),
    visited
  };
}
