/**
 * Thumbnail module.
 * @module components/thumbnail
 */

import React from 'react';
import { Link as RouterLink } from 'react-router';
import cx from 'classnames';
import dateformat from 'dateformat';

export default React.createClass({
  displayName: 'thumbnail',

  propTypes: {
    color: React.PropTypes.string,
    date: React.PropTypes.number,
    id: React.PropTypes.number,
    likes: React.PropTypes.number,
    liked: React.PropTypes.bool,
    organizer: React.PropTypes.string,
    tags: React.PropTypes.array,
    title: React.PropTypes.string,
    town: React.PropTypes.string,
    type: React.PropTypes.oneOf([ 'Hackathon', 'Ongoing' ]),

    onLike: React.PropTypes.func
  },

  getClassName() {
    const names = {
      thumbnail: true
    };
    names[this.props.color] = true;
    return cx(names);
  },

  getActivityTypeAndDate() {
    const date = dateformat(new Date(this.props.date * 1000), 'dddd, mmm dS, yyyy');

    const type = this.props.type === 'Ongoing' ? 'Ongoing activity started on' : 'Hackathon on';

    return `${type} ${ date }, ${ this.props.town }`;
  },

  getLikes() {
    const className = cx({
      glyphicon: true,
      'glyphicon-heart': this.props.liked,
      'glyphicon-heart-empty': !this.props.liked
    });

    return (
      <a href="#" className="likes" onClick={ this.handleLike }><span className={ className } /> &nbsp;
        { this.props.likes }
      </a>
      );
  },

  handleLike(event) {
    if (this.props.onLike) {
      this.props.onLike(this.props.id);
    }

    event.preventDefault();
  },

  render() {
    const createLi = (tag, index) => {
      return (
        <li key={ 'li_' + index }>
          { tag }
        </li>
        );
    };

    const detailURL = `/ideas/${this.props.id}/detail`;

    return (
      <div className={ this.getClassName() }>
        <ul className="tags">
          <li className="author">
            { this.getActivityTypeAndDate() }
          </li>
          { this.props.tags.map(createLi) }
        </ul>
        <div className="caption">
          <h3><a href="#">{ this.props.title }</a></h3>
        </div>
        <div className="actions">
          <p>
            { this.getLikes() } &nbsp;&nbsp;&nbsp;
            <RouterLink to={ detailURL } className="more">
              <span className="glyphicon glyphicon-log-out" />
              <span>&nbsp; Find out more</span>
            </RouterLink>
          </p>
        </div>
      </div>
      );
  }
});
