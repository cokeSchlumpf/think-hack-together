import { Client } from 'node-rest-client';

import _ from './underscore';
import UrlUtil from './url-util';

class WebServiceHandler {

  /**
   * Calls error handler if defined.
   * @param {object} err extracted from response.
   * @param {object} response from the server.
   * @return {any} -thing the handler may return.
   */
  handleError(err, response) {
    return _.callFunction(this._onError, err, response);
  }

  /**
   * Calls success handler if defined.
   * @param {object} data extracted from the response.
   * @param {object} response received from the server.
   * @return {any} -thing the handler may return.
   */
  handleSuccess(data, response) {
    return _.callFunction(this._onSuccess, data, response);
  }

  /**
   * Calls resquest-timeout handlers if defined.
   * @param {object} req The The request sent to the server.
   * @return {any} -thing the handler may return.
   */
  handleRequestTimeout(req) {
    _.callFunction(this._onTimeout, req);
    return _.callFunction(this._onRequestTimeout, req);
  }

  /**
   * Calls response-timeout handlers if defined.
   * @param {object} res The response received from the server.
   * @return {any} -thing the handler may return.
   */
  handleResponseTimeout(res) {
    _.callFunction(this._onTimeout, res);
    return _.callFunction(this._onResponseTimeout, res);
  }

  /**
   * Sets an error handler function.
   * @param {function} func to be called if defined.
   * @param {object} [context] which is bind to the function.
   * @return {WebServiceHandler} this
   */
  onError(func, context) {
    this._onError = context ? _.bind(func, context) : func;
    return this;
  }

  /**
   * Sets a success handler function.
   * @param {function} func to be called if defined.
   * @param {object} [context] which is bind to the function.
   * @return {WebServiceHandler} this
   */
  onSuccess(func, context) {
    this._onSuccess = context ? _.bind(func, context) : func;
    return this;
  }

  /**
   * Sets a timeout handler function which will be called on request- and response-timeouts.
   * @param {function} func to be called if defined.
   * @param {object} [context] which is bind to the function.
   * @return {WebServiceHandler} this
   */
  onTimeout(func, context) {
    this._onTimeout = context ? _.bind(func, context) : func;
    return this;
  }

  /**
   * Sets a request-timeout handler function.
   * @param {function} func to be called if defined.
   * @param {object} [context] which is bind to the function.
   * @return {WebServiceHandler} this
   */
  onRequestTimeout(func, context) {
    this._onRequestTimeout = context ? _.bind(func, context) : func;
    return this;
  }

  /**
   * Sets a response handler function.
   * @param {function} func to be called if defined.
   * @param {object} [context] which is bind to the function.
   * @return {WebServiceHandler} this
   */
  onResponseTimeout(func) {
    this._onResponseTimeout = context ? _.bind(func, context) : func;
    return this;
  }
}

export default class WebServiceClient {

  /**
   * Creates a new instance of WebServiceClient.
   * @param {string} servicePath of the server resource. E.g. '/api/books'.
   * @param {object} [requestConfig] of the service.
   * @param {object} [responseConfig] of the service.
   * @return {WebServiceClient} instance
   */
  constructor(servicePath, requestConfig = {}, responseConfig = {}) {
    _.check({
      isNonEmptyString: [ [ servicePath ] ]
    });

    const serviceURL = _.doIfElse(
      servicePath.indexOf('http://') === -1 || servicePath.indexOf('https://') === -1,
      () => `${UrlUtil.baseURL()}/${servicePath}`,
      () => servicePath);
    const serviceItemURL = `${serviceURL}/\${id}`;

    this.requestConfig = requestConfig;
    this.responseConfig = responseConfig;
    this.requestCount = 0;

    this.client = new Client();

    this.client.registerMethod('list', serviceURL, 'GET');
    this.client.registerMethod('create', serviceURL, 'POST');
    this.client.registerMethod('read', serviceItemURL, 'GET');
    this.client.registerMethod('update', serviceItemURL, 'PUT');
    this.client.registerMethod('delete', serviceItemURL, 'DELETE');
  }

