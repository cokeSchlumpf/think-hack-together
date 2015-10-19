import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Grid, Col, Row, ButtonInput, Input } from 'react-bootstrap';

import WebServiceClient from '../utils/webserviceclient';

export default React.createClass({
  displayName: 'Login',

  mixins: [ LinkedStateMixin ],

  contextTypes: {
    flux: React.PropTypes.any
  },

  propTypes: {
    authService: React.PropTypes.any
  },

  getDefaultProps() {
    return {
      authService: new WebServiceClient('api/auth')
    };
  },

  getInitialState() {
    return {
      username: '',
      password: ''
    };
  },

  handleSubmit() {
    const inData = {
      username: this.state.username,
      password: this.state.password
    };
    this.context.flux.actions.appMessagesLoadingStart('Logging in', 'login', 1);
    this.props.authService.create(inData).onSuccess((outData, response) => {
      this.context.flux.actions.appMessagesAuthenticate(outData.token);
      this.context.flux.actions.appMessagesLoadingDone('login', 1);
    }, this);
  },

  render() {
    return (
      <Grid>
        <Row>
          <Col md={ 6 }>
            <Input type="text" label="Username" placeholder="Username" valueLink={ this.linkState('username') } />
          </Col>
          <Col md={ 6 }>
            <Input type="password" label="Password" placeholder="Password" valueLink={ this.linkState('password') } />
          </Col>
        </Row>
        <Row>
          <Col md={ 12 }>
            <ButtonInput type="submit" value="Create Idea" bsStyle="primary" onClick={ this.handleSubmit } />
          </Col>
        </Row>
      </Grid>);
  }
});
