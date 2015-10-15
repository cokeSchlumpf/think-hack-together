import { Client } from 'node-rest-client';
import URLUtil from './URLUtil';

export default class WebServiceClient {

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
    this.errorHandler();
  }
}
