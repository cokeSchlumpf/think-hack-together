import Constants from '../constants/app-messages';
import _ from '../../utils/underscore';

export default {
  /**
   * Changes the authentication state of the application.
   * @param {string} [token] which will be send to the server during requests to authenticate; leave undefined to log out.
   * @return {undefined}
   */
  appMessagesAuthenticate(token) {
    this.dispatch(Constants.APP_MESSAGES_AUTHENTICATE, {
      token: token
    });
  },

  /**
   * Clears all application messages and current loading events.
   * @return {undefined}
   */
  appMessagesClear() {
    this.dispatch(Constants.APP_MESSAGES_CLEAR, {});
  },

  /**
   * Indicates that an async loading operation started.
   * @param {string} message which will be displayed
   * @param {string} component which owns the loading event
   * @param {string} identity is a unique identifier, set by the component
   * @return {undefined}
   */
  appMessagesLoadingStart(message, component, identity) {
    _.check({
      isNonEmptyString: [ [ message ], [ component ] ],
      isDefined: [ [ identity ] ]
    });

    this.dispatch(Constants.APP_MESSAGES_LOADING_START, {
      message: message,
      component: component,
      identity: identity
    });
  },

  /**
   * Indicates that an async loading operation finished.
   * @param {string} component name of the component owning the loading event
   * @param {string} identity is the unique identifier passed during start event
   * @return {undefined}
   */
  appMessagesLoadingDone(component, identity) {
    _.check({
      isNonEmptyString: [ [ component ] ],
      isDefined: [ [ identity ] ]
    });

    this.dispatch(Constants.APP_MESSAGES_LOADING_DONE, {
      component: component,
      identity: identity
    });
  },

  /**
   * Sets a message to hidden.
   * @param {number} id of the message
   * @return {undefined}
   */
  appMessagesMessageHide(id) {
    _.check({
      isNumber: [ [ id ] ]
    });

    this.dispatch(Constants.APP_MESSAGES_MESSAGE_HIDE, {
      id: id
    });
  },

  /**
   * Creates a new application message.
   * @param {string} message which will be displayed
   * @param {string} type of the message, one of: SUCCESS, INFO, WARNING, DANGER
   * @param {object} parameters of the message text.
   * @return {undefined}
   */
  appMessagesMessageNew(message, type, parameters) {
    _.check({
      isNonEmptyString: [ [ message ] ],
      contains: [ [ [ 'SUCCESS', 'INFO', 'WARNING', 'DANGER' ], type ] ],
      isObject: parameters ? [ [ parameters ] ] : []
    });

    this.dispatch(Constants.APP_MESSAGES_MESSAGE_NEW, {
      message: message,
      type: type,
      hidden: false,
      parameters: parameters
    });
  },

  /**
   * Sets the local of the application.
   * @param {string} locale of the application
   * @return {undefined}
   */
  appMessagesSetLocale(locale) {
    _.check({
      isNonEmptyString: [ [ locale ] ]
    });

    this.dispatch(Constants.APP_MESSAGES_SET_LOCALE, {
      locale: locale
    });
  }
};
