import { getNeighbors, getShortestPath } from './Util';

export function dfsPath(startNode, endNode, grid) {
  let stack = [];
  let visited = [];
  stack.push(grid[startNode.row][startNode.col]);

  while (stack.length > 0) {
    let currNode = stack.pop();
    currNode.visited = true;
    visited.push(currNode);
    if (currNode.row == endNode.row && currNode.col == endNode.col) break;
    let neighbors = getNeighbors(grid, currNode.row, currNode.col);
    neighbors.forEach(neighbor => {
      if (!neighbor.visited && !neighbor.isWall) {
        neighbor.parent = currNode;
        stack.push(neighbor);
      }
    });
  }

  return {
    path: getShortestPath(grid, endNode),
    visited
  };
}
