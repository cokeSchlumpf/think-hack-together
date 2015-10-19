import { Client } from 'node-rest-client';

import _ from './underscore';
import UrlUtil from './url-util';

class WebServiceHandler {
  _callFunction(func) {
    if (func) {
      const args = _.toArray(arguments).slice(1);
      func.apply(null, args);
    }

    return this;
  }

  handleError(err) {
    return this._callFunction(this._onError, err);
  }

  handleSuccess(data, response) {
    return this._callFunction(this._onSuccess, data, response);
  }

  handleRequestTimeout(req) {
    this._callFunction(this._onRequestTimeout, req);
    return this._callFunction(this._onTimeout, req);
  }

  handleResponseTimeout(res) {
    this._callFunction(this._onResponseTimeout, res);
    return this._callFunction(this._onTimeout, res);
  }

  onError(func, context) {
    this._onError = context ? _.bind(func, context) : func;
    return this;
  }

  onSuccess(func, context) {
    this._onSuccess = context ? _.bind(func, context) : func;
    return this;
  }

  onTimeout(func, context) {
    this._onTimeout = context ? _.bind(func, context) : func;
    return this;
  }

  onRequestTimeout(func, context) {
    this._onRequestTimeout = context ? _.bind(func, context) : func;
    return this;
  }

  onResponseTimeout(func) {
    this._onResponseTimeout = context ? _.bind(func, context) : func;
    return this;
  }
}

export default class WebServiceClient {

  constructor(servicePath, requestConfig, responseConfig) {
    const serviceURL = `${UrlUtil.baseURL()}/${servicePath}`;
    const serviceItemURL = `${serviceURL}/\${id}`;

    if (!requestConfig) {
      this.requestConfig = {
        /*
        timeout: 10000,
        noDelay: true,
        keepAlive: true,
        keepAliveDelay: 10000
        */
      };
    } else {
      this.requestConfig = requestConfig;
    }

    if (!responseConfig) {
      this.responseConfig = {
        /*
        timeout: 10000
        */
      };
    } else {
      this.responseConfig = responseConfig;
    }

    this.client = new Client();

    this.client.registerMethod('list', serviceURL, 'GET');
    this.client.registerMethod('create', serviceURL, 'POST');
    this.client.registerMethod('read', serviceItemURL, 'GET');
    this.client.registerMethod('update', serviceItemURL, 'PUT');
    this.client.registerMethod('delete', serviceItemURL, 'DELETE');
  }

  _callMethod(func, args) {
    const handler = new WebServiceHandler(this.owner);
    const clientConfig = {
      requestConfig: this.requestConfig,
      responseConfig: this.responseConfig
    };

    const req = func.apply(this.client.methods, [ Object.assign({}, clientConfig, args), (responseData, response) => {
      handler.handleSuccess(responseData, response);
    } ]);

    req.on('error', handler.handleError);
    req.on('responseTimeout', handler.handleResponseTimeout);
    req.on('requestTimeout', request => {
      handler.handleRequestTimeout(request);
      request.abort();
    });

    return handler;
  }

  /**
   * Lists a number of entities defined by start, count, and sortation.
   * @param {number} start is the first delivered entities.
   * @param {number} count is the number of delivered entities.
   * @param {string} orderBy is the name of the column the entities should be ordered. An array of strings will be transformed to a comma-speperated string.
   * @param {boolean} asc identifies the sorting order, default is true.
   * @param {object} where is a map where you define options to filter your entities. E.g. { "foo": "*bar" }.
   * @param {headers} headers is a map if headers past to ther server.
   * @returns {array} a list of JSON entities.
   */
  list(start = 0, count = 0, orderBy = '', asc = true, where = {}, headers = {}) {
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
}
