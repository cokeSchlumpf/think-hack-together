import React from 'react';
import { StoreWatchMixin } from 'fluxxor';

import _ from '../utils/underscore';
import Messages from '../messages/_messages';
import { AppMessagesStore } from '../flux/stores/_storeNames';

export default React.createClass({
  displayName: 'Locale',

  mixins: [ StoreWatchMixin(AppMessagesStore) ],

  contextTypes: {
    flux: React.PropTypes.any
  },

  propTypes: {
    children: React.PropTypes.string,
    params: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      params: []
    };
  },

  getStateFromFlux() {
    return {
      locale: this.context.flux.stores[AppMessagesStore].getLocale()
    };
  },

  getLanguageString() {
    _.check({
      isNonEmptyString: [ [ this.props.children ] ]
    });

    const messages = _.doIfElse(Messages[this.state.locale], () => Messages[this.state.locale], () => Messages.default, this);

    const message = _.orElse(
      _.reduce(
        this.props.children.split('.'),
        (obj, value) => _.doIfElse(obj, () => obj[value], () => obj),
        messages),
      this.props.children);

    return _.reduce(this.props.params, (s, param, index) => s.replace('%' + index, param), message);
  },

  render() {
    return <span>{ this.getLanguageString() }</span>;
  }
});
