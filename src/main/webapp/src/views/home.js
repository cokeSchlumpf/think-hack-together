import React from 'react';
import { StoreWatchMixin } from 'fluxxor';
import { Grid, Col, Row, Jumbotron } from 'react-bootstrap';

import _ from 'underscore';
import cx from 'classnames';

import ArrayUtil from '../utils/array-util';
import ListToMatrix from '../utils/list-to-matrix';
import WebServiceClient from '../utils/webserviceclient';

import IdeasCreateForm from '../components/ideas-create-form';
import Thumbnail from '../components/thumbnail';
import Search from '../components/search';
import View from '../components/view';

import { IdeasStore } from '../flux/stores/_storeNames';

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
        <p>
          { this.props.text }
        </p>
      </div>
      );
  }
});

const Header = React.createClass({
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

const ItemGroup = React.createClass({
  displayName: 'Home.ItemGroup',

  propTypes: {
    items: React.PropTypes.array,
    title: React.PropTypes.string,

    onLike: React.PropTypes.func,
    onDelete: React.PropTypes.func
  },

  render() {
    const items = ListToMatrix(this.props.items, 2);
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

export default React.createClass({
  displayName: 'Home',

  mixins: [ StoreWatchMixin(IdeasStore) ],

  propTypes: {
    ideasService: React.PropTypes.any
  },

  getDefaultProps() {
    return {
      ideasService: new WebServiceClient(this, 'api/ideas')
    };
  },

  getInitialState() {
    return {
      newIdea: {
        color: 'light-orange',
        date: Date.now(),
        organizer: 'Knusperolaf',
        tags: 'mobile, cloud',
        title: '',
        town: 'Dresden',
        type: 'Hackathon'
      }
    };
  },

  contextTypes: {
    flux: React.PropTypes.any
  },

  componentDidMount() {
    this.props.ideasService.list().onSuccess((data, response) => {
      this.context.flux.actions.ideasInit(data);
    });
  },

  getStateFromFlux: function() {
    return {
      ideasState: this.context.flux.stores[IdeasStore].getState()
    };
  },

  handleCreateFormSubmit(idea) {
    this.props.ideasService.create(_.extend(idea, {
      tags: ArrayUtil.fromString(idea.tags)
    })).onSuccess((newIdea) => {
      this.context.flux.actions.ideasCreate(newIdea);
    });
  },

  handleCreateFormChange(idea) {
    this.setState({
      newIdea: idea
    });
  },

  handleDelete(id) {
    this.props.ideasService.delete(id).onSuccess(() => {
      this.context.flux.actions.ideasDelete(id);
    });
  },

  render() {
    return (
      <View>
        <Header />
        <Grid className="content">
          { this.state.ideasState.topItems && this.state.ideasState.topItems.length > 0 &&
            <ItemGroup title="Top Ideas" items={ this.state.ideasState.topItems } onLike={ this.context.flux.actions.ideasLike } onDelete={ this.handleDelete } /> }
          { this.state.ideasState.newItems && this.state.ideasState.newItems.length > 0 &&
            <ItemGroup title="New Ideas" items={ this.state.ideasState.newItems } onLike={ this.context.flux.actions.ideasLike } onDelete={ this.handleDelete } /> }
        </Grid>
        <IdeasCreateForm onChange={ this.handleCreateFormChange } onSubmit={ this.handleCreateFormSubmit } { ...this.state.newIdea } />
        <Search showTitle />
      </View>
      );
  }
});
