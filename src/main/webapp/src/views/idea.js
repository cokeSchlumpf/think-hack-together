import React from 'react';

import Jumbotron from '../components/jumbotron';
import Row from '../components/row';
import Col from '../components/col';
import Container from '../components/container';
import View from '../components/view';

export default React.createClass({
  render() {
    return (
      <View>
        <Jumbotron className="idea-detail">
          <Row>
            <Col>
              <h1>Lorem ipsum dolor</h1>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
              </p>
            </Col>
          </Row>
        </Jumbotron>
        <Container className="content">
          <Row>
            <Col md={ 4 }>
              <h2>Hackathon</h2>
              <p>
                Monday, Oct 24 2015, 05.00pm
              </p>
              <p>
                IBM Location Munich
                <br /> Hollerithstr. 1
                <br /> 81829 Munich
                <br />
                <br /> C-001-012
              </p>
            </Col>
            <Col md={ 4 }>
              <h2>More Information</h2>
              <p>
                [PPT] <a href="#">Project Presentation</a>
                <br /> [PNG] <a href="#">Idea Board</a>
              </p>
            </Col>
            <Col md={ 4 }>
              <h2>Contact Information</h2>
              <p>
                Michael Wellner
                <br /> michael.wellner@de.ibm.com
              </p>
            </Col>
          </Row>
        </Container>
      </View>
      );
  }
});
