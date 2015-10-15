import Constants from '../constants/ideas';

export default {
  ideasInit(ideas) {
    this.dispatch(Constants.INIT, ideas);
  },

  ideasAdd(color, date, organizer, tags, title, town, type) {
    this.dispatch(Constants.ADD_IDEA, {
      color: color,
      date: date,
      organizer: organizer,
      tags: tags,
      title: title,
      town: town,
      type: type
    });
  },

  ideasLike(id) {
    this.dispatch(Constants.LIKE_IDEA, {
      id: id
    });
  }
};
