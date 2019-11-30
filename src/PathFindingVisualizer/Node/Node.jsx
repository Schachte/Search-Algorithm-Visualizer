import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
  constructor(props) {
    super(props);
    const { row, col } = props;
    this.state = { row, col, hover: false };
  }

  render() {
    const {
      row,
      col,
      grid,
      isStart,
      isEnd,
      isHoveringStart,
      isHoveringEnd,
      draggingWall
    } = this.props;

    let additionalClass = '';

    // Toggling hover interaction styling
    if (this.state.hover) {
      additionalClass = 'hovering ';
    }

    // Adding static styling to start node
    if (isStart) {
      additionalClass = 'start';
    }

    if (isEnd) {
      additionalClass = 'end';
    }

    // We are moving the start node
    if (this.state.hover && isHoveringStart) {
      additionalClass = 'start';
    }

    // We are moving the end node
    if (this.state.hover && isHoveringEnd) {
      additionalClass = 'end';
    }

    if (draggingWall && this.state.hover) {
      grid()[row][col].isWall = true;
    }

    if (grid()[row][col].isWall) {
      additionalClass = 'wall';
    }

    if (grid()[row][col].color) {
      additionalClass = 'visited';
    }

    if (grid()[row][col].shortest) {
      additionalClass = 'shortest';
    }

    return (
      <div
        className={`node ${additionalClass}`}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        onMouseDown={() => this.props.onMouseDown(row, col)}
        onMouseUp={() => this.props.onMouseUp(row, col)}
      ></div>
    );
  }
}
