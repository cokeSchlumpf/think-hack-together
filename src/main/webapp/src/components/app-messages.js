import React from 'react';
import { StoreWatchMixin } from 'fluxxor';
import { Grid, Col, Row, ButtonInput, Input, Alert } from 'react-bootstrap';

import _ from '../utils/underscore';
import Locale from './locale';
import { AppMessagesStore } from '../flux/stores/_storeNames';

export default React.createClass({
  displayName: 'AppMessages',

  mixins: [ StoreWatchMixin(AppMessagesStore) ],

  contextTypes: {
    flux: React.PropTypes.object
  },

  getStateFromFlux() {
    return {
      messages: this.context.flux.stores[AppMessagesStore].getCurrentMessages()
    };
  },

  handleDismiss(id) {
    return _.bind(() => {
      this.context.flux.actions.appMessagesMessageHide(id);
    }, this);
  },

  render() {
    const messages = _.map(this.state.messages, message => {
      return (
        <Alert key={ 'alert' + message.id } bsStyle={ message.type.toLowerCase() } onDismiss={ this.handleDismiss(message.id) }>
          <p>
            <Locale params={ message.parameters }>
              { message.message }
            </Locale>
          </p>
        </Alert>);
    }, this);

    return _.doIfElse(messages.length > 0, () => {
      return (
        <Grid>
          <Row>
            <Col md={ 12 }>
              { messages }
            </Col>
          </Row>
        </Grid>);
    }, () => {
      return <div></div>;
    });
  }
});
