import Constants from '../constants/ideas';

export default {
  ideasInit(ideas) {
    this.dispatch(Constants.INIT, ideas);
  },

  ideasCreate(idea) {
    this.dispatch(Constants.CREATE_IDEA, idea);
  },

  ideasDelete(id) {
    this.dispatch(Constants.DELETE_IDEA, {
      id: id
    });
  },

  ideasLike(id) {
    this.dispatch(Constants.LIKE_IDEA, {
      id: id
    });
  }
};
