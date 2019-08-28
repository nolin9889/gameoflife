import React from 'react';
import './Tile.css';
import logo from '../logo.svg';
import { Button } from 'react-bootstrap';

export class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: "silver"
    }
  }

  getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

  onButtonClick = () => {
    this.setState({color: this.getRandomRgb()});
  }

  render() {
    const isAlive = this.props.isAlive;
    return (
      <Button className="tile"
        // style={{"background-color": this.state.color}}
        // style={{"background-color": tileData ? this.getRandomRgb() : this.state.color}}
        style={{"background-color": isAlive ? "yellow" : this.state.color}}
        onClick={this.onButtonClick}
      >
      </Button>
    )
  }
}