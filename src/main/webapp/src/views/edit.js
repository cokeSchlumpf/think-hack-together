import React from 'react';
import { History } from 'react-router';
import { StoreWatchMixin } from 'fluxxor';
import { Grid, Col, Row, Jumbotron } from 'react-bootstrap';

import _ from '../utils/underscore';
import WebServiceClient from '../utils/webserviceclient';

import View from '../components/view';
import IdeasCreateForm from '../components/ideas-create-form';

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
          tags: _.mkString(data.tags)
        })
      });
    });
  },

  handleCreateFormSubmit(idea) {
    this.props.ideasService.update(_.extend(idea, {
      tags: _.arrayFromString(idea.tags),
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
