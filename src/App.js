import React from 'react';
import { Button } from 'react-bootstrap';
import logo from './logo.svg';
import { Board } from './Board/Board.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // tiles: ["x", "o", "x", "o", "x", "x", "o", "o", "o"],
      // tiles: ["", "", "", "", "", "", "", "", ""],
      rows: this.generateGrid(15,15),
      date: new Date(),
      // [
      //   ["", "", "", "", ""],
      //   ["", "", "", "", ""],
      //   ["", "", "", "", ""],
      //   ["", "", "", "", ""],
      //   ["", "", "", "", ""],
      //   ["", "", "", "", ""]
      // ],
      running: false,
      system: {
        "healthStatus": "",
        "environments": [{
          "fourMonthsCost": "",
          "twelveMonthsCost": "",
        }],
       
      }
    }
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

  toggle = () => {
    this.setState({
      running: !this.state.running
    })
  }

  tick() {
    if(this.state.running) {
      this.setState({
        date: new Date(),
        rows: this.updateGrid(this.state.rows)
      });
    }
    else {
      this.setState({
        date: new Date(),
      });
    }
  }

  updateGrid(rows) {
    let x = Math.floor(Math.random() * Math.floor(rows.length))
    let y = Math.floor(Math.random() * Math.floor(rows[0].length))
    rows[x][y] = !rows[x][y];
    return rows;
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
    return grid;
  }

  render() {
    return (
      <div className="App">
        <div className="flex-container"> 
          <h1>Conway's Game of Life</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          <Board className="Board" rows={this.state.rows}/>
          <Button id="toggle" onClick={this.toggle}>Start/Stop</Button>
        </div>
      </div>
    );
  }
}

export default App;