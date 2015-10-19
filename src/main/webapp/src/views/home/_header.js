import React from 'react';
import { Grid, Col, Row, Jumbotron } from 'react-bootstrap';

import Icon from './_icon.js';

export default React.createClass({
  displayName: 'Home.Header',

  render() {
    return (
      <Jumbotron>
        <Grid>
          <Row>
            <Col md={ 4 }>
              <Icon className="think" title="Think" text="Publish your ideas, find IBMers who support you." />
              <Icon className="hack" title="Hack" text="Meet for a hackathon or develop apps remotely." />
              <Icon className="together" title="Together" text="Connect to IBMers and build your network." />
            </Col>
            <Col md={ 1 } />
            <Col md={ 7 } className="about">
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
              </p>
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
      );
  }
});
