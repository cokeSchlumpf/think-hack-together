import React from 'react';
import cookie from 'cookie';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Grid, Col, Row, ButtonInput, Input } from 'react-bootstrap';

import WebServiceClient from '../utils/webserviceclient';
import WebServiceHelperMixin from '../mixins/webservice-helper-mixin';

export default React.createClass({
  displayName: 'Login',

  mixins: [ LinkedStateMixin, WebServiceHelperMixin('auth') ],

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
    const c = cookie.parse(document.cookie);

    return {
      username: c.username && c.username !== 'undefined' ? c.username : '',
      password: ''
    };
  },

  handleSubmit() {
    const inData = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.authService.create(inData).onSuccess((outData, response) => {
      document.cookie = cookie.serialize('username', this.state.username, {
        path: '/'
      });
      this.context.flux.actions.appMessagesAuthenticate(outData.token);
      this.context.flux.actions.appMessagesMessageNew('LOGIN.LOGGED_IN', 'SUCCESS', {
        username: this.state.username
      });
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
