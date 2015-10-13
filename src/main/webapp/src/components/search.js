import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import Jumbotron from './jumbotron';
import Container from './container';
import Col from './col';
import Row from './row';

export default React.createClass({
  
  propTypes: {
    searchstring: React.PropTypes.string,
    showTitle: React.PropTypes.boolean
  },
  
  handleSearch(event) {
    console.log(event);
  },
  
  handleSumbit(event) {
    // TODO
    console.log("submit");
    event.stopPropagation();
    event.preventDefault();
  },
  
  render() {
    return (
      <Container className="content">
        { this.props.showTitle &&
          <Row> 
          <Col>         
            <h2>Search or submit your own idea</h2>
          </Col>
          </Row>
        }
        <Row className="search">
          <Col md={ 9 }>
            <input 
              type="text" className="form-control" id="exampleInputEmail3" placeholder="Search for ideas" 
              defaultValue={ this.props.searchstring } onChange={ this.handleSearch } />
          </Col>
          <Col md={ 3 }>
            <button type="button" className="btn btn-primary" onClick={ this.handleSubmit }>Submit new idea</button>
          </Col>
        </Row>
      </Container>
    )
  }
  
});