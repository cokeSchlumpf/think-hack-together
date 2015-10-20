import Fluxxor from 'fluxxor';
import cookie from 'cookie';
import _ from '../../utils/underscore';

import Constants from '../constants/app-messages';

/**
 * This store handles messages, notifications, errors of the application.
 * All messages are stored in an array. Each message has the format:
 *
 * { id: 0, message: 'string', type: 'SUCCESS|INFO|WARNING|DANGER', hidden: false, parameters: [] }
 *
 * In addition to messages, the store keeps the state whether the application
 * is loading data or not. For this purpose it keeps a list of current loading
 * events, they do look like:
 *
 * { message: 'string', component: 'componentName', identity: 'anyIdentifier' }
 *
 * (componentName + identity) should be unique.
 */
export default Fluxxor.createStore({

  /**
   * This method will be triggered by Fluxxor.
   * @return {undefined}
   */
  initialize() {
    this._messages = [];
    this._loading = [];
    this._locale = 'en-US';

    const currentCookie = cookie.parse(document.cookie);
    if (currentCookie && currentCookie.authToken && currentCookie.authToken !== 'undefined') {
      this._authToken = currentCookie.authToken;
    }

    this.bindActions.apply(this, _.flatten(_.zip(_.values(Constants), [
      this._authenticate,
      this._clear,
      this._loadingStart,
      this._loadingDone,
      this._messageHide,
      this._messageNew,
      this._setLocale
    ])));
  },

  /**
   * Helper method to execute a function and emit a change event afterwords.
   * @param {function} func will be executed with `this` as context.
   * @return {undefined} but a change will be emitted.
   */
  _emitChange(func) {
    if (_.isFunction(func)) {
      func.apply(this);
    }
    this.emit('change');
  },

  /**
   * Returns the current authToken
   * @return {string} the authToken, may be undefined if no authToken present.
   */
  getAuthToken() {
    return _.orElse({
      Authorization: 'Bearer ' + this._authToken
    }, this._authToken, () => _.isDefined(this._authToken));
  },

  /**
   * @param {string} [filterType] to only return messages of a given type.
   * @return {array} of all messages which are not hidden.
   */
  getCurrentMessages(filterType) {
    return _.filter(this.getState().messages, msg => {
      return !msg.hidden && (!filterType || msg.type === filterType);
    });
  },

  /**
   * @param {string} [componentName] of the component which is the owner of the events.
   * @return {array} a list of current loading events for the component.
   */
  getLoadingEvents(componentName) {
    return _.filter(this._loading, event => {
      return !componentName || event.componentName === componentName;
    });
  },

  /**
   * @return {string} current locale.
   */
  getLocale() {
    return this._locale;
  },

  /**
   * Returns the state of the store.
   * @return {object} that contains messages and current loading events.
   */
  getState() {
    return {
      messages: _.map(this._messages, (message, index) => {
        return _.extend({}, message, {
          id: index
        });
      }),
      loading: this._loading
    };
  },

  /**
   * Changes state of authentication of the application.
   * @param {object} payload containes the token { token: '...' }.
   * @return {undefined} but a change will be emitted.
   */
  _authenticate(payload) {
    this._emitChange(() => {
      document.cookie = cookie.serialize('authToken', payload.token, {
        path: '/'
      });

      this._authToken = payload.token;
    });
  },

  /**
   * Clears all messages and loading events.
   */
  _clear() {
    this._emitChange(() => {
      this._messages = [];
      this._loading = [];
    });
  },

  /**
   * Creates an active loading message in the store.
   * @param {object} payload contains the identity and the information of the async event, e.g. { message: 'string', component: 'componentName', identity: 'anyIdentifier' }-
   * @return {undefined} but a change will be emitted.
   */
  _loadingStart(payload) {
    this._emitChange(() => {
      this._loading.push(payload);
    });
  },

  /**
   * Removes a loading message from the store.
   * @param {object} payload contains the identity and the component of the loading message, e.g. { component: '', identity: '' }.
   * @return {undefined} but a change will be emitted.
   */
  _loadingDone(payload) {
    this._emitChange(() => {
      this._loading = this._loading.filter(msg => {
        return !(msg.component === payload.component && msg.identity === payload.identity);
      });
    });
  },

  /**
   * Sets a message to be hidden.
   * @param {object} payload contains the id of the message, e.g. { id: 0 }.
   * @return {undefined} but a change will be emitted.
   */
  _messageHide(payload) {
    this._emitChange(() => {
      this._messages[payload.id].hidden = true;
    });
  },

  /**
   * Creates a new message.
   * @param {object} payload contains the message information, e.g. { id: 0, message: 'string', type: 'SUCCESS|INFO|WARNING|DANGER', hidden: false }
   * @return {undefined} but a change will be emitted.
   */
  _messageNew(payload) {
    this._emitChange(() => {
      this._messages.push(payload);
    });
  },

  /**
   * Creates a new message.
   * @param {object} payload contains the new locale as known country code, e.g. { locale: 'en-US' }
   * @return {undefined} but a change will be emitted.
   */
  _setLocale(payload) {
    this._emitChange(() => {
      this._locale = payload.locale;
    });
  }

});
