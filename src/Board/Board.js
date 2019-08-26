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
        {/* <Row row={this.rows[0]}></Row>
        <Row row={this.rows[1]}></Row>
        <Row row={this.rows[2]}></Row>
        <Row row={this.rows[3]}></Row>
        <Row row={this.rows[4]}></Row> */}

      </div>
    )
  }
}