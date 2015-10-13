import React from 'react';
import { Link } from 'react-router';

export default React.createClass({

  propTypes: {
    children: React.PropTypes.any
  },
  
  render() {
    return (
      <div className="view">
        { this.props.children }
      </div>
    );
  }
  
});
