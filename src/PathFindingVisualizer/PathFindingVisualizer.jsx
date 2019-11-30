import React, { Component } from 'react';
import Node from './Node/Node';

import { dijkstraPath } from '../Algorithms/Dijkstra';
import { dfsPath } from '../Algorithms/DFS';
import { bfsPath } from '../Algorithms/BFS';

const searchAlgorithms = {
  dij: dijkstraPath,
  dfs: dfsPath,
  bfs: bfsPath
};
const initState = {
  width: 15,
  height: 15,
  grid: [],
  draggingStart: false,
  draggingEnd: false,
  draggingWall: false,
  startNode: { row: 0, col: 0 },
  endNode: { row: 4, col: 7 }
};

export default class PathFindingVisualizer extends Component {
  constructor(props) {
    super(props);

    this.startNode = props.startNode;
    this.endNode = props.endNode;

    this.state = {
      ...initState,
      selectedAlgorithm: props.algo
    };
  }

  componentDidMount() {
    let grid = this.getInitialGrid({});
    this.setState({ grid });
  }

  createNode(data) {
    return {
      ...data,
      val: data.row + data.col,
      visited: false,
      distance: Infinity,
      parent: undefined,
      isStart: false,
      isEnd: false
    };
  }

  getGrid() {
    return this.state.grid;
  }

  animateSolution(searchResult, grid) {
    for (let i = 0; i < searchResult.path.length; i++) {
      setTimeout(() => {
        console.log('callin');
        let currNode = searchResult.path[i];
        let newGrid = grid.slice();
        newGrid[currNode.row][currNode.col].shortest = true;
        this.setState({ grid: newGrid });
      }, i * 70);
    }
  }

  executeSearch(algo) {
    let { grid, startNode, endNode } = this.state;
    let searchResult = searchAlgorithms[algo](startNode, endNode, grid);

    for (let i = 0; i < searchResult.visited.length; i++) {
      setTimeout(() => {
        let currNode = searchResult.visited[i];
        let newGrid = grid.slice();
        newGrid[currNode.row][currNode.col].color = true;
        this.setState({ grid: newGrid });
        if (i === searchResult.visited.length - 1) {
          this.animateSolution(searchResult, grid);
        }
      }, i * 30);
    }
  }

  getInitialGrid(walls) {
    let grid = [];
    for (let row = 0; row < this.state.width; row++) {
      let currNodes = [];
      for (let col = 0; col < this.state.height; col++) {
        currNodes.push(this.createNode({ row, col }));
      }
      grid.push(currNodes);
    }
    return grid;
  }

  mouseDown(inputRow, inputCol) {
    const { startNode, endNode } = this.state;
    if (inputRow === startNode.row && inputCol == startNode.col) {
      this.setState({ draggingStart: true });
    } else if (inputRow === endNode.row && inputCol == endNode.col) {
      this.setState({ draggingEnd: true });
    } else {
      this.setState({ draggingWall: true });
    }
  }

  mouseUp(row, col) {
    const { startNode, endNode } = this.state;
    if (this.state.draggingStart) {
      this.setState({ draggingStart: false });
      let startNode = {
        row,
        col
      };
      this.setState({ startNode });
    } else if (this.state.draggingEnd) {
      this.setState({ draggingEnd: false });
      let endNode = {
        row,
        col
      };
      this.setState({ endNode });
    } else {
      this.setState({ draggingWall: false });
    }
  }

  reset() {
    let grid = this.getInitialGrid({});
    this.setState({
      ...initState,
      grid,
      selectedAlgorithm: this.state.selectedAlgorithm
    });
  }

  render() {
    const { startNode, endNode } = this.state;

    const startRow = startNode.row;
    const startCol = startNode.col;
    const endRow = endNode.row;
    const endCol = endNode.col;

    return (
      <div>
        <select
          onChange={selectedAlgorithm => {
            this.setState({
              selectedAlgorithm: selectedAlgorithm.target.value
            });
          }}
          value={this.state.selectedAlgorithm}
        >
          {Object.keys(searchAlgorithms).map(key => {
            return <option value={key}>{key}</option>;
          })}
        </select>
        <button
          onClick={() => this.executeSearch(this.state.selectedAlgorithm)}
        >
          Visualize Path
        </button>
        <button onClick={() => this.reset()}>Reset</button>
        <div
          style={{
            width: 750,
            height: 750,
            border: '1px solid black',
            margin: '0px auto',
            marginTop: '10px'
          }}
        >
          {this.state.grid.map((nodeRow, rowIdx) => {
            return nodeRow.map((nodeCol, colIdx) => {
              return (
                <div>
                  <Node
                    row={rowIdx}
                    key={rowIdx + colIdx}
                    col={colIdx}
                    grid={this.getGrid.bind(this)}
                    onMouseDown={this.mouseDown.bind(this)}
                    onMouseUp={this.mouseUp.bind(this)}
                    isStart={startRow === rowIdx && startCol === colIdx}
                    isEnd={endRow === rowIdx && endCol === colIdx}
                    isHoveringStart={this.state.draggingStart}
                    isHoveringEnd={this.state.draggingEnd}
                    draggingWall={this.state.draggingWall}
                  />{' '}
                </div>
              );
            });
          })}
        </div>
      </div>
    );
  }
}
