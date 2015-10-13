/**
 * Column module.
 * @module components/col
 */

import React from 'react';
import Router from 'react-router';
import cx from 'classnames';

import Container from './container';

/**
 * Simple class to create a Bootstrap container.
 */
export default React.createClass({

  propTypes: {
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    md: React.PropTypes.number,
    sm: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      md: 12,
      sm: 12
    };
  },

  getClassName() {
    const names = { };
    names[this.props.className] = true;
    names['col-sm-' + this.props.sm] = true;
    names['col-md-' + this.props.md] = true;
    return cx(names);
  },

  render() {
    return (
      <div className={ this.getClassName() }>
        { this.props.children }
      </div>
    );
  }

});
