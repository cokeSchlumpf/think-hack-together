import React from 'react';
import ReactDOM from 'react-dom';
import Intl from 'intl';
import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/lib/locale-data/en';
import deLocaleData from 'react-intl/lib/locale-data/de';
import Fluxxor from 'fluxxor';
import { StoreWatchMixin } from 'fluxxor';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory, useBasename } from 'history';

import _ from '../utils/underscore';

import Login from '../views/login';
import About from '../views/about';
import Home from '../views/home/home';
import Idea from '../views/idea';
import Ideas from '../views/ideas';
import Submit from '../views/submit';
import Edit from '../views/edit';

import Navbar from './navbar';
import Footer from './footer';

import Actions from '../flux/actions/_actions';
import Stores from '../flux/stores/_stores';
import { AppMessagesStore } from '../flux/stores/_storeNames';

import Messages from '../messages/_messages';

addLocaleData(enLocaleData);
addLocaleData(deLocaleData);

const flux = new Fluxxor.Flux(Stores, Actions);
flux.setDispatchInterceptor(function(action, dispatch) {
  ReactDOM.unstable_batchedUpdates(function() {
    dispatch(action);
  });
});

const App = React.createClass({
  displayName: 'App',

  mixins: [ StoreWatchMixin(AppMessagesStore) ],

  propTypes: {
    children: React.PropTypes.any,
    flux: React.PropTypes.any
  },

  childContextTypes: {
    authToken: React.PropTypes.object,
    flux: React.PropTypes.any
  },

  getChildContext() {
    return {
      flux: flux,
      authToken: this.state.authToken
    };
  },

  getDefaultProps() {
    return {
      flux: flux
    };
  },

  getStateFromFlux() {
    return {
      authToken: flux.stores[AppMessagesStore].getAuthToken(),
      locale: flux.stores[AppMessagesStore].getLocale()
    };
  },

  renderLogin() {
    return (
      <div>
        <Navbar />
        <Login />
      </div>);
  },

  renderDefault() {
    const messages = Messages[this.state.locale] ? Messages[this.state.locale] : Messages.default;

    return (
      <IntlProvider locale={ this.state.locale } messages={ messages }>
        <div>
          <Navbar />
          { this.props.children }
          <Footer />
        </div>
      </IntlProvider>);
  },

  render() {
    return this.state.authToken ? this.renderDefault() : this.renderLogin();
  }
});

// We have to configure WLP to do that... not really simple...
// const history = useBasename(createHistory)({ basename: BaseURL() });

export default (
<Router>
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } name="home" />
    <Route path="ideas/list" component={ Ideas } name="ideas" />
    <Route path="ideas/:id/detail" component={ Idea } name="idea" />
    <Route path="ideas/:id/edit" component={ Edit } name="idea" />
    <Route path="ideas/add" component={ Submit } name="submit" />
    <Route path="about" component={ About } name="about" />
  </Route>
</Router>
);
