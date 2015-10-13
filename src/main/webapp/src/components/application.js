import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import About from '../views/about';
import Home from '../views/home';
import Idea from '../views/idea';
import Ideas from '../views/ideas';
import Submit from '../views/submit';

import Navbar from './navbar';
import Footer from './footer';

const App = React.createClass({
  displayName: 'App',

  propTypes: {
    children: React.PropTypes.any
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

export default (
<Router>
    <Route path="/" component={ App }>
      <IndexRoute component={ Home } />
      <Route path="ideas/list" component={ Ideas } name="ideas" />
      <Route path="ideas/:id/detail" component={ Idea } name="idea" />
      <Route path="ideas/add" component={ Submit } name="submit" />
      <Route path="about" component={ About } name="about" />
    </Route>
  </Router>
);
