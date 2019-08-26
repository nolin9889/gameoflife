import React from 'react';
import { Tile } from '../Tile/Tile.js';
import { Row } from '../Row/Row.js';
import './Board.css';

export class Board extends React.Component {
  rows  = this.props.rows;

  render() {
    return (
      <div>
        {this.rows.map(row => <Row row={row}></Row>)}
      </div>
    )
  }
}