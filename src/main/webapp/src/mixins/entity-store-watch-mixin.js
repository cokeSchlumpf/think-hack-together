import { EntitiesStore } from '../flux/stores/_storeNames';
import _ from '../utils/underscore';

const EntityStoreWatchMixin = function() {
  const entityTypes = Array.prototype.slice.call(arguments);

  const changeEventName = (entityType) => {
    return entityType + '_change';
  };

  const helperMethods = _.reduce(entityTypes, (obj, entityType) => {
    return _.extend(obj, {
      [entityType.toLowerCase() + 'SetAll']: function(entities) {
        const flux = this.props.flux || this.context.flux;
        flux.actions.entitiesSetAll(entityType, entities);
      }
    });
  }, {});

  return _.extend({}, helperMethods, {
    componentDidMount() {
      const flux = this.props.flux || this.context.flux;
      this.mounted = true;

      // No autobinding in ES6 classes
      this._setStateFromFlux = function() {
        if (this.mounted) {
          this.setState(this.getStateFromFlux());
        }
      }.bind(this);

      _.each(entityTypes, function(entityType) {
        flux.stores[EntitiesStore].on(changeEventName(entityType), this._setStateFromFlux);
      }, this);
    },

    componentWillUnmount() {
      const flux = this.props.flux || this.context.flux;
      this.mounted = false;
      _.each(entityTypes, function(store) {
        flux.stores[EntitiesStore].removeListener(changeEventName(entityType), this._setStateFromFlux);
      }, this);
    },

    getInitialState() {
      return this.getStateFromFlux();
    },

    getStateFromFlux() {
      const flux = this.props.flux || this.context.flux;

      return _.object(
        _.map(entityTypes, entityType => entityType.toLowerCase() + 'State', this),
        _.map(entityTypes, entityType => flux.stores[EntitiesStore].getState(entityType), this));
    }
  });
};

EntityStoreWatchMixin.componentWillMount = function() {
  throw new Error('EntityStoreWatchMixin is a mixin that takes one or more EntityType names as arguments. E.g. EntityStoreWatchMixin("Books", "Users").');
};

export default EntityStoreWatchMixin;
