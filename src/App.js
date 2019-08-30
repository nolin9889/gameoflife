import React from 'react';
import { Button } from 'react-bootstrap';
import logo from './logo.svg';
import { Board } from './Board/Board.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.createNewGrid(40,50),  // Column size is limited to screen size due to button minimum sizes. Row is not constrained (except by the brute force algorithm.)
      date: new Date(),
      running: false,
    }
    
    this.toggle = this.toggle.bind(this);
    this.step = this.step.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  toggle() {
    this.setState({
      running: !this.state.running
    })
  }

  step() {
    this.setState({
      grid: this.recalculateGrid(this.state.grid)
    });
  }

  tick() {
    if(this.state.running) {
      this.setState({
        date: new Date(),
        grid: this.recalculateGrid(this.state.grid)
      });
    }
    else {
      this.setState({
        date: new Date(),
      });
    }
  }

  markTile(r, c) {
    let newGrid = [...this.state.grid];
    newGrid[r][c] = true;
    this.setState({
      grid: newGrid
    })
  }

  createNewGrid(x, y) {
    // Generate a grid of x rows and y columns.
    let grid = new Array(x);
    for (var i = 0; i < x; i++) {
      grid[i] = new Array(y);
    }

    // Initialize data.
    for(let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        grid[i][j] = false;
      }
    }

    // TODO Create customizable beginning states.
    grid[5][6] = true;
    grid[6][7] = true;
    grid[7][5] = true;
    grid[7][6] = true;
    grid[7][7] = true;

    return grid;
  }

  recalculateGrid(grid) {

    // Initialize neighborCount 2d array with 0
    let neighborCount = new Array(grid.length);
    for (let i = 0; i < grid.length; i++) {
      neighborCount[i] = new Array(grid[0].length);
    }
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        neighborCount[i][j] = 0;
      }
    }
    // Count how many neighbors there are in each cell.
    for (let u = 0; u < grid.length; u++) {
      for (let v = 0; v < grid[u].length; v++) {
        neighborCount[u][v] = this.getNeighborsCount(grid, u, v);
      }
    }

    // For a space that is 'populated':
    // Each cell with one or no neighbors dies, as if by solitude.
    // Each cell with four or more neighbors dies, as if by overpopulation.
    // Each cell with two or three neighbors survives.
    // For a space that is 'empty' or 'unpopulated'
    // Each cell with three neighbors becomes populated.
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        
        if (neighborCount[r][c] === 3) {
          grid[r][c] = true;
        }
        else if (neighborCount[r][c] < 2 || neighborCount[r][c] > 3) {
          grid[r][c] = false;
        }
        else {} // Do nothing if cell has 2 neighbors.
        
      }
    }
    return grid;
  }

  // TODO Make logic better.
  getNeighborsCount(grid, i, j) {
    let count = 0;
    
    try {
      if (grid[i-1][j-1]) count += 1;
    }
    catch {}

    try {
      if (grid[i-1][j]) count += 1;
    }
    catch {}
    
    try {
      if (grid[i-1][j+1]) count += 1;
    }
    catch {}
    
    try {
      if (grid[i][j-1]) count += 1;
    }
    catch {}
    
    try {
      if (grid[i][j+1]) count += 1;
    }
    catch {}
    
    try {
      if (grid[i+1][j-1]) count += 1;
    }
    catch {}
    
    try {
      if (grid[i+1][j]) count += 1;
    }
    catch {}
    
    try {
      if (grid[i+1][j+1]) count += 1;
    }
    catch {}
    
    return count;
  }

  render() {
    return (
      <div className="App">
        <div className="container"> 
          <h1>Conway's Game of Life</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          <Button id="step" onClick={this.step}>Step</Button>
          <Button id="toggle" onClick={this.toggle}>Start/Stop</Button>
          <Board className="Board"
            markTile={this.markTile}
            grid={this.state.grid}/>
        </div>
      </div>
    );
  }
}

export default App;