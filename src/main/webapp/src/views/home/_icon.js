import React from 'react';
import cx from 'classnames';

export default React.createClass({
  displayName: 'Home.Icon',

  propTypes: {
    className: React.PropTypes.string,
    text: React.PropTypes.string,
    title: React.PropTypes.string
  },

  getClassName() {
    const names = {
      icon: true
    };
    names[this.props.className] = true;
    return cx(names);
  },

  render() {
    return (
      <div className={ this.getClassName() }>
        <h3>{ this.props.title }</h3>
        <p>
          { this.props.text }
        </p>
      </div>
      );
  }
});
