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
      tiles: ["", "", "", "", "", "", "", "", ""],
      system: {
        "healthStatus": "",
        "environments": [{
          "twelveMonthsCost": "",
        }],
       
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className="flex-container"> 
          <h1> The Epic! Board </h1>
          <Board className="Board" tiles={this.state.tiles}/>
        </div>
        
      </div>
    );
  }

}

export default App;