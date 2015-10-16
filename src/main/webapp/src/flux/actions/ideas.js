import Constants from '../constants/ideas';

export default {
  ideasInit(ideas) {
    this.dispatch(Constants.INIT, ideas);
  },

  ideasCreate(color, date, organizer, tags, title, town, type) {
    this.dispatch(Constants.CREATE_IDEA, {
      color: color,
      date: date,
      organizer: organizer,
      tags: tags,
      title: title,
      town: town,
      type: type
    });
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
