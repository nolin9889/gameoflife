import React from 'react';
import { Tile } from '../Tile/Tile.js';

import './Row.css';

export class Row extends React.Component {
  row  = this.props.row;

  render() {
    return (
        <div className="row">
            {this.row.map(tile => <Tile isAlive={tile}></Tile>)}
        </div>
    )
  }
}