import React from 'react';
import Fluxxor from 'fluxxor';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory, useBasename } from 'history';

import About from '../views/about';
import Home from '../views/home';
import Idea from '../views/idea';
import Ideas from '../views/ideas';
import Submit from '../views/submit';

import Navbar from './navbar';
import Footer from './footer';

import Actions from '../flux/actions/ideas';
import StoreNames from '../flux/constants/_stores';
import IdeasStore from '../flux/stores/ideas';

import BaseURL from '../utils/baseURL';

const flux = new Fluxxor.Flux({
  [ StoreNames.IdeasStore ]: new IdeasStore()
}, Actions);

const App = React.createClass({
  displayName: 'App',

  propTypes: {
    children: React.PropTypes.any
  },

  childContextTypes: {
    flux: React.PropTypes.any,
    test: React.PropTypes.string
  },

  getChildContext() {
    return {
      flux: flux
    };
  },

  render() {
    return (
      <div>
          <Navbar />
          { this.props.children }
          <Footer />
        </div>
      );
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
      <Route path="ideas/add" component={ Submit } name="submit" />
      <Route path="about" component={ About } name="about" />
    </Route>
  </Router>
);
