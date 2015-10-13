import React from 'react';
import { StoreWatchMixin } from 'fluxxor';
import cx from 'classnames';

import ListToMatrix from '../utils/listToMatrix';

import Col from '../components/col';
import Container from '../components/container';
import Jumbotron from '../components/jumbotron';
import Row from '../components/row';
import Thumbnail from '../components/thumbnail';
import Search from '../components/search';
import View from '../components/view';

import { IdeasStore } from '../flux/constants/_stores';

const Icon = React.createClass({
  displayName: 'Home.Icon',

  propTypes: {
    className: React.PropTypes.string,
    text: React.PropTypes.string,
    title: React.PropTypes.string
  },

  getClassName() {
    const names = {
      icon: true
    };
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
  displayName: 'Home.Header',

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
  displayName: 'Home.ItemGroup',

  propTypes: {
    items: React.PropTypes.array,
    title: React.PropTypes.string,

    onLike: React.PropTypes.func
  },

  render() {
    const items = ListToMatrix(this.props.items, 2);
    const self = this;
    return (
      <div>
        <h2>{ this.props.title}</h2>
        {
      items.map((row, rowindex) => {
        return (
          <Row key={'row_' + rowindex}>
                {
          row.map((column, colindex) => {
            return (
              <Col key={'col_' + colindex} md={ 6 }>
                        <Thumbnail { ... column } onLike={ self.props.onLike } />
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
  displayName: 'Home',

  mixins: [ StoreWatchMixin(IdeasStore) ],

  contextTypes: {
    flux: React.PropTypes.any
  },

  getStateFromFlux: function() {
    return {
      ideasState: this.context.flux.stores[IdeasStore].getState()
    };
  },

  render() {
    return (
      <View>
        <Header />
        <Container className="content">
          { this.state.ideasState.topItems && this.state.ideasState.topItems.length > 0 &&
            <ItemGroup title="Top Ideas" items={ this.state.ideasState.topItems } onLike={ this.context.flux.actions.likeIdea } />
          }

          { this.state.ideasState.newItems && this.state.ideasState.newItems.length > 0 &&
            <ItemGroup title="New Ideas" items={ this.state.ideasState.newItems } onLike={ this.context.flux.actions.likeIdea } />
          }
        </Container>
        <Search showTitle />
      </View>
      );
  }
});
