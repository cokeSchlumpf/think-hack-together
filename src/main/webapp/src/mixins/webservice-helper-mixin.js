import _ from '../utils/underscore';

const mixin = function(entityTypes) {
  const serviceNames = _.map(_.toArray(arguments), entityType => entityType.toLowerCase() + 'Service');

  return {
    componentDidMount() {
      const flux = this.props.flux || this.context.flux;

      _.each(serviceNames, serviceName => {
        const serviceId = this.displayName + '.' + serviceName;

        if (this.props[serviceName] && _.isFunction(this.props[serviceName].onError)) {
          this.props[serviceName].onStartRequest((requestNumber) => {
            flux.actions.appMessagesLoadingStart('Start loading from ' + serviceName, serviceId, requestNumber);
          }, this);

          this.props[serviceName].onFinishRequest((requestNumber) => {
            flux.actions.appMessagesLoadingDone(serviceId, requestNumber);
          }, this);

          this.props[serviceName].onError((error) => {
            if (error.key && (!error.parameters || _.isArray(error.parameters))) {
              flux.actions.appMessagesMessageNew(error.key, 'DANGER', error.parameters);
            } else {
              flux.actions.appMessagesMessageNew('APPLICATION.UNEXPECTED_ERROR', 'DANGER');
            }
          }, this);
        }
      }, this);
    }
  };
};

mixin.componentWillMount = function() {
  throw new Error('WebServiceErrorHandlerMixin is a mixin that takes one or more EntityType names as arguments. E.g. WebServiceErrorHandlerMixin("Books", "Users").');
};

export default mixin;
