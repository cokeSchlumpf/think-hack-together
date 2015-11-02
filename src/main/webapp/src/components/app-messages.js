import React from 'react';
import { StoreWatchMixin } from 'fluxxor';
import { FormattedMessage } from 'react-intl';
import { Grid, Col, Row, ButtonInput, Input, Alert } from 'react-bootstrap';

import _ from '../utils/underscore';
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
            <FormattedMessage id={ message.message } values={ message.parameters } />
          </p>
        </Alert>);
    }, this);

    return _.doIfElse(messages.length > 0, () => {
      return (
        <Grid>
          <Row>
            <Col md={ 12 } className="alerts">
              { messages }
            </Col>
          </Row>
        </Grid>);
    }, () => {
      return <div></div>;
    });
  }
});
