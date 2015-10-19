import React from 'react';
import { StoreWatchMixin } from 'fluxxor';
import { Link as RouterLink, IndexLink } from 'react-router';
import { Grid, ProgressBar } from 'react-bootstrap';

import _ from '../utils/underscore';

import { AppMessagesStore } from '../flux/stores/_storeNames';

export default React.createClass({
  displayName: 'Navbar',

  mixins: [ StoreWatchMixin(AppMessagesStore) ],

  contextTypes: {
    authToken: React.PropTypes.object,
    flux: React.PropTypes.object
  },

  getStateFromFlux() {
    return {
      isLoading: this.context.flux.stores[AppMessagesStore].getLoadingEvents().length > 0
    };
  },

  handleLogOut(event) {
    this.context.flux.actions.appMessagesAuthenticate();
    event.stopPropagation();
    event.preventDefault();
  },

  renderProgressBar() {
    return _.doIfElse(this.state.isLoading, () => <ProgressBar active now={ 100 } className="app-loading-indicator" />, () => <ProgressBar now={ 0 } className="app-loading-indicator" />);
  },

  render() {
    return (
      <div className="app-header">
        { this.renderProgressBar() }
        <nav className="navbar navbar-static-top">
          <Grid>
            <div className="navbar-header">
              <button type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <IndexLink className="navbar-brand" to="/">
                Think & Hack<span className="highlight">together</span>
              </IndexLink>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              { this.context.authToken &&
                <ul className="nav navbar-nav pull-right">
                  <li>
                    <IndexLink to="/">
                      Home
                    </IndexLink>
                  </li>
                  <li>
                    <RouterLink to="/about">
                      About & Feedback
                    </RouterLink>
                  </li>
                  <li>
                    <a href="#" onClick={ this.handleLogOut }>Log Out</a>
                  </li>
                </ul> }
            </div>
          </Grid>
        </nav>
      </div>
      );
  }
});
