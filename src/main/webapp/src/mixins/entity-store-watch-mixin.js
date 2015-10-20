import { EntitiesStore } from '../flux/stores/_storeNames';
import _ from '../utils/underscore';

/**
 * This mixin helps you to use the EntityStore for different entity types.
 *
 * It creates the getStateFromFlux method and adds eventHandlers for the EntitiesStore,
 * as well as three helper methods via entity:
 * - [entityName]SetAll(listofEntities)
 * - [entityName]SetOne(entity)
 * - [entityName]Delete(id)
 *
 * @param {array} entityTypeNames of all entities you like to manage.
 * @return {object} EntityStoreWatch Mixin
 */
const EntityStoreWatchMixin = function(entityTypeNames) {
  const entityTypes = Array.prototype.slice.call(arguments);

  const changeEventName = (entityType) => {
    return entityType + '_change';
  };

  const helperMethods = _.reduce(entityTypes, (obj, entityType) => {
    return _.extend(obj, {
      [entityType.toLowerCase() + 'SetAll']: function(entities) {
        const flux = this.props.flux || this.context.flux;
        flux.actions.entitiesSetAll(entityType, entities);
      },

      [entityType.toLowerCase() + 'SetOne']: function(entity) {
        const flux = this.props.flux || this.context.flux;
        flux.actions.entitiesSetOne(entityType, entity);
      },

      [entityType.toLowerCase() + 'Delete']: function(id) {
        const flux = this.props.flux || this.context.flux;
        flux.actions.entitiesDelete(entityType, id);
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
      _.each(entityTypes, function(entityType) {
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
