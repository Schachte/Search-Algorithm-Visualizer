import React from 'react';
import './App.css';
import PathFindingVisualizer from './PathFindingVisualizer/PathFindingVisualizer';

function App() {
  return (
    <div className="App">
      <PathFindingVisualizer startNode={0} endNode={0} algo={'dfs'} />
    </div>
  );
}

export default App;
