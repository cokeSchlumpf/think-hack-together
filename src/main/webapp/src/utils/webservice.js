import { Client } from 'node-rest-client';
import URLUtil from './URLUtil';
import ConstantsFactory from './constantsFactory';

export default class WebServiceClient {

  static get ORDER_BY() {
    return ConstantsFactory('ASC', 'DESC');
  }

  constructor(servicePath) {
    const serviceURL = `${URLUtil.baseURL()}/${servicePath}`;
    const serviceItemURL = `${baseURL}/\${id}`;

    this.client = new Client();

    client.registerMethod('list', serviceURL, 'GET');
    client.registerMethod('create', serviceURL, 'POST');
    client.registerMethod('read', serviceItemURL, 'GET');
    client.registerMethod('update', serviceItemURL, 'PUT');
    client.registerMethod('delete', serviceItemURL, 'DELETE');
  }

  onError(errorHandler) {
    this.client.on('error', function(err) {
      errorHandler(errorHandler);
    });
  }

  /**

   * @param {number} start is the first delivered entities.
   * @param {number} count is the number of delivered entities.
   * @param {string} orderBy is the name of the column the entities should be ordered. An array of strings will be transformed to a comma-speperated string.
   * @param {boolean} asc identifies the sorting order, default is true.
   * @param {object} where is a map where you define options to filter your entities. E.g. { "foo": "*bar" }
   * @returns {array} a list of JSON entities.
   */
  list(start = 0, count = 0, orderBy = '', asc = true, where = {}) {
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

    }

    this.client.methods.list(data);
  }
}
