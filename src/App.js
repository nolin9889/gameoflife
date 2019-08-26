import React from 'react';
import logo from './logo.svg';
import { Board } from './Board/Board.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      // tiles: ["x", "o", "x", "o", "x", "x", "o", "o", "o"],
      // tiles: ["", "", "", "", "", "", "", "", ""],
      rows: this.generateGrid(15,15),
      // [
      //   ["", "", "", "", ""],
      //   ["", "", "", "", ""],
      //   ["", "", "", "", ""],
      //   ["", "", "", "", ""],
      //   ["", "", "", "", ""],
      //   ["", "", "", "", ""]
      // ],
      system: {
        "healthStatus": "",
        "environments": [{
          "fourMonthsCost": "",
          "twelveMonthsCost": "",
        }],
       
      }
    }
  }

  generateGrid (x, y) {
    // Generate a grid of x rows and y columns.
    let grid = new Array(x);
    for (var i = 0; i < x; i++) {
      grid[i] = new Array(y);
    }

    // Initialize data.
    for(let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        grid[i][j] = "0";
      }
    }
    return grid;
  }

  render() {
    return (
      <div className="App">
        <div className="flex-container"> 
          <h1>Conway's Game of Life</h1>
          <Board className="Board" rows={this.state.rows}/>
        </div>
      </div>
    );
  }
}

export default App;