import React from 'react';
import { Tile } from '../Tile/Tile.js';
import { Row } from '../Row/Row.js';
import './Board.css';

export class Board extends React.Component {
  grid  = this.props.grid;

  render() {
    return (
      <div>
        {this.grid.map(row => <Row row={row}></Row>)}
      </div>
    )
  }
}