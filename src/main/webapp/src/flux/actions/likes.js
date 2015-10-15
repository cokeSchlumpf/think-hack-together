import Constants from '../constants/likes';

export default {
  likesInit(likes) {
    this.dispatch(Constants.INIT, likes);
  },

  likesLike(itemId, userId, liked) {
    this.dispatch(Constant.LIKE, {
      itemId: itemId,
      userId: userId
    });
  }
};
