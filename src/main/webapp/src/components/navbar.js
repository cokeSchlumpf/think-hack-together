/**
 * Navbar module.
 * @module components/navbar
 */

import React from 'react';
import { Link } from 'react-router';

import Container from './container';

export default React.createClass({

  displayName: 'Navbar',

  render() {
    return (
      <nav className="navbar navbar-static-top">
        <Container>
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="home">Think & Hack<span className="highlight"> together</span> JURI</Link>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav pull-right">
              <li className="active"><Link to="home">Home</Link></li>
              <li><Link to="about">About & Feedback</Link></li>
            </ul>
          </div>
        </Container>
      </nav>
    );
  }

});
