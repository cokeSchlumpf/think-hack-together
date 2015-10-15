import { Client } from 'node-rest-client';

import URLUtil from './urlUtil';
import ArrayUtil from './arrayUtil';
import ConstantsFactory from './constantsFactory';

class WebServiceHandler {

  constructor(owner) {
    this.owner = owner;
  }

  _callFunction(func) {
    if (func) {
      arguments.shift();
      func.apply(this.owner, arguments);
    }

    return this;
  }

  handleError(err) {
    return _callFunction(this.onError, err);
  }

  handleSuccess(data, response) {
    return _callFunction(this.onSuccess, data, response);
  }

  handleRequestTimeout(req) {
    _callFunction(this.onRequestTimeout, req);
    return _callFunction(this.onTimeout, req);
  }

  handleResponseTimeout(res) {
    _callFunction(this.onResponseTimeout, res);
    return _callFunction(this.onTimeout, res);
  }

  onError(func) {
    this._onError = func;
    return this;
  }

  onSuccess(func) {
    this._onSuccess = func;
    return this;
  }

  onTimeout(func) {
    this._onTimeout = func;
    return this;
  }

  onRequestTimeout(func) {
    this._onRequestTimeout = func;
    return this;
  }

  onResponseTimeout(func) {
    this._onResponseTimeout = func;
    return this;
  }

}

export default class WebServiceClient {

  constructor(owner, servicePath, requestConfig, responseConfig) {
    const serviceURL = `${URLUtil.baseURL()}/${servicePath}`;
    const serviceItemURL = `${baseURL}/\${id}`;

    this.owner = owner;

    if (!requestConfig) {
      this.requestConfig = {
        timeout: 10000,
        noDelay: true,
        keepAlive: true,
        keepAliveDelay: 10000
      };
    } else {
      this.requestConfig = requestConfig;
    }

    if (!responseConfig) {
      this.responseConfig = {
        timeout: 10000
      };
    } else {
      this.responseConfig = responseConfig;
    }

    this.client = new Client();

    client.registerMethod('list', serviceURL, 'GET');
    client.registerMethod('create', serviceURL, 'POST');
    client.registerMethod('read', serviceItemURL, 'GET');
    client.registerMethod('update', serviceItemURL, 'PUT');
    client.registerMethod('delete', serviceItemURL, 'DELETE');
  }

  _callMethod(func, args) {
    const handler = new WebServiceHandler(owner);
    const clientConfig = {
      requestConfig: this.requestConfig,
      responseConfig: this.responseConfig
    };

    const req = func.apply(this.clients.methods, [ Object.assign({}, clientConfig, args), (responseData, response) => {
      console.log(responseData);
      console.log(response);

      handler.handleSuccess(responseData, response);
    } ]);

    req.on('error', handler.handleError);
    req.on('responseTimeout', handler.handleResponseTimeout);
    req.on('requestTimeout', req => {
      handler.handleRequestTimeout(req);
      req.abort();
    });

    return handler;
  }

  /**
   *
   * @param {number} start is the first delivered entities.
   * @param {number} count is the number of delivered entities.
   * @param {string} orderBy is the name of the column the entities should be ordered. An array of strings will be transformed to a comma-speperated string.
   * @param {boolean} asc identifies the sorting order, default is true.
   * @param {object} where is a map where you define options to filter your entities. E.g. { "foo": "*bar" }.
   * @param {headers} is a map if headers past to ther server.
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
      if (ArrayUtil.isArray(orderBy)) {
        data[orderBy] = ArrayUtil.mkString(orderBy);
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

    this.client.methods.list(data);
  }
}
