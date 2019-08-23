import React from 'react';
import { Tile } from '../Tile/Tile.js';

import './Board.css';

export class Board extends React.Component {
  tiles  = this.props.tiles;

  render() {
    return (
      <div>
        <div className="row">
          <Tile data={this.tiles[0]}></Tile>
          <Tile data={this.tiles[1]}></Tile>
          <Tile data={this.tiles[2]}></Tile>
        </div>
        <div className="row">
          <Tile data={this.tiles[3]}></Tile>
          <Tile data={this.tiles[4]}></Tile>
          <Tile data={this.tiles[5]}></Tile>
        </div>        
        <div className="row">
          <Tile data={this.tiles[6]}></Tile>
          <Tile data={this.tiles[7]}></Tile>
          <Tile data={this.tiles[8]}></Tile>
        </div>

      </div>
    )
  }
}