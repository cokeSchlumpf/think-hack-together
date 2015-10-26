import React from 'react';
import { StoreWatchMixin } from 'fluxxor';

import _ from '../utils/underscore';
import Messages from '../messages/_messages';
import { AppMessagesStore } from '../flux/stores/_storeNames';

/**
 * This component provides localization Features. Simple Usage:
 *
 * <Locale>LANGUAGE.KEY</Locale>
 *
 * The language key will be used to get the messag from '../messages/_messages'. The language will be used depending on the getLocale()-state
 * from the AppMessagesStore.
 *
 * You can also pass params as an array to the component:
 *
 * <Locale params={ ["Egon"] }>KEY</Locale>
 *
 * If the language file would contain sth. like 'Hello %0' it would be replaced with 'Hello Egon'.
 *
 * If you like to render something different than <span>...</span> you can use the componentClass property to specify another
 * React component to render.
 *
 * <Locale componentClass='div'>KEY</Locale>
 *
 * If you like to render another component which uses it's translated key as a property, just set componentValue:
 *
 * <Locale componentClass={ InputButton } componentValue='value' value='KEY' />
 */
const defaultProps = {
  componentClass: 'span',
  componentValue: 'children',
  params: []
};

export default React.createClass({
  displayName: 'Locale',

  mixins: [ StoreWatchMixin(AppMessagesStore) ],

  contextTypes: {
    flux: React.PropTypes.any
  },

  propTypes: {
    children: React.PropTypes.string,
    componentClass: React.PropTypes.element,
    componentValue: React.PropTypes.string,
    params: React.PropTypes.array
  },

  getDefaultProps() {
    return defaultProps;
  },

  getStateFromFlux() {
    return {
      locale: this.context.flux.stores[AppMessagesStore].getLocale()
    };
  },

  getLanguageString(key) {
    _.check({
      isNonEmptyString: [ [ this.props.children ] ]
    });

    const messages = _.doIfElse(Messages[this.state.locale], () => Messages[this.state.locale], () => Messages.default, this);

    const message = _.orElse(
      _.reduce(
        key.split('.'),
        (obj, value) => _.doIfElse(obj, () => obj[value], () => obj),
        messages),
      key);

    return _.reduce(this.props.params, (s, param, index) => s.replace('%' + index, param), message);
  },

  render() {
    const ComponentClass = this.props.componentClass;
    const remainingProps = _.extend(
      _.omit(this.props, _.keys(defaultProps)), {
        [this.props.componentValue]: this.getLanguageString(this.props[this.props.componentValue])
      });
    return <ComponentClass { ...remainingProps } />;
  }
});
