import React from 'react';
import { Button } from 'react-bootstrap';
import logo from './logo.svg';
import { Board } from './Board/Board.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.generateGrid(5,5),
      date: new Date(),
      running: false,
    }

    this.toggle = this.toggle.bind(this);
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

  tick() {
    if(this.state.running) {
      this.setState({
        date: new Date(),
        grid: this.updateGrid(this.state.grid)
      });
    }
    else {
      this.setState({
        date: new Date(),
      });
    }
  }

  generateGrid(x, y) {
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

    grid[0][1] = true;
    grid[1][2] = true;
    grid[2][0] = true;
    grid[2][1] = true;
    grid[2][2] = true;
    // grid[5][5] = true;
    // grid[5][6] = true;
    // grid[5][7] = true;
    // grid[6][6] = true;
    // grid[7][7] = true;

    return grid;
  }

  updateGrid(grid) {
    // let x = Math.floor(Math.random() * Math.floor(grid.length))
    // let y = Math.floor(Math.random() * Math.floor(grid[0].length))
    // grid[x][y] = !grid[x][y];

    // For a space that is 'populated':
    // Each cell with one or no neighbors dies, as if by solitude.
    // Each cell with four or more neighbors dies, as if by overpopulation.
    // Each cell with two or three neighbors survives.
    // For a space that is 'empty' or 'unpopulated'
    // Each cell with three neighbors becomes populated.
    let neighbors = new Array(grid.length);
    
    for (var i = 0; i < grid.length; i++) {
      neighbors[i] = new Array(grid[0].length);
    }
    // Initialize data.
    for(let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        neighbors[i][j] = 0;
      }
    }

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        neighbors[i][j] = this.getNeighborsCount(grid, i, j);
        console.log(neighbors[i][j]);
      }

    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        
        if (grid[x][y] === false && neighbors[x][y] === 3) {
          grid[x][y] = true;
        }

        else if (neighbors[x][y] < 2 || neighbors[x][y] > 4) {
          grid[x][y] = false;
        }

        else {
          // Do nothing. Remain the same if cell has 2 or 3 neighbors. 
        }
      }
    }  

      }
    
    
    return grid;
  }

  // TODO
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
          <Board className="Board" grid={this.state.grid}/>
          <Button id="toggle" onClick={this.toggle}>Start/Stop</Button>
        </div>
      </div>
    );
  }
}

export default App;