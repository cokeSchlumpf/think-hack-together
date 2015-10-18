import React from 'react';

import WebServiceClient from '../utils/webserviceclient';
import StoreNames from '../flux/stores/_storeNames';
import _ from '../utils/underscore';

const WebServiceClientMixin = function() {
  const args = _.toArray(arguments);

  // Function that maps an entityType to is related service name
  const serviceName = (entityType) => {
    return entityType.toLowerCase() + 'Service';
  };

  // Function that maps the entityType to the React.PropType
  const webServiceClientType = () => {
    return React.PropTypes.any;
  };

  // Function that maps the entityType to a new instance of WebServiceClient with the default URL.
  const webServiceClient = (entityType) => {
    return new WebServiceClient(this, 'api/' + entityType.toLowerCase());
  };

  return {
    propTypes: _.object(_.map(args, serviceName), _.map(args, webServiceClientType)),

    getDefaultProps() {
      return _.object(_.map(args, serviceName), _.map(args, webServiceClient));
    },

    loadEntities() {
      return '';
    }
  };
};
