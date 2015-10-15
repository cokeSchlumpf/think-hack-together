import Fluxxor from 'fluxxor';
import Constants from '../constants/likes';

export default Fluxxor.createStore({
  initialize() {
    this.likes = [];

    this.bindActions(
      Constants.INIT, this.onInit,
      Constants.LIKE, this.onLike
    );
  },

  getState() {
    return this.likes;
  },

  onInit(payload) {
    this.likes = paylod;
    this.emit('change');
  },

  onLike(payload) {
    this.likes = this.likes.map(like => {
      if (like.)
    });
  }
});
