import Constants from '../constants/app-messages';
import _ from '../../utils/underscore';

export default {
  /**
   * Indicates that an async loading operation started.
   * @param {string} message which will be displayed
   * @param {string} component which owns the loading event
   * @param {string} identity is a unique identifier, set by the component
   * @return {undefined}
   */
  appMessagesLoadingStart(message, component, identity) {
    _.check({
      nonEmptyString: [ [ message ], [ component ], [ identity ] ]
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
      nonEmptyString: [ [ component ], [ identity ] ]
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
   * @return {undefined}
   */
  appMessagesMessageNew(message, type) {
    _.check({
      nonEmptyString: [ [ message ] ],
      contains: [ [ [ 'SUCCESS', 'INFO', 'WARNING', 'DANGER' ], type ] ]
    });

    this.dispatch(Constants.APP_MESSAGES_MESSAGE_NEW, {
      message: message,
      type: type,
      hidden: hidden
    });
  }
};