  /**
   * Internal method which calls the webservice client method with default request and response config,
   * adds error handling and binds handlers.
   * @param {function} func to be called.
   * @param {object} args to be passed to the function (will be merged with configuration).
   * @return {WebServiceHandler} handler.
   */
  _callMethod(func, args) {
    const handler = new WebServiceHandler(this.owner);
    const clientConfig = {
      requestConfig: this.requestConfig,
      responseConfig: this.responseConfig
    };

    this.requestCount = this.requestCount + 1;
    const requestNumber = this.requestCount;

    _.callFunction(this._onStartRequest, requestNumber);

    const req = func.apply(this.client.methods, [ Object.assign({}, clientConfig, args), _.bind((responseData, response) => {
      if (response.statusCode >= 200 && response.statusCode <= 300) {
        handler.handleSuccess(responseData, response);
      } else {
        handler.handleError(responseData, response);
        _.callFunction(this._onError, responseData, response);
      }

      _.callFunction(this._onFinishRequest, requestNumber);
    }, this) ]);

    req.on('error', this._callFinishRequest(requestNumber, handler.handleError));
    req.on('responseTimeout', this._callFinishRequest(requestNumber, handler.handleResponseTimeout));
    req.on('requestTimeout', this._callFinishRequest(requestNumber, request => {
      handler.handleRequestTimeout(request);
      request.abort();
    }));

    return handler;
  }

  /**
   * Calls onFinishRequest after calling func.
   * @param {number} requestNumber identifies the number of the request.
   * @param {function} func will be executed before onFinishRequest.
   * @return {function} a function which can be registered as handler.
   */
  _callFinishRequest(requestNumber, func) {
    return function() {
      func.apply();
      _.callFunction(this._onFinishRequest, requestNumber);
    };
  }

  /**
   * Lists a number of entities defined by start, count, and sortation.
   * @param {headers} headers is a map if headers past to ther server.
   * @param {number} start is the first delivered entities.
   * @param {number} count is the number of delivered entities.
   * @param {string} orderBy is the name of the column the entities should be ordered. An array of strings will be transformed to a comma-speperated string.
   * @param {boolean} asc identifies the sorting order, default is true.
   * @param {object} where is a map where you define options to filter your entities. E.g. { "foo": "*bar" }.
   * @returns {array} a list of JSON entities.
   */
  list(headers = {}, start = 0, count = 0, orderBy = '', asc = true, where = {}) {
    const data = {};

    if (start !== 0) {
      data[start] = start;
    }

    if (count !== 0) {
      data[count] = count;
    } else if (start !== 0) {
      data[count] = 100;
    }

    if (orderBy.length > 0) {
      if (_.isArray(orderBy)) {
        data[orderBy] = _.mkString(orderBy);
      } else {
        data[orderBy] = orderBy;
      }

      data[asc] = asc;
    }

    Object.keys(where).forEach(key => {
      data['filer_' + key] = where[key];
    });

    const args = {
      data: data,
      headers: headers
    };

    return this._callMethod(this.client.methods.list, args);
  }

  /**
   * Creates an entity.
   * @param {object} entity the defined entity to be created.
   * @returns {object} a JSON entity.
   */
  create(entity, headers = {}) {
    const args = {
      data: entity,
      headers: _.extend({
        'Content-Type': 'application/json'
      }, headers)
    };

    return this._callMethod(this.client.methods.create, args);
  }

  /**
   * Reads an entity defined by id.
   * @param {string} id the defined entity id.
   * @returns {object} a JSON entity.
   */
  read(id, headers = {}) {
    const args = {
      path: {
        id: id
      },
      headers: headers
    };

    return this._callMethod(this.client.methods.read, args);
  }

  /**
   * Updates an entity defined by id.
   * @param {object} entity the defined entity id to be updated.
   * @returns {object} a JSON entity.
   */
  update(entity, headers = {}) {
    const args = {
      data: entity,
      path: {
        id: entity.id
      },
      headers: _.extend({
        'Content-Type': 'application/json'
      }, headers)
    };

    return this._callMethod(this.client.methods.update, args);
  }

  /**
   * Deletes an entity defined by id.
   * @param {string} id the defined entity id to be deleted.
   * @returns {object} a JSON entity.
   */
  delete(id, headers = {}) {
    const args = {
      path: {
        id: id
      },
      headers: headers
    };

    return this._callMethod(this.client.methods.delete, args);
  }

  /**
   * @param {function} func to be executed after finishing a request.
   * @param {object} context for the func.
   * @return {WebServiceClient} this.
   */
  onFinishRequest(func, context) {
    this._onFinishRequest = context ? _.bind(func, context) : func;
  }

  /**
   * @param {function} func to be executed before starting a request.
   * @param {object} context for the func.
   * @return {WebServiceClient} this.
   */
  onStartRequest(func, context) {
    this._onStartRequest = context ? _.bind(func, context) : func;
  }

  /**
   * @param {function} func which is called in case of an error.
   * @param {object} [context] the function should be bind.
   * @return {WebServiceClient} this
   */
  onError(func, context) {
    this._onError = context ? _.bind(func, context) : func;
    this.client.on('error', this._onError);
  }
}
