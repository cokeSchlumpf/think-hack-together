import React from 'react';
import Router from 'react-router';
import cx from 'classnames';

/**
 * Simple class to create a Bootstrap container.
 */
export default React.createClass({

  propTypes: {
    children: React.PropTypes.any,
    className: React.PropTypes.string
  },

  getClassName() {
    const names = { container: true };
    if (this.props.className) {
      names[this.props.className] = true;
    }
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
