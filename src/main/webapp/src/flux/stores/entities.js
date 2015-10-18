import Fluxxor from 'fluxxor';

import _ from '../../utils/underscore';
import Constants from '../constants/entities';

/**
 * This store manages all entities which are loaded and maybe modified (CRUD entities).
 * Entities are identified by their identityType, which is a simple string idenfifier and their
 * id.
 *
 * (identityType + id) must be unique.
 *
 * Entities are internally stored in the following nature:
 *
 *  this._entities = {
 *    [entityType_1]: {
 *      id_0: { ...entity },
 *      id_1: { ...entity },
 *      id_2: { ...entity }
 *    },
 *    [entityType_2]: {
 *      id_0: { ...entity },
 *      id_1: { ...entity },
 *      id_2: { ...entity }
 *    }
 *  }
 */
export default Fluxxor.createStore({

  /**
   * This method will be triggered by Fluxxor.
   * @return {undefined}
   */
  initialize() {
    this._entities = {};

    const actions = _.flatten(_.zip(_.values(Constants), [
      this._setAll,
      this._setOne,
      this._delete
    ]));

    this.bindActions.apply(this, actions);
  },

  /**
   * Helper method to execute a function and emit a change event afterwords.
   * @param {string} entityType of the entities which will be changed.
   * @param {function} func will be executed with `this` as context.
   * @return {undefined} but a change will be emitted.
   */
  _emitChange(entityType, func) {
    func.apply(this);
    this.emit(entityType + '_change');
  },

  /**
   * Returns all entitites for entityType, empty object if not present.
   * @param {string} entityType of the entity.
   * @return {object} of the form { id_0: entity, id_1: entity, ... }
   */
  _getEntities(entityType) {
    return _.orElse(this._entities[entityType], {});
  },

  /**
   * Returns the current state for the given entity type.
   * @param {string} entityType which state should be returned.
   * @return {array} a list of all elements of entityType.
   */
  getState(entityType) {
    const entityCollection = this._getEntities(entityType);
    return _.map(_.keys(entityCollection), id => {
      return _.extend({}, entityCollection[id], {
        id: id
      });
    });
  },

  /**
   * Removes a list of entities of type payload.entityType from the store.
   * @param {object} payload of the form { entityType: "entityTYpe", data: [ 'id0', 'id1' ] }
   * @return {undefined} but emit change event for the entityType.
   */
  _delete(payload) {
    this._emitChange(payload.entityType, () => {
      this._entities[payload.entityType] = _.omit(this._getEntities(payload.entityType), payload.data);
    });
  },

  /**
   * Replaces the whole state for entityType with new data.
   * @param {object} payload of the form { entityType: "entityName", data: { id0: { entity }, id1: { entity } } }
   * @return {undefined} but emit change event for the entityType.
   */
  _setAll(payload) {
    this._emitChange(payload.entityType, () => {
      this._entities[payload.entityType] = payload.data;
    });
  },

  /**
   * Updates or adds one entity to the current state of the entityType within the store.
   * @param {object} payload of the form { entityType: "entityName", id: 'id0', data: { entity } }.
   * @return {undefined} but emit change event for the entityType.
   */
  _setOne(payload) {
    this._emitChange(payload.entityType, () => {
      this._entities[payload.entityType][payload.id] = payload.data;
    });
  }

});
