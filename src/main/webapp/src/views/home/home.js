import React from 'react';
import { Grid, Col, Row, Jumbotron, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import _ from '../../utils/underscore';
import WebServiceClient from '../../utils/webserviceclient';

import Header from './_header';
import ItemGroup from './_item-group';
import IdeasCreateForm from '../../components/ideas-create-form';
import Search from '../../components/search';
import View from '../../components/view';
import AppMessages from '../../components/app-messages';

import { EntityStore } from '../../flux/stores/_storeNames';
import EntityStoreWatchMixin from '../../mixins/entity-store-watch-mixin';
import WebServiceHelperMixin from '../../mixins/webservice-helper-mixin';

export default React.createClass({
  displayName: 'Home',

  mixins: [ EntityStoreWatchMixin('Ideas'), WebServiceHelperMixin('Ideas') ],

  propTypes: {
    ideasService: React.PropTypes.any
  },

  getDefaultProps() {
    return {
      ideasService: new WebServiceClient('api/ideas')
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
    authToken: React.PropTypes.object,
    flux: React.PropTypes.object,
    intl: React.PropTypes.object
  },

  componentDidMount() {
    this.props.ideasService.list(this.context.authToken).onSuccess((data, response) => {
      this.ideasSetAll(data);
    }, this);
  },

  handleCreateFormSubmit(idea) {
    const data = _.extend(idea, {
      tags: _.arrayFromString(idea.tags)
    });

    this.props.ideasService.create(data, this.context.authToken).onSuccess((newIdea) => {
      this.ideasSetOne(newIdea);
    }, this);
  },

  handleCreateFormChange(idea) {
    this.setState({
      newIdea: idea
    });
  },

  // Generic solution
  handleDelete(entityname) {
    return _.bind((id) => {
      this.props[entityname + 'Service'].delete(id, this.context.authToken).onSuccess(() => {
        this.ideasDelete(id);
      }, this);
    }, this);
  },

  render() {
    const testMessageDescriptor = {
      id: 'HOME.TEST',
      defaultMessage: 'Testnachricht'
    };

    const testMessageVars = {
      name: 'Emil'
    };

    const testMessage = this.context.intl.formatMessage(testMessageDescriptor, testMessageVars);

    return (
      <View>
        <Header />
        <AppMessages />
        <Grid>
          <Row>
            <Col md={ 6 }>
              <FormattedMessage { ...testMessageDescriptor } values={ testMessageVars } />
            </Col>
            <Col md={ 6 }>
              <Button onClick={ () => this.context.flux.actions.appMessagesSetLocale('de-DE') }>
                { testMessage }
              </Button>
            </Col>
          </Row>
        </Grid>
        <Grid className="content">
          { this.state.ideasState && this.state.ideasState.length > 0 &&
            <ItemGroup title="Top Ideas" items={ this.state.ideasState } onLike={ this.context.flux.actions.ideasLike } onDelete={ this.handleDelete('ideas') } /> }
          { this.state.ideasState && this.state.ideasState.length > 0 &&
            <ItemGroup title="New Ideas" items={ this.state.ideasState } onLike={ this.context.flux.actions.ideasLike } onDelete={ this.handleDelete('ideas') } /> }
        </Grid>
        <IdeasCreateForm onChange={ this.handleCreateFormChange } onSubmit={ this.handleCreateFormSubmit } { ...this.state.newIdea } />
        <Search showTitle />
      </View>
      );
  }
});
