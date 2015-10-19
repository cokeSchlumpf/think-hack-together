import React from 'react';
import { Grid, Col, Row, Jumbotron } from 'react-bootstrap';

import _ from '../../utils/underscore';

import Thumbnail from '../../components/thumbnail';

export default React.createClass({
  displayName: 'Home.ItemGroup',

  propTypes: {
    items: React.PropTypes.array,
    title: React.PropTypes.string,

    onLike: React.PropTypes.func,
    onDelete: React.PropTypes.func
  },

  render() {
    const items = _.arrayToMatrix(this.props.items, 2);
    const self = this;

    const cols = (column, colIndex) => {
      return (
        <Col key={ 'col_' + colIndex } md={ 6 }>
          <Thumbnail { ... column } onLike={ self.props.onLike } onDelete={ self.props.onDelete } />
        </Col>
        );
    };

    const rows = (row, rowIndex) => {
      return (
        <Row key={ 'row_' + rowIndex }>
          { row.map(cols) }
        </Row>
        );
    };

    return (
      <div>
        <h2>{ this.props.title }</h2>
        { items.map(rows) }
      </div>
      );
  }
});
