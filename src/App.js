import React from 'react';
import { Button } from 'react-bootstrap';
import logo from './logo.svg';
import { Board } from './Board/Board.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.generateGrid(5,8),
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
    // this.setState({
    //   running: !this.state.running
    // })   
    
      this.setState({
        grid: this.updateGrid(this.state.grid)
      });

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

    // Initialize neighborCount 2d array with 0
    let neighborCount = new Array(grid.length);
    for (var i = 0; i < grid.length; i++) {
      neighborCount[i] = new Array(grid[0].length);
    }
    for(let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        neighborCount[i][j] = 0;
      }
    }
    // Count how many neighbors there are in each cell.
    for (let u = 0; u < grid.length; u++) {
      console.log(u);
      for (let v = 0; v < grid[u].length; v++) {
        console.log("grid[u].length: " + grid[u].length);
        neighborCount[u][v] = this.getNeighborsCount(grid, u, v);
      }
    }
    neighborCount.forEach(row => console.log(row));

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
        else if (neighborCount[r][c] < 2 || neighborCount[r][c] > 4) {
          grid[r][c] = false;
        }
        else {} // Do nothing if cell has 2 neighbors.
        
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