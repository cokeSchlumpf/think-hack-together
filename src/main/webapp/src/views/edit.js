import React from 'react';
import { History } from 'react-router';
import { StoreWatchMixin } from 'fluxxor';
import { Grid, Col, Row, Jumbotron } from 'react-bootstrap';

import _ from 'underscore';

import View from '../components/view';
import IdeasCreateForm from '../components/ideas-create-form';
import WebServiceClient from '../utils/webserviceclient';
import ArrayUtil from '../utils/array-util';

import { IdeasStore } from '../flux/stores/_storeNames';

export default React.createClass({
  displayName: 'EditCreateIdea',

  mixins: [ History ],

  propTypes: {
    ideasService: React.PropTypes.any,
    params: React.PropTypes.object
  },

  contextTypes: {
    flux: React.PropTypes.any
  },

  getDefaultProps() {
    return {
      ideasService: new WebServiceClient(this, 'api/ideas')
    };
  },

  getInitialState() {
    return {
      idea: {}
    };
  },

  componentDidMount() {
    this.props.ideasService.read(this.props.params.id).onSuccess((data, response) => {
      this.setState({
        idea: _.extend(data, {
          tags: ArrayUtil.mkString(data.tags)
        })
      });
    });
  },

  handleCreateFormSubmit(idea) {
    console.log(idea);
    console.log(idea.title);
    this.props.ideasService.update(_.extend(idea, {
      tags: ArrayUtil.fromString(idea.tags),
      id: this.props.params.id
    })).onSuccess((updatedIdea) => {
      this.context.flux.actions.ideasUpdate(updatedIdea);
      this.history.pushState(null, '/', null);
    });
  },

  handleCreateFormChange(idea) {
    this.setState({
      idea: idea
    });
  },

  render() {
    return (
      <View>
        <Jumbotron>
          <Grid>
            <Col />
          </Grid>
        </Jumbotron>
        <IdeasCreateForm onChange={ this.handleCreateFormChange } onSubmit={ this.handleCreateFormSubmit } { ...this.state.idea } />
      </View>
      );
  }
});
