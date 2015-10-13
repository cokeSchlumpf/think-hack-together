import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import Jumbotron from './jumbotron';
import Col from './col';
import Row from './row';

export default React.createClass({

  render() {
    return (
      <Jumbotron className="footer">
        <Row>
          <Col md={ 6 } className="ibm copyright">
            &copy; Michael Wellner, <a href="mailto:michael.wellner@de.ibm.com">michael.wellner@de.ibm.com</a> @ IBM 2015.
          </Col>
          <Col md={ 6 } className="links">
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Search</a></li>
              <li><a href="#">Submit</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Feedback</a></li>
            </ul>
          </Col>
        </Row>
      </Jumbotron>
    );
  }

});
