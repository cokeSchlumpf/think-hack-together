import Constants from '../constants/entities';
import _ from '../../utils/underscore';

export default {
  /**
   * Replace the application's state with a new list of entities.
   * @param {string} entityType is a unique identifier for the type.
   * @param {array} entities which are currently loaded.
   * @return {undefined}
   */
  entitiesSetAll(entityType, entities) {
    _.check({
      isNonEmptyString: [ [ entityType ] ],
      isArray: [ [ entities ] ]
    });

    this.dispatch(Constants.ENTITIES_SET_ALL, {
      entityType: entityType,
      data: _.reduce(entities, (data, entity) => {
        _.check({
          isDefined: [ [ entity.id ] ]
        });

        return _.extend({}, data, {
          [entity.id]: _.omit(entity, 'id')
        });
      }, {})
    });
  },

  /**
   * Creates or updated an element of entityType in the store.
   * @param {string} entityType is a unique identifier for the type.
   * @param {object} entity which will be added to/ updated in the store.
   * @return {undefined}
   */
  entitiesSetOne(entityType, entity) {
    _.check({
      isNonEmptyString: [ [ entityType ] ],
      isObject: [ [ entity ] ],
      isDefined: [ [ entity.id ] ]
    });

    this.dispatch(Constants.ENTITIES_SET_ONE, {
      entityType: entityType,
      id: entity.id,
      data: _.omit(entity, 'id')
    });
  },

  /**
   * Deletes one or more instance of entityType from the store.
   * @param {string} entityType is a unique identifer for the type.
   * @param {any} id of the entity to delete, it can be an array of ids.
   * @return {undefined}
   */
  entitiesDelete(entityType, id) {
    _.check({
      isNonEmptyString: [ [ entityType ] ],
      isDefined: [ [ id ] ]
    });

    this.dispatch(Constants.ENTITIES_DELETE, {
      entityType: entityType,
      data: _.isArray(id) ? id : [ id ]
    });
  }
};
