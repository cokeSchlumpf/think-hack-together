import Constants from '../constants/ideas';

export default {
  addIdea(color, date, organizer, tags, title, town, type) {
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

  likeIdea(id) {
    this.dispatch(Constants.LIKE_IDEA, {
      id: id
    });
  }
};
