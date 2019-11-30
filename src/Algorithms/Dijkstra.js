import { getNeighbors, getShortestPath } from './Util';

export function dijkstraPath(startNode, endNode, grid) {
  const start = grid[startNode.row][startNode.col];
  const end = grid[endNode.row][endNode.col];
  start.distance = 0;

  let unvisited = [start];
  let visited = [];

  while (unvisited.length > 0) {
    let currNode = unvisited.shift();
    currNode.visited = true;
    visited.push(currNode);
    if (currNode.row == end.row && currNode.col == end.col) break;
    for (let node of getNeighbors(grid, currNode.row, currNode.col)) {
      if (node.visited || node.isWall) continue;
      let currDistance = currNode.distance + 1;
      if (currDistance < node.distance) {
        node.parent = currNode;
        node.distance = currDistance;
        unvisited.push(node);
      }
    }
  }
  return {
    path: getShortestPath(grid, endNode),
    visited
  };
}
