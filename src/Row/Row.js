import React from 'react';
import { Tile } from '../Tile/Tile.js';

import './Row.css';

export class Row extends React.Component {
  row  = this.props.row;

  render() {
    return (
        <div className="row">
            {this.row.map(tile => <Tile data={tile}></Tile>)}
        </div>

        // <div className="row">
        //   <Tile data={this.row[0]}></Tile>
        //   <Tile data={this.row[1]}></Tile>
        //   <Tile data={this.row[2]}></Tile>
        //   <Tile data={this.row[3]}></Tile>
        //   <Tile data={this.row[4]}></Tile>
        // </div>
    )
  }
}