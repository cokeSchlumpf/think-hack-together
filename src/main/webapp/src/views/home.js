import React from 'react';
import cx from 'classnames';

import ListToMatrix from '../utils/listToMatrix';

import Col from '../components/col';
import Container from '../components/container';
import Jumbotron from '../components/jumbotron';
import Row from '../components/row';
import Thumbnail from '../components/thumbnail';
import Search from '../components/search';
import View from '../components/view';

const Icon = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    text: React.PropTypes.string,
    title: React.PropTypes.string
  },

  getClassName() {
    const names = { icon: true };
    names[this.props.className] = true;
    return cx(names);
  },

  render() {
    return (
      <div className={ this.getClassName() }>
        <h3>{ this.props.title }</h3>
        <p>{ this.props.text }</p>
      </div>
    );
  }
});

const Header = React.createClass({
  render() {
    return (
      <Jumbotron>
        <Row>
          <Col md={ 4 }>
            <Icon className="think" title="Think" text="Publish your ideas, find IBMers who support you." />
            <Icon className="hack" title="Hack" text="Meet for a hackathon or develop apps remotely." />
            <Icon className="together" title="Together" text="Connect to IBMers and build your network." />
          </Col>
          <Col md={ 1 } />
          <Col md={ 7 } className="about">
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
              At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </p>
          </Col>
        </Row>
      </Jumbotron>
    );
  }
});

const ItemGroup = React.createClass({
  propTypes: {
    items: React.PropTypes.array,
    title: React.PropTypes.string
  },

  render() {
    const items = ListToMatrix(this.props.items, 2);
    return (
      <div>
        <h2>{ this.props.title}</h2>
        {
          items.map((row, rowindex) => {
            return (
              <Row key={ 'row_' + rowindex }>
                {
                  row.map((column, colindex) => {
                    return (
                      <Col key={ 'col_' + colindex } md={ 6 }>
                        <Thumbnail { ... column } />
                      </Col>
                    );
                  })
                }
              </Row>
            );
          })
        }
      </div>
    );
  }
});

export default React.createClass({
  /*
  propTypes: {
    newItems: React.PropTypes.array,
    topItems: React.PropTypes.array
  },
  */

  getInitialState() {
    return {
      newItems: [
        {
          color: 'light-orange',
          date: 1444675856,
          id: 1,
          likes: 296,
          liked: false,
          organizer: 'Michael Wellner',
          tags: [ 'Mobile', 'Cloud' ],
          title: 'Lorem Ipsum dolor',
          town: 'Munich',
          type: 'Hackathon'
        },
        {
          color: 'turquoise',
          date: 1444675856,
          id: 1,
          liked: true,
          likes: 228,
          organizer: 'Jean Valjean',
          tags: [ 'Mobile', 'Cloud' ],
          title: 'Lorem Ipsum dolor sit amet dolor',
          town: 'Paris',
          type: 'Ongoing'
        }
      ],
      topItems: [
        {
          color: 'light-orange',
          date: 1444675856,
          id: 1,
          likes: 296,
          liked: false,
          organizer: 'Michael Wellner',
          tags: [ 'Mobile', 'Cloud' ],
          title: 'Lorem Ipsum dolor',
          town: 'Munich',
          type: 'Hackathon'
        },
        {
          color: 'turquoise',
          date: 1444675856,
          id: 1,
          liked: true,
          likes: 228,
          organizer: 'Jean Valjean',
          tags: [ 'Mobile', 'Cloud' ],
          title: 'Lorem Ipsum dolor sit amet dolor',
          town: 'Paris',
          type: 'Ongoing'
        }
      ]
    };
  },

  render() {
    return (
      <View>
        <Header />
        <Container className="content">
          { this.state.topItems && this.state.topItems.length > 0 && <ItemGroup title="Top Ideas" items={ this.state.topItems } /> }
          { this.state.newItems && this.state.newItems.length > 0 && <ItemGroup title="New Ideas" items={ this.state.newItems } /> }
        </Container>
        <Search showTitle />
      </View>
    );
  }
});
